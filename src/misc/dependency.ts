import { PrismaClient } from "@prisma/client";
import { serviceLocator } from "./service-locator";
import { Logger } from "./logger";
import { Memory } from "./memory";
import { ByteBuffer } from "./byte-buffer";
import { Setup } from "../setup";
import { Manager } from "../net/manager";
import { Handler } from "../net/handler";
import { ClientMessage } from "../net/protocol/client-message";
import { Password } from "./password";
import { PingIncoming } from "../core/ping/ping.incoming";
import { AccessAccountIncoming } from "../core/access-account/access-account.incoming";
import { CreateAccountIncoming } from "../core/create-account/create-account.incoming";
import { DeleteAccountIncoming } from "../core/delete-account/delete-account.incoming";
import { RecoverAccountIncoming } from "../core/recover-account/recover-account.incoming";
import { ChangePasswordIncoming } from "../core/change-password/change-password.incoming";
import { CharacterListIncoming } from "../core/character-list/character-list.incoming";
import { CreateCharacterIncoming } from "../core/create-character/create-character.incoming";
import { DeleteCharacterIncoming } from "../core/delete-character/delete-character.incoming";
import { SelectCharacterIncoming } from "../core/select-character/select-character.incoming";
import { MoveCharacterIncoming } from "../core/move-character/move-character.incoming";
import { ChatIncoming } from "../core/chat/chat.incoming";

export class Dependency {
	public setup() {
		serviceLocator.registerFactory<Logger>(Logger, () => {
			return new Logger();
		});

		serviceLocator.registerSingleton<Memory>(Memory, new Memory());

		serviceLocator.registerFactory<ByteBuffer>(ByteBuffer, () => {
			return new ByteBuffer();
		});

		serviceLocator.registerFactory<Setup>(Setup, () => {
			return new Setup();
		});

		serviceLocator.registerFactory<Manager>(Manager, () => {
			return new Manager();
		});

		serviceLocator.registerFactory<Handler>(Handler, () => {
			return new Handler();
		});

		serviceLocator.registerFactory<PrismaClient>(PrismaClient, () => {
			return new PrismaClient();
		});

		serviceLocator.registerFactory<ClientMessage>(ClientMessage, () => {
			return new ClientMessage();
		});

		serviceLocator.registerFactory<Password>(Password, () => {
			return new Password();
		});

		serviceLocator.registerFactory<PingIncoming>(PingIncoming, () => {
			return new PingIncoming();
		});

		serviceLocator.registerFactory<AccessAccountIncoming>(
			AccessAccountIncoming,
			() => new AccessAccountIncoming(),
		);

		serviceLocator.registerFactory<CreateAccountIncoming>(
			CreateAccountIncoming,
			() => new CreateAccountIncoming(),
		);

		serviceLocator.registerFactory<DeleteAccountIncoming>(
			DeleteAccountIncoming,
			() => new DeleteAccountIncoming(),
		);

		serviceLocator.registerFactory<RecoverAccountIncoming>(
			RecoverAccountIncoming,
			() => new RecoverAccountIncoming(),
		);

		serviceLocator.registerFactory<ChangePasswordIncoming>(
			ChangePasswordIncoming,
			() => new ChangePasswordIncoming(),
		);

		serviceLocator.registerFactory<CharacterListIncoming>(
			CharacterListIncoming,
			() => new CharacterListIncoming(),
		);

		serviceLocator.registerFactory<CreateCharacterIncoming>(
			CreateCharacterIncoming,
			() => new CreateCharacterIncoming(),
		);

		serviceLocator.registerFactory<DeleteCharacterIncoming>(
			DeleteCharacterIncoming,
			() => new DeleteCharacterIncoming(),
		);

		serviceLocator.registerFactory<SelectCharacterIncoming>(
			SelectCharacterIncoming,
			() => new SelectCharacterIncoming(),
		);

		serviceLocator.registerFactory<MoveCharacterIncoming>(
			MoveCharacterIncoming,
			() => new MoveCharacterIncoming(),
		);

		serviceLocator.registerFactory<ChatIncoming>(ChatIncoming, () => {
			return new ChatIncoming();
		});
	}
}
