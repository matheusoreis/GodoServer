import { ClientHeaders } from '../communication/protocol/client-headers';
import type { ClientMessage } from '../communication/protocol/client-message';
import type { Connection } from '../core/connection';
import { AccessAccountIncoming } from '../core/menu/access-account/access-account.incoming';
import { ChangePasswordIncoming } from '../core/menu/change-password/change-password.incoming';
import { CharacterListIncoming } from '../core/menu/character-list/character-list.incoming';
import { CreateAccountIncoming } from '../core/menu/create-account/create-account.incoming';
import { CreateCharacterIncoming } from '../core/menu/create-character/create-character.incoming';
import { DeleteAccountIncoming } from '../core/menu/delete-account/delete-account.incoming';
import { DeleteCharacterIncoming } from '../core/menu/delete-character/delete-character.incoming';
import { MoveCharacterIncoming } from '../core/game/move-character/move-character.incoming';
import { RecoverAccountIncoming } from '../core/menu/recover-account/recover-account.incoming';
import { SelectCharacterIncoming } from '../core/menu/select-character/select-character.incoming';
import { PingIncoming } from '../core/ping/ping.incoming';
import { serviceLocator } from '../misc/service-locator';
import type { Incoming } from '../communication/incoming';
import { Logger } from '../misc/logger';

export class Handler {
  constructor() {
    this.logger = serviceLocator.get<Logger>(Logger);
    this.requestHandlers = {};
    this.registerRequests();
  }

  private readonly logger: Logger;
  private readonly requestHandlers: Partial<Record<ClientHeaders, Incoming>>;

  public handleMessage(connection: Connection, message: ClientMessage): void {
    if (!connection.isConnected()) {
      return;
    }

    const messageId = message.getId() as ClientHeaders;

    if (this.requestHandlers[messageId]) {
      const handler = this.requestHandlers[messageId];

      handler?.handle(connection, message);
    } else {
      this.logger.error(`No handler for id: ${messageId}`);
      connection.close();
    }
  }

  private registerRequests() {
    const ping = serviceLocator.get<PingIncoming>(PingIncoming);
    this.requestHandlers[ClientHeaders.Ping] = ping;

    const accessAccount = serviceLocator.get<AccessAccountIncoming>(AccessAccountIncoming);
    this.requestHandlers[ClientHeaders.AccessAccount] = accessAccount;

    const createAccount = serviceLocator.get<CreateAccountIncoming>(CreateAccountIncoming);
    this.requestHandlers[ClientHeaders.CreateAccount] = createAccount;

    const deleteAccount = serviceLocator.get<DeleteAccountIncoming>(DeleteAccountIncoming);
    this.requestHandlers[ClientHeaders.DeleteAccount] = deleteAccount;

    const recoverAccount = serviceLocator.get<RecoverAccountIncoming>(RecoverAccountIncoming);
    this.requestHandlers[ClientHeaders.RecoverAccount] = recoverAccount;

    const changePassword = serviceLocator.get<ChangePasswordIncoming>(ChangePasswordIncoming);
    this.requestHandlers[ClientHeaders.ChangePassword] = changePassword;

    const characterList = serviceLocator.get<CharacterListIncoming>(CharacterListIncoming);
    this.requestHandlers[ClientHeaders.CharacterList] = characterList;

    const createCharacter = serviceLocator.get<CreateCharacterIncoming>(CreateCharacterIncoming);
    this.requestHandlers[ClientHeaders.CreateCharacter] = createCharacter;

    const deleteCharacter = serviceLocator.get<DeleteCharacterIncoming>(DeleteCharacterIncoming);
    this.requestHandlers[ClientHeaders.DeleteCharacter] = deleteCharacter;

    const selectCharacter = serviceLocator.get<SelectCharacterIncoming>(SelectCharacterIncoming);
    this.requestHandlers[ClientHeaders.SelectCharacter] = selectCharacter;

    const moveCharacter = serviceLocator.get<MoveCharacterIncoming>(MoveCharacterIncoming);
    this.requestHandlers[ClientHeaders.MoveCharacter] = moveCharacter;
  }
}
