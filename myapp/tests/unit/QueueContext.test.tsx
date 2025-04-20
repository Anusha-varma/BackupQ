import { describe, it, expect, vi,beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useQueue, QueueProvider } from '../../src/context/QueueContext';


type ToastMock = {
  (message: string): void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
};

vi.mock('sonner', () => {
  const toast = vi.fn() as unknown as ToastMock;
  toast.success = vi.fn();
  toast.error = vi.fn();
  toast.info = vi.fn();
  return { toast };
});


// Mock supabase and auth context
vi.mock('../../src/lib/supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    filter: vi.fn().mockReturnThis(),
    mockReturnValue: vi.fn()
  }
}));

vi.mock('../../src/context/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'test-user-id' },
    userProfile: { 
      id: 'test-user-id', 
      in_queue: false,
      queue_position: null
    },
    updateProfile: vi.fn()
  })
}));

// Mock database service with implementation that returns data
const mockGetActiveUserCount = vi.fn().mockResolvedValue(0);
const mockSimulateTrafficSpike = vi.fn().mockImplementation(() => {
  mockGetActiveUserCount.mockResolvedValue(1000);
  return Promise.resolve();
});

// Mock database service
vi.mock('../../src/services/database', () => ({
  getActiveUsers: vi.fn().mockResolvedValue([]),
  getActiveUserCount: mockGetActiveUserCount,
  updateQueueStatus: vi.fn().mockResolvedValue({}),
  createQueueEntry: vi.fn().mockResolvedValue('test-entry-id'),
  completeQueueEntry: vi.fn().mockResolvedValue({}),
  recordSystemMetrics: vi.fn().mockResolvedValue({}),
  getUserProfile: vi.fn().mockResolvedValue({})
}));

describe('QueueContext', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Reset the mock implementation to start at 0 users
    mockGetActiveUserCount.mockResolvedValue(0);
  });

  it('initializes with correct default values', async () => {
    const { result } = renderHook(() => useQueue(), {
      wrapper: QueueProvider,
    });

    // Wait for initial data fetch to complete
    await waitFor(() => {
      expect(result.current.userCount).toBe(0);
    });

    expect(result.current.queueStatus).toBe('low');
    expect(result.current.isInQueue).toBe(false);
    expect(result.current.queuePosition).toBeNull();
  });

  it('updates status based on user count', async () => {
    // Start with 0 users
    mockGetActiveUserCount.mockResolvedValue(0);
    
    const { result } = renderHook(() => useQueue(), {
      wrapper: QueueProvider,
    });

    // Wait for initial state to be set
    await waitFor(() => {
      expect(result.current.userCount).toBe(0);
    });

    // Now simulate a traffic spike that will increase count to 1000
    mockGetActiveUserCount.mockResolvedValue(1000);
    
    // Manually update the userCount to simulate what simulateTrafficSpike does
    act(() => {
      result.current.simulateTrafficSpike();
    });

    // Check that userCount updates after simulation
    await waitFor(() => {
      expect(result.current.userCount).toBe(1000);
    });

    // Since userCount is 1000, status should be critical
    await waitFor(() => {
      expect(result.current.queueStatus).toBe('high');
    });
  });
});
