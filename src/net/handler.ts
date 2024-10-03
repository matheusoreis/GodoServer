import type { Incoming } from "../communication/incoming/incoming";
import { ChatMessage } from "../communication/incoming/requests/game/chat-message";
import { MoveCharacter } from "../communication/incoming/requests/game/move-character";
import { AccessAccount } from "../communication/incoming/requests/menu/access-account";
import type { ChangePassword } from "../communication/incoming/requests/menu/change-password";
import { CreateAccount } from "../communication/incoming/requests/menu/create-account";
import { CreateCharacter } from "../communication/incoming/requests/menu/create-character";
import { DeleteAccount } from "../communication/incoming/requests/menu/delete-account";
import { DeleteCharacter } from "../communication/incoming/requests/menu/delete-character";
import { RecoverAccount } from "../communication/incoming/requests/menu/recover-account";
import { RequestCharacters } from "../communication/incoming/requests/menu/request-characters";
import { SelectCharacter } from "../communication/incoming/requests/menu/select-character";
import { Ping } from "../communication/incoming/requests/shared/ping";
import { ClientHeaders } from "../communication/protocol/client-headers";
import type { ClientMessage } from "../communication/protocol/client-message";
import type { Connection } from "../core/shared/connection";
import { serviceLocator } from "../misc/service-locator";

/**
 * A classe `Handler` é responsável por gerenciar e despachar mensagens recebidas
 * para seus respectivos handlers com base nos cabeçalhos das mensagens de cliente.
 */
export class Handler {
  /**
   * Cria uma instância da classe `Handler`.
   * Inicializa o registro de handlers e registra os requests.
   */
  constructor() {
    this.requestHandlers = {};
    this.registerRequests();
  }

  /**
   * Mapeia cabeçalhos de mensagens de cliente para handlers específicos.
   * Cada cabeçalho (`ClientHeaders`) pode ter um handler associado que implementa a interface `Incoming`.
   */
  private requestHandlers: Partial<Record<ClientHeaders, Incoming>>;

  /**
   * Despacha a mensagem recebida para o handler apropriado com base no ID da mensagem.
   * Se não houver handler registrado para o ID da mensagem, a conexão é fechada.
   *
   * @param {Connection} connection - A conexão WebSocket associada ao cliente.
   * @param {ClientMessage} message - A mensagem recebida do cliente.
   */
  public handleMessage(connection: Connection, message: ClientMessage): void {
    if (!connection.isConnected()) {
      return;
    }

    const messageId = message.getId() as ClientHeaders;

    if (this.requestHandlers[messageId]) {
      const handler = this.requestHandlers[messageId];

      try {
        handler?.handle(connection, message);
      } catch (error) {
        console.error(`Error handling ${handler?.constructor.name}:`, error);
        connection.close();
      }
    } else {
      console.debug(`No handler for id: ${messageId}`);
      connection.close();
    }
  }

  /**
   * Registra os handlers de requests associando os cabeçalhos de cliente a suas implementações específicas.
   * Este método é responsável por preencher o mapeamento `requestHandlers`.
   */
  private registerRequests() {
    const ping = serviceLocator.get<Ping>(Ping);
    const accessAccount = serviceLocator.get<AccessAccount>(AccessAccount);
    const createAccount = serviceLocator.get<CreateAccount>(CreateAccount);
    const deleteAccount = serviceLocator.get<DeleteAccount>(DeleteAccount);
    const recoverAccount = serviceLocator.get<RecoverAccount>(RecoverAccount);
    const changePassword = serviceLocator.get<ChangePassword>(DeleteAccount);
    const requestCharacters = serviceLocator.get<RequestCharacters>(RequestCharacters);
    const createCharacter = serviceLocator.get<CreateCharacter>(CreateCharacter);
    const deleteCharacter = serviceLocator.get<DeleteCharacter>(DeleteCharacter);
    const selectCharacter = serviceLocator.get<SelectCharacter>(SelectCharacter);
    const moveCharacter = serviceLocator.get<MoveCharacter>(MoveCharacter);
    const chatMessage = serviceLocator.get<ChatMessage>(ChatMessage);

    this.requestHandlers[ClientHeaders.Ping] = ping;
    this.requestHandlers[ClientHeaders.AccessAccount] = accessAccount;
    this.requestHandlers[ClientHeaders.CreateAccount] = createAccount;
    this.requestHandlers[ClientHeaders.DeleteAccount] = deleteAccount;
    this.requestHandlers[ClientHeaders.RecoverAccount] = recoverAccount;
    this.requestHandlers[ClientHeaders.ChangePassword] = changePassword;
    this.requestHandlers[ClientHeaders.RequestCharacters] = requestCharacters;
    this.requestHandlers[ClientHeaders.CreateCharacter] = createCharacter;
    this.requestHandlers[ClientHeaders.DeleteCharacter] = deleteCharacter;
    this.requestHandlers[ClientHeaders.SelectCharacter] = selectCharacter;
    this.requestHandlers[ClientHeaders.MoveCharacter] = moveCharacter;
    this.requestHandlers[ClientHeaders.ChatMessage] = chatMessage;
  }
}
