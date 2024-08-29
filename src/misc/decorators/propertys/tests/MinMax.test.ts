import { describe, expect, it } from "bun:test";
import { MinMax } from "../MinMax";

class TestClass {
  @MinMax(1, 10)
  public numericValue?: number;
}

describe("MinMax decorator", () => {
  it("should throw error if value is outside the specified range", () => {
    const testInstance = new TestClass();

    expect(() => {
      testInstance.numericValue = 20;
    }).toThrowError("Value must be between 1 and 10");

    expect(() => {
      testInstance.numericValue = 5;
    }).not.toThrow();
  });
});
