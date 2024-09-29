import { PrismaClient } from "@prisma/client";
import type { Connection } from "./connection";
import { serviceLocator } from "../misc/service-locator";
import { Alert } from "../communication/outgoing/dispatcher/alert";
import { CharacterDeleted } from "../communication/outgoing/dispatcher/character-deleted";
import { CharacterCreated } from "../communication/outgoing/dispatcher/character-created";
import { CharacterList } from "../communication/outgoing/dispatcher/character-list";
import { Logger } from "../misc/logger";
import type { GameMap } from "./game-map";
import { Memory } from "./memory";

export class CharacterModel {
  constructor(
    id: number,
    name: string,
    gendersId: number,
    accountId: number | null,
    currentMap: number,
    mapPositionX: number,
    mapPositionY: number,
    direction: number,
    createdAt: Date,
    updatedAt: Date,
    gender: { id: number; name: string },
  ) {
    this.id = id;
    this.name = name;
    this.gendersId = gendersId;
    this.accountId = accountId;
    this.currentMap = currentMap;
    this.mapPositionX = mapPositionX;
    this.mapPositionY = mapPositionY;
    this.direction = direction;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.gender = gender;

    this.prisma = serviceLocator.get<PrismaClient>(PrismaClient);
    this.logger = serviceLocator.get<Logger>(Logger);
    this.memory = serviceLocator.get<Memory>(Memory);
  }

  id: number;
  name: string;
  gendersId: number;
  accountId: number | null;
  currentMap: number;
  mapPositionX: number;
  mapPositionY: number;
  direction: number;
  createdAt: Date;
  updatedAt: Date;
  gender: {
    id: number;
    name: string;
  };

  prisma: PrismaClient;
  logger: Logger;
  memory: Memory;

  public async updateCharacter(characterModel: CharacterModel): Promise<void> {
    try {
      await this.prisma.characters.update({
        where: { id: characterModel.id },
        data: {
          name: characterModel.name,
          gendersId: characterModel.gendersId,
          accountId: characterModel.accountId,
          currentMap: characterModel.currentMap,
          mapPositionX: characterModel.mapPositionX,
          mapPositionY: characterModel.mapPositionY,
          updatedAt: new Date(),
        },
      });

      this.logger.info("Character successfully updated!" + characterModel);
    } catch (error) {
      this.logger.info(`Error updating character: ${error}`);
    }
  }

  /**
   * Encontra um mapa na memória baseado no ID fornecido.
   * @param {number} mapId - ID do mapa fornecido.
   * @returns {GameMap | undefined} - O mapa encontrado ou undefined se não encontrado.
   */
  public findMapById(mapId: number): GameMap | undefined {
    let foundMap: GameMap | undefined;

    for (const index of this.memory.maps.getFilledSlots()) {
      const gameMap: GameMap | undefined = this.memory.maps.get(index);
      if (gameMap && gameMap.id === mapId) {
        foundMap = gameMap;
        break;
      }
    }

    return foundMap;
  }

  private updateIntervalId: Timer | null = null;

  public async loop(): Promise<void> {
    // Inicia o loop do personagem
    this.updateIntervalId = setInterval(
      async () => {
        try {
          await this.updateCharacter(this);
        } catch (error) {
          console.error("Error syncing character: ", error);
        }
      },
      1 * 60 * 1000, // 1 minuto
    );
  }

  public stopLoop(): void {
    if (this.updateIntervalId !== null) {
      clearInterval(this.updateIntervalId);
      this.updateIntervalId = null;
    }
  }

  public getCharInUse(connection: Connection): CharacterModel | void {
    return connection.getCharInUse();
  }
}

export class Character {
  constructor(connection: Connection) {
    this.connection = connection;
    this.prisma = serviceLocator.get<PrismaClient>(PrismaClient);
    this.logger = serviceLocator.get<Logger>(Logger);
  }

  connection: Connection;
  prisma: PrismaClient;
  logger: Logger;

  public async getListChars(): Promise<void> {
    const accountId = this.connection.getDatabaseId();

    if (accountId === undefined) {
      new Alert("No account associated with this connection.", true).sendTo(this.connection);

      return;
    }

    try {
      const characters = await this.prisma.characters.findMany({
        where: { accountId: accountId! },
        include: { gender: true },
      });

      const characterModelList = characters.map(this.mapToCharacterModel);
      this.connection.addCharacters(characterModelList);

      // TODO: Adicionar dinamicamente a quantidade de personagens
      const dispatcher: CharacterList = new CharacterList(characterModelList, 3);
      dispatcher.sendTo(this.connection);
    } catch (error) {
      new Alert(`Error fetching characters: ${error}`, false).sendTo(this.connection);
    }
  }

  public async createChar(name: string, genderId: number): Promise<void> {
    const accountId = this.connection.getDatabaseId();

    if (accountId === undefined) {
      new Alert("No account associated with this connection.", true).sendTo(this.connection);

      return;
    }

    try {
      const existingCharacter = await this.prisma.characters.findUnique({
        where: { name: name },
      });

      if (existingCharacter) {
        new Alert("Character name already in use. Please choose another name.", false).sendTo(this.connection);

        return;
      }

      const gender = await this.prisma.genders.findUnique({
        where: { id: genderId },
      });

      if (!gender) {
        new Alert("Invalid gender provided.", false).sendTo(this.connection);

        return;
      }

      const newCharacter = await this.prisma.characters.create({
        data: {
          name: name,
          gendersId: genderId,
          accountId: accountId!,
        },
      });

      const characterModel = this.mapToCharacterModel(newCharacter);
      this.connection.addCharacter(characterModel);

      new Alert("Character successfully created!", false).sendTo(this.connection);

      const dispatcher: CharacterCreated = new CharacterCreated();
      dispatcher.sendTo(this.connection);
    } catch (error) {
      new Alert(`Error creating character: ${error}`, false).sendTo(this.connection);
    }
  }

  public async deleteCharacter(characterId: number): Promise<void> {
    const accountId = this.connection.getDatabaseId();

    if (accountId === undefined) {
      new Alert("No account associated with this connection.", true).sendTo(this.connection);

      return;
    }

    try {
      const character = await this.prisma.characters.findUnique({
        where: { id: characterId },
        select: { accountId: true },
      });

      if (!character || character.accountId !== accountId) {
        new Alert("Character not found or does not belong to this account.", false).sendTo(this.connection);

        return;
      }

      await this.prisma.characters.delete({
        where: { id: characterId },
      });

      this.connection.removeCharacter(characterId);

      new Alert("Character successfully deleted!", false).sendTo(this.connection);

      const dispatcher: CharacterDeleted = new CharacterDeleted();
      dispatcher.sendTo(this.connection);
    } catch (error) {
      new Alert(`Error deleting character: ${error}`, false).sendTo(this.connection);
    }
  }

  private mapToCharacterModel(character: any): CharacterModel {
    return new CharacterModel(
      character.id,
      character.name,
      character.gendersId,
      character.accountId,
      character.currentMap,
      character.mapPositionX,
      character.mapPositionY,
      character.direction,
      character.createdAt,
      character.updatedAt,
      character.gender,
    );
  }
}
