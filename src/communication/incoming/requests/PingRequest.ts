import type { Connection } from "../../../core/connection";
import { serviceLocator } from "../../../misc/service-locator";
import { PingDispatcher } from "../../outgoing/dispatcher/ping-dispatcher";
import type { ClientMessage } from "../../protocol/client-message";
import type { Incoming } from "../incoming";

/**
 * A classe `PingRequest` processa requisições de ping recebidas dos clientes e envia uma resposta de "Pong".
 *
 * Implementa a interface `Incoming`, o que permite que a classe processe
 * mensagens recebidas e envie respostas apropriadas.
 *
 * @implements Incoming
 */
export class PingRequest implements Incoming {
  /**
   * Processa uma mensagem de ping recebida de um cliente e envia uma resposta de "Pong".
   *
   * @param {Connection} connection - A conexão do cliente que enviou a mensagem.
   * @param {ClientMessage} _message - A mensagem recebida do cliente (não utilizada neste método).
   */
  handle(connection: Connection, _message: ClientMessage): void {
    const ping: PingDispatcher = serviceLocator.get<PingDispatcher>(PingDispatcher);

    ping.sendTo(connection);
  }
}
