import type { Connection } from '../core/connection';
import type { ClientMessage } from './protocol/client-message';

/**
 * A interface `Incoming` define o contrato para o processamento de mensagens recebidas dos clientes.
 */
export interface Incoming {
  /**
   * Processa uma mensagem recebida de um cliente.
   *
   * @param {Connection} connection - A conexão do cliente que enviou a mensagem.
   * @param {ClientMessage} clientMessage - A mensagem recebida do cliente.
   */
  handle(connection: Connection, clientMessage: ClientMessage): void;
}
