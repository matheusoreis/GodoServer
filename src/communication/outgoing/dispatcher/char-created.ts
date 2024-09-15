import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class CharCreated extends ServerMessage {
  constructor() {
    super(ServerHeaders.CharCreated);
  }
}
