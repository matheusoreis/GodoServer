import { Setup } from "./src/net/setup";

async function main() {
  await new Setup().start();
}

main();
