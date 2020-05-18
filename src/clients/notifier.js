import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { store as notifStore } from 'react-notifications-component';
import _ from 'lodash';
import ReactGA from 'react-ga';
import env from '../environment';
import { withTimestamp } from '../utils/requests';
import { CATEGORIES, ACTIONS } from '../ga/events';

async function notify() {
  const response = await axios.get(withTimestamp(env.currentNotificationJsonUrl));
  const { data } = response;
  const { timestamp, title, message } = camelcaseKeys(data);
  const lastTimestamp = JSON.parse(localStorage.getItem('LAST_NOTIFICATION_TIMESTAMP'));
  if (_.isNull(lastTimestamp) || lastTimestamp < timestamp) {
    localStorage.setItem('LAST_NOTIFICATION_TIMESTAMP', timestamp);
    notifStore.addNotification({
      title,
      message,
      type: 'info',
      container: 'bottom-center',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: 8000,
        onScreen: true,
        showIcon: true,
      },
    });
    ReactGA.event({
      category: CATEGORIES.NOTIFICATION,
      action: ACTIONS.SHOW,
      label: timestamp,
      nonInteraction: true,
    });
  }
}

export default notify;
