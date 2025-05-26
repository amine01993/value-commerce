import { FilterData, FilterItem } from "@/lib/slices/search";
import { ReadonlyURLSearchParams } from "next/navigation";

export function roundToHalf(nbr: number) {
    const dig = Math.floor(nbr);
    const flo = Math.floor(parseFloat((nbr - dig).toFixed(2)) * 10);
    
    if(flo > 6) return dig + 1;
    if(flo > 2) return dig + .5;
    
    return dig;
}

export function queryParamsString(
    searchParams: ReadonlyURLSearchParams, 
    params: {[key: string]: string} = {},
    deleteParams: string[] = [],
): string {
    const urlSearchParams: URLSearchParams = new URLSearchParams;

    for(const [key, val] of searchParams.entries()) {
        urlSearchParams.set(key, val);
    }

    for(const key in params) {
        urlSearchParams.set(key, params[key]);
    }

    for(const key of deleteParams) {
        urlSearchParams.delete(key);
    }

    return urlSearchParams.toString();
}

export function valueToFilterItem(values: string|string[], data: FilterItem[]): FilterData {
    if(typeof values === "string") {
        const t = data.find(item => item.value === values);
        return t!;
    }

    return values.map(val => {
        const t = data.find(item => item.value === val);
        return t!;
    });
}

export function randomString(length: number): string {
    const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, (n) => charset[n % charset.length]).join('');
}