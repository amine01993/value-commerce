
export function roundToHalf(nbr: number) {
    const dig = Math.floor(nbr);
    const flo = Math.floor(parseFloat((nbr - dig).toFixed(2)) * 10);
    
    if(flo > 6) return dig + 1;
    if(flo > 2) return dig + .5;
    
    return dig;
}