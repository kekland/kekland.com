import { useState, useEffect } from 'react';

// Hook
export const useWindowScroll = () => {
  const [windowScroll, setWindowScroll] = useState(undefined);

  useEffect(() => {
    const handleScroll = () => {
      setWindowScroll(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return windowScroll;
}

// Hook
export const useWindowScrollOnce = () => {
  const [windowScroll, setWindowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setWindowScroll(true);
      window.removeEventListener("scroll", handleScroll);
    }

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return windowScroll;
}
