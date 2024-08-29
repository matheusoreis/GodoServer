export class Slots<T> {
  private _slots: (T | undefined)[];

  constructor(size: number) {
    this._slots = new Array(size).fill(undefined);
  }

  private _checkIndex(index: number): void {
    if (index < 0 || index >= this._slots.length) {
      throw new RangeError(`Index out of range: ${index}`);
    }
  }

  public get(index: number): T | undefined {
    this._checkIndex(index);
    return this._slots[index];
  }

  public *getFilledSlots(): Iterable<number> {
    for (let i = 0; i < this._slots.length; i++) {
      if (this._slots[i] !== undefined) {
        yield i;
      }
    }
  }

  public *getEmptySlots(): Iterable<number> {
    for (let i = 0; i < this._slots.length; i++) {
      if (this._slots[i] === undefined) {
        yield i;
      }
    }
  }

  public remove(index: number): void {
    this._checkIndex(index);
    this._slots[index] = undefined;
  }

  public add(value: T): number {
    for (let i = 0; i < this._slots.length; i++) {
      if (this._slots[i] === undefined) {
        this._slots[i] = value;
        return i;
      }
    }
    throw new Error("No empty slots available");
  }

  public getFirstEmptySlot(): number | undefined {
    const index = this._slots.indexOf(undefined);
    return index !== -1 ? index : undefined;
  }

  public update(index: number, value: T): void {
    this._checkIndex(index);
    this._slots[index] = value;
  }
}
