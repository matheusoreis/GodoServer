import type { Incoming } from "../../../communication/incoming";
import type { Connection } from "../../connection";
import { CharacterListCore } from "./character-list.core";

export class CharacterListIncoming implements Incoming {
	public async handle(connection: Connection): Promise<void> {
		new CharacterListCore(connection).list();
	}
}
