import moment from 'moment';

export default params =>
  Object.entries(params)
    .filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== null && value !== undefined && value !== '';
    })
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}=${value
          .filter(i => i !== undefined && i !== null)
          .map(i => encodeURIComponent(i))
          .join(',')}`;
      }
      if (moment.isMoment(value)) {
        return `${key}=${encodeURIComponent(value.format('YYYY-MM-DD'))}`;
      }
      return `${key}=${encodeURIComponent(value)}`;
    })
    .join('&');
