import { PrismaClient } from "@prisma/client";
import { AccessAccount } from "../communication/incoming/requests/access-account";
import { ChangePassword } from "../communication/incoming/requests/change-password";
import { RequestCharacters } from "../communication/incoming/requests/request-characters";
import { CreateAccount } from "../communication/incoming/requests/create-account";
import { CreateCharacter } from "../communication/incoming/requests/create-character";
import { DeleteAccount } from "../communication/incoming/requests/delete-account";
import { DeleteCharacter } from "../communication/incoming/requests/delete-character";
import { MoveCharacter } from "../communication/incoming/requests/move-character";
import { Ping } from "../communication/incoming/requests/ping";
import { RecoverAccount } from "../communication/incoming/requests/recover-account";
import { SelectCharacter } from "../communication/incoming/requests/select-character";
import { ByteBuffer } from "../communication/protocol/byte-buffer";
import { ClientMessage } from "../communication/protocol/client-message";
import { Memory } from "../core/memory";
import { Handler } from "../net/handler";
import { Manager } from "../net/manager";
import { Setup } from "../net/setup";
import { Logger } from "./logger";
import { Password } from "./password";
import { serviceLocator } from "./service-locator";
import { ChatMessage } from "../communication/incoming/requests/chat-message";

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

    serviceLocator.registerFactory<Ping>(Ping, () => new Ping());
    serviceLocator.registerFactory<AccessAccount>(AccessAccount, () => new AccessAccount());
    serviceLocator.registerFactory<CreateAccount>(CreateAccount, () => new CreateAccount());
    serviceLocator.registerFactory<DeleteAccount>(DeleteAccount, () => new DeleteAccount());
    serviceLocator.registerFactory<RecoverAccount>(RecoverAccount, () => new RecoverAccount());
    serviceLocator.registerFactory<ChangePassword>(ChangePassword, () => new ChangePassword());
    serviceLocator.registerFactory<RequestCharacters>(RequestCharacters, () => new RequestCharacters());
    serviceLocator.registerFactory<CreateCharacter>(CreateCharacter, () => new CreateCharacter());
    serviceLocator.registerFactory<DeleteCharacter>(DeleteCharacter, () => new DeleteCharacter());
    serviceLocator.registerFactory<SelectCharacter>(SelectCharacter, () => new SelectCharacter());
    serviceLocator.registerFactory<MoveCharacter>(MoveCharacter, () => new MoveCharacter());
    serviceLocator.registerFactory<ChatMessage>(ChatMessage, () => new ChatMessage());
  }
}
