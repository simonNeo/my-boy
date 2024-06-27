export const Amount = function (option?: { keepTailZero?: boolean; nullIs?: string }): PropertyDecorator {
  const keepTailZero = option?.keepTailZero || false;
  const nullIs = option?.nullIs || '0';
  return function (target: any, key: string) {
    const keyName = key + 'Yuan';
    Object.defineProperty(target, keyName, {
      get() {
        const origin = this[key];
        let value = '';
        if (!origin) {
          value = nullIs;
        } else {
          value = (origin / 100).toFixed(2);
          if (!keepTailZero) {
            value = value.replace(/\.?0*$/, '');
          }
        }
        return value;
      },
    });
  };
};
