import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class Pong extends ServerMessage {
  constructor() {
    super(ServerHeaders.Pong);
  }
}
