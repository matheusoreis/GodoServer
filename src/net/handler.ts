import { AccessAccountIncoming } from "../core/access-account/access-account.incoming";
import { ChangePasswordIncoming } from "../core/change-password/change-password.incoming";
import { CharacterListIncoming } from "../core/character-list/character-list.incoming";
import { ChatIncoming } from "../core/chat/chat.incoming";
import { CreateAccountIncoming } from "../core/create-account/create-account.incoming";
import { CreateCharacterIncoming } from "../core/create-character/create-character.incoming";
import { DeleteAccountIncoming } from "../core/delete-account/delete-account.incoming";
import { DeleteCharacterIncoming } from "../core/delete-character/delete-character.incoming";
import { MoveCharacterIncoming } from "../core/move-character/move-character.incoming";
import { PingIncoming } from "../core/ping/ping.incoming";
import { RecoverAccountIncoming } from "../core/recover-account/recover-account.incoming";
import { SelectCharacterIncoming } from "../core/select-character/select-character.incoming";
import { Logger } from "../misc/logger";
import { serviceLocator } from "../misc/service-locator";
import type { Connection } from "./connection";
import type { Incoming } from "./messages/incoming";
import { ClientHeaders } from "./protocol/client-headers";
import type { ClientMessage } from "./protocol/client-message";

export class Handler {
	constructor() {
		this.logger = serviceLocator.get<Logger>(Logger);
		this.requestHandlers = {};
		this.registerRequests();
	}

	private readonly logger: Logger;
	private readonly requestHandlers: Partial<Record<ClientHeaders, Incoming>>;

	public handleMessage(connection: Connection, message: ClientMessage): void {
		if (!connection.isConnected()) {
			return;
		}

		const messageId = message.getId() as ClientHeaders;

		if (this.requestHandlers[messageId]) {
			const handler = this.requestHandlers[messageId];

			handler?.handle(connection, message);
		} else {
			this.logger.error(`Nenhum pacote encontrado para o id: ${messageId}`);
			connection.close();
		}
	}

	private registerRequests() {
		const ping = serviceLocator.get<PingIncoming>(PingIncoming);
		this.requestHandlers[ClientHeaders.Ping] = ping;

		const accessAccount = serviceLocator.get<AccessAccountIncoming>(
			AccessAccountIncoming,
		);
		this.requestHandlers[ClientHeaders.AccessAccount] = accessAccount;

		const createAccount = serviceLocator.get<CreateAccountIncoming>(
			CreateAccountIncoming,
		);
		this.requestHandlers[ClientHeaders.CreateAccount] = createAccount;

		const deleteAccount = serviceLocator.get<DeleteAccountIncoming>(
			DeleteAccountIncoming,
		);
		this.requestHandlers[ClientHeaders.DeleteAccount] = deleteAccount;

		const recoverAccount = serviceLocator.get<RecoverAccountIncoming>(
			RecoverAccountIncoming,
		);
		this.requestHandlers[ClientHeaders.RecoverAccount] = recoverAccount;

		const changePassword = serviceLocator.get<ChangePasswordIncoming>(
			ChangePasswordIncoming,
		);
		this.requestHandlers[ClientHeaders.ChangePassword] = changePassword;

		const characterList = serviceLocator.get<CharacterListIncoming>(
			CharacterListIncoming,
		);
		this.requestHandlers[ClientHeaders.CharacterList] = characterList;

		const createCharacter = serviceLocator.get<CreateCharacterIncoming>(
			CreateCharacterIncoming,
		);
		this.requestHandlers[ClientHeaders.CreateCharacter] = createCharacter;

		const deleteCharacter = serviceLocator.get<DeleteCharacterIncoming>(
			DeleteCharacterIncoming,
		);
		this.requestHandlers[ClientHeaders.DeleteCharacter] = deleteCharacter;

		const selectCharacter = serviceLocator.get<SelectCharacterIncoming>(
			SelectCharacterIncoming,
		);
		this.requestHandlers[ClientHeaders.SelectCharacter] = selectCharacter;

		const moveCharacter = serviceLocator.get<MoveCharacterIncoming>(
			MoveCharacterIncoming,
		);
		this.requestHandlers[ClientHeaders.MoveCharacter] = moveCharacter;

		const chatMessage = serviceLocator.get<ChatIncoming>(ChatIncoming);
		this.requestHandlers[ClientHeaders.ChatMessage] = chatMessage;
	}
}
