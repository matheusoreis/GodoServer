import type { CharacterModel } from "../../../core/character";
import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class CharacterList extends ServerMessage {
  constructor(characters: CharacterModel[], accountCharSize: number) {
    super(ServerHeaders.CharacterList);

    this.putInt8(characters.length);
    this.putInt8(accountCharSize);

    for (const character of characters) {
      this.putInt32(character.id);
      this.putString(character.name);
      this.putString(character.gender.name);
      this.putInt32(character.currentMap);
      this.putInt32(character.mapPositionX);
      this.putInt32(character.mapPositionY);
      this.putInt8(character.direction);
    }
  }
}
