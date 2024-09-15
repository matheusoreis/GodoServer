import type { Connection } from "../../../core/connection";
import { Ping } from "../../outgoing/dispatcher/ping";
import type { ClientMessage } from "../../protocol/client-message";
import type { Incoming } from "../incoming";

export class Pong implements Incoming {
  handle(connection: Connection, _message: ClientMessage): void {
    const ping: Ping = new Ping();

    ping.sendTo(connection);
  }
}
