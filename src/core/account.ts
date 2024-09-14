import { AccessAccountSuccess } from "../communication/outgoing/dispatcher/access-account-success";
import { VersionChecker } from "../misc/check-version";
import type { Connection } from "./connection";

export class Account {
  constructor(connection: Connection, email: string, password: string, major: number, minor: number, revision: number) {
    this.connection = connection;
    this.email = email;
    this.password = password;
    this.major = major;
    this.minor = minor;
    this.revision = revision;
  }

  connection: Connection;
  email: string;
  password: string;
  major: number;
  minor: number;
  revision: number;

  public async accessAccount(): Promise<void> {
    if (!VersionChecker.checkAndAlert(this.major, this.minor, this.revision, this.connection)) {
      return;
    }

    this.connection.addDatabaseId(1);

    const dispatcher: AccessAccountSuccess = new AccessAccountSuccess(this.connection);
    dispatcher.sendTo(this.connection);
  }

  public async createAccount() {
    if (!VersionChecker.checkAndAlert(this.major, this.minor, this.revision, this.connection)) {
      return;
    }
  }
}
