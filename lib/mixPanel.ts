// lib/mixpanel.ts
import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

const isBrowser = typeof window !== "undefined";

const mixpanelInstance = {
  init: () => {
    if (isBrowser && MIXPANEL_TOKEN) {
      mixpanel.init(MIXPANEL_TOKEN, {
        debug: process.env.NODE_ENV === "development",
        track_pageview: true,
      });
    }
  },

  track: (event: string, props?: Record<string, any>) => {
    if (isBrowser && MIXPANEL_TOKEN) {
      mixpanel.track(event, props);
    }
  },

  identify: (id: string) => {
    if (isBrowser && MIXPANEL_TOKEN) {
      mixpanel.identify(id);
    }
  },

  people: {
    set: (props: Record<string, any>) => {
      if (isBrowser && MIXPANEL_TOKEN) {
        mixpanel.people.set(props);
      }
    },
  },
};

export default mixpanelInstance;
