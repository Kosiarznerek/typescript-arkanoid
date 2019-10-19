interface Math {
    mapLinear: (value: number, in_min: number, in_max: number, out_min: number, out_max: number) => number,
    randomInt: (min: number, max: number) => number,
    randomFloat: (low: number, high: number) => number,
    randomKey: <T>(obj: T) => keyof typeof obj
}

/**
 * Mapowanie wartości x z zakresu [a1, a2] to zakresu [b1, b2].
 * @param {number} x Wartość do zmapowania
 * @param {number} a1 Minimalny wartość z zakresu A
 * @param {number} a2 Maksymalna wartość z zakresu A
 * @param {number} b1 Minimalny wartość z zakresu B
 * @param {number} b2 Maksymalna wartość z zakresu B
 * @returns {number}
 */
Math.mapLinear = (x: number, a1: number, a2: number, b1: number, b2: number): number => {
    return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
};

/**
 * Zwraca losową liczbę całkowitą z podanego zakresu
 * @param {number} min Minamalna wartość (włącznie)
 * @param {number} max Maksymalna wartość (włącznie)
 * @returns {number}
 */
Math.randomInt = (min: number, max: number): number => {
    //https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Zwraca losową liczbę zmienno przeciwnkową
 * @param {number} low Minamalna wartość (włącznie)
 * @param {number} high Maksymalna wartość (włącznie)
 * @returns {number}
 */
Math.randomFloat = (low: number, high: number): number => {
    //https://github.com/mrdoob/three.js/blob/dev/src/math/Math.js
    return low + Math.random() * (high - low);
};

/**
 * Zwraca losowy klucz obiektu
 * https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
 * @param {T} obj
 * @returns {keyof typeof obj}
 */
Math.randomKey = <T>(obj: T): keyof typeof obj => {
    let result;
    let count = 0;
    for (let prop in obj)
        if (Math.random() < 1 / ++count)
            result = prop;
    if (result) return result;
    else throw new Error(`Wylosowano nieprawidłowy klucz [${result}] obiektu`);
};