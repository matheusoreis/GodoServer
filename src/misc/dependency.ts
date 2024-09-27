import { PrismaClient } from "@prisma/client";
import { AccessAccountRequest } from "../communication/incoming/requests/access-account";
import { ChangePasswordRequest } from "../communication/incoming/requests/change-password";
import { CharacterListRequest } from "../communication/incoming/requests/character-list";
import { CreateAccountRequest } from "../communication/incoming/requests/create-account";
import { CreateCharacterRequest } from "../communication/incoming/requests/create-character";
import { DeleteAccountRequest } from "../communication/incoming/requests/delete-account";
import { DeleteCharacterRequest } from "../communication/incoming/requests/delete-character";
import { MoveCharacterRequest } from "../communication/incoming/requests/move-character";
import { Pong } from "../communication/incoming/requests/ping";
import { RecoverAccountRequest } from "../communication/incoming/requests/recover-account";
import { SelectCharacterRequest } from "../communication/incoming/requests/select-character";
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
    serviceLocator.registerFactory<CharacterListRequest>(CharacterListRequest, () => new CharacterListRequest());
    serviceLocator.registerFactory<CreateCharacterRequest>(CreateCharacterRequest, () => new CreateCharacterRequest());
    serviceLocator.registerFactory<DeleteCharacterRequest>(DeleteCharacterRequest, () => new DeleteCharacterRequest());
    serviceLocator.registerFactory<SelectCharacterRequest>(SelectCharacterRequest, () => new SelectCharacterRequest());
    serviceLocator.registerFactory<MoveCharacterRequest>(MoveCharacterRequest, () => new MoveCharacterRequest());
  }
}
