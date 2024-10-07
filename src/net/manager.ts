import type { ServerWebSocket } from 'bun';
import { Logger } from '../misc/logger';
import { serviceLocator } from '../misc/service-locator';
import { Memory } from '../core/memory';
import type { Character } from '../core/game/character';
import { Connection } from '../core/connection';
import { AlertCore } from '../core/alert/alert.core';

export class Manager {
  constructor() {
    this.logger = serviceLocator.get<Logger>(Logger);
    this.memory = serviceLocator.get<Memory>(Memory);
  }

  private readonly logger: Logger;
  private readonly memory: Memory;

  public websocketOpen(ws: ServerWebSocket): void {
    const firstAvailableId: number | undefined = this.memory.connections.getFirstEmptySlot();

    if (firstAvailableId == undefined) {
      this.handleFullServer(ws);

      return;
    }

    const connectionModel: Connection = new Connection(ws, firstAvailableId);
    connectionModel.addToMemory();
  }

  public async websocketClose(ws: ServerWebSocket): Promise<void> {
    const connection: Connection | undefined = this.GetSocket(ws, this.memory);

    if (!connection) {
      this.logger.error(`Connection not found for WebSocket.`);
      return;
    }

    try {
      const charInUse: Character | void = connection.getCharInUse();

      if (!charInUse) {
        return;
      }

      // Atualize o personagem
      await this.updateCharacterBeforeDisconnect(charInUse);

      // Remova o personagem do mapa atual
      await this.removeCharacterFromCurrentMap(connection, charInUse);

      charInUse.stopLoop();

      this.logger.info(`Character for connection ${connection.id} updated before disconnect.`);
    } catch (error) {
      this.logger.error(`Failed to update character before disconnect: ${error}`);
      console.error(error);
    } finally {
      this.cleanupConnection(ws);
    }
  }

  private async updateCharacterBeforeDisconnect(charInUse: Character): Promise<void> {
    try {
      await charInUse.updateCharacter(charInUse);
    } catch (error) {
      throw new Error(`Failed to update character: ${error}`);
    }
  }

  private async removeCharacterFromCurrentMap(
    connection: Connection,
    charInUse: Character,
  ): Promise<void> {
    try {
      const mapId = charInUse.currentMap;
      const currentMap = charInUse.findMapById(mapId);

      if (currentMap) {
        currentMap.remove(connection, charInUse);
      } else {
        this.logger.warning(`Map with ID ${mapId} not found when removing character.`);
      }
    } catch (error) {
      throw new Error(`Failed to remove character from map: ${error}`);
    }
  }

  public websocketMessage(ws: ServerWebSocket, message: Uint8Array): void {
    const connection: Connection | undefined = this.GetSocket(ws, this.memory);

    if (!connection) {
      this.logger.error(`Connection not found for WebSocket.`);
      this.cleanupConnection(ws);
      return;
    }

    connection.handleMessage(message);
  }

  private handleFullServer(ws: ServerWebSocket): void {
    const connection: Connection = new Connection(ws, -1);

    new AlertCore(connection, 'Server is full! disconnecting...', true).send();
    this.logger.info(`Server is full, disconnecting client: ${ws.remoteAddress}`);
  }

  private cleanupConnection(ws: ServerWebSocket): void {
    const connection: Connection | undefined = this.GetSocket(ws, this.memory);

    if (connection) {
      this.memory.connections.remove(connection.id);
      this.logger.info(`Connection removed, address: ${ws.remoteAddress}`);
      connection.close();
    }
  }

  private GetSocket(ws: ServerWebSocket, memory: Memory): Connection | undefined {
    for (const index of memory.connections.getFilledSlots()) {
      const connection = memory.connections.get(index);

      if (connection && connection.ws === ws) {
        return connection;
      }
    }
    return undefined;
  }
}
