import { WORLD_LOOP } from "../../misc/constants";
import { Logger } from "../../misc/logger";
import { Memory } from "../../misc/memory";
import { serviceLocator } from "../../misc/service-locator";
import type { Vector2 } from "../../misc/vector2";
import type { Connection } from "../../net/connection";
import { AlertCore } from "../alert/alert.core";
import { CharacterDisconnectedCore } from "../character-disconnected/character-disconnected.core";
import type { Character } from "../character/character";
import { MoveCharacterOutgoing } from "../move-character/move-character.outgoing";
import { WorldOutgoing } from "./world.outgoing";

export class WorldCore {
	constructor(id: number, name: string, size: Vector2) {
		this.logger = serviceLocator.get<Logger>(Logger);
		this.memory = serviceLocator.get<Memory>(Memory);

		this.id = id;
		this.name = name;
		this.size = size;

		this.loop();
	}

	public id: number;
	public name: string;
	public size: Vector2;

	public logger: Logger;
	public memory: Memory;

	public add(connection: Connection, character: Character): void {
		character.loop();

		if (character.worldId !== this.id) {
			new AlertCore(
				connection,
				"Seu personagem não pertence a este mundo!",
				true,
			).send();
			return;
		}

		const outgoing: WorldOutgoing = new WorldOutgoing();

		// Notificar o novo personagem selecionado
		outgoing.sendCharacterSelected(connection, character);

		// Notificar outros personagens sobre o novo personagem
		outgoing.sendOthersOfNewCharacter(connection, this.id, character);

		// Notificar o novo personagem sobre os personagens já presentes
		outgoing.sendExistingCharacters(connection, this.memory);

		// Adicionar o personagem ao array de personagens
		this.memory.worldsCharacters.add(character);
	}

	public move(
		connection: Connection,
		character: Character,
		action: number,
		position: Vector2,
		direction: number,
		velocity: Vector2,
	): void {
		const existingCharacter = this.get(character.id);

		if (!existingCharacter) {
			new AlertCore(
				connection,
				"Você não deveria estar fazendo isso!",
				true,
			).send();
			return;
		}

		if (!this.inCurrentWorld(character)) {
			new AlertCore(
				connection,
				"Seu personagem não pertence a este mundo!",
				true,
			).send();
			return;
		}

		character.position = position;
		character.direction = direction;

		new MoveCharacterOutgoing(
			character,
			action,
			position,
			direction,
			velocity,
		).sendToWorldExcept(this.id, connection);
	}

	public remove(connection: Connection, character: Character): void {
		let found = false;

		for (const index of this.memory.worldsCharacters.getFilledSlots()) {
			const existingCharacter = this.memory.worldsCharacters.get(index);

			if (existingCharacter && existingCharacter.id === character.id) {
				this.memory.worldsCharacters.remove(index);
				found = true;

				new CharacterDisconnectedCore(
					existingCharacter.id,
					existingCharacter.worldId,
				).disconnect();
				break;
			}
		}

		if (!found) {
			new AlertCore(
				connection,
				"Seu personagem não pertence a este mundo!",
				true,
			).send();
			return;
		}
	}

	private get(characterId: number): Character | undefined {
		return this.memory.worldsCharacters.find(
			(character) => character.id === characterId,
		);
	}

	private inCurrentWorld(character: Character): boolean {
		const existingCharacter: Character | undefined =
			this.memory.worldsCharacters.find(
				(currentCharacter) => currentCharacter?.id === character.id,
			);

		return existingCharacter ? existingCharacter.worldId === this.id : false;
	}

	private updateIntervalId: Timer | null = null;

	public async loop(): Promise<void> {
		this.updateIntervalId = setInterval(
			async () => {
				//
			},
			WORLD_LOOP * 60 * 1000,
		);
	}

	public stopLoop(): void {
		if (this.updateIntervalId !== null) {
			clearInterval(this.updateIntervalId);
			this.updateIntervalId = null;
		}
	}
}
