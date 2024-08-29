import { describe, expect, it } from "bun:test";
import { IsString } from "../IsString";

class String {
  @IsString()
  public stringValue?: string;
}

describe("IsString decorator", () => {
  it("should restrict values to string type", () => {
    const testInstance = new String();

    testInstance.stringValue = "Hello, World!";
    expect(testInstance.stringValue).toBe("Hello, World!");
  });
});
