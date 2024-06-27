import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { formatDate } from '../moment';

export const DateFormat = function (option?: { format?: string; nullIs?: string }): PropertyDecorator {
  // const keepTailZero = option?.keepTailZero || false;
  // const nullIs = option?.nullIs || '0';
  const format = option?.format || 'YYYY-MM-DD HH:mm:ss';
  const nullIs = option?.nullIs || '';
  return applyDecorators(Transform(({ value }) => (!value ? nullIs : formatDate(value, format))));
};
