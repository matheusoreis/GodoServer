import { PingRequest } from "../communication/incoming/requests/PingRequest";
import { PingDispatcher } from "../communication/outgoing/dispatcher/ping-dispatcher";
import { ByteBuffer } from "../communication/protocol/byte-buffer";
import { ClientMessage } from "../communication/protocol/client-message";
import { Memory } from "../core/memory";
import { Handler } from "../net/handler";
import { Manager } from "../net/manager";
import { Setup } from "../net/setup";
import { Logger } from "./logger";
import { Password } from "./password";
import { serviceLocator } from "./service-locator";

export class Dependency {
  public setup() {
    serviceLocator.registerFactory<Setup>(Setup, () => new Setup());
    serviceLocator.registerFactory<Manager>(Manager, () => new Manager());
    serviceLocator.registerFactory<Handler>(Handler, () => new Handler());
    serviceLocator.registerFactory<Logger>(Logger, () => new Logger());
    serviceLocator.registerSingleton<Memory>(Memory, new Memory());
    serviceLocator.registerFactory<Password>(Password, () => new Password());
    serviceLocator.registerFactory<ByteBuffer>(ByteBuffer, () => new ByteBuffer());
    serviceLocator.registerFactory<ClientMessage>(ClientMessage, () => new ClientMessage());

    serviceLocator.registerFactory<PingRequest>(PingRequest, () => new PingRequest());
    serviceLocator.registerFactory<PingDispatcher>(PingDispatcher, () => new PingDispatcher());
  }
}
