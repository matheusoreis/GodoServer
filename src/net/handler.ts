import type { Incoming } from "../communication/incoming/incoming";
import { PingRequest } from "../communication/incoming/requests/ping";
import { ClientHeaders } from "../communication/protocol/client-headers";
import type { ClientMessage } from "../communication/protocol/client-message";
import type { Connection } from "../core/connection";
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
    this.requestHandlers[ClientHeaders.Ping] = serviceLocator.get<PingRequest>(PingRequest);
  }
}
