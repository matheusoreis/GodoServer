import type { Connection } from '../../connection';
import type { Vector2 } from '../../../misc/vector2';
import { AlertCore } from '../../alert/alert.core';

export class MoveCharacterCore {
  constructor(
    connection: Connection,
    action: number,
    position: Vector2,
    direction: number,
    velocity: Vector2,
  ) {
    this.connection = connection;
    this.action = action;
    this.position = position;
    this.direction = direction;
    this.velocity = velocity;
  }

  public readonly connection: Connection;
  public readonly action: number;
  public readonly position: Vector2;
  public readonly direction: number;
  public readonly velocity: Vector2;

  public async move(): Promise<void> {
    const charInUse = this.connection.getCharInUse();
    if (!charInUse) {
      new AlertCore(
        this.connection,
        'Personagem não encontrado ou não pôde ser definido como ativo!',
        true,
      ).send();
      return;
    }

    const foundMap = charInUse.findMapById(charInUse.currentMap);
    if (!foundMap) {
      new AlertCore(this.connection, 'Mapa não encontrado!', true).send();
      return;
    }

    foundMap.move(
      this.connection,
      charInUse,
      this.action,
      this.position,
      this.direction,
      this.velocity,
    );
  }
}
