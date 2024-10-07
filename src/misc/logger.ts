const colorText = (text: string, colorCode: number): string => {
	return `\x1b[${colorCode}m${text}\x1b[0m`;
};

const GREEN = 32;
const YELLOW = 33;
const BLUE = 34;
const RED = 31;

export class Logger {
	private _getTimestamp(): string {
		return new Date().toLocaleString();
	}

	public info(message: string): void {
		console.log(
			`${colorText("[INFO]", GREEN)} ${this._getTimestamp()} - ${colorText(message, GREEN)}`,
		);
	}

	public warning(message: string): void {
		console.log(
			`${colorText("[WARN]", YELLOW)} ${this._getTimestamp()} - ${colorText(message, YELLOW)}`,
		);
	}

	public player(message: string): void {
		console.log(
			`${colorText("[PLAYER]", BLUE)} ${this._getTimestamp()} - ${colorText(message, BLUE)}`,
		);
	}

	public error(message: string): void {
		console.log(
			`${colorText("[ERRO]", RED)} ${this._getTimestamp()} - ${colorText(message, RED)}`,
		);
	}
}
