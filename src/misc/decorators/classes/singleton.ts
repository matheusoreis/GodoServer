export function Singleton<T extends new (...args: any[]) => any>(
  config?: any,
): (ctr: T) => T {
  return (ctr: T) => {
    let instance: InstanceType<T> | null = null;

    class SingletonClass extends (ctr as { new (...args: any[]): any }) {
      constructor(...args: any[]) {
        if (instance) {
          return instance;
        }

        super(...args);
        instance = this as InstanceType<T>;
      }
    }

    return SingletonClass as T;
  };
}
