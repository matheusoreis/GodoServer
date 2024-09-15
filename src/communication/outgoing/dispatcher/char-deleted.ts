import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class CharDeleted extends ServerMessage {
  constructor() {
    super(ServerHeaders.CharDeleted);
  }
}
