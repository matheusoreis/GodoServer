import { CharacterManager } from "../../../core/character-manager";
import type { Connection } from "../../../core/connection";
import type { ClientMessage } from "../../protocol/client-message";
import type { Incoming } from "../incoming";

export class DeleteCharacter implements Incoming {
  public async handle(connection: Connection, message: ClientMessage): Promise<void> {
    const charId: number = message.getInt32();

    const character: CharacterManager = new CharacterManager(connection);
    await character.deleteCharacter(charId);
  }
}
