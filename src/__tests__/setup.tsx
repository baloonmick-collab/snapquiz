/**
 * Test utilities and helpers
 */

import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { BattleProvider } from '@/context/BattleContext';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <BattleProvider>{children}</BattleProvider>
    </AuthProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
