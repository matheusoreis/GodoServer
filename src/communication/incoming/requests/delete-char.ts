import { Character } from "../../../core/character";
import type { Connection } from "../../../core/connection";
import type { ClientMessage } from "../../protocol/client-message";
import type { Incoming } from "../incoming";

export class DeleteCharRequest implements Incoming {
  public async handle(connection: Connection, message: ClientMessage): Promise<void> {
    const charId: number = message.getInt32();

    const char: Character = new Character(connection);
    await char.deleteCharacter(charId);
  }
}
