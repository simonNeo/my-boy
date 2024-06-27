import { IPage, IReturnData } from 'fbs-model/common';
import { Moment } from 'moment';
import { moment } from '../moment';
import { DecimalUtil } from './DecimalUtil';

export default class CommonUtil {
  static paged({ pageIndex, pageSize, pageTotal }: IPage) {
    return {
      pageIndex,
      pageSize,
      pageTotal,
    };
  }
  static returnData<T = any>(val: T, page?: IPage): IReturnData<T> {
    return {
      code: 1,
      data: {
        content: val,
        page: page && this.paged(page),
      },
      msg: '',
    };
  }
  static returnError(msg: string, code = 6001): IReturnData<null> {
    return {
      code,
      data: {
        content: null,
      },
      msg,
    };
  }
  static getRandomCode(len = 4): string {
    const codes = '0123456789';
    let code = '';
    for (let i = 0; i < len; i++) {
      code += codes[Math.floor(Math.random() * codes.length)];
    }
    return code;
  }

  static parentToChildren<T extends { parent?: T; id: number; children?: T[] }>(
    arr: T[],
    options?: {
      uniqueChild?: boolean;
      removeField?: string[];
    },
  ) {
    if (!arr?.length) {
      return [];
    }
    const uniqueChild = options?.uniqueChild || false;
    const removeField = options?.removeField || [];
    const parentIdSet = new Set<number>();
    const parentMap = new Map<number, T>();
    arr.forEach((item) => {
      const father = { ...item.parent };
      if (father) {
        const validFather = removeField.reduce(
          (pre, cur) => {
            delete pre[cur];
            return pre;
          },
          { ...father },
        );
        // delete item.parent;
        let children = [];
        const valueToAdd = removeField.reduce(
          (pre, cur) => {
            delete pre[cur];
            return pre;
          },
          { ...item },
        );
        if (!parentIdSet.has(validFather.id)) {
          parentIdSet.add(validFather.id);
          children = [valueToAdd];
        } else {
          children = parentMap.get(validFather.id).children;
          if (!uniqueChild || !children.find((child) => child.id === item.id)) {
            children.push(valueToAdd);
          }
        }
        parentMap.set(validFather.id, {
          ...validFather,
          children,
        });
      }
    });
    return [...parentMap.values()];
  }

  static fenToYuan(fen: number): number {
    if (!fen) {
      return 0;
    }
    return DecimalUtil.div(fen, 100).toNumber();
  }

  static yuanToFen(yuan: number): number {
    if (!yuan) {
      return 0;
    }
    return DecimalUtil.mul(yuan, 100).toNumber();
  }

  /**
   * 通过日期生成日期范围
   * @example getRangeFromDate() // [2021-08-01 00:00:00, 2021-08-01 23:59:59]
   * @example getRangeFromDate(2021-08-30) // [2021-08-30 00:00:00, 2021-08-30 23:59:59]
   * @param mmt {Moment | string | Date} 日期, 默认当前日期
   * @returns {[Date, Date]}
   */
  static getRangeFromDate(mmt?: Date | string | Moment): [Date, Date] {
    return [moment(mmt).startOf('day').toDate(), moment().endOf('day').toDate()];
  }

  static parseJSON<T = any>(str: string | object, retryCount = 2): T {
    if (typeof str !== 'string') {
      return str as T;
    }
    try {
      const res = JSON.parse(str);
      if (typeof res !== 'string') {
        return res;
      }
      return this.parseJSON(res, retryCount - 1);
    } catch (e) {
      throw e;
    }
  }

  // 对集合求和
  static sumByField<T = Record<string, any>>(arr: T[], field: keyof T): number {
    return arr.reduce((pre, cur) => pre + (Number(cur[field]) || 0), 0);
  }

  static toJson(arr: any[]) {
    return arr.map((item) => item.toJSON());
  }
}
