export function Singleton() {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      private static _instance: T;

      constructor(...args: any[]) {
        if ((constructor as any)._instance) {
          return (constructor as any)._instance;
        }

        super(...args);
        (constructor as any)._instance = this;
      }
    };
  };
}
