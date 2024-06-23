import { useState, useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  itemsPerBatch?: number;
  loadingDelay?: number;
}

const useInfiniteScroll = <T>(
  data: T[],
  options: UseInfiniteScrollOptions = {}
) => {
  const { itemsPerBatch = 20, loadingDelay = 500 } = options;
  const [displayedItems, setDisplayedItems] = useState(
    data.slice(0, itemsPerBatch)
  );
  const [hasMore, setHasMore] = useState(true);
  const loadedItemsRef = useRef(new Set(displayedItems));
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const loadMore = () => {
    if (loadedItemsRef.current.size >= data.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      const nextBatch = (data as any)
        .slice(loadedItemsRef.current.size)
        .filter((item: any) => !loadedItemsRef.current.has(item.id))
        .slice(0, itemsPerBatch);

      setDisplayedItems((prevItems) => [...prevItems, ...nextBatch]);
      nextBatch.forEach((item: any) => loadedItemsRef.current.add(item.id));

      if (loadedItemsRef.current.size >= data.length) {
        setHasMore(false);
      }
    }, loadingDelay);
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore]);

  return { displayedItems, hasMore, loadingRef };
};

export default useInfiniteScroll;
