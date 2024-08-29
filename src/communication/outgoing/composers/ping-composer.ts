import { ServerHeaders } from "../../protocol/server-headers";
import { ServerMessage } from "../../protocol/server-message";

export class PingComposer extends ServerMessage {
  constructor() {
    super(ServerHeaders.Pong);

    this.putInt8(2); // coloquei 8 bits no buffer
    this.putInt16(1666); // coloquei 16 bits no buffer
    this.putInt32(32222212312312); // coloquei 32 bits no buffer
    this.putString("Olá mundo!"); // coloquei uma string no buffer
  }
}
