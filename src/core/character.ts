import { serviceLocator } from '../misc/service-locator';
import { Logger } from '../misc/logger';
import { Memory } from './memory';
import { Connection } from './connection';
import { WorldCore } from './game/world/world.core';
import { Vector2 } from '../misc/vector2';
import { PrismaClient } from '@prisma/client';

export class Character {
  constructor(
    id: number,
    name: string,
    gendersId: number,
    accountId: number | null,
    currentMap: number,
    position: Vector2,
    direction: number,
    createdAt: Date,
    updatedAt: Date,
    gender: string,
    defaultSprite: string,
    currentSprite: string,
  ) {
    this.id = id;
    this.name = name;
    this.gendersId = gendersId;
    this.accountId = accountId;
    this.currentMap = currentMap;
    this.position = position;
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
  position: Vector2;
  direction: number;
  createdAt: Date;
  updatedAt: Date;
  gender: string;
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
          mapPositionX: character.position.x,
          mapPositionY: character.position.y,
          updatedAt: new Date(),
        },
      });

      this.logger.info(character.name + ' atualizado com sucesso!');
    } catch (error) {
      this.logger.info(`Erro ao atualizar o personagem: ${error}`);
    }
  }

  public findMapById(mapId: number): WorldCore | undefined {
    let foundMap: WorldCore | undefined;

    for (const index of this.memory.worlds.getFilledSlots()) {
      const gameMap: WorldCore | undefined = this.memory.worlds.get(index);
      if (gameMap && gameMap.id === mapId) {
        foundMap = gameMap;
        break;
      }
    }

    return foundMap;
  }

  private updateIntervalId: Timer | null = null;

  public async loop(): Promise<void> {
    this.updateIntervalId = setInterval(
      async () => {
        try {
          await this.updateCharacter(this);
        } catch (error) {
          console.error('Erro ao sincronizar os personagens com o banco de dados: ', error);
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
