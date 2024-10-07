import { PrismaClient } from "@prisma/client";
import { Logger } from "../../../misc/logger";
import { Password } from "../../../misc/password";
import { serviceLocator } from "../../../misc/service-locator";
import { AlertCore } from "../../alert/alert.core";
import type { Connection } from "../../connection";
import { VersionCore } from "../../version/version.core";
import { CreateAccountOutgoing } from "./create-account.outgoing";
import type { PrismaAccount } from "../../../misc/prisma-types";

export class CreateAccountCore {
	constructor(
		connection: Connection,
		email: string,
		password: string,
		rePassword: string,
		major: number,
		minor: number,
		revision: number,
	) {
		this.connection = connection;
		this.email = email;
		this.password = password;
		this.rePassword = rePassword;
		this.major = major;
		this.minor = minor;
		this.revision = revision;
		this.prisma = serviceLocator.get<PrismaClient>(PrismaClient);
		this.hash = serviceLocator.get<Password>(Password);
		this.logger = serviceLocator.get<Logger>(Logger);
	}

	public readonly connection: Connection;
	public readonly email: string;
	public readonly password: string;
	public readonly rePassword: string;
	public readonly major: number;
	public readonly minor: number;
	public readonly revision: number;

	private readonly prisma: PrismaClient;
	private readonly hash: Password;
	private readonly logger: Logger;

	public async create(): Promise<void> {
		const version: boolean = new VersionCore(
			this.connection,
			this.major,
			this.minor,
			this.revision,
		).check();

		if (!version) {
			return;
		}

		if (!this.email) {
			new AlertCore(this.connection, "O email é obrigatório!", false).send();
		}

		if (!this.password) {
			new AlertCore(this.connection, "A senha é obrigatória!", false).send();
		}

		try {
			const account: PrismaAccount | null =
				await this.prisma.accounts.findUnique({
					where: {
						email: this.email,
					},
				});

			if (account) {
				new AlertCore(
					this.connection,
					"Já existe uma conta com este e-mail.",
					false,
				).send();

				return;
			}

			const hashedPassword: string = await this.hash.hash(this.password);

			await this.prisma.accounts.create({
				data: {
					email: this.email,
					password: hashedPassword,
					roles: {
						connect: { id: 1 },
					},
				},
				include: { roles: true },
			});

			new AlertCore(
				this.connection,
				"Sua conta foi criada com sucesso!",
				false,
			).send();

			new CreateAccountOutgoing().sendTo(this.connection);
		} catch (error) {
			new AlertCore(this.connection, `Error: ${error}`, true).send();
			this.logger.error(`${error}`);
		}
	}
}
