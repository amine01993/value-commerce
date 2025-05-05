
import { expect, test } from "vitest";
import { containsLetter, containsNumber, containsSymbol } from "../validators";

test("utils/validators - containsLetter", () => {
    expect(containsLetter("1234")).toBe(false);
    expect(containsLetter("abc123")).toBe(true);
    expect(containsLetter("مرحبا")).toBe(true);
    expect(containsLetter("")).toBe(false);
    expect(containsLetter("é")).toBe(true);
});

test("utils/validators - containsNumber", () => {
    expect(containsNumber("1234")).toBe(true);
    expect(containsNumber("abc123")).toBe(true);
    expect(containsNumber("مرحبا")).toBe(false);
    expect(containsNumber("١٢٣")).toBe(true);
    expect(containsNumber("")).toBe(false);
    expect(containsNumber("é")).toBe(false);
});

test("utils/validators - containsSymbol", () => {
    expect(containsSymbol("Hello")).toBe(false);
    expect(containsSymbol("Hello!")).toBe(true);
    expect(containsSymbol("@123")).toBe(true);
});