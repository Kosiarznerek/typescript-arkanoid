"use strict";
//Wszystkie grafiki
const GRAFIKI = {
    T0: new Image,
    T1: new Image,
    T2: new Image,
    T3: new Image,
    T4: new Image,
    T5: new Image,
    T6: new Image,
    T7: new Image,
    T8: new Image,
    T9: new Image,
    BARIERKA_POZIOMA: new Image,
    BARIERKA_PIONOWA: new Image,
    BRAMA: new Image,
    KULKA: new Image,
    PALETKA: new Image
};
/**
 * Wczytuje pojedyncza grafike
 * @param {HTMLImageElement} grafika
 * @param {string} sciezka
 * @returns {Promise<HTMLImageElement>}
 */
function WczytajGrafike(grafika, sciezka) {
    return new Promise((resolve, reject) => {
        grafika.src = sciezka;
        grafika.addEventListener('load', () => resolve(grafika));
        grafika.addEventListener('error', reject);
    });
}
/**
 * Wczytuje wszystkie grafiki potrzebne do skrytpu
 * @param {Function} callback
 */
function ZaladujWszystkieGrafiki(callback) {
    Promise.all(Object.keys(GRAFIKI).map(value => {
        return WczytajGrafike(GRAFIKI[value], `grafiki/${value}.png`);
    })).then(callback);
}
