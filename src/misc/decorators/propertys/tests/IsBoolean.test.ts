import { describe, expect, it } from "bun:test";
import { IsBoolean } from "../IsBoolean";

class TestClass {
  @IsBoolean()
  public boolValue?: boolean;
}

describe("IsBoolean decorator", () => {
  it("should restrict values to boolean type", () => {
    const testInstance = new TestClass();

    testInstance.boolValue = true;
    expect(testInstance.boolValue).toBe(true);
  });
});
