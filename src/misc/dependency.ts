import { PrismaClient } from "@prisma/client";
import { AccessAccount } from "../communication/incoming/requests/menu/access-account";
import { ClientMessage } from "../communication/protocol/client-message";
import { Handler } from "../net/handler";
import { Manager } from "../net/manager";
import { Setup } from "../net/setup";
import { Logger } from "./logger";
import { Password } from "./password";
import { serviceLocator } from "./service-locator";
import { Memory } from "../core/shared/memory";
import { ByteBuffer } from "../communication/protocol/byte-buffer";
import { Ping } from "../communication/incoming/requests/shared/ping";
import { CreateAccount } from "../communication/incoming/requests/menu/create-account";
import { DeleteAccount } from "../communication/incoming/requests/menu/delete-account";
import { RecoverAccount } from "../communication/incoming/requests/menu/recover-account";
import { ChangePassword } from "../communication/incoming/requests/menu/change-password";
import { RequestCharacters } from "../communication/incoming/requests/menu/request-characters";
import { CreateCharacter } from "../communication/incoming/requests/menu/create-character";
import { DeleteCharacter } from "../communication/incoming/requests/menu/delete-character";
import { SelectCharacter } from "../communication/incoming/requests/menu/select-character";
import { MoveCharacter } from "../communication/incoming/requests/game/move-character";
import { ChatMessage } from "../communication/incoming/requests/game/chat-message";

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
