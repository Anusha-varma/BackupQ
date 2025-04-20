
// Local storage based user database

export interface User {
    id: string;
    name?: string;
    email?: string;
    joinedAt: string;
    lastActive: string;
    status: 'active' | 'idle' | 'offline';
    inQueue: boolean;
    queuePosition?: number | null;
  }
  
  // Generate a unique ID for users
  const generateUserId = (): string => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };
  
  // Get current user
  export const getCurrentUser = (): User => {
    // Check localStorage for current user session
    const storedUser = localStorage.getItem('currentUser');
    
    if (storedUser) {
      const user = JSON.parse(storedUser) as User;
      
      // Update last active timestamp
      user.lastActive = new Date().toISOString();
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      return user;
    }
    
    // Create new user
    const newUser: User = {
      id: generateUserId(),
      joinedAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      status: 'active',
      inQueue: false,
    };
    
    // Store in localStorage as session
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // Add to active users
    addActiveUser(newUser);
    
    return newUser;
  };
  
  // Get active users
  export const getActiveUsers = (): User[] => {
    const storedUsers = localStorage.getItem('activeUsers');
    return storedUsers ? JSON.parse(storedUsers) : [];
  };
  
  // Add or update a user
  export const addActiveUser = (user: User): void => {
    // Update localStorage
    const activeUsers = localStorage.getItem('activeUsers') 
      ? JSON.parse(localStorage.getItem('activeUsers') || '[]') 
      : [];
    
    // Check if user already exists
    const existingUserIndex = activeUsers.findIndex((u: User) => u.id === user.id);
    
    if (existingUserIndex >= 0) {
      // Update existing user
      activeUsers[existingUserIndex] = {
        ...activeUsers[existingUserIndex],
        ...user,
        lastActive: new Date().toISOString(),
      };
    } else {
      // Add new user
      activeUsers.push({
        ...user,
        lastActive: new Date().toISOString(),
      });
    }
    
    localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
  };
  
  // Update a user's data
  export const updateUser = (userId: string, userData: Partial<User>): void => {
    // Update localStorage
    const activeUsers = localStorage.getItem('activeUsers') 
      ? JSON.parse(localStorage.getItem('activeUsers') || '[]') 
      : [];
    
    const userIndex = activeUsers.findIndex((u: User) => u.id === userId);
    
    if (userIndex >= 0) {
      activeUsers[userIndex] = {
        ...activeUsers[userIndex],
        ...userData,
        lastActive: new Date().toISOString(),
      };
      
      localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
    }
    
    // If this is the current user, update currentUser as well
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser.id === userId) {
      localStorage.setItem('currentUser', JSON.stringify({
        ...currentUser,
        ...userData,
        lastActive: new Date().toISOString(),
      }));
    }
  };
  
  // Clean up inactive users (those who haven't been active for more than 5 minutes)
  export const cleanupInactiveUsers = (): number => {
    const activeUsers = JSON.parse(localStorage.getItem('activeUsers') || '[]');
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString();
    
    const filteredUsers = activeUsers.filter((user: User) => {
      return user.lastActive >= fiveMinutesAgo;
    });
    
    const removedCount = activeUsers.length - filteredUsers.length;
    
    if (removedCount > 0) {
      localStorage.setItem('activeUsers', JSON.stringify(filteredUsers));
    }
    
    return removedCount;
  };
  
  // Update user queue status
  export const updateUserQueueStatus = (
    userId: string, 
    inQueue: boolean, 
    position: number | null = null
  ): void => {
    updateUser(userId, {
      inQueue,
      queuePosition: position,
      status: inQueue ? 'active' : 'idle',
    });
  };
  
  // Get total active user count
  export const getActiveUserCount = (): number => {
    const storedUsers = localStorage.getItem('activeUsers');
    return storedUsers ? JSON.parse(storedUsers).length : 0;
  };
  
  // Update user profile information
  export const updateUserProfile = (
    userId: string, 
    name?: string, 
    email?: string
  ): void => {
    updateUser(userId, { name, email });
  };
  
  // Export active users data (for admin/dashboard purposes)
  export const exportUserData = (): string => {
    const activeUsers = getActiveUsers();
    return JSON.stringify(activeUsers, null, 2);
  };
  
  // Placeholder for closeConnection to maintain compatibility with existing code
  export const closeConnection = async (): Promise<void> => {
    // No need to close any connection in localStorage implementation
    return Promise.resolve();
  };
  