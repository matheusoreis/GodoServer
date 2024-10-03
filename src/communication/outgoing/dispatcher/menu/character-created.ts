import { ServerHeaders } from "../../../protocol/server-headers";
import { ServerMessage } from "../../../protocol/server-message";

export class CharacterCreated extends ServerMessage {
  constructor() {
    super(ServerHeaders.CharacterCreated);
  }
}
