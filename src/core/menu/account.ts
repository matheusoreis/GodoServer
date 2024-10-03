import { PrismaClient } from "@prisma/client";
import { VersionChecker } from "../../misc/check-version";
import type { Connection } from "../shared/connection";
import { Password } from "../../misc/password";
import { serviceLocator } from "../../misc/service-locator";
import { Alert } from "../../communication/outgoing/dispatcher/shared/alert";
import { AccessSuccessful } from "../../communication/outgoing/dispatcher/menu/access-successful";
import { AccountCreated } from "../../communication/outgoing/dispatcher/menu/account-created";

export class Account {
  constructor(connection: Connection, email: string, password: string, major: number, minor: number, revision: number) {
    this.connection = connection;
    this.email = email;
    this.password = password;
    this.major = major;
    this.minor = minor;
    this.revision = revision;
    this.prisma = serviceLocator.get<PrismaClient>(PrismaClient);
    this.passwordHash = serviceLocator.get<Password>(Password);
  }

  connection: Connection;
  email: string;
  password: string;
  major: number;
  minor: number;
  revision: number;
  prisma: PrismaClient;
  passwordHash: Password;

  public async accessAccount(): Promise<void> {
    if (!VersionChecker.checkAndAlert(this.major, this.minor, this.revision, this.connection)) {
      return;
    }

    if (!this.email || !this.password) {
      new Alert("Email and password are mandatory.", false).sendTo(this.connection);
    }

    try {
      const account = await this.prisma.account.findUnique({
        where: { email: this.email },
      });

      if (!account) {
        new Alert("Account not found.", false).sendTo(this.connection);

        return;
      }

      const isPasswordValid = await this.passwordHash.verify(this.password, account!.password);

      if (!isPasswordValid) {
        new Alert("Wrong password.", false).sendTo(this.connection);

        return;
      }

      this.connection.addDatabaseId(account!.id);

      const dispatcher: AccessSuccessful = new AccessSuccessful();
      dispatcher.sendTo(this.connection);
    } catch (error) {
      console.log(error);
      new Alert(`Error: ${error}`, false).sendTo(this.connection);
    }
  }

  public async createAccount() {
    if (!VersionChecker.checkAndAlert(this.major, this.minor, this.revision, this.connection)) {
      return;
    }

    if (!this.email || !this.password) {
      new Alert("Email and password are mandatory.", false).sendTo(this.connection);

      return;
    }

    try {
      const existingAccount = await this.prisma.account.findUnique({
        where: { email: this.email },
      });

      if (existingAccount) {
        new Alert("Account with this email already exists.", false).sendTo(this.connection);

        return;
      }

      const hashedPassword = await this.passwordHash.hash(this.password);

      await this.prisma.account.create({
        data: {
          email: this.email,
          password: hashedPassword,
          roles: {
            connect: { id: 1 },
          },
        },
      });

      new Alert("Your account has been successfully registered!", false).sendTo(this.connection);

      const dispatcher: AccountCreated = new AccountCreated(this.connection);
      dispatcher.sendTo(this.connection);
    } catch (error) {
      console.log(error);
      new Alert(`Error creating account: ${error}`, false).sendTo(this.connection);
    }
  }
}
