import { describe, expect, it } from "bun:test";
import { IsString } from "../is-string";

class Test {
  @IsString()
  public stringValue?: string;
}

describe("IsString decorator", () => {
  it("should restrict values to string type", () => {
    const testInstance = new Test();

    testInstance.stringValue = "Hello, World!";
    expect(testInstance.stringValue).toBe("Hello, World!");
  });
});
