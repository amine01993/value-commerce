
export function roundToHalf(nbr: number) {
    // 4.0 => 4
    // 4.1 => 4
    // 4.2 => 4
    // 4.3 => 4.5
    // 4.5 => 4.5
    // 4.4 => 4.5
    // 4.6 => 4.5
    // 4.7 => 5
    // 4.8 => 5
    // 4.9 => 5
    // 5.0 => 5
    const dig = Math.floor(nbr);
    const flo = Math.floor(parseFloat((nbr - dig).toFixed(2)) * 10);
    
    if(flo > 6) return dig + 1;
    if(flo > 2) return dig + .5;
    
    return dig;
}