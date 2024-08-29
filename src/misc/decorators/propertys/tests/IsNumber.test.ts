import { describe, expect, it } from "bun:test";
import { IsInteger } from "../IsNumber";

class Number {
  @IsInteger(8)
  public intValue?: number;

  @IsInteger(16)
  public intValue16?: number;

  @IsInteger(32)
  public intValue32?: number;
}

describe("IsInteger decorator", () => {
  it("should restrict values to an 8-bit integer", () => {
    const testInstance = new Number();

    testInstance.intValue = 100;
    expect(testInstance.intValue).toBe(100);

    expect(() => {
      testInstance.intValue = 300;
    }).toThrowError("Must be within the range of a 8-bit integer");

    expect(() => {
      testInstance.intValue = 3.14;
    }).toThrowError("Must be an integer");
  });

  it("should restrict values to a 16-bit integer", () => {
    const testInstance = new Number();

    testInstance.intValue16 = 2000;
    expect(testInstance.intValue16).toBe(2000);

    expect(() => {
      testInstance.intValue16 = 70000;
    }).toThrowError("Must be within the range of a 16-bit integer");

    expect(() => {
      testInstance.intValue16 = 3.14;
    }).toThrowError("Must be an integer");
  });

  it("should restrict values to a 32-bit integer", () => {
    const testInstance = new Number();

    testInstance.intValue32 = 2000000;
    expect(testInstance.intValue32).toBe(2000000);

    expect(() => {
      testInstance.intValue32 = 5000000000;
    }).toThrowError("Must be within the range of a 32-bit integer");

    expect(() => {
      testInstance.intValue32 = 3.14;
    }).toThrowError("Must be an integer");
  });
});
