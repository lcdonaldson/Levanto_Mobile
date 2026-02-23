import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { light, dark } from './skins';
import type { Theme, Skin, SkinProp, SkinName } from './skins';

// =============================================================================
// Context
// =============================================================================

const ThemeContext = createContext<Theme>(light);

// =============================================================================
// Provider
// =============================================================================

interface MagicProviderProps {
  /** Force 'light' or 'dark'. Omit to follow system. */
  mode?: 'light' | 'dark';
  /**
   * Theme override — shallow-merged over the base light/dark theme.
   * Skin overrides must be complete Skin objects (all 4 properties).
   */
  theme?: Partial<Theme>;
  children: React.ReactNode;
}

export function MagicProvider({ mode, theme: overrides, children }: MagicProviderProps) {
  const systemScheme = useColorScheme();
  const activeMode = mode ?? (systemScheme === 'dark' ? 'dark' : 'light');
  const base = activeMode === 'dark' ? dark : light;

  const theme = useMemo(
    () => (overrides ? { ...base, ...overrides } : base),
    [base, overrides],
  );

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

// =============================================================================
// Hook
// =============================================================================

/** Access the active theme (ambient colors + named skins). */
export function useTheme(): Theme {
  return useContext(ThemeContext);
}

// =============================================================================
// Skin resolution — used internally by components
// =============================================================================

const SKIN_NAMES = new Set<string>(['primary', 'secondary', 'danger', 'ghost', 'surface', 'success', 'warning', 'info']);

/** Resolve a SkinProp (string name or Skin object) against the active theme. */
export function resolveSkin(prop: SkinProp, theme: Theme): Skin {
  if (typeof prop === 'string' && SKIN_NAMES.has(prop)) {
    return theme[prop as SkinName];
  }
  return prop as Skin;
}
