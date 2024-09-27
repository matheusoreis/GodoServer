import type { CharacterModel } from "../../../core/character";
import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class CharMoved extends ServerMessage {
  constructor(
    char: CharacterModel,
    action: number,
    positionX: number,
    positionY: number,
    direction: number,
    velocityX: number,
    velocityY: number,
  ) {
    super(ServerHeaders.CharMoved);

    this.putInt32(char.id);
    this.putInt32(char.currentMap);
    this.putInt8(action);
    this.putInt32(positionX);
    this.putInt32(positionY);
    this.putInt8(direction);
    this.putInt32(velocityX);
    this.putInt32(velocityY);
  }
}
