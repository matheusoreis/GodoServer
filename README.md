# GodoServer

[![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/BunJS-010409?style=for-the-badge)](https://bun.sh/)
[![Websocket](https://img.shields.io/badge/uWebsocket-2969d5?style=for-the-badge)](https://github.com/uNetworking/uWebSockets)

## Objetivo

O **Bun Game Server (BGS)** foi projetado para ser um servidor de **MMO** e **ORPG**. O BGS oferece um template flexível e escalável que pode ser facilmente adaptado para qualquer jogo que necessite de funcionalidades multiplayer. Com o BGS, desenvolvedores podem rapidamente implementar e personalizar recursos essenciais para jogos online, facilitando a criação e implementação de funcionalidades novas de acordo com o jogo a ser desenvolvido.

## Requisitos

- [BunJS](https://bun.sh/)

Para utilizar este projeto, é necessário conhecimento no BunJS e Typescript


## Início
Para instalar as dependências do BunJS, execute o comando abaixo:
```bash
bun install
```

Com a implementação do prisma é necessário digitar os comandos a seguir para iniciar o servidor:
```bash
bunx prisma generate
```

Para executar basta executar o comando
```bash
bun start
```
ou o comando
```bash
bun start dev
```
para executar em ambiente de desenvolvimento

## Licença

Este projeto está licenciado sob a Licença Pública Mozilla, Versão 2.0 - consulte o arquivo [LICENSE](LICENSE) para obter detalhes.
