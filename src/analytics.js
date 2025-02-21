import ReactGA from 'react-ga4';

const TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with your Google Analytics tracking ID

export const initGA = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize(TRACKING_ID, {
      gaOptions: {
        anonymizeIp: true,
        cookieFlags: 'SameSite=None;Secure'
      }
    });
  }
};

export const logPageView = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }
};

export const logEvent = (category, action, label) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.event({
      category,
      action,
      label
    });
  }
};
