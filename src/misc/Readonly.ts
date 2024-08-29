/**
 * Cria um tipo onde todas as propriedades de um tipo fornecido são somente leitura.
 */
export type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
