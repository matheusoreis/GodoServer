import { PrismaClient } from "@prisma/client";
import type { Connection } from "../shared/connection";
import { serviceLocator } from "../../misc/service-locator";
import { Logger } from "../../misc/logger";
import { Alert } from "../../communication/outgoing/dispatcher/shared/alert";
import { CharacterList } from "../../communication/outgoing/dispatcher/menu/character-list";
import { CharacterCreated } from "../../communication/outgoing/dispatcher/menu/character-created";
import { CharacterDeleted } from "../../communication/outgoing/dispatcher/menu/character-deleted";
import { Character } from "../game/character";

export class CharacterManager {
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

  public async createChar(name: string, genderId: number, defaultSprite: string): Promise<void> {
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
          defaultSprite: defaultSprite,
          currentSprite: defaultSprite,
        },
      });

      const character = this.mapToCharacterModel(newCharacter);
      this.connection.addCharacter(character);

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

  private mapToCharacterModel(character: any): Character {
    return new Character(
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
      character.defaultSprite,
      character.currentSprite,
    );
  }
}
