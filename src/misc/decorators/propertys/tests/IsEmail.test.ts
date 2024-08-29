import { describe, expect, it } from "bun:test";
import { IsEmail } from "../is-email";

class Test {
  @IsEmail()
  public emailAddress?: string;
}

describe("IsEmail decorator", () => {
  it("should restrict values to valid email addresses", () => {
    const testInstance = new Test();

    testInstance.emailAddress = "test@example.com";
    expect(testInstance.emailAddress).toBe("test@example.com");

    expect(() => {
      testInstance.emailAddress = "invalid_email";
    }).toThrowError("Invalid email address");
  });
});
