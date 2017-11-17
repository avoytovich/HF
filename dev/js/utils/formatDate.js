import moment from 'moment';

export const formatDate = (date, format = 'DD-MM-YYYY') => moment(date).format(format);