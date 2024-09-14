/**
 * Enumeração `ClientHeaders` define os tipos de cabeçalhos de cliente suportados.
 *
 * Os valores deste enum representam diferentes tipos de mensagens que um cliente pode enviar,
 * facilitando a identificação e o tratamento dessas mensagens no servidor.
 */
export enum ClientHeaders {
  Ping,
  AccessAccount,
  CreateAccount,
  DeleteAccount,
  RecoverAccount,
  ChangePassword,
  CharList,
  CreateChar,
  DeleteChar,
  SelectChar,
  MoveChar,
}
