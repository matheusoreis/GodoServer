import { Character } from "../../../core/character";
import type { Connection } from "../../../core/connection";
import type { ClientMessage } from "../../protocol/client-message";
import type { Incoming } from "../incoming";

export class CreateCharacterRequest implements Incoming {
  public async handle(connection: Connection, message: ClientMessage): Promise<void> {
    const name: string = message.getString();
    const genderId: number = message.getInt32();

    const character: Character = new Character(connection);
    await character.createChar(name, genderId);
  }
}
