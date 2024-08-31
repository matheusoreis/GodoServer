import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

/**
 * A classe `PingDispatcher` representa uma mensagem do servidor para o cliente.
 *
 * Extende a classe `ServerMessage` e define um cabeçalho específico para mensagens do tipo "Pong".
 *
 * @extends ServerMessage
 */
export class PingDispatcher extends ServerMessage {
  /**
   * Cria uma nova instância de `PingDispatcher`.
   *
   * Inicializa o cabeçalho da mensagem com o valor correspondente a "Pong" definido em `ServerHeaders`.
   */
  constructor() {
    super(ServerHeaders.Pong);
  }
}
