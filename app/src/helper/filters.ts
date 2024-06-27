import moment from 'moment';

export function formatDate(value: any, format='YYYY-MM-DD'): string {
  return moment(value).format(format);
}