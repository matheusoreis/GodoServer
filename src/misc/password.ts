export class Password {
	public async hash(password: string): Promise<string> {
		const hashedPassword = await Bun.password.hash(password);
		return hashedPassword;
	}

	public async verify(password: string, hashed: string): Promise<boolean> {
		return await Bun.password.verify(password, hashed);
	}
}
