import { useEffect, useRef } from 'react';

const useIntersectionObserver = (callback) => {
  const observerRef = useRef();

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });
  }, [callback]);

  const observe = (element) => {
    if (observerRef.current && element) {
      observerRef.current.observe(element);
    }
  };

  const unobserve = (element) => {
    if (observerRef.current && element) {
      observerRef.current.unobserve(element);
    }
  };

  return { observe, unobserve };
};

export default useIntersectionObserver;