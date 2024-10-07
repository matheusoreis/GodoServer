/**
 * A classe `Slots<T>` gerencia uma coleção de slots que podem armazenar valores do tipo `T`.
 * Os slots podem estar preenchidos ou vazios, e a classe fornece métodos para adicionar,
 * remover e consultar os valores armazenados.
 *
 * @template T - O tipo de valor armazenado nos slots.
 */
export class Slots<T> {
  private _slots: (T | undefined)[];

  /**
   * Cria uma nova instância de `Slots` com um número específico de slots.
   *
   * @param {number} size - O número total de slots.
   */
  constructor(size: number) {
    this._slots = new Array(size).fill(undefined);
  }

  /**
   * Verifica se o índice fornecido está dentro do intervalo válido dos slots.
   *
   * @param {number} index - O índice a ser verificado.
   * @throws {RangeError} Se o índice estiver fora do intervalo.
   */
  private _checkIndex(index: number): void {
    if (index < 0 || index >= this._slots.length) {
      throw new RangeError(`Index out of range: ${index}`);
    }
  }

  /**
   * Obtém o valor armazenado no slot especificado.
   *
   * @param {number} index - O índice do slot.
   * @returns {T | undefined} O valor armazenado no slot, ou `undefined` se o slot estiver vazio.
   */
  public get(index: number): T | undefined {
    this._checkIndex(index);
    return this._slots[index];
  }

  /**
   * Retorna um iterador para os índices dos slots preenchidos.
   *
   * @returns {Iterable<number>} Iterador para os índices dos slots preenchidos.
   */
  public *getFilledSlots(): Iterable<number> {
    for (let i = 0; i < this._slots.length; i++) {
      if (this._slots[i] !== undefined) {
        yield i;
      }
    }
  }

  /**
   * Retorna um iterador para os índices dos slots vazios.
   *
   * @returns {Iterable<number>} Iterador para os índices dos slots vazios.
   */
  public *getEmptySlots(): Iterable<number> {
    for (let i = 0; i < this._slots.length; i++) {
      if (this._slots[i] === undefined) {
        yield i;
      }
    }
  }

  /**
   * Remove o valor do slot especificado.
   *
   * @param {number} index - O índice do slot a ser limpo.
   */
  public remove(index: number): void {
    this._checkIndex(index);
    this._slots[index] = undefined;
  }

  /**
   * Adiciona um valor a um slot vazio e retorna o índice do slot.
   *
   * @param {T} value - O valor a ser armazenado no slot.
   * @returns {number} O índice do slot onde o valor foi armazenado.
   * @throws {Error} Se não houver slots vazios disponíveis.
   */
  public add(value: T): number {
    for (let i = 0; i < this._slots.length; i++) {
      if (this._slots[i] === undefined) {
        this._slots[i] = value;
        return i;
      }
    }
    throw new Error('No empty slots available');
  }

  /**
   * Retorna o índice do primeiro slot vazio.
   *
   * @returns {number | undefined} O índice do primeiro slot vazio, ou `undefined` se não houver slots vazios.
   */
  public getFirstEmptySlot(): number | undefined {
    const index = this._slots.indexOf(undefined);
    return index !== -1 ? index : undefined;
  }

  /**
   * Atualiza o valor armazenado em um slot específico.
   *
   * @param {number} index - O índice do slot a ser atualizado.
   * @param {T} value - O novo valor a ser armazenado no slot.
   */
  public update(index: number, value: T): void {
    this._checkIndex(index);
    this._slots[index] = value;
  }

  /**
   * Encontra o primeiro elemento que corresponde ao critério fornecido.
   *
   * @param {(value: T) => boolean} predicate - Função de teste para encontrar o elemento.
   * @returns {T | undefined} O valor que satisfaz a condição ou `undefined` se nenhum for encontrado.
   */
  public find(predicate: (value: T) => boolean): T | undefined {
    for (const item of this._slots) {
      if (item !== undefined && predicate(item)) {
        return item;
      }
    }
    return undefined;
  }

  /**
   * Retorna todos os elementos que correspondem ao critério fornecido.
   *
   * @param {(value: T) => boolean} predicate - Função de teste para encontrar os elementos.
   * @returns {T[]} Um array com todos os valores que satisfazem a condição.
   */
  public filter(predicate: (value: T) => boolean): T[] {
    const result: T[] = [];
    for (const item of this._slots) {
      if (item !== undefined && predicate(item)) {
        result.push(item);
      }
    }
    return result;
  }
}
