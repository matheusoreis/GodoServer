type Constructor<T> = new (...args: []) => T;
type Factory<T> = () => T;

class ServiceLocator {
  private static instance: ServiceLocator;
  private services: Map<Constructor<unknown>, unknown> = new Map();
  private factories: Map<Constructor<unknown>, Factory<unknown>> = new Map();

  private constructor() {}

  public static getInstance(): ServiceLocator {
    if (!ServiceLocator.instance) {
      ServiceLocator.instance = new ServiceLocator();
    }
    return ServiceLocator.instance;
  }

  public registerSingleton<T>(key: Constructor<T>, instance: T): void {
    if (!this.services.has(key)) {
      this.services.set(key, instance);
    } else {
      throw new Error(`Serviço já registrado.`);
    }
  }

  public registerFactory<T>(key: Constructor<T>, factory: () => T): void {
    if (!this.factories.has(key)) {
      this.factories.set(key, factory);
    } else {
      throw new Error(`Fábrica já registrada.`);
    }
  }

  public get<T>(key: Constructor<T>): T {
    if (this.services.has(key)) {
      return this.services.get(key) as T;
    } else if (this.factories.has(key)) {
      return this.factories.get(key)!() as T;
    } else {
      throw new Error(`Serviço não encontrado.`);
    }
  }
}

export const serviceLocator = ServiceLocator.getInstance();
