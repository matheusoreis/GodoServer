import type { CharacterModel } from "../../../core/character";
import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class CharMoved extends ServerMessage {
  constructor(char: CharacterModel, x: number, y: number, direction: number, isMoving: string) {
    super(ServerHeaders.CharMoved);

    this.putInt32(char.id);
    this.putInt32(char.currentMap);
    this.putInt32(x);
    this.putInt32(y);
    this.putInt32(direction);
    this.putString(isMoving);
  }
}
