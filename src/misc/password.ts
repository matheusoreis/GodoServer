/**
 * A classe `Password` fornece métodos para hash e verificação de senhas.
 */
export class Password {
  /**
   * Cria o hash de uma senha.
   *
   * @param {string} password - A senha a ser hasheada.
   * @returns {Promise<string>} Uma promise que resolve para o hash da senha.
   */
  public async hash(password: string): Promise<string> {
    const hashedPassword = await Bun.password.hash(password);
    return hashedPassword;
  }

  /**
   * Verifica se uma senha corresponde a um hash fornecido.
   *
   * @param {string} password - A senha a ser verificada.
   * @param {string} hashedPassword - O hash da senha a ser comparado.
   * @returns {Promise<boolean>} Uma promise que resolve para `true` se a senha corresponder ao hash, `false` caso contrário.
   */
  public async verify(password: string, hashedPassword: string): Promise<boolean> {
    return await Bun.password.verify(password, hashedPassword);
  }
}
