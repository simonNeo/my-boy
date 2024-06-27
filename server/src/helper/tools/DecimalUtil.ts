import { Decimal as DecimalJs } from 'decimal.js';

type NumberType = number | string; // decimal 支持数字和字符串

export class DecimalUtil {
  static add(...args: NumberType[]): DecimalJs {
    let res: DecimalJs = null;
    args.forEach((item) => {
      if (res) {
        res = res.add(item);
      } else {
        res = new DecimalJs(item);
      }
    });
    return res;
  }
  static div(a: NumberType, b: NumberType): DecimalJs {
    return new DecimalJs(a).div(new DecimalJs(b));
  }
  static mul(a: NumberType, b: NumberType): DecimalJs {
    return new DecimalJs(a).mul(new DecimalJs(b));
  }
  static sub(...args: NumberType[]): DecimalJs {
    let res: DecimalJs = null;
    args.forEach((item) => {
      if (res) {
        res = res.sub(item);
      } else {
        res = new DecimalJs(item);
      }
    });
    return res;
  }
}
