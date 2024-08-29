import { describe, expect, it } from "bun:test";
import { LowerCase } from "../LowerCase";
import { MaxLength } from "../MaxLength";

class Max {
  @MaxLength(5)
  public textValue?: string;
}

describe("MaxLength decorator", () => {
  it("should throw error if value length exceeds specified maximum length", () => {
    const testInstance = new Max();

    expect(() => {
      testInstance.textValue = "TooLongValue";
    }).toThrowError("textValue must be at most 5 characters long");

    expect(() => {
      testInstance.textValue = "Short";
    }).not.toThrow();
  });
});
