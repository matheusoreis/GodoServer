import { describe, expect, it } from "bun:test";
import { UpperCase } from "../UpperCase";

class Upper {
  @UpperCase()
  public textValue?: string;
}

describe("UpperCase decorator", () => {
  it("should convert assigned value to uppercase", () => {
    const testInstance = new Upper();

    testInstance.textValue = "hello";
    expect(testInstance.textValue).toBe("HELLO");

    testInstance.textValue = "world";
    expect(testInstance.textValue).toBe("WORLD");
  });
});
