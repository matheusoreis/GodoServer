import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

/**
 * A classe `PingComposer` representa uma mensagem do servidor para o cliente.
 *
 * Extende a classe `ServerMessage` e define um cabeçalho específico para mensagens do tipo "Pong".
 *
 * @extends ServerMessage
 */
export class PingComposer extends ServerMessage {
  /**
   * Cria uma nova instância de `PingComposer`.
   *
   * Inicializa o cabeçalho da mensagem com o valor correspondente a "Pong" definido em `ServerHeaders`.
   */
  constructor() {
    super(ServerHeaders.Pong);
  }
}
