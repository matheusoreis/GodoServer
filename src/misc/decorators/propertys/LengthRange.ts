export function LengthRange(min: number, max: number) {
  return function (target: any, propertyKey: string) {
    const privateKey = Symbol(propertyKey);

    Object.defineProperty(target, propertyKey, {
      get() {
        return this[privateKey];
      },
      set(value: string) {
        if (value.length < min || value.length > max) {
          throw new Error(`${propertyKey} must be between ${min} and ${max} characters long`);
        }
        this[privateKey] = value;
      },
      enumerable: true,
      configurable: true,
    });
  };
}
