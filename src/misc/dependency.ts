import { PrismaClient } from '@prisma/client';
import { ClientMessage } from '../communication/protocol/client-message';
import { Handler } from '../net/handler';
import { Manager } from '../net/manager';
import { Setup } from '../net/setup';
import { Logger } from './logger';
import { Password } from './password';
import { serviceLocator } from './service-locator';
import { Memory } from '../core/memory';
import { ByteBuffer } from '../communication/protocol/byte-buffer';

import { PingIncoming } from '../core/ping/ping.incoming';
import { AccessAccountIncoming } from '../core/menu/access-account/access-account.incoming';
import { CreateAccountIncoming } from '../core/menu/create-account/create-account.incoming';
import { DeleteAccountIncoming } from '../core/menu/delete-account/delete-account.incoming';
import { RecoverAccountIncoming } from '../core/menu/recover-account/recover-account.incoming';
import { ChangePasswordIncoming } from '../core/menu/change-password/change-password.incoming';
import { CharacterListIncoming } from '../core/menu/character-list/character-list.incoming';
import { CreateCharacterIncoming } from '../core/menu/create-character/create-character.incoming';
import { DeleteCharacterIncoming } from '../core/menu/delete-character/delete-character.incoming';
import { SelectCharacterIncoming } from '../core/menu/select-character/select-character.incoming';
import { MoveCharacterIncoming } from '../core/game/move-character/move-character.incoming';

export class Dependency {
  public setup() {
    serviceLocator.registerFactory<Logger>(Logger, function () {
      return new Logger();
    });

    serviceLocator.registerSingleton<Memory>(Memory, new Memory());

    serviceLocator.registerFactory<ByteBuffer>(ByteBuffer, () => {
      return new ByteBuffer();
    });

    serviceLocator.registerFactory<Setup>(Setup, function () {
      return new Setup();
    });

    serviceLocator.registerFactory<Manager>(Manager, function () {
      return new Manager();
    });

    serviceLocator.registerFactory<Handler>(Handler, function () {
      return new Handler();
    });

    serviceLocator.registerFactory<PrismaClient>(PrismaClient, () => {
      return new PrismaClient();
    });

    serviceLocator.registerFactory<ClientMessage>(ClientMessage, () => {
      return new ClientMessage();
    });

    serviceLocator.registerFactory<Password>(Password, () => {
      return new Password();
    });

    serviceLocator.registerFactory<PingIncoming>(PingIncoming, () => {
      return new PingIncoming();
    });

    serviceLocator.registerFactory<AccessAccountIncoming>(AccessAccountIncoming, () => {
      return new AccessAccountIncoming();
    });

    serviceLocator.registerFactory<CreateAccountIncoming>(CreateAccountIncoming, () => {
      return new CreateAccountIncoming();
    });

    serviceLocator.registerFactory<DeleteAccountIncoming>(DeleteAccountIncoming, () => {
      return new DeleteAccountIncoming();
    });

    serviceLocator.registerFactory<RecoverAccountIncoming>(RecoverAccountIncoming, () => {
      return new RecoverAccountIncoming();
    });

    serviceLocator.registerFactory<ChangePasswordIncoming>(ChangePasswordIncoming, () => {
      return new ChangePasswordIncoming();
    });

    serviceLocator.registerFactory<CharacterListIncoming>(CharacterListIncoming, () => {
      return new CharacterListIncoming();
    });

    serviceLocator.registerFactory<CreateCharacterIncoming>(CreateCharacterIncoming, () => {
      return new CreateCharacterIncoming();
    });

    serviceLocator.registerFactory<DeleteCharacterIncoming>(DeleteCharacterIncoming, () => {
      return new DeleteCharacterIncoming();
    });

    serviceLocator.registerFactory<SelectCharacterIncoming>(SelectCharacterIncoming, () => {
      return new SelectCharacterIncoming();
    });

    serviceLocator.registerFactory<MoveCharacterIncoming>(MoveCharacterIncoming, () => {
      return new MoveCharacterIncoming();
    });
  }
}
