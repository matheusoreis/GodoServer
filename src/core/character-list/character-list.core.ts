/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { Logger } from "../../misc/logger";
import type {
	PrismaAccount,
	PrismaAccountWithCharacters,
	PrismaCharacter,
	PrismaCharacterWithGender,
} from "../../misc/prisma-types";
import { serviceLocator } from "../../misc/service-locator";
import { Vector2 } from "../../misc/vector2";
import type { Connection } from "../../net/connection";
import { AlertCore } from "../alert/alert.core";
import { Character } from "../character/character";
import { CharacterListOutgoing } from "./character-list.outgoing";

export class CharacterListCore {
	constructor(connection: Connection) {
		this.connection = connection;
		this.prisma = serviceLocator.get<PrismaClient>(PrismaClient);
		this.logger = serviceLocator.get<Logger>(Logger);
	}

	public readonly connection: Connection;
	private readonly prisma: PrismaClient;
	private readonly logger: Logger;

	public async list(): Promise<void> {
		const accountId: number | undefined = this.connection.getDatabaseId();

		if (accountId === undefined) {
			new AlertCore(
				this.connection,
				"Ocorreu um erro ao recuperar seus dados.",
				true,
			).send();

			return;
		}

		try {
			const account: PrismaAccountWithCharacters | null =
				await this.prisma.accounts.findUnique({
					where: { id: accountId },
					include: {
						characters: {
							include: {
								gender: true,
							},
						},
					},
				});

			if (!account) {
				new AlertCore(
					this.connection,
					"A conta informada não foi encontrada!",
					false,
				).send();

				this.connection.close();
				return;
			}

			const characterModelList = account.characters.map(
				this.mapToCharacterModel,
			);
			this.connection.addCharacters(characterModelList);

			new CharacterListOutgoing(
				characterModelList,
				account?.characterSize ?? 1,
			).sendTo(this.connection);
		} catch (error) {
			new AlertCore(this.connection, `Error: ${error}`, true).send();
			this.logger.error(`${error}`);
		}
	}

	private mapToCharacterModel(character: PrismaCharacterWithGender): Character {
		return new Character(
			character.id,
			character.name,
			character.gendersId,
			character.accountId,
			character.worldsId,
			new Vector2(character.positionX, character.positionY),
			character.direction,
			character.createdAt,
			character.updatedAt,
			character.gender.name,
			character.defaultSprite,
		);
	}
}
