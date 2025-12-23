import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Ensures route changes start at the top of the page.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Use a couple of frames to win against in-flight layout/animations.
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
