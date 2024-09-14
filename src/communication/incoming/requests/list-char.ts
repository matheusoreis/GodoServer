import { Character } from "../../../core/character";
import type { Connection } from "../../../core/connection";
import type { ClientMessage } from "../../protocol/client-message";
import type { Incoming } from "../incoming";

export class ListCharRequest implements Incoming {
  public async handle(connection: Connection, message: ClientMessage): Promise<void> {
    const email: string = message.getString();
    const password: string = message.getString();
    const major: number = message.getInt16();
    const minor: number = message.getInt16();
    const revision: number = message.getInt16();

    const character: Character = new Character(connection);
    await character.getListChars();
  }
}
