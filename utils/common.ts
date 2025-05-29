
export function randomString(length: number): string {
    const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, (n) => charset[n % charset.length]).join('');
}

export function disableDocumentScroll() {
    document.documentElement.style.overflow = "hidden"
}

export function resetDocumentScroll() {
    document.documentElement.style.removeProperty('overflow');
}
