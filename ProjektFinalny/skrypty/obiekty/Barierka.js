"use strict";
//Typy barierek
var TYPY_BARIEREK;
(function (TYPY_BARIEREK) {
    TYPY_BARIEREK["POZIOMA"] = "POZIOMA";
    TYPY_BARIEREK["PIONOWA"] = "PIONOWA";
})(TYPY_BARIEREK || (TYPY_BARIEREK = {}));
//Klasa barierki
class Barierka extends Prostokat {
    /**
     * Tworzy obiekt Barierka
     * @param {Wektor} pozycja
     * @param {number} szerokosc
     * @param {number} wysokosc
     * @param {TYPY_BARIEREK} typ
     */
    constructor(pozycja, szerokosc, wysokosc, typ) {
        super(pozycja, szerokosc, wysokosc);
        switch (typ) {
            case TYPY_BARIEREK.PIONOWA:
                this.grafika = GRAFIKI.barierka.pionowa;
                break;
            case TYPY_BARIEREK.POZIOMA:
                this.grafika = GRAFIKI.barierka.pozioma;
                break;
            default:
                throw new Error(`Typ barierki ${typ} jest nieznany`);
        }
    }
}
