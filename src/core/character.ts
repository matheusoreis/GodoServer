import { PrismaClient } from "@prisma/client";
import { serviceLocator } from "../misc/service-locator";
import { Logger } from "../misc/logger";
import { Memory } from "./memory";
import type { GameMap } from "./game-map";
import type { Connection } from "./connection";

export class Character {
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
    defaultSprite: string,
    currentSprite: string,
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
    this.defaultSprite = defaultSprite;
    this.currentSprite = currentSprite;

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
  defaultSprite: string;
  currentSprite: string;

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
          currentMap: character.currentMap,
          mapPositionX: character.mapPositionX,
          mapPositionY: character.mapPositionY,
          updatedAt: new Date(),
        },
      });

      this.logger.info("Character successfully updated!" + character);
    } catch (error) {
      this.logger.info(`Error updating character: ${error}`);
    }
  }

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

  public getCharInUse(connection: Connection): Character | void {
    return connection.getCharInUse();
  }
}
