// Privacy-scoped, opt-in-by-config analytics via Umami (https://umami.is).
//
// What's tracked: screen views (as virtual pageviews), navigation taps, and
// which instrument got matched/held/failed — enough to see the funnel and
// which levers actually work. What's never tracked: profile answers, SOS
// answers, free text, coordinates, or anything that could reconstruct a
// person's crisis detail. See README "Analytics" for the full contract.
//
// Fully inert unless VITE_UMAMI_WEBSITE_ID is set at build time, and
// respects the browser's Do Not Track signal.
//
// The app is a single HTML document — it never changes location, so Umami's
// automatic tracker would record exactly one pageview per session and every
// screen after the first would be invisible. We therefore switch auto-track
// off and emit one virtual pageview per screen ourselves, which is what puts
// screens into the Pages / Journey reports rather than burying them in the
// events list.

const WEBSITE_ID = import.meta.env.VITE_UMAMI_WEBSITE_ID;
const SCRIPT_SRC = import.meta.env.VITE_UMAMI_SRC || 'https://cloud.umami.is/script.js';

let enabled = false;
let ready = false;
let lastPath = null;
const queue = [];
const QUEUE_LIMIT = 50;

export function initAnalytics() {
  if (!WEBSITE_ID) return;
  if (typeof navigator !== 'undefined' && (navigator.doNotTrack === '1' || navigator.doNotTrack === 'yes')) return;
  if (typeof document === 'undefined') return;
  enabled = true;
  const script = document.createElement('script');
  script.defer = true;
  script.src = SCRIPT_SRC;
  script.setAttribute('data-website-id', WEBSITE_ID);
  script.setAttribute('data-do-not-track', 'true');
  // We emit pageviews per screen; the tracker must not also emit its own.
  script.setAttribute('data-auto-track', 'false');
  script.addEventListener('load', () => {
    ready = true;
    flush();
  });
  script.addEventListener('error', () => {
    // Blocked or offline. Stop buffering so the queue can't grow unbounded.
    enabled = false;
    queue.length = 0;
  });
  document.head.appendChild(script);
}

function flush() {
  while (queue.length) send(queue.shift());
}

// The tracker script is deferred, so the first few screens are usually
// dispatched before window.umami exists. Buffer them instead of dropping
// them — otherwise the entry screen, the most valuable row in the funnel,
// never gets recorded.
function send(args) {
  if (!enabled) return;
  if (!ready || typeof window === 'undefined' || !window.umami || typeof window.umami.track !== 'function') {
    queue.push(args);
    if (queue.length > QUEUE_LIMIT) queue.shift();
    return;
  }
  try {
    window.umami.track(...args);
  } catch {
    // analytics must never break the app
  }
}

// Path vocabulary for the Pages report. Kept here so every URL the dashboard
// can show is visible in one place. Nested paths let the SOS flow, the
// instrument flow and onboarding each be read as a group.
export function screenPath(screen, { stepIndex = 0, qIndex = 0 } = {}) {
  switch (screen) {
    case 'welcome':
      return '/welcome';
    case 'profile':
      return `/onboarding/step-${stepIndex + 1}`;
    case 'home':
      return '/home';
    case 'question':
      return `/sos/question-${qIndex + 1}`;
    case 'matching':
      return '/sos/matching';
    case 'hopelessFlag':
      return '/sos/hopelessness';
    case 'instrument':
      return '/lever';
    case 'run':
      return '/lever/run';
    case 'after':
      return '/lever/after';
    case 'held':
      return '/lever/held';
    case 'harm':
      return '/harm-reduction';
    case 'history':
      return '/history';
    case 'profileView':
      return '/profile';
    default:
      return `/${screen}`;
  }
}

// A virtual pageview. Umami's callback form hands us the payload it would
// have sent (screen size, language, referrer, session) so we override only
// the location and leave attribution intact.
export function trackScreen(path, title) {
  if (path === lastPath) return;
  lastPath = path;
  send([(props) => ({ ...props, url: path, title: title || path })]);
}

export function track(event, props) {
  send(props === undefined ? [event] : [event, props]);
}
