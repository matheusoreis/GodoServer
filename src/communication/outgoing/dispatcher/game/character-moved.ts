import type { Character } from "../../../../core/game/character";
import { ServerHeaders } from "../../../protocol/server-headers";
import { ServerMessage } from "../../../protocol/server-message";

export class CharacterMoved extends ServerMessage {
  constructor(
    character: Character,
    action: number,
    positionX: number,
    positionY: number,
    direction: number,
    velocityX: number,
    velocityY: number,
  ) {
    super(ServerHeaders.CharacterMoved);

    this.putInt32(character.id);
    this.putInt32(character.currentMap);
    this.putInt8(action);
    this.putInt32(positionX);
    this.putInt32(positionY);
    this.putInt8(direction);
    this.putInt32(velocityX);
    this.putInt32(velocityY);
  }
}
