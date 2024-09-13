import { Handler } from "../net/handler";
import { Manager } from "../net/manager";
import { Setup } from "../net/setup";
import { serviceLocator } from "./service-locator";

export class Dependency {
  public setup() {
    serviceLocator.registerFactory<Setup>(Setup, () => new Setup());
    serviceLocator.registerFactory<Manager>(Manager, () => new Manager());
    serviceLocator.registerFactory<Handler>(Handler, () => new Handler());
  }
}
