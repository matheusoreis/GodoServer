import { describe, expect, it } from "bun:test";
import { IsEmail } from "../IsEmail";

class Email {
  @IsEmail()
  public emailAddress?: string;
}

describe("IsEmail decorator", () => {
  it("should restrict values to valid email addresses", () => {
    const testInstance = new Email();

    // Valid email address
    testInstance.emailAddress = "test@example.com";
    expect(testInstance.emailAddress).toBe("test@example.com");

    // Invalid email address
    expect(() => {
      testInstance.emailAddress = "invalid_email";
    }).toThrowError("Invalid email address");
  });
});
