import type { Connection } from "../../core/shared/connection";
import type { ClientMessage } from "../protocol/client-message";

/**
 * A interface `Incoming` define o contrato para o processamento de mensagens recebidas dos clientes.
 */
export interface Incoming {
  /**
   * Processa uma mensagem recebida de um cliente.
   *
   * @param {Connection} client - A conexão do cliente que enviou a mensagem.
   * @param {ClientMessage} request - A mensagem recebida do cliente.
   */
  handle(client: Connection, request: ClientMessage): void;
}
