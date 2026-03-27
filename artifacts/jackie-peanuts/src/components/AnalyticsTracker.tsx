import { useEffect } from "react";
import { useLocation } from "wouter";
import { useRecordVisit } from "@workspace/api-client-react";

export function AnalyticsTracker() {
  const [location] = useLocation();
  const recordVisit = useRecordVisit();

  useEffect(() => {
    // Record visit on route change without blocking UI
    recordVisit.mutate({
      data: {
        page: location,
        userAgent: window.navigator.userAgent,
        referrer: document.referrer || undefined,
      }
    });
  }, [location]);

  return null;
}
