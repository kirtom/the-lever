// Privacy-scoped, opt-in-by-config analytics via Umami (https://umami.is).
//
// What's tracked: screen views, navigation taps, and which instrument got
// matched/held/failed — enough to see the funnel and which levers actually
// work. What's never tracked: profile answers, SOS answers, free text,
// coordinates, or anything that could reconstruct a person's crisis detail.
// See README "Analytics" section for the full contract.
//
// Fully inert unless VITE_UMAMI_WEBSITE_ID is set at build time, and
// respects the browser's Do Not Track signal.

const WEBSITE_ID = import.meta.env.VITE_UMAMI_WEBSITE_ID;
const SCRIPT_SRC = import.meta.env.VITE_UMAMI_SRC || 'https://cloud.umami.is/script.js';

export function initAnalytics() {
  if (!WEBSITE_ID) return;
  if (typeof navigator !== 'undefined' && (navigator.doNotTrack === '1' || navigator.doNotTrack === 'yes')) return;
  if (typeof document === 'undefined') return;
  const script = document.createElement('script');
  script.defer = true;
  script.src = SCRIPT_SRC;
  script.setAttribute('data-website-id', WEBSITE_ID);
  script.setAttribute('data-do-not-track', 'true');
  document.head.appendChild(script);
}

export function track(event, props) {
  try {
    if (typeof window !== 'undefined' && window.umami && typeof window.umami.track === 'function') {
      window.umami.track(event, props);
    }
  } catch {
    // analytics must never break the app
  }
}
