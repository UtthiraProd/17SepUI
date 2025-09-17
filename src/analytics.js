// analytics.js
import ReactGA from 'react-ga4';

// Initialize GA4 with your Measurement ID
export const initGA = () => {
  ReactGA.initialize('G-GNZ4XXHEMQ'); // Replace with your GA4 Measurement ID
};

// Log pageviews
export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};
