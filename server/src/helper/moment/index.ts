import * as momentjs from 'moment';
import { Moment } from 'moment';

export function formatDate(date: Date | string, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) {
    return null;
  }
  const mmt = momentjs(date).utc();
  return mmt.format(format);
}

export function dateFromString(date: string, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) {
    return null;
  }
  return momentjs(date, format).utc().toDate();
}

export function momentUtc(d?: Date | string | Moment) {
  return momentjs(d).utc();
}

// 没找到全局设置时区的办法，所以这样覆盖原来的moment
// note： 项目中，不要直接使用momentjs，而是使用这里的moment或者momentUtc
export const moment = momentUtc;
