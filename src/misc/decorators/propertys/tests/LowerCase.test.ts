import { describe, expect, it } from "bun:test";
import { LowerCase } from "../LowerCase";

class Test {
  @LowerCase()
  public textValue?: string;
}

describe("LowerCase decorator", () => {
  it("should convert assigned value to lowercase", () => {
    const testInstance = new Test();

    testInstance.textValue = "HELLO";
    expect(testInstance.textValue).toBe("hello");

    testInstance.textValue = "WORLD";
    expect(testInstance.textValue).toBe("world");
  });
});
