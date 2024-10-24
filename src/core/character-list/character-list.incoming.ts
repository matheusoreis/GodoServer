import type { Connection } from "../../net/connection";
import type { Incoming } from "../../net/messages/incoming";
import { CharacterListCore } from "./character-list.core";

export class CharacterListIncoming implements Incoming {
	public async handle(connection: Connection): Promise<void> {
		new CharacterListCore(connection).list();
	}
}
