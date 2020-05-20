import axiosRetry from 'axios-retry';
import axios from 'axios';

axiosRetry(axios, {
  retries: 8,
  retryDelay: axiosRetry.exponentialDelay,
});

export default axios;
