import { CharacterDisconnectedOutgoing } from './character-disconnected.outgoing';

export class CharacterDisconnectedCore {
  constructor(id: number, map: number) {
    this.id = id;
    this.map = map;
  }

  private readonly id: number;
  private readonly map: number;

  public async disconnect(): Promise<void> {
    new CharacterDisconnectedOutgoing(this.id, this.map).sendToMap(this.map);
  }
}
