import type { Connection } from "../../../net/connection";
import { PingComposer } from "../../outgoing/composers/ping-composer";
import { Outgoing } from "../../outgoing/outgoing";
import type { ClientMessage } from "../../protocol/client-message";
import type { Incoming } from "../incoming";

export class PingRequest extends Outgoing implements Incoming {
  handle(connection: Connection, _message: ClientMessage): void {
    const ping: PingComposer = new PingComposer();

    this.dataTo(connection, ping);
  }
}
