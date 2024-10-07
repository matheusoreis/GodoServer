import { ServerHeaders } from '../../../communication/protocol/server-headers';
import { ServerMessage } from '../../../communication/protocol/server-message';
import { Character } from '../../character';

export class MapCharactersToOutgoing extends ServerMessage {
  constructor(characters: Character[]) {
    super(ServerHeaders.MapCharactersTo);

    this.putInt16(characters.length);

    for (const character of characters) {
      this.putInt32(character.id);
      this.putString(character.name);
      this.putString(character.gender);
      this.putInt32(character.currentMap);
      this.putInt32(character.position.x);
      this.putInt32(character.position.y);
      this.putInt8(character.direction);
      this.putString(character.defaultSprite);
      this.putString(character.currentSprite);
    }
  }
}
