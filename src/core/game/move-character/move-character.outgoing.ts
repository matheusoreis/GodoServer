import { ServerHeaders } from '../../../communication/protocol/server-headers';
import { ServerMessage } from '../../../communication/protocol/server-message';
import type { Vector2 } from '../../../misc/vector2';
import { Character } from '../../character';

export class MoveCharacterOutgoing extends ServerMessage {
  constructor(
    character: Character,
    action: number,
    position: Vector2,
    direction: number,
    velocity: Vector2,
  ) {
    super(ServerHeaders.MoveCharacter);

    this.putInt32(character.id);
    this.putInt32(character.currentMap);
    this.putInt8(action);
    this.putInt32(position.x);
    this.putInt32(position.y);
    this.putInt8(direction);
    this.putInt32(velocity.x);
    this.putInt32(velocity.y);
  }
}
