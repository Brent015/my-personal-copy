import { useRouter } from "@tanstack/react-router";
import { RefObject, useCallback, useEffect, useRef } from "react";
import { useBottomBarNavigation } from "../bottom-bar/context";

interface ScrollVisibilityOptions {
  /** Minimum scroll distance to trigger visibility change (px) */
  threshold?: number;
  /** Show navigation when reaching bottom */
  showAtBottom?: boolean;
  /** Show navigation when reaching top */
  showAtTop?: boolean;
  /** Delay for debounced position checks (ms) */
  debounceDelay?: number;
  /** Distance from top to consider as "at top" (px) */
  topThreshold?: number;
}

export const useContainerScrollVisibility = (
  containerRef: RefObject<HTMLElement>,
  {
    threshold = 5,
    showAtTop = true,
    topThreshold = 20,
  }: ScrollVisibilityOptions = {}
) => {
  const { isNavHidden, setNavHidden, currentScrollY, setCurrentScrollY } =
    useBottomBarNavigation();
  const { subscribe } = useRouter();

  // Reset nav visibility on navigation
  useEffect(() => {
    subscribe("onBeforeNavigate", () => {
      setNavHidden(false);
    });
  }, [setNavHidden, subscribe]);

  const lastScrollYRef = useRef(currentScrollY);
  const isScrollingRef = useRef(false);

  const scrollStateRef = useRef({
    isAtBottom: false,
    isAtTop: false,
  });

  const updateScrollState = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    isScrollingRef.current = true;

    const currentScroll = container.scrollTop;
    const scrollDifference = currentScroll - lastScrollYRef.current;
    const isScrollingDown = scrollDifference > 0;

    setCurrentScrollY(currentScroll);
    lastScrollYRef.current = currentScroll;

    const isAtTop = currentScroll <= topThreshold;
    const isAtBottom =
      Math.abs(
        container.scrollHeight - container.scrollTop - container.clientHeight
      ) < 10;

    scrollStateRef.current.isAtTop = isAtTop;
    scrollStateRef.current.isAtBottom = isAtBottom;

    // Only show nav when scrolling up
    if (Math.abs(scrollDifference) > threshold) {
      if (!isScrollingDown) {
        setNavHidden(false);
      } else {
        setNavHidden(true);
      }
    }

    // Special case for top position only
    if (isAtTop && showAtTop) {
      setNavHidden(false);
    }
  }, [
    containerRef,
    threshold,
    topThreshold,
    setCurrentScrollY,
    setNavHidden,
    showAtTop,
  ]);

  // Set up scroll listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      container.removeEventListener("scroll", updateScrollState);
    };
  }, [containerRef, updateScrollState]);

  return {
    isNavHidden,
    currentScrollY,
    isScrolling: isScrollingRef.current,
    isAtTop: scrollStateRef.current.isAtTop,
    isAtBottom: scrollStateRef.current.isAtBottom,
  };
};
