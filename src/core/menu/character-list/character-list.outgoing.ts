import { ServerHeaders } from '../../../communication/protocol/server-headers';
import { ServerMessage } from '../../../communication/protocol/server-message';
import { Character } from '../../character';

export class CharacterListOutgoing extends ServerMessage {
  constructor(characters: Character[], maxCharactersSlots: number) {
    super(ServerHeaders.CharacterList);

    this.putInt8(characters.length);
    this.putInt8(maxCharactersSlots);

    for (const character of characters) {
      this.putInt32(character.id);
      this.putString(character.name);
      this.putString(character.gender);
      this.putInt32(character.currentMap);
      this.putInt32(character.position.x);
      this.putInt32(character.position.y);
      this.putInt8(character.direction);
    }
  }
}
