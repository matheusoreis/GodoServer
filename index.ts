import { Setup } from "./src/net/setup";

/**
 * Função principal que inicializa a aplicação.
 * Cria uma instância da classe `Setup` e inicia o processo de inicialização.
 */
async function main() {
  await new Setup().start();
}

main();
