import { CharDeleted } from "../communication/outgoing/dispatcher/char-deleted";
import { CharDisconnected } from "../communication/outgoing/dispatcher/char-disconnected";
import { CharMoved } from "../communication/outgoing/dispatcher/char-moved";
import { CharSelected } from "../communication/outgoing/dispatcher/char-selected";
import { MapCharsTo } from "../communication/outgoing/dispatcher/map-chars-to";
import { NewCharToMap } from "../communication/outgoing/dispatcher/new-char-to-map";
import { MAP_LOOP } from "../misc/constants";
import { Logger } from "../misc/logger";
import { serviceLocator } from "../misc/service-locator";
import type { CharacterModel } from "./character";
import type { Connection } from "./connection";

export class GameMap {
  constructor(id: number, name: string, sizeX: number, sizeY: number) {
    this.logger = serviceLocator.get<Logger>(Logger);

    this.id = id;
    this.name = name;
    this.sizeX = sizeX;
    this.sizeY = sizeY;

    this.loop();
  }

  logger: Logger;
  id: number;
  name: string;
  sizeX: number;
  sizeY: number;
  private chars: Map<number, CharacterModel> = new Map();

  public enter(connection: Connection, character: CharacterModel): void {
    character.loop();

    if (character.currentMap !== this.id) {
      console.error(`Character ${character.id} is not supposed to enter this map.`);
      return;
    }

    // Notifica o novo personagem selecionado
    const charSelected = new CharSelected(character);
    charSelected.sendTo(connection);

    // Notifica todos os personagens no mapa sobre a entrada do novo personagem
    const newCharTo = new NewCharToMap(character);
    newCharTo.sendToMapExcept(this.id, connection);

    // Notifica o novo personagem sobre todos os personagens já presentes no mapa
    const mapCharsTo = new MapCharsTo(Array.from(this.chars.values()));
    mapCharsTo.sendTo(connection);

    // Adiciona o personagem ao mapa
    this.chars.set(character.id, character);
  }

  public movePlayer(
    connection: Connection,
    character: CharacterModel,
    action: number,
    positionX: number,
    positionY: number,
    direction: number,
    velocityX: number,
    velocityY: number,
  ): void {
    if (this.chars.has(character.id)) {
      character.mapPositionX = positionX;
      character.mapPositionY = positionY;
      character.direction = direction;

      const charMoved = new CharMoved(character, action, positionX, positionY, direction, velocityX, velocityY);
      charMoved.sendToMapExcept(this.id, connection);
    } else {
      console.error(`Character ${character.id} is not in this map.`);
    }
  }

  public removePlayer(char: CharacterModel): void {
    if (this.chars.has(char.id)) {
      this.chars.delete(char.id);

      const disconnect: CharDisconnected = new CharDisconnected(char);
      disconnect.sendToMap(char.currentMap);
    } else {
      console.error(`Character ${char.id} is not in this map.`);
    }
  }

  public getPlayer(characterId: number): CharacterModel | undefined {
    return this.chars.get(characterId);
  }

  public async loop(): Promise<void> {
    this.logger.info(`Initializing the Map ${this.id} loop`);

    const loopInterval = MAP_LOOP;

    setInterval(async () => {
      //
    }, loopInterval);
  }
}
