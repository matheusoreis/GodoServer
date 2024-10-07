import { Dependency } from './src/misc/dependency';
import { serviceLocator } from './src/misc/service-locator';
import { Setup } from './src/net/setup';

/**
 * Função principal que inicializa a aplicação.
 * Cria uma instância da classe `Setup` e inicia o processo de inicialização.
 */
async function main() {
  const dependency: Dependency = new Dependency();
  dependency.setup();

  const setup: Setup = serviceLocator.get<Setup>(Setup);
  await setup.start();
}

main();
