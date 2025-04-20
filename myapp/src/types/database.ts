export interface UserProfile {
    id: string;
    name?: string;
    email?: string;
    joined_at: string;
    last_active: string;
    status: 'active' | 'idle' | 'offline';
    in_queue: boolean;
    queue_position?: number | null;
  }
  
  export interface QueueHistory {
    id: string;
    user_id: string;
    joined_at: string;
    left_at?: string | null;
    initial_position: number;
    status: 'waiting' | 'served' | 'abandoned';
  }
  
  export interface SystemMetrics {
    id: string;
    timestamp: string;
    user_count: number;
    queue_length: number;
    traffic_status: 'low' | 'medium' | 'high' | 'critical';
  }
  