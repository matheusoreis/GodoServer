import { describe, expect, it } from "bun:test";
import { IsBoolean } from "../is-boolean";

class Test {
  @IsBoolean()
  public boolValue?: boolean;
}

describe("IsBoolean decorator", () => {
  it("should restrict values to boolean type", () => {
    const testInstance = new Test();

    testInstance.boolValue = true;
    expect(testInstance.boolValue).toBe(true);
  });
});
