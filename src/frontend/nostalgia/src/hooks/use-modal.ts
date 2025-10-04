import { useCallback, useEffect, useState } from "react";

interface UseModalOptions {
  /**
   * If true, the modal will be open by default.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * A unique hash to associate with the modal.
   * If set, the modal will open if the URL hash matches.
   * Opening/closing the modal will update the URL hash.
   */
  hash?: string;
}

interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/**
 * Manages modal state with optional URL hash integration.
 *
 * @param {UseModalOptions} options - Configuration for the modal behavior.
 * @returns {UseModalReturn} The state and handlers for the modal.
 */
export const useModal = ({
  defaultOpen = false,
  hash,
}: UseModalOptions = {}): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(() => {
    if (hash) {
      return window.location.hash === `#${hash}`;
    }
    return defaultOpen;
  });

  const open = useCallback(() => {
    setIsOpen(true);
    if (hash) {
      window.location.hash = hash;
    }
  }, [hash]);

  const close = useCallback(() => {
    setIsOpen(false);
    if (hash && window.location.hash === `#${hash}`) {
      history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search,
      );
    }
  }, [hash]);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (hash) {
        if (newState) {
          window.location.hash = hash;
        } else if (window.location.hash === `#${hash}`) {
          history.pushState(
            "",
            document.title,
            window.location.pathname + window.location.search,
          );
        }
      }
      return newState;
    });
  }, [hash]);

  useEffect(() => {
    if (!hash) return;

    const handleHashChange = () => {
      setIsOpen(window.location.hash === `#${hash}`);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [hash]);

  return { isOpen, open, close, toggle };
};
