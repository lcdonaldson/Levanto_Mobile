import { useWindowDimensions } from 'react-native';

export type Breakpoint = 'phone' | 'tablet' | 'desktop';

/**
 * Returns the current breakpoint based on screen width.
 * - phone: < 768
 * - tablet: 768–1023
 * - desktop: >= 1024
 */
export function useBreakpoint(): Breakpoint {
  const { width } = useWindowDimensions();
  if (width >= 1024) return 'desktop';
  if (width >= 768) return 'tablet';
  return 'phone';
}
