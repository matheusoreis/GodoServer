import { PrismaClient } from "@prisma/client";
import { Logger } from "../../../misc/logger";
import { serviceLocator } from "../../../misc/service-locator";
import type { Connection } from "../../connection";
import { CreateCharacterOutgoing } from "./create-character.outgoing";

import { Vector2 } from "../../../misc/vector2";
import { AlertCore } from "../../alert/alert.core";
import { Character } from "../../game/character/character";
import type { PrismaCharacterWithGender } from "../../../misc/prisma-types";

export class CreateCharacterCore {
	constructor(
		connection: Connection,
		name: string,
		gender: number,
		sprite: string,
	) {
		this.connection = connection;
		this.name = name;
		this.gender = gender;
		this.sprite = sprite;
		this.prisma = serviceLocator.get<PrismaClient>(PrismaClient);
		this.logger = serviceLocator.get<Logger>(Logger);
	}

	public readonly name: string;
	public readonly gender: number;
	public readonly sprite: string;

	public readonly connection: Connection;
	private readonly prisma: PrismaClient;
	private readonly logger: Logger;

	public async create(): Promise<void> {
		const accountId = this.connection.getDatabaseId();
		if (accountId === undefined) {
			return;
		}

		try {
			const existingCharacter = await this.prisma.characters.findUnique({
				where: { name: this.name },
				include: { gender: true },
			});

			if (existingCharacter) {
				new AlertCore(
					this.connection,
					"Nome do personagem já em uso.",
					false,
				).send();
				return;
			}

			const gender = await this.prisma.genders.findUnique({
				where: { id: this.gender },
			});

			if (!gender) {
				new AlertCore(
					this.connection,
					"O gênero informado não é válido!",
					false,
				).send();
				return;
			}

			const newCharacter: PrismaCharacterWithGender =
				await this.prisma.characters.create({
					data: {
						name: this.name,
						gendersId: this.gender,
						accountId: accountId,
						worldsId: 1,
						defaultSprite: this.sprite,
					},
					include: { gender: true },
				});

			const character = new Character(
				newCharacter.id,
				newCharacter.name,
				newCharacter.gendersId,
				newCharacter.accountId,
				newCharacter.worldsId,
				new Vector2(newCharacter.positionX, newCharacter.positionY),
				newCharacter.direction,
				newCharacter.createdAt,
				newCharacter.updatedAt,
				newCharacter.gender.name,
				newCharacter.defaultSprite,
			);

			this.connection.addCharacter(character);

			new AlertCore(
				this.connection,
				"Personagem criado com sucesso!",
				false,
			).send();

			new CreateCharacterOutgoing().sendTo(this.connection);
		} catch (error) {
			new AlertCore(this.connection, `Error: ${error}`, true).send();

			this.logger.error(`${error}`);
		}
	}
}
