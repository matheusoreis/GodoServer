import type { Connection } from "./connection";

export class Character {
  constructor(connection: Connection) {
    this.connection = connection;
  }

  connection: Connection;

  public async getListChars(): Promise<void> {
    // await this.connection.addCharacters()
  }
}
