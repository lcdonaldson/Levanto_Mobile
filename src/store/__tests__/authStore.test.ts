import { renderHook, act } from '@testing-library/react-native';
import { useAuthStore } from '../authStore';

describe('authStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    const { result } = renderHook(() => useAuthStore());
    act(() => {
      result.current.logout();
    });
  });

  describe('Initial State', () => {
    it('should have null user initially', () => {
      const { result } = renderHook(() => useAuthStore());
      expect(result.current.user).toBeNull();
    });

    it('should have null companyName initially', () => {
      const { result } = renderHook(() => useAuthStore());
      expect(result.current.companyName).toBeNull();
    });

    it('should not be authenticated initially', () => {
      const { result } = renderHook(() => useAuthStore());
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('login', () => {
    it('should set user when logging in', () => {
      const { result } = renderHook(() => useAuthStore());
      
      act(() => {
        result.current.login('test@example.com', 'Acme Corporation');
      });

      expect(result.current.user).toBe('test@example.com');
    });

    it('should set companyName when logging in', () => {
      const { result } = renderHook(() => useAuthStore());
      
      act(() => {
        result.current.login('test@example.com', 'Acme Corporation');
      });

      expect(result.current.companyName).toBe('Acme Corporation');
    });

    it('should set isAuthenticated to true when logging in', () => {
      const { result } = renderHook(() => useAuthStore());
      
      act(() => {
        result.current.login('test@example.com', 'Acme Corporation');
      });

      expect(result.current.isAuthenticated).toBe(true);
    });

    it('should handle multiple login calls', () => {
      const { result } = renderHook(() => useAuthStore());
      
      act(() => {
        result.current.login('first@example.com', 'First Company');
      });

      expect(result.current.user).toBe('first@example.com');
      expect(result.current.companyName).toBe('First Company');

      act(() => {
        result.current.login('second@example.com', 'Second Company');
      });

      expect(result.current.user).toBe('second@example.com');
      expect(result.current.companyName).toBe('Second Company');
    });
  });

  describe('logout', () => {
    it('should clear user when logging out', () => {
      const { result } = renderHook(() => useAuthStore());
      
      act(() => {
        result.current.login('test@example.com', 'Acme Corporation');
      });

      expect(result.current.user).toBe('test@example.com');

      act(() => {
        result.current.logout();
      });

      expect(result.current.user).toBeNull();
    });

    it('should clear companyName when logging out', () => {
      const { result } = renderHook(() => useAuthStore());
      
      act(() => {
        result.current.login('test@example.com', 'Acme Corporation');
      });

      expect(result.current.companyName).toBe('Acme Corporation');

      act(() => {
        result.current.logout();
      });

      expect(result.current.companyName).toBeNull();
    });

    it('should set isAuthenticated to false when logging out', () => {
      const { result } = renderHook(() => useAuthStore());
      
      act(() => {
        result.current.login('test@example.com', 'Acme Corporation');
      });

      expect(result.current.isAuthenticated).toBe(true);

      act(() => {
        result.current.logout();
      });

      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should be idempotent (multiple logouts dont break)', () => {
      const { result } = renderHook(() => useAuthStore());
      
      act(() => {
        result.current.login('test@example.com', 'Acme Corporation');
        result.current.logout();
        result.current.logout();
        result.current.logout();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.companyName).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('State Consistency', () => {
    it('should maintain consistent state between selectors', () => {
      const { result: result1 } = renderHook(() => useAuthStore());
      const { result: result2 } = renderHook(() => useAuthStore());
      
      act(() => {
        result1.current.login('test@example.com', 'Acme Corporation');
      });

      // Both hooks should see the same state
      expect(result2.current.user).toBe('test@example.com');
      expect(result2.current.companyName).toBe('Acme Corporation');
      expect(result2.current.isAuthenticated).toBe(true);
    });

    it('should update all hooks when state changes', () => {
      const { result: result1 } = renderHook(() => useAuthStore());
      const { result: result2 } = renderHook(() => useAuthStore());
      
      act(() => {
        result1.current.login('test@example.com', 'Acme Corporation');
      });

      expect(result2.current.isAuthenticated).toBe(true);

      act(() => {
        result2.current.logout();
      });

      expect(result1.current.isAuthenticated).toBe(false);
    });
  });
});
