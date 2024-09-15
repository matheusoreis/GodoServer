import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class Ping extends ServerMessage {
  constructor() {
    super(ServerHeaders.Ping);
  }
}
