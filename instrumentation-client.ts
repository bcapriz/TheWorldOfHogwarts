import * as amplitude from '@amplitude/analytics-browser';
import { EVENTS } from '@/lib/analytics/events';

const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

if (apiKey) {
  amplitude.init(apiKey, {
    autocapture: {
      pageViews: true,
      sessions: true,
      formInteractions: true,
      elementInteractions: false,
    },
  });
}

// Fires on every client-side navigation — used for Navigation Link Clicked.
// window.location.pathname is still the "from" page when this runs.
export function onRouterTransitionStart(
  url: string,
  _navigationType: 'push' | 'replace' | 'traverse',
): void {
  amplitude.track(EVENTS.NAVIGATION_LINK_CLICKED, {
    from_page: window.location.pathname,
    to_page: url,
  });
}
