export function IsBoolean() {
  return function (target: any, propertyKey: string) {
    const privateKey = Symbol(propertyKey);

    Object.defineProperty(target, propertyKey, {
      get() {
        return this[privateKey];
      },
      set(value: boolean) {
        this[privateKey] = value;
      },
      enumerable: true,
      configurable: true,
    });
  };
}
