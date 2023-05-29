import { RefObject, useEffect, useState } from 'react';

export const useIntersectionObserver = (
  { threshold = 0, root = null, rootMargin = '' }: IntersectionObserverInit,
  ...refs: RefObject<Element>[]
) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setEntry(entries[0]);
      },
      { threshold, root, rootMargin }
    );

    refs.forEach((ref) => {
      const node = ref?.current;
      const hasIOSupport = !!window.IntersectionObserver;

      if (!hasIOSupport || !node) return;

      observer.observe(node);
    });

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, ...refs, root, threshold]);

  return entry;
};
