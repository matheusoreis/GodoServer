import type { ServerWebSocket } from "bun";
import type { Connection } from "../core/connection";
import { Memory } from "../core/memory";

/**
 * A classe `GetConnection` fornece métodos utilitários para recuperar uma conexão WebSocket.
 */
export class GetConnection {
  /**
   * Obtém uma conexão associada ao WebSocket fornecido.
   *
   * Este método busca na memória todas as conexões ativas e retorna a conexão
   * que corresponde ao WebSocket fornecido, se existir.
   *
   * @param {ServerWebSocket} ws - O WebSocket associado à conexão desejada.
   * @returns {Connection | undefined} A conexão associada ao WebSocket, ou `undefined` se não for encontrada.
   */
  public static bySocket(ws: ServerWebSocket): Connection | undefined {
    const memory = new Memory();

    for (const index of memory.connections.getFilledSlots()) {
      const connection = memory.connections.get(index);

      if (connection && connection.ws === ws) {
        return connection;
      }
    }
    return undefined;
  }
}
