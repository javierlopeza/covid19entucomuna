import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/es';

moment.tz.setDefault('America/Santiago');
moment.locale('es');

export default moment;
