import { describe, expect, it } from "bun:test";
import { MinLength } from "../min-length";

class Test {
  @MinLength(3)
  public textValue?: string;
}

describe("MinLength decorator", () => {
  it("should throw error if value length is less than specified minimum length", () => {
    const testInstance = new Test();

    expect(() => {
      testInstance.textValue = "Hi";
    }).toThrowError("textValue must be at least 3 characters long");

    expect(() => {
      testInstance.textValue = "Hey";
    }).not.toThrow();
  });
});
