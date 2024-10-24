import { Logger } from "../../misc/logger";
import { serviceLocator } from "../../misc/service-locator";
import type { Connection } from "../../net/connection";
import type { Incoming } from "../../net/messages/incoming";
import type { ClientMessage } from "../../net/protocol/client-message";
import { AlertCore } from "../alert/alert.core";
import type { Character } from "../character/character";
import type { WorldCore } from "../world/world.core";

export class SelectCharacterIncoming implements Incoming {
	constructor() {
		this.logger = serviceLocator.get<Logger>(Logger);
	}

	logger: Logger;

	public async handle(
		connection: Connection,
		clientMessage: ClientMessage,
	): Promise<void> {
		const id: number = clientMessage.getInt32();

		try {
			connection.setCharacterInUseById(id);
		} catch (error) {
			new AlertCore(
				connection,
				"Personagem não encontrado ou não pôde ser definido como ativo!",
				true,
			).send();

			this.logger.error(`${error}`);
			return;
		}

		const charInUse: Character | undefined = connection.getCharacterInUse();
		if (!charInUse) {
			new AlertCore(
				connection,
				"Personagem não encontrado ou não pôde ser definido como ativo!",
				true,
			).send();
			return;
		}

		const foundMap: WorldCore | undefined = charInUse.findWorld(
			charInUse.worldId,
		);
		if (!foundMap) {
			new AlertCore(connection, "Mapa não encontrado").send();
			return;
		}

		foundMap.add(connection, charInUse);
	}
}
