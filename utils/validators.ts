
export function containsLetter(str: string): boolean {
    return /\p{L}/u.test(str);
}

export function containsNumber(str: string): boolean {
    return /\p{N}/u.test(str);
}

export function containsSymbol(str: string): boolean {
    return /[^\p{L}\p{N}\s]/u.test(str);
}
