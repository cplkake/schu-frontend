/*
  resets the scroll position and the overlaying of the cart when a "new page" is navigated to
*/

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ cartOverlay, setCartOverlay }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setCartOverlay(false);
  }, [pathname])

  return null;
};