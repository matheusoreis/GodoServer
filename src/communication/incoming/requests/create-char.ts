import { Character } from "../../../core/character";
import type { Connection } from "../../../core/connection";
import type { ClientMessage } from "../../protocol/client-message";
import type { Incoming } from "../incoming";

export class CreateCharRequest implements Incoming {
  public async handle(connection: Connection, message: ClientMessage): Promise<void> {
    const name: string = message.getString();
    const genderId: number = message.getInt32();

    const char: Character = new Character(connection);
    await char.createChar(name, genderId);
  }
}
