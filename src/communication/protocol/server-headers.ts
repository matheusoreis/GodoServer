/**
 * Enumeração `ServerHeaders` define os tipos de cabeçalhos de servidor suportados.
 *
 * Os valores deste enum representam diferentes tipos de mensagens que o servidor pode enviar
 * para os clientes, facilitando a identificação e o tratamento dessas mensagens no cliente.
 */
export enum ServerHeaders {
  Pong,
  Alert,
  AccessSuccessful,
  AccountCreated,
  AccountDeleted,
  AccountRecovered,
  PasswordChanged,
  CharacterList,
  CharacterCreated,
  CharacterDeleted,
  CharacterSelected,
  MapCharactersTo,
  NewCharacterTo,
  CharacterMoved,
  CharacterDisconnected,
  CharacterTeleported,
  ChatMessageMap,
  ChatMessageGlobal,
  EmoteSent,
}
