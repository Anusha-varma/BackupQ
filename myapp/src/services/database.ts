import { supabase } from '../lib/supabase';
import type { UserProfile, QueueHistory, SystemMetrics } from '../types/database';
import { User } from '@supabase/supabase-js';
// User Profiles
export const createUserProfile = async (user: User): Promise<UserProfile | null> => {
  const profile: Partial<UserProfile> = {
    id: user.id,
    email: user.email,
    joined_at: new Date().toISOString(),
    last_active: new Date().toISOString(),
    status: 'active',
    in_queue: false
  };

  const { data, error } = await supabase
    .from('user_profiles')
    .insert(profile)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating user profile:', error);
    return null;
  }

  return data as UserProfile;
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select()
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data as UserProfile;
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>): Promise<boolean> => {
  const { error } = await supabase
    .from('user_profiles')
    .update({
      ...updates,
      last_active: new Date().toISOString()
    })
    .eq('id', userId);

  if (error) {
    console.error('Error updating user profile:', error);
    return false;
  }

  return true;
};

export const updateQueueStatus = async (
  userId: string, 
  inQueue: boolean, 
  position: number | null = null
): Promise<boolean> => {
  const updates: Partial<UserProfile> = {
    in_queue: inQueue,
    queue_position: position,
    status: inQueue ? 'active' : 'idle',
    last_active: new Date().toISOString()
  };

  return updateUserProfile(userId, updates);
};

// Queue History
export const createQueueEntry = async (userId: string, position: number): Promise<string | null> => {
  const entry: Partial<QueueHistory> = {
    user_id: userId,
    joined_at: new Date().toISOString(),
    initial_position: position,
    status: 'waiting'
  };

  const { data, error } = await supabase
    .from('queue_history')
    .insert(entry)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating queue entry:', error);
    return null;
  }

  return data.id;
};

export const updateQueueEntry = async (entryId: string, updates: Partial<QueueHistory>): Promise<boolean> => {
  const { error } = await supabase
    .from('queue_history')
    .update(updates)
    .eq('id', entryId);

  if (error) {
    console.error('Error updating queue entry:', error);
    return false;
  }

  return true;
};

export const completeQueueEntry = async (entryId: string, status: 'served' | 'abandoned'): Promise<boolean> => {
  return updateQueueEntry(entryId, {
    left_at: new Date().toISOString(),
    status
  });
};

// System Metrics
export const recordSystemMetrics = async (
  userCount: number,
  queueLength: number,
  trafficStatus: 'low' | 'medium' | 'high' | 'critical'
): Promise<boolean> => {
  const metrics: Partial<SystemMetrics> = {
    timestamp: new Date().toISOString(),
    user_count: userCount,
    queue_length: queueLength,
    traffic_status: trafficStatus
  };

  const { error } = await supabase
    .from('system_metrics')
    .insert(metrics);

  if (error) {
    console.error('Error recording system metrics:', error);
    return false;
  }

  return true;
};

export const getActiveUsers = async (): Promise<UserProfile[]> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select()
    .order('last_active', { ascending: false })
    .limit(100);

  if (error) {
    console.error('Error fetching active users:', error);
    return [];
  }

  return data as UserProfile[];
};

export const getActiveUserCount = async (): Promise<number> => {
  const { count, error } = await supabase
    .from('user_profiles')
    .select('id', { count: 'exact', head: true })
    .gte('last_active', new Date(Date.now() - 15 * 60 * 1000).toISOString()); // Active in the last 15 minutes

  if (error) {
    console.error('Error counting active users:', error);
    return 0;
  }

  return count || 0;
};

export const getLatestSystemMetrics = async (): Promise<SystemMetrics | null> => {
  const { data, error } = await supabase
    .from('system_metrics')
    .select()
    .order('timestamp', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching latest system metrics:', error);
    return null;
  }

  return data as SystemMetrics;
};