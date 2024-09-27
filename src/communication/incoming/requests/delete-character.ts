import { Character } from "../../../core/character";
import type { Connection } from "../../../core/connection";
import type { ClientMessage } from "../../protocol/client-message";
import type { Incoming } from "../incoming";

export class DeleteCharacterRequest implements Incoming {
  public async handle(connection: Connection, message: ClientMessage): Promise<void> {
    const charId: number = message.getInt32();

    const character: Character = new Character(connection);
    await character.deleteCharacter(charId);
  }
}
