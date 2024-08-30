import type { Server, ServerWebSocket } from "bun";
import { Logger } from "../misc/logger";
import { Manager } from "./manager";
import { SERVER_HOST, SERVER_PORT } from "../misc/constants";

/**
 * A classe `Setup` é responsável por iniciar e configurar o servidor, gerenciar conexões WebSocket
 * e lidar com requests HTTP.
 */
export class Setup {
  /**
   * Cria uma instância da classe `Setup`.
   * Inicializa o logger, o manager e define os manipuladores de WebSocket.
   */
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

  /** Manipuladores de eventos WebSocket (abertura, fechamento, e mensagens). */
  private websocketHandlers: {
    open: (ws: ServerWebSocket) => void;
    close: (ws: ServerWebSocket, code: number, message: string) => void;
    message: (ws: ServerWebSocket, message: Buffer) => void;
  };

  /**
   * Inicia o servidor, configura os manipuladores de WebSocket e inicializa a memória.
   */
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

  /**
   * Manipulador para requests HTTP.
   * Lida com requests regulares e requests de upgrade para WebSocket.
   *
   * @param {Request} req - O request HTTP recebido.
   * @param {Server} server - A instância do servidor.
   * @returns {Promise<Response>} Resposta HTTP ou WebSocket upgrade.
   */
  private async fetchHandler(req: Request, server: Server): Promise<Response> {
    if (req.headers.get("upgrade")?.toLowerCase() === "websocket") {
      const success: boolean = server.upgrade(req);

      if (!success) {
        return new Response("Upgrade to WebSocket failed", { status: 400 });
      }
    }

    return new Response("HTTP access is not allowed", { status: 403 });
  }

  /**
   * Manipulador para a abertura de uma nova conexão WebSocket.
   *
   * * @param {ServerWebSocket} ws - O WebSocket conectado.
   */
  private websocketOpen(ws: ServerWebSocket): void {
    this.logger.info("New connection from: " + ws.remoteAddress);
    this.manager.websocketOpen(ws);
  }

  /**
   * Manipulador para o fechamento de uma conexão WebSocket.
   *
   * @param {ServerWebSocket} ws - O WebSocket que foi desconectado.
   * @param {number} code - Código de status de fechamento.
   * @param {string} message - Mensagem informativa sobre o fechamento.
   */
  private websocketClose(
    ws: ServerWebSocket,
    code: number,
    message: string,
  ): void {
    this.logger.info("Connection closed, address: " + ws.remoteAddress);
    this.manager.websocketClose(ws, code, message);
  }

  /**
   * Manipulador para mensagens recebidas em uma conexão WebSocket.
   *
   * @param {ServerWebSocket} ws - O WebSocket que enviou a mensagem.
   * @param {Buffer} message - A mensagem recebida.
   */
  private websocketMessage(ws: ServerWebSocket, message: Buffer): void {
    this.manager.websocketMessage(ws, message);
  }

  /**
   * Carrega a memória do servidor.
   */
  private async loadMemory(): Promise<void> {}
}
