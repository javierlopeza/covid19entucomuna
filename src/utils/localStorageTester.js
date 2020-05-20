import * as Sentry from '@sentry/browser';

const TEST = 'TEST';

function lsTest() {
  try {
    localStorage.setItem(TEST, TEST);
    localStorage.removeItem(TEST);
    return true;
  } catch (err) {
    Sentry.captureException(err);
    return false;
  }
}

export default lsTest;
