import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { toast } from '../components/ui/sonner';
import { supabase } from '../lib/supabase'
type QueueStatus = 'low' | 'medium' | 'high' | 'critical';

interface QueueContextType {
  userCount: number;
  queueStatus: QueueStatus;
  isInQueue: boolean;
  queuePosition: number | null;
  estimatedWaitTime: number;
  joinQueue: () => void;
  leaveQueue: () => void;
  simulateTrafficSpike: () => void;
  simulateTrafficDrop: () => void;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export function QueueProvider({ children }: { children: React.ReactNode }) {
  const [userCount, setUserCount] = useState(0);
  const [queueStatus, setQueueStatus] = useState<QueueStatus>('low');
  const [isInQueue, setIsInQueue] = useState(false);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [estimatedWaitTime, setEstimatedWaitTime] = useState<number>(0);
  const queueIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateQueueStatus = (count: number) => {
    if (count < 500) setQueueStatus('low');
    else if (count < 1000) setQueueStatus('medium');
    else if (count < 1500) setQueueStatus('high');
    else setQueueStatus('critical');
  };

  const updateEstimatedWaitTime = (position: number, status: QueueStatus) => {
    let baseTimePerPosition = 10;
    switch (status) {
      case 'low': baseTimePerPosition = 5; break;
      case 'medium': baseTimePerPosition = 15; break;
      case 'high': baseTimePerPosition = 30; break;
      case 'critical': baseTimePerPosition = 60; break;
    }
    const totalSeconds = position * baseTimePerPosition;
    setEstimatedWaitTime(totalSeconds);
  };

  useEffect(() => {
    const queueData = localStorage.getItem('queueData');
    if (queueData) {
      const parsed = JSON.parse(queueData);
      setIsInQueue(parsed.isInQueue);
      setQueuePosition(parsed.position);
      updateQueueStatus(userCount);
      updateEstimatedWaitTime(parsed.position, queueStatus);
      resumeQueueCountdown(parsed.position);
    }
  }, []);

  const resumeQueueCountdown = (startingPosition: number) => {
    if (queueIntervalRef.current) clearInterval(queueIntervalRef.current);

    queueIntervalRef.current = setInterval(() => {
      setQueuePosition(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(queueIntervalRef.current!);
          toast("It's Your Turn!", {
            description: "You can now access the system.",
            duration: 6000,
          });
          setIsInQueue(false);
          localStorage.removeItem('queueData');
          return null;
        }

        const newPosition = prev - 1;
        localStorage.setItem('queueData', JSON.stringify({
          isInQueue: true,
          position: newPosition,
          timestamp: new Date().toISOString()
        }));
        updateEstimatedWaitTime(newPosition, queueStatus);
        return newPosition;
      });
    }, 10000);
  };

  const joinQueue = async () => {
    // Local state updates (as already implemented)
    setIsInQueue(true);
    const newUserCount = userCount + 1;
    const position = newUserCount;
    setQueuePosition(position);
    setUserCount(newUserCount);
    updateQueueStatus(newUserCount);
    updateEstimatedWaitTime(position, queueStatus);
  
    // Update Supabase: Mark user in_queue = true
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
  
    await supabase
      .from('user_profiles')
      .update({ in_queue: true, queue_position: position, joined_at: new Date().toISOString() })
      .eq('id', userId);
  
    // Optional: Insert into queue_history
    await supabase.from('queue_history').insert({
      user_id: userId,
      joined_at: new Date().toISOString(),
      initial_position: position,
      status: 'joined'
    });
  
    // Update system_metrics (manual increment, or just insert a snapshot)
    await supabase.from('system_metrics').insert({
      timestamp: new Date().toISOString(),
      user_count: newUserCount,
      queue_length: newUserCount,
      traffic_status: queueStatus
    });
  
    // LocalStorage
    localStorage.setItem('queueData', JSON.stringify({
      isInQueue: true,
      position,
      timestamp: new Date().toISOString()
    }));
  
    toast("Joined Queue", {
      description: `You are now in position ${position} in the queue.`,
      duration: 5000,
    });
  
    resumeQueueCountdown(position);
  };
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const [countdown, setCountdown] = useState<string>("");
  
  useEffect(() => {
    updateEstimatedWaitTime(0, queueStatus);
  }, [queueStatus]);
  
  
  const leaveQueue = async () => {
    setIsInQueue(false);
    setQueuePosition(null);
    const updatedUserCount = userCount > 0 ? userCount - 1 : 0;
    setUserCount(updatedUserCount);
    updateQueueStatus(updatedUserCount);
    updateEstimatedWaitTime(0, queueStatus);
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    setCountdown("");
  
    // Supabase updates
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
  
    // Update user_profiles to mark user as not in queue
    await supabase
      .from('user_profiles')
      .update({ in_queue: false, queue_position: null, last_active: new Date().toISOString() })
      .eq('id', userId);
  
    // Update the latest queue_history record for this user to set left_at
    const { data: historyRows } = await supabase
      .from('queue_history')
      .select('id')
      .eq('user_id', userId)
      .order('joined_at', { ascending: false })
      .limit(1);
  
    if (historyRows && historyRows.length > 0) {
      const latestId = historyRows[0].id;
      await supabase
        .from('queue_history')
        .update({
          left_at: new Date().toISOString(),
          status: 'left'
        })
        .eq('id', latestId);
    }
  
    // Insert updated system_metrics
    await supabase.from('system_metrics').insert({
      timestamp: new Date().toISOString(),
      user_count: updatedUserCount,
      queue_length: updatedUserCount,
      traffic_status: queueStatus
    });
  
    // Clear local storage
    localStorage.removeItem('queueData');
  
    toast("Left Queue", {
      description: "You have left the queue successfully.",
      duration: 5000,
    });
  };
  

  const simulateTrafficSpike = () => {
    const spike = 1000; // fixed value
    const newCount = userCount + spike;
    setUserCount(newCount);
    updateQueueStatus(newCount);

    toast("Traffic Spike", {
      description: `${spike} new users joined the system.`,
      duration: 3000,
    });
  };

  const simulateTrafficDrop = () => {
    const drop = 500; // fixed value
    const newCount = Math.max(0, userCount - drop);
    setUserCount(newCount);
    updateQueueStatus(newCount);

    toast("Traffic Drop", {
      description: `${drop} users left the system.`,
      duration: 3000,
    });
  };

  return (
    <QueueContext.Provider value={{
      userCount,
      queueStatus,
      isInQueue,
      queuePosition,
      estimatedWaitTime,
      joinQueue,
      leaveQueue,
      simulateTrafficSpike,
      simulateTrafficDrop
    }}>
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
}
