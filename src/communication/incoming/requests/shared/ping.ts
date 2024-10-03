import type { Connection } from "../../../../core/shared/connection";
import { Pong } from "../../../outgoing/dispatcher/shared/pong";
import type { ClientMessage } from "../../../protocol/client-message";
import type { Incoming } from "../../incoming";

export class Ping implements Incoming {
  handle(connection: Connection, _message: ClientMessage): void {
    const ping: Pong = new Pong();

    ping.sendTo(connection);
  }
}
