export function IsInteger(size: 8 | 16 | 32) {
  return function (target: any, propertyKey: string) {
    const privateKey = Symbol(propertyKey);

    Object.defineProperty(target, propertyKey, {
      get() {
        return this[privateKey];
      },
      set(value: number) {
        if (!Number.isInteger(value)) {
          throw new Error(`Must be an integer`);
        }

        const maxValues = { 8: 0xff, 16: 0xffff, 32: 0xffffffff };
        if (value < -maxValues[size] || value > maxValues[size]) {
          throw new Error(`Must be within the range of a ${size}-bit integer`);
        }

        this[privateKey] = value;
      },
      enumerable: true,
      configurable: true,
    });
  };
}
