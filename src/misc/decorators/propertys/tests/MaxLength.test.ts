import { describe, expect, it } from "bun:test";
import { MaxLength } from "../max-length";

class Test {
  @MaxLength(5)
  public textValue?: string;
}

describe("MaxLength decorator", () => {
  it("should throw error if value length exceeds specified maximum length", () => {
    const testInstance = new Test();

    expect(() => {
      testInstance.textValue = "TooLongValue";
    }).toThrowError("textValue must be at most 5 characters long");

    expect(() => {
      testInstance.textValue = "Short";
    }).not.toThrow();
  });
});
