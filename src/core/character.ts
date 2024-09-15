import { PrismaClient } from "@prisma/client";
import type { Connection } from "./connection";
import { serviceLocator } from "../misc/service-locator";
import { AlertDispatcher, AlertType } from "../communication/outgoing/dispatcher/alert";
import { CharDeleted } from "../communication/outgoing/dispatcher/char-deleted";
import { CharCreated } from "../communication/outgoing/dispatcher/char-created";
import { CharList } from "../communication/outgoing/dispatcher/char-list";

export class CharacterModel {
  constructor(
    id: number,
    name: string,
    gendersId: number,
    accountId: number | null,
    currentMap: number,
    mapPositionX: number,
    mapPositionY: number,
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
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.gender = gender;
  }

  id: number;
  name: string;
  gendersId: number;
  accountId: number | null;
  currentMap: number;
  mapPositionX: number;
  mapPositionY: number;
  createdAt: Date;
  updatedAt: Date;
  gender: {
    id: number;
    name: string;
  };
}

export class Character {
  constructor(connection: Connection) {
    this.connection = connection;
    this.prisma = serviceLocator.get<PrismaClient>(PrismaClient);
  }

  connection: Connection;
  prisma: PrismaClient;

  public async getListChars(): Promise<void> {
    const accountId = this.connection.getDatabaseId();

    if (accountId === undefined) {
      const alertDispatcher: AlertDispatcher = new AlertDispatcher(
        AlertType.Error,
        "No account associated with this connection.",
        true,
      );
      alertDispatcher.sendTo(this.connection);

      return;
    }

    try {
      const characters = await this.prisma.characters.findMany({
        where: { accountId: accountId! },
        include: { gender: true },
      });

      const characterModelList = characters.map(this.mapToCharacterModel);

      this.connection.addCharacters(characterModelList);

      const dispatcher: CharList = new CharList(characterModelList, 5);
      dispatcher.sendTo(this.connection);
    } catch (error) {
      const alertDispatcher: AlertDispatcher = new AlertDispatcher(
        AlertType.Error,
        `Error fetching characters: ${error}`,
        false,
      );
      alertDispatcher.sendTo(this.connection);
    }
  }

  public async createChar(name: string, genderId: number): Promise<void> {
    const accountId = this.connection.getDatabaseId();

    if (accountId === undefined) {
      const alertDispatcher: AlertDispatcher = new AlertDispatcher(
        AlertType.Error,
        "No account associated with this connection.",
        true,
      );
      alertDispatcher.sendTo(this.connection);

      return;
    }

    try {
      const existingCharacter = await this.prisma.characters.findUnique({
        where: { name: name },
      });

      if (existingCharacter) {
        const alertDispatcher: AlertDispatcher = new AlertDispatcher(
          AlertType.Warn,
          "Character name already in use. Please choose another name.",
          false,
        );
        alertDispatcher.sendTo(this.connection);

        return;
      }

      const gender = await this.prisma.genders.findUnique({
        where: { id: genderId },
      });

      if (!gender) {
        const alertDispatcher: AlertDispatcher = new AlertDispatcher(
          AlertType.Error,
          "Invalid gender provided.",
          false,
        );
        alertDispatcher.sendTo(this.connection);

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

      const alertDispatcher: AlertDispatcher = new AlertDispatcher(
        AlertType.Info,
        "Character successfully created!",
        false,
      );
      alertDispatcher.sendTo(this.connection);

      const dispatcher: CharCreated = new CharCreated();
      dispatcher.sendTo(this.connection);
    } catch (error) {
      const alertDispatcher: AlertDispatcher = new AlertDispatcher(
        AlertType.Error,
        `Error creating character: ${error}`,
        false,
      );

      alertDispatcher.sendTo(this.connection);
    }
  }

  public async deleteCharacter(characterId: number): Promise<void> {
    const accountId = this.connection.getDatabaseId();

    if (accountId === undefined) {
      const alertDispatcher: AlertDispatcher = new AlertDispatcher(
        AlertType.Error,
        "No account associated with this connection.",
        true,
      );
      alertDispatcher.sendTo(this.connection);

      return;
    }

    try {
      const character = await this.prisma.characters.findUnique({
        where: { id: characterId },
        select: { accountId: true },
      });

      if (!character || character.accountId !== accountId) {
        const alertDispatcher: AlertDispatcher = new AlertDispatcher(
          AlertType.Error,
          "Character not found or does not belong to this account.",
          false,
        );
        alertDispatcher.sendTo(this.connection);

        return;
      }

      await this.prisma.characters.delete({
        where: { id: characterId },
      });

      this.connection.removeCharacter(characterId);

      const alertDispatcher: AlertDispatcher = new AlertDispatcher(
        AlertType.Info,
        "Character successfully deleted!",
        false,
      );
      alertDispatcher.sendTo(this.connection);

      const dispatcher: CharDeleted = new CharDeleted();
      dispatcher.sendTo(this.connection);
    } catch (error) {
      const alertDispatcher: AlertDispatcher = new AlertDispatcher(
        AlertType.Error,
        `Error deleting character: ${error}`,
        false,
      );
      alertDispatcher.sendTo(this.connection);
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
      character.mapPositiony,
      character.createdAt,
      character.updatedAt,
      character.gender,
    );
  }
}
