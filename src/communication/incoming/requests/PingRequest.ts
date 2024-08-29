import type { Connection } from "../../../net/connection";
import { PingComposer } from "../../outgoing/composers/ping-composer";
import { Outgoing } from "../../outgoing/outgoing";
import type { ClientMessage } from "../../protocol/client-message";
import type { Incoming } from "../incoming";

/**
 * A classe `PingRequest` processa requisições de ping recebidas dos clientes e envia uma resposta de "Pong".
 *
 * Extende a classe `Outgoing` e implementa a interface `Incoming`, o que permite que a classe processe
 * mensagens recebidas e envie respostas apropriadas.
 *
 * @extends Outgoing
 * @implements Incoming
 */
export class PingRequest extends Outgoing implements Incoming {
  /**
   * Processa uma mensagem de ping recebida de um cliente e envia uma resposta de "Pong".
   *
   * @param {Connection} connection - A conexão do cliente que enviou a mensagem.
   * @param {ClientMessage} _message - A mensagem recebida do cliente (não utilizada neste método).
   */
  handle(connection: Connection, _message: ClientMessage): void {
    const ping: PingComposer = new PingComposer();

    this.dataTo(connection, ping);
  }
}
