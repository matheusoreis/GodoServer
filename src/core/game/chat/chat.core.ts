import { PROFANITY_LIST } from "../../../misc/constants";
import { AlertCore } from "../../alert/alert.core";
import type { Connection } from "../../connection";
import { ChatOutgoing } from "./chat.outgoing";

export enum ChatChannel {
	MAP = 0,
	GLOBAL = 1,
}

export class ChatCore {
	constructor(connection: Connection, channel: number, message: string) {
		this.connection = connection;
		this.channel = channel;
		this.message = message;
	}

	public readonly connection: Connection;
	public readonly channel: number;
	public readonly message: string;

	public mapMessage(worldId: number): void {
		const processedMessage = this.censorProfanity(this.message, PROFANITY_LIST);

		new ChatOutgoing(this.channel, processedMessage).sendToWorld(worldId);
	}

	public globalMessage(): void {
		const processedMessage = this.censorProfanity(this.message, PROFANITY_LIST);

		new ChatOutgoing(this.channel, processedMessage).sendToAll();
	}

	private censorProfanity(input: string, profanityList: string[]): string {
		let censoredText = input;

		for (const word of profanityList) {
			const regex = new RegExp(word, "gi");
			censoredText = censoredText.replace(regex, "*".repeat(word.length));
		}

		return censoredText;
	}
}
