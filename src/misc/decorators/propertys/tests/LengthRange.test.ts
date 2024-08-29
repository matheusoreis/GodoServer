import { describe, expect, it } from "bun:test";
import { LengthRange } from "../LengthRange";

class TestClass {
  @LengthRange(2, 5)
  public stringValue?: string;
}

describe("LengthRange decorator", () => {
  it("should restrict values to a specific length range", () => {
    const testInstance = new TestClass();

    testInstance.stringValue = "test";
    expect(testInstance.stringValue).toBe("test");

    expect(() => {
      testInstance.stringValue = "a";
    }).toThrowError("stringValue must be between 2 and 5 characters long");

    expect(() => {
      testInstance.stringValue = "tooLongString";
    }).toThrowError("stringValue must be between 2 and 5 characters long");
  });
});
