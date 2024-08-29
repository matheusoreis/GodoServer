export function LowerCase() {
  return function (target: any, key: string) {
    let value: string;

    const getter = () => value;
    const setter = (newValue: string) => {
      value = newValue.toLowerCase();
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}
