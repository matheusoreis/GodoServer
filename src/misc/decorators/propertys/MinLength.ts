export function MinLength(length: number) {
  return function (target: any, propertyKey: string) {
    const privateKey = Symbol(propertyKey);

    Object.defineProperty(target, propertyKey, {
      get() {
        return this[privateKey];
      },
      set(value: string) {
        if (typeof value !== "string") {
          throw new Error(`${propertyKey} must be a string`);
        }

        if (value.length < length) {
          throw new Error(`${propertyKey} must be at least ${length} characters long`);
        }

        this[privateKey] = value;
      },
      enumerable: true,
      configurable: true,
    });
  };
}
