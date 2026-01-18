import { useNavigate, useLocation } from 'react-router';
import { useCallback, useEffect, useRef } from 'react';

export const isBrowser = typeof window !== 'undefined';

export interface NavigateOptions {
  replace?: boolean;
  state?: any;
  preventScrollReset?: boolean;
}

/**
 * safeNavigate Hook
 * auto handles SSR and client-side navigation
 */
export function useSafeNavigate() {
  const navigate = useNavigate();
  const location = useLocation();
  const pendingNavigationRef = useRef<{
    to: string;
    options?: NavigateOptions;
  } | null>(null);

  // safeNavigate
  const safeNavigate = useCallback(
    (to: string | number, options?: NavigateOptions) => {
      if (typeof to === 'number') {
        if (isBrowser) {
          window.history.go(to);
        }
        return;
      }

      // SSR safety
      if (!isBrowser) {
        pendingNavigationRef.current = { to, options };
        return;
      }

      navigate(to, options);
    },
    [navigate],
  );

  // client-side effect to perform pending navigation
  useEffect(() => {
    if (isBrowser && pendingNavigationRef.current) {
      const { to, options } = pendingNavigationRef.current;
      navigate(to, options);
      pendingNavigationRef.current = null;
    }
  }, [navigate]);

  return {
    navigate: safeNavigate,
    location,
    goBack: useCallback(() => safeNavigate(-1), [safeNavigate]),
    goForward: useCallback(() => safeNavigate(1), [safeNavigate]),
  };
}
/**
 * common navigation helper
 * useful for non-component contexts
 */
export const navigationHelper = {
  push: (path: string) => {
    if (isBrowser) {
      window.location.href = path;
    }
  },

  replace: (path: string) => {
    if (isBrowser) {
      window.location.replace(path);
    }
  },


  back: () => {
    if (isBrowser) {
      window.history.back();
    }
  },


  forward: () => {
    if (isBrowser) {
      window.history.forward();
    }
  },

  reload: () => {
    if (isBrowser) {
      window.location.reload();
    }
  },
};
