import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class AccessAccountSuccess extends ServerMessage {
  constructor() {
    super(ServerHeaders.AccessAccountSuccess);
  }
}
