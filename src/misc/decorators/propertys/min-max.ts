export function MinMax(min: number, max: number) {
  return function (target: any, propertyKey: string) {
    const privateKey = Symbol(propertyKey);

    Object.defineProperty(target, propertyKey, {
      get() {
        return this[privateKey];
      },
      set(value: number) {
        if (value < min || value > max) {
          throw new Error(`Value must be between ${min} and ${max}`);
        }

        this[privateKey] = value;
      },
      enumerable: true,
      configurable: true,
    });
  };
}
