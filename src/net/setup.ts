import type { Server, ServerWebSocket } from "bun";
import { Logger } from "../misc/logger";
import { Manager } from "./manager";
import { SERVER_HOST, SERVER_PORT } from "../misc/constants";

export class Setup {
  constructor() {
    this.logger = new Logger();
    this.manager = new Manager();

    this.websocketHandlers = {
      open: this.websocketOpen.bind(this),
      close: this.websocketClose.bind(this),
      message: this.websocketMessage.bind(this),
    };
  }

  private logger: Logger;
  private manager: Manager;

  private websocketHandlers: {
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

      this.logger.info("Server started successfully");
      this.logger.info("Server listening on: " + SERVER_PORT);

      this.logger.info("Initializing server memory...");
      await this.loadMemory();

      this.logger.info("Waiting for connections...");
    } catch (error) {
      this.logger.error("Failed to start the server: " + error);
    }
  }

  private async fetchHandler(req: Request, server: Server): Promise<Response> {
    if (req.headers.get("upgrade")?.toLowerCase() === "websocket") {
      const success: boolean = server.upgrade(req);

      if (!success) {
        return new Response("Upgrade to WebSocket failed", { status: 400 });
      }
    }

    return new Response("Hello, world!", { status: 200 });
  }

  private websocketOpen(ws: ServerWebSocket): void {
    this.logger.info("New connection from: " + ws.remoteAddress);
    this.manager.websocketOpen(ws);
  }

  private websocketClose(ws: ServerWebSocket, code: number, message: string): void {
    this.logger.info("Connection closed, address: " + ws.remoteAddress);
    this.manager.websocketClose(ws, code, message);
  }

  private websocketMessage(ws: ServerWebSocket, message: Buffer): void {
    this.manager.websocketMessage(ws, message);
  }

  private async loadMemory(): Promise<void> {}
}
