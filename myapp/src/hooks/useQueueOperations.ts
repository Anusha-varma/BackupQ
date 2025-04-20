import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useUser } from '@supabase/auth-helpers-react';

export function useQueueOperations() {
  const user = useUser();
  const [isInQueue, setIsInQueue] = useState(false);
  const [position, setPosition] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      checkQueueStatus();
    }
  }, [user]);

  const checkQueueStatus = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_profiles')
      .select('in_queue, queue_position')
      .eq('id', user.id)
      .single();

    if (!error && data) {
      setIsInQueue(data.in_queue);
      setPosition(data.queue_position);
    } else {
      setIsInQueue(false);
      setPosition(null);
    }
  };

  const joinQueue = async () => {
    if (!user) return;

    const { data: maxRow } = await supabase
      .from('user_profiles')
      .select('queue_position')
      .order('queue_position', { ascending: false })
      .limit(1)
      .maybeSingle();

    const newPosition = (maxRow?.queue_position || 0) + 1;

    await supabase.from('user_profiles').upsert({
      id: user.id,
      in_queue: true,
      queue_position: newPosition,
      status: 'waiting',
      last_active: new Date().toISOString()
    });

    await supabase.from('queue_history').insert({
      user_id: user.id,
      joined_at: new Date().toISOString(),
      initial_position: newPosition,
      status: 'waiting',
    });

    setIsInQueue(true);
    setPosition(newPosition);
  };

  const leaveQueue = async () => {
    if (!user) return;

    await supabase.from('user_profiles').update({
      in_queue: false,
      queue_position: null,
      status: 'left',
      last_active: new Date().toISOString()
    }).eq('id', user.id);

    await supabase.from('queue_history').update({
      left_at: new Date().toISOString(),
      status: 'left',
    })
    .eq('user_id', user.id)
    .is('left_at', null);

    setIsInQueue(false);
    setPosition(null);
  };

  return { isInQueue, position, joinQueue, leaveQueue };
}
