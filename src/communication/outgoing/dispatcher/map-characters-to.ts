import type { CharacterModel } from "../../../core/character";
import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class MapCharactersTo extends ServerMessage {
  constructor(characters: CharacterModel[]) {
    super(ServerHeaders.MapCharactersTo);

    this.putInt16(characters.length);

    for (const character of characters) {
      this.putInt32(character.id);
      this.putString(character.name);
      this.putString(character.gender.name);
      this.putInt32(character.currentMap);
      this.putInt32(character.mapPositionX);
      this.putInt32(character.mapPositionY);
      this.putInt8(character.direction);
      this.putString(character.defaultSprite);
      this.putString(character.currentSprite);
    }
  }
}
