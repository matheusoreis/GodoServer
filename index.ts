import { Dependency } from "./src/misc/dependency";
import { serviceLocator } from "./src/misc/service-locator";
import { Setup } from "./src/net/setup";

async function main() {
	const dependency: Dependency = new Dependency();
	dependency.setup();

	const setup: Setup = serviceLocator.get<Setup>(Setup);
	await setup.start();
}

main();
