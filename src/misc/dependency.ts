import { PrismaClient } from "@prisma/client";
import { ByteBuffer } from "../communication/byte-buffer";
import { ClientMessage } from "../communication/messages/client-message";
import { Memory } from "../core/memory";
import { Handler } from "../net/handler";
import { Manager } from "../net/manager";
import { Setup } from "../net/setup";
import { Logger } from "./logger";
import { Password } from "./password";
import { serviceLocator } from "./service-locator";

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
			() => {
				return new AccessAccountIncoming();
			},
		);

		serviceLocator.registerFactory<CreateAccountIncoming>(
			CreateAccountIncoming,
			() => {
				return new CreateAccountIncoming();
			},
		);

		serviceLocator.registerFactory<DeleteAccountIncoming>(
			DeleteAccountIncoming,
			() => {
				return new DeleteAccountIncoming();
			},
		);

		serviceLocator.registerFactory<RecoverAccountIncoming>(
			RecoverAccountIncoming,
			() => {
				return new RecoverAccountIncoming();
			},
		);

		serviceLocator.registerFactory<ChangePasswordIncoming>(
			ChangePasswordIncoming,
			() => {
				return new ChangePasswordIncoming();
			},
		);

		serviceLocator.registerFactory<CharacterListIncoming>(
			CharacterListIncoming,
			() => {
				return new CharacterListIncoming();
			},
		);

		serviceLocator.registerFactory<CreateCharacterIncoming>(
			CreateCharacterIncoming,
			() => {
				return new CreateCharacterIncoming();
			},
		);

		serviceLocator.registerFactory<DeleteCharacterIncoming>(
			DeleteCharacterIncoming,
			() => {
				return new DeleteCharacterIncoming();
			},
		);

		serviceLocator.registerFactory<SelectCharacterIncoming>(
			SelectCharacterIncoming,
			() => {
				return new SelectCharacterIncoming();
			},
		);

		serviceLocator.registerFactory<MoveCharacterIncoming>(
			MoveCharacterIncoming,
			() => {
				return new MoveCharacterIncoming();
			},
		);

		serviceLocator.registerFactory<ChatIncoming>(ChatIncoming, () => {
			return new ChatIncoming();
		});
	}
}
