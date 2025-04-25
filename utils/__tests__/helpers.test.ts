
import { expect, test } from "vitest";
import { roundToHalf } from "../helpers";

test("utils/helpers - roundToHalf", () => {
    expect(roundToHalf(4.2)).toBe(4);
    expect(roundToHalf(4.3)).toBe(4.5);
    expect(roundToHalf(4.6)).toBe(4.5);
    expect(roundToHalf(4.7)).toBe(5);
});