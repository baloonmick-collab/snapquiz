/**
 * Auth Context Tests
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import * as supabaseAuth from '@/services/supabase';
import React from 'react';

vi.mock('@/services/supabase');

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should provide authentication methods', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      React.createElement(AuthProvider, null, children)
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.signIn).toBeDefined();
    expect(result.current.signUp).toBeDefined();
    expect(result.current.signOut).toBeDefined();
  });

  it('should initialize with no user', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      React.createElement(AuthProvider, null, children)
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should handle sign up', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      React.createElement(AuthProvider, null, children)
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    vi.mocked(supabaseAuth.auth.signUp).mockResolvedValue({
      user: { id: 'test-user-id', email: 'test@example.com' } as any,
    } as any);

    vi.mocked(supabaseAuth.userProfile.createProfile).mockResolvedValue({
      id: 'test-user-id',
      displayName: 'Test User',
      xp: 0,
      coins: 0,
      level: 1,
      streak: 0,
    } as any);

    await act(async () => {
      await result.current.signUp('test@example.com', 'password', 'Test User');
    });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
    });
  });
});
