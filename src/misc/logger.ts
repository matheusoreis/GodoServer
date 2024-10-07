/**
 * Retorna o texto formatado com o código de cor especificado para saída no console.
 *
 * @param {string} text - O texto a ser colorido.
 * @param {number} colorCode - O código de cor ANSI para a cor desejada.
 * @returns {string} O texto colorido.
 */
const colorText = function (text: string, colorCode: number): string {
  return `\x1b[${colorCode}m${text}\x1b[0m`;
};

/** Códigos de cor ANSI para diferentes tipos de mensagens. */
const GREEN = 32;
const YELLOW = 33;
const BLUE = 34;
const RED = 31;

/**
 * A classe `Logger` fornece métodos para registrar mensagens com diferentes níveis de severidade,
 * com suporte para colorização do texto no console.
 */
export class Logger {
  /**
   * Retorna o timestamp atual formatado como uma string.
   *
   * @returns {string} O timestamp atual no formato de data e hora local.
   */
  private _getTimestamp(): string {
    return new Date().toLocaleString();
  }

  /**
   * Registra uma mensagem de informação no console, colorida em verde.
   *
   * @param {string} message - A mensagem a ser registrada.
   */
  public info(message: string): void {
    console.log(
      `${colorText('[INFO]', GREEN)} ${this._getTimestamp()} - ${colorText(message, GREEN)}`,
    );
  }

  /**
   * Registra uma mensagem de aviso no console, colorida em amarelo.
   *
   * @param {string} message - A mensagem a ser registrada.
   */
  public warning(message: string): void {
    console.log(
      `${colorText('[WARN]', YELLOW)} ${this._getTimestamp()} - ${colorText(message, YELLOW)}`,
    );
  }

  /**
   * Registra uma mensagem de jogador no console, colorida em azul.
   *
   * @param {string} message - A mensagem a ser registrada.
   */
  public player(message: string): void {
    console.log(
      `${colorText('[PLAYER]', BLUE)} ${this._getTimestamp()} - ${colorText(message, BLUE)}`,
    );
  }

  /**
   * Registra uma mensagem de erro no console, colorida em vermelho.
   *
   * @param {string} message - A mensagem a ser registrada.
   */
  public error(message: string): void {
    console.log(`${colorText('[ERRO]', RED)} ${this._getTimestamp()} - ${colorText(message, RED)}`);
  }
}
