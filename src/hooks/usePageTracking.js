import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-F457Q6MBQR", {
        page_path: location.pathname,
      });
    }
  }, [location]);
}
