export type AnalyticsEventName =
  | "quiz_started"
  | "quiz_step_answered"
  | "quiz_completed"
  | "quiz_zero_match"
  | "shop_search"
  | "shop_filter"
  | "add_to_cart"
  | "promo_applied"
  | "checkout_started"
  | "shopify_checkout_started"
  | "purchase_simulated"
  | "vendor_application_started"
  | "vendor_application_submitted"
  | "chatbot_opened";

export type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

type GtagWindow = Window & {
  gtag?: (command: "event", eventName: AnalyticsEventName, params?: AnalyticsParams) => void;
};

export function trackEvent(eventName: AnalyticsEventName, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") {
    return false;
  }

  const gtag = (window as GtagWindow).gtag;

  if (typeof gtag !== "function") {
    return false;
  }

  gtag("event", eventName, params);
  return true;
}
