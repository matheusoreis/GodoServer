import { ServerHeaders } from '../../../communication/protocol/server-headers';
import { ServerMessage } from '../../../communication/protocol/server-message';

export class DeleteCharacterOutgoing extends ServerMessage {
  constructor() {
    super(ServerHeaders.DeleteCharacter);
  }
}
