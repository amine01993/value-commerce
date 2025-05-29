
import { expect, test } from "vitest";
import { clamp, roundToHalf } from "../helpers";

test("utils/helpers - roundToHalf", () => {
    expect(roundToHalf(4.2)).toBe(4);
    expect(roundToHalf(4.3)).toBe(4.5);
    expect(roundToHalf(4.6)).toBe(4.5);
    expect(roundToHalf(4.7)).toBe(5);
});

test("utils/helpers - clamp", () => {
    expect(clamp(1, 2, 3)).toBe(2);
    expect(clamp(20, 10, 30)).toBe(20);
    expect(clamp(6.5, 9.2, 7)).toBe(7);
});