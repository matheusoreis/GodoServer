export function IsEmail() {
  return function (target: any, propertyKey: string) {
    const privateKey = Symbol(propertyKey);

    Object.defineProperty(target, propertyKey, {
      get() {
        return this[privateKey];
      },
      set(value: string) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          throw new Error("Invalid email address");
        }
        this[privateKey] = value;
      },
      enumerable: true,
      configurable: true,
    });
  };
}
