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

  public set(index: number, value: T | undefined): void {
    this._checkIndex(index);
    this._slots[index] = value;
  }

  public isSlotEmpty(index: number): boolean {
    this._checkIndex(index);
    return this._slots[index] === undefined;
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

  public *countEmptySlots(): Iterable<number> {
    for (let i = 0; i < this._slots.length; i++) {
      if (this._slots[i] === undefined) {
        yield i;
      }
    }
  }

  public *countFilledSlots(): Iterable<number> {
    for (let i = 0; i < this._slots.length; i++) {
      if (this._slots[i] !== undefined) {
        yield i;
      }
    }
  }

  public *find(element: T): Iterable<number> {
    for (let i = 0; i < this._slots.length; i++) {
      if (this._slots[i] === element) {
        yield i;
      }
    }
  }

  public clear(): void {
    this._slots.fill(undefined);
  }

  public update(index: number, value: T): void {
    this._checkIndex(index);
    this._slots[index] = value;
  }
}
