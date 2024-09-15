/**
 * Enumeração `ServerHeaders` define os tipos de cabeçalhos de servidor suportados.
 *
 * Os valores deste enum representam diferentes tipos de mensagens que o servidor pode enviar
 * para os clientes, facilitando a identificação e o tratamento dessas mensagens no cliente.
 */
export enum ServerHeaders {
  Ping,
  Alert,
  AccessAccountSuccess,
  CreateAccountSuccess,
  DeleteAccountSuccess,
  RecoverAccountSuccess,
  ChangePasswordSuccess,
  CharList,
  CharCreated,
  CharDeleted,
  CharSelected,
  MapEntered,
  NewCharEntered,
  CharMoved,
  CharDisconnected,
  CharTeleported,
}
