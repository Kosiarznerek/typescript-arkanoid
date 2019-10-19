"use strict";
//Typy cegielek
var TYPY_CEGIELEK;
(function (TYPY_CEGIELEK) {
    TYPY_CEGIELEK["T0"] = "T0";
    TYPY_CEGIELEK["T1"] = "T1";
    TYPY_CEGIELEK["T2"] = "T2";
    TYPY_CEGIELEK["T3"] = "T3";
    TYPY_CEGIELEK["T4"] = "T4";
    TYPY_CEGIELEK["T5"] = "T5";
    TYPY_CEGIELEK["T6"] = "T6";
    TYPY_CEGIELEK["T7"] = "T7";
    TYPY_CEGIELEK["T8"] = "T8";
    TYPY_CEGIELEK["T9"] = "T9";
})(TYPY_CEGIELEK || (TYPY_CEGIELEK = {}));
//Klasa cegiełki
class Cegielka extends Prostokat {
    /**
     * Tworzy obiekt cegiełki
     * @param {Wektor} pozycja
     * @param {number} szerokosc
     * @param {number} wysokosc
     * @param {TYPY_CEGIELEK} typ
     */
    constructor(pozycja, szerokosc, wysokosc, typ) {
        super(pozycja, szerokosc, wysokosc);
        this.grafika = GRAFIKI.cegielki[typ];
        //W zależności od typu odpowiednia ilość żyć
        switch (typ) {
            case 'T4':
            case 'T5':
                this._iloscZyc = 3;
                break;
            case 'T0':
            case 'T1':
            case 'T2':
            case 'T3':
            case 'T6':
            case 'T7':
            case 'T8':
            case 'T9':
                this._iloscZyc = 1;
                break;
            default:
                throw new Error(`Typ cegiełki ${typ} nie jest znany`);
        }
        this.typ = typ;
    }
    /**
     * Sprawdza czy cegielka jest rozwalona
     * @returns {boolean}
     */
    get jestRozwalona() {
        return this._iloscZyc === 0;
    }
    /**
     * Rozwala cegielke
     */
    rozwal() {
        //Jeżeli rozwalona to nic nie robie
        if (this.jestRozwalona)
            return;
        //Jeżeli nie zmiejszam zycia
        this._iloscZyc--;
    }
}
