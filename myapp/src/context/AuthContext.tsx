import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { createUserProfile, getUserProfile, updateUserProfile } from '../services/database';
import type { UserProfile } from '../types/database';
import { useToast } from '../hooks/use-toast';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data: { user: User | null; session: Session | null } | null;
  }>;
  signUp: (email: string, password: string) => Promise<{
    error: Error | null;
    data: { user: User | null; session: Session | null } | null;
  }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch user profile
  const fetchUserProfile = async (userId: string) => {
    const profile = await getUserProfile(userId);
    if (profile) {
      setUserProfile(profile);
      // Update last active timestamp
      updateUserProfile(userId, { last_active: new Date().toISOString() });
    }
  };


  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchUserProfile(session.user.id);
        } else {
          setUserProfile(null);
        }

        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

   // Update user profile periodically to maintain 'active' status
   useEffect(() => {
    if (!user) return;
    
    const updateInterval = setInterval(() => {
      updateUserProfile(user.id, { last_active: new Date().toISOString() });
    }, 5 * 60 * 1000); // Update every 5 minutes
    
    return () => clearInterval(updateInterval);
  }, [user]);

  const signIn = async (email: string, password: string) => {
    const response = await supabase.auth.signInWithPassword({ email, password });
    
    if (response.error) {
      toast({
        title: "Sign in failed",
        description: response.error.message,
        variant: "destructive"
      });
    } else if (response.data.user) {
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      fetchUserProfile(response.data.user.id);
    }
    
    return response;
  };

  const signUp = async (email: string, password: string) => {
    const response = await supabase.auth.signUp({ email, password });
    
    if (response.error) {
      toast({
        title: "Sign up failed",
        description: response.error.message,
        variant: "destructive"
      });
    } else if (response.data.user) {
      toast({
        title: "Account created",
        description: "You have successfully signed up.",
      });
      
      // Create user profile
      const profile = await createUserProfile(response.data.user);
      if (profile) {
        setUserProfile(profile);
      }
    }
    
    return response;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserProfile(null);
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<boolean> => {
    if (!user) return false;
    
    const success = await updateUserProfile(user.id, updates);
    
    if (success && userProfile) {
      setUserProfile({ ...userProfile, ...updates });
    }
    
    return success;
  };

  const value = {
    user,
    session,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};