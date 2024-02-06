import { formatDate } from "../utils/formatDate";

describe("formatDate function", () => {
  // Test case with a valid time format, expected to be adequately formatted
  it("should correctly format the date", () => {
    const inputDate: Date = new Date("2024-01-29T12:34:56");

    const result: string | null = formatDate(inputDate);

    expect(result).toEqual("January 29, 2024 at 12:34 PM");
  });

  // Test case with an invalid time format, expected to return an invalid date result
  it("should return the input without formatting if the original format is invalid for formatting", () => {
    const inputDate: Date = new Date("2024-01-29PA");

    const result: string | null = formatDate(inputDate);

    expect(result).toEqual("Invalid Date");
  });

  // Test case with an empty object in the function argument, expected to return a null result
  it("should return null for null input", () => {
    const result: string | null = formatDate(null);

    expect(result).toBeNull();
  });
});
