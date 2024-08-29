import { describe, it, expect } from "bun:test";
import { Singleton } from "../singleton";

@Singleton()
class Test {
  private data: number;

  constructor(data: number) {
    this.data = data;
  }

  public getData(): number {
    return this.data;
  }
}

describe("Singleton Decorator Test", () => {
  it("should create only one instance of the class", () => {
    const instance1 = new Test(10);
    const instance2 = new Test(20);

    expect(instance1).toEqual(instance2);

    expect(instance1.getData()).toEqual(10);
    expect(instance2.getData()).toEqual(10);
  });
});
