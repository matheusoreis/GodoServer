import { PrismaClient } from "@prisma/client";
import { Logger } from "../../../misc/logger";
import { serviceLocator } from "../../../misc/service-locator";
import type { Vector2 } from "../../../misc/vector2";
import type { Connection } from "../../connection";
import type { WorldCore } from "../world/world.core";
import { Memory } from "../../memory";

export class Character {
	constructor(
		id: number,
		name: string,
		gendersId: number,
		accountId: number | null,
		worldId: number,
		position: Vector2,
		direction: number,
		createdAt: Date,
		updatedAt: Date,
		gender: string,
		defaultSprite: string,
	) {
		this.id = id;
		this.name = name;
		this.gendersId = gendersId;
		this.accountId = accountId;
		this.worldId = worldId;
		this.position = position;
		this.direction = direction;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.gender = gender;
		this.defaultSprite = defaultSprite;

		this.prisma = serviceLocator.get<PrismaClient>(PrismaClient);
		this.logger = serviceLocator.get<Logger>(Logger);
		this.memory = serviceLocator.get<Memory>(Memory);
	}

	id: number;
	name: string;
	gendersId: number;
	accountId: number | null;
	worldId: number;
	position: Vector2;
	direction: number;
	createdAt: Date;
	updatedAt: Date;
	gender: string;
	defaultSprite: string;

	prisma: PrismaClient;
	logger: Logger;
	memory: Memory;

	public async updateCharacter(character: Character): Promise<void> {
		try {
			await this.prisma.characters.update({
				where: { id: character.id },
				data: {
					name: character.name,
					gendersId: character.gendersId,
					accountId: character.accountId,
					worldsId: character.worldId,
					positionX: character.position.x,
					positionY: character.position.y,
					updatedAt: new Date(),
				},
			});

			this.logger.info(`${character.name} atualizado com sucesso!`);
		} catch (error) {
			this.logger.info(`Erro ao atualizar o personagem: ${error}`);
		}
	}

	public findWorld(worldId: number): WorldCore | undefined {
		let foundWorld: WorldCore | undefined;

		for (const index of this.memory.worlds.getFilledSlots()) {
			const world: WorldCore | undefined = this.memory.worlds.get(index);
			if (world && world.id === worldId) {
				foundWorld = world;
				break;
			}
		}

		return foundWorld;
	}

	private updateIntervalId: Timer | null = null;

	public async loop(): Promise<void> {
		this.updateIntervalId = setInterval(
			async () => {
				try {
					await this.updateCharacter(this);
				} catch (error) {
					console.error(
						"Erro ao sincronizar os personagens com o banco de dados: ",
						error,
					);
				}
			},
			1 * 60 * 1000,
		);
	}

	public stopLoop(): void {
		if (this.updateIntervalId !== null) {
			clearInterval(this.updateIntervalId);
			this.updateIntervalId = null;
		}
	}
}
