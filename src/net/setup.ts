import type { Server, ServerWebSocket } from 'bun';
import { Logger } from '../misc/logger';
import { Manager } from './manager';
import { SERVER_HOST, SERVER_PORT } from '../misc/constants';
import { serviceLocator } from '../misc/service-locator';
import { Memory } from '../core/memory';
import { WorldCore } from '../core/game/world/world.core';
import { Vector2 } from '../misc/vector2';
import { PrismaClient } from '@prisma/client';

export class Setup {
  constructor() {
    this.logger = serviceLocator.get<Logger>(Logger);
    this.manager = serviceLocator.get<Manager>(Manager);
    this.prisma = serviceLocator.get<PrismaClient>(PrismaClient);
    this.memory = serviceLocator.get<Memory>(Memory);

    this.websocketHandlers = {
      open: this.websocketOpen.bind(this),
      close: this.websocketClose.bind(this),
      message: this.websocketMessage.bind(this),
    };
  }

  private readonly logger: Logger;
  private readonly manager: Manager;
  private readonly prisma: PrismaClient;
  private readonly memory: Memory;

  private readonly websocketHandlers: {
    open: (ws: ServerWebSocket) => void;
    close: (ws: ServerWebSocket, code: number, message: string) => void;
    message: (ws: ServerWebSocket, message: Buffer) => void;
  };

  public async start(): Promise<void> {
    try {
      Bun.serve({
        hostname: SERVER_HOST,
        port: SERVER_PORT,
        fetch: this.fetchHandler,
        websocket: this.websocketHandlers,
      });

      this.logger.info('Server started successfully');
      this.logger.info('Server listening on: ' + SERVER_PORT);

      this.logger.info('Initializing server memory...');
      await this.loadMemory();

      this.logger.info('Waiting for connections...');
    } catch (error) {
      this.logger.error('Failed to start the server: ' + error);
    }
  }

  private async fetchHandler(req: Request, server: Server): Promise<Response> {
    if (req.headers.get('upgrade')?.toLowerCase() === 'websocket') {
      const success: boolean = server.upgrade(req);

      if (!success) {
        return new Response('Upgrade to WebSocket failed', { status: 400 });
      }
    }

    return new Response('HTTP access is not allowed', { status: 403 });
  }

  private websocketOpen(ws: ServerWebSocket): void {
    this.logger.info('New connection from: ' + ws.remoteAddress);
    this.manager.websocketOpen(ws);
  }

  private websocketClose(ws: ServerWebSocket): void {
    this.logger.info('Connection closed, address: ' + ws.remoteAddress);
    this.manager.websocketClose(ws);
  }

  private websocketMessage(ws: ServerWebSocket, message: Buffer): void {
    const uint8Message = new Uint8Array(message);
    this.manager.websocketMessage(ws, uint8Message);
  }

  private async loadMemory(): Promise<void> {
    await this.loadMaps();
  }

  private async loadMaps(): Promise<void> {
    try {
      const maps = await this.prisma.worlds.findMany();

      if (maps.length === 0) {
        console.log('No maps found in the database.');
        return;
      }

      for (const map of maps) {
        const gameMap = new WorldCore(map.id, map.name, new Vector2(map.sizeX, map.sizeY));
        this.memory.worlds.add(gameMap);
      }

      this.logger.info(`Loaded ${maps.length} maps into memory.`);
    } catch (error) {
      this.logger.error('Failed to load maps from database: ' + error);
    }
  }
}
