/**
 * Auth Context
 * Manages authentication state and user data across the app
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, userProfile } from '@/services/supabase';
import type { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  displayName: string;
  avatar?: string;
  xp: number;
  coins: number;
  level: number;
  streak: number;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfileData, setUserProfileData] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check current session on mount
    const initializeAuth = async () => {
      try {
        const currentUser = await auth.getCurrentUser();
        setUser(currentUser);

        if (currentUser) {
          // Fetch user profile
          const profile = await userProfile.getProfile(currentUser.id);
          setUserProfileData(profile);
        }
      } catch (err: any) {
        console.error('Auth initialization error:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Subscribe to auth changes
    const subscription = auth.onAuthStateChange(async (newUser) => {
      setUser(newUser);
      if (newUser) {
        const profile = await userProfile.getProfile(newUser.id);
        setUserProfileData(profile);
      } else {
        setUserProfileData(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleSignUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      setError(null);
      const authData = await auth.signUp(email, password, displayName);

      if (authData.user) {
        // Create user profile
        const profile = await userProfile.createProfile(
          authData.user.id,
          displayName
        );
        setUserProfileData(profile);
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      setError(null);
      const authData = await auth.signIn(email, password);

      if (authData.user) {
        const profile = await userProfile.getProfile(authData.user.id);
        setUserProfileData(profile);
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const handleSignOut = async () => {
    try {
      setError(null);
      await auth.signOut();
      setUser(null);
      setUserProfileData(null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile: userProfileData,
        isLoading,
        isAuthenticated: !!user,
        signUp: handleSignUp,
        signIn: handleSignIn,
        signOut: handleSignOut,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
