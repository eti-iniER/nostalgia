import { useCallback, useEffect, useState } from "react";

/**
 * A hook to manage URL hash state synchronization.
 * Provides a way to read and write the current hash in the URL.
 *
 * @returns An object containing the current hash value and a setter function.
 */
export const useHash = () => {
  const [hash, setHashState] = useState<string>(() => {
    // Remove the leading '#' if present
    return window.location.hash.slice(1);
  });

  useEffect(() => {
    const handleHashChange = () => {
      setHashState(window.location.hash.slice(1));
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const setHash = useCallback((newHash: string) => {
    // Remove leading '#' if user includes it
    const cleanHash = newHash.startsWith("#") ? newHash.slice(1) : newHash;

    if (cleanHash) {
      window.location.hash = cleanHash;
    } else {
      // Clear the hash if empty string is passed
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
    setHashState(cleanHash);
  }, []);

  return { hash, setHash };
};
