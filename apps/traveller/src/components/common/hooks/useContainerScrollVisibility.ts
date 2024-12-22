import { useEffect, useCallback, RefObject, useRef } from "react";
import { useBottomBarNavigation } from "../bottom-bar/context";
import { useDebounce } from "react-use";
import { useRouter } from "@tanstack/react-router";

interface ScrollVisibilityOptions {
  /** Minimum scroll distance to trigger visibility change (px) */
  threshold?: number;
  /** Show navigation when reaching bottom */
  showAtBottom?: boolean;
  /** Show navigation when reaching top */
  showAtTop?: boolean;
  /** Delay for debounced position checks (ms) */
  debounceDelay?: number;
  /** Time to wait after scroll stops before showing nav (ms) */
  settleTime?: number;
  /** Distance from top to consider as "at top" (px) */
  topThreshold?: number;
}

export const useContainerScrollVisibility = (
  containerRef: RefObject<HTMLElement>,
  {
    threshold = 5,
    showAtBottom = true,
    showAtTop = true,
    debounceDelay = 150,
    settleTime = 2000,
    topThreshold = 20,
  }: ScrollVisibilityOptions = {}
) => {
  const { isNavHidden, setNavHidden, currentScrollY, setCurrentScrollY } =
    useBottomBarNavigation();
  const { subscribe } = useRouter();

  useEffect(() => {
    subscribe("onBeforeNavigate", () => {
      setNavHidden(false);
    });
  }, [setNavHidden, subscribe]);

  const lastScrollYRef = useRef(currentScrollY);
  const settleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
  const lastDirectionRef = useRef<"up" | "down">("up");

  const scrollStateRef = useRef({
    shouldHide: isNavHidden,
    isAtBottom: false,
    isAtTop: false,
  });

  const clearSettleTimer = useCallback(() => {
    if (settleTimerRef.current) {
      clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }
  }, []);

  const startSettleTimer = useCallback(() => {
    clearSettleTimer();

    settleTimerRef.current = setTimeout(() => {
      isScrollingRef.current = false;

      // Only show nav if we've stopped scrolling and are moving up or at boundaries
      if (
        scrollStateRef.current.isAtTop &&
        showAtTop &&
        lastDirectionRef.current === "up"
      ) {
        setNavHidden(false);
        return;
      }

      if (scrollStateRef.current.isAtBottom && showAtBottom) {
        setNavHidden(false);
        return;
      }

      if (
        lastDirectionRef.current === "up" &&
        !scrollStateRef.current.shouldHide
      ) {
        setNavHidden(false);
      }
    }, settleTime);
  }, [clearSettleTimer, settleTime, setNavHidden, showAtTop, showAtBottom]);

  const updateScrollState = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    isScrollingRef.current = true;
    clearSettleTimer();

    const currentScroll = container.scrollTop;
    const scrollDifference = currentScroll - lastScrollYRef.current;
    const isScrollingDown = scrollDifference > 0;

    lastDirectionRef.current = isScrollingDown ? "down" : "up";
    setCurrentScrollY(currentScroll);
    lastScrollYRef.current = currentScroll;

    const isAtTop = currentScroll <= topThreshold;
    const isAtBottom =
      Math.abs(
        container.scrollHeight - container.scrollTop - container.clientHeight
      ) < 10;

    scrollStateRef.current.isAtTop = isAtTop;
    scrollStateRef.current.isAtBottom = isAtBottom;

    // Handle scrolling down - always allow hiding
    if (
      isScrollingDown &&
      !isNavHidden &&
      Math.abs(scrollDifference) > threshold
    ) {
      scrollStateRef.current.shouldHide = true;
      setNavHidden(true);
      return;
    }

    // Handle scrolling up or at boundaries
    if (!isScrollingDown && Math.abs(scrollDifference) > threshold) {
      scrollStateRef.current.shouldHide = false;
      // Let the settle timer handle showing the nav
    }

    // Special case for top/bottom positions
    if (isAtTop && showAtTop && lastDirectionRef.current === "up") {
      scrollStateRef.current.shouldHide = false;
      setNavHidden(false);
    } else if (isAtBottom && showAtBottom) {
      scrollStateRef.current.shouldHide = false;
      setNavHidden(false);
    }

    startSettleTimer();
  }, [
    containerRef,
    threshold,
    topThreshold,
    isNavHidden,
    setCurrentScrollY,
    setNavHidden,
    clearSettleTimer,
    startSettleTimer,
    showAtTop,
    showAtBottom,
  ]);

  useDebounce(
    () => {
      if (showAtBottom && scrollStateRef.current.isAtBottom) {
        setNavHidden(false);
      }
    },
    debounceDelay,
    [scrollStateRef.current.isAtBottom]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      container.removeEventListener("scroll", updateScrollState);
      clearSettleTimer();
    };
  }, [containerRef, updateScrollState, clearSettleTimer]);

  return {
    isNavHidden,
    currentScrollY,
    isScrolling: isScrollingRef.current,
    isAtTop: scrollStateRef.current.isAtTop,
    isAtBottom: scrollStateRef.current.isAtBottom,
  };
};
