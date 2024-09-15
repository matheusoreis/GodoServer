import { PrismaClient } from "@prisma/client";
import { AccessAccountRequest } from "../communication/incoming/requests/access-account";
import { ChangePasswordRequest } from "../communication/incoming/requests/change-password";
import { CharListRequest } from "../communication/incoming/requests/char-list";
import { CreateAccountRequest } from "../communication/incoming/requests/create-account";
import { CreateCharRequest } from "../communication/incoming/requests/create-char";
import { DeleteAccountRequest } from "../communication/incoming/requests/delete-account";
import { DeleteCharRequest } from "../communication/incoming/requests/delete-char";
import { MoveCharRequest } from "../communication/incoming/requests/move-char";
import { Pong } from "../communication/incoming/requests/ping";
import { RecoverAccountRequest } from "../communication/incoming/requests/recover-account";
import { SelectCharRequest } from "../communication/incoming/requests/select-char";
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
    serviceLocator.registerFactory<PrismaClient>(PrismaClient, () => new PrismaClient());

    serviceLocator.registerFactory<Pong>(Pong, () => new Pong());
    serviceLocator.registerFactory<AccessAccountRequest>(AccessAccountRequest, () => new AccessAccountRequest());
    serviceLocator.registerFactory<CreateAccountRequest>(CreateAccountRequest, () => new CreateAccountRequest());
    serviceLocator.registerFactory<DeleteAccountRequest>(DeleteAccountRequest, () => new DeleteAccountRequest());
    serviceLocator.registerFactory<RecoverAccountRequest>(RecoverAccountRequest, () => new RecoverAccountRequest());
    serviceLocator.registerFactory<ChangePasswordRequest>(ChangePasswordRequest, () => new ChangePasswordRequest());
    serviceLocator.registerFactory<CharListRequest>(CharListRequest, () => new CharListRequest());
    serviceLocator.registerFactory<CreateCharRequest>(CreateCharRequest, () => new CreateCharRequest());
    serviceLocator.registerFactory<DeleteCharRequest>(DeleteCharRequest, () => new DeleteCharRequest());
    serviceLocator.registerFactory<SelectCharRequest>(SelectCharRequest, () => new SelectCharRequest());
    serviceLocator.registerFactory<MoveCharRequest>(MoveCharRequest, () => new MoveCharRequest());
  }
}
