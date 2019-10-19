"use strict";
//Dostępne w grze bloki
var DOSTEPNE_BLOKI;
(function (DOSTEPNE_BLOKI) {
    DOSTEPNE_BLOKI["T0"] = "T0";
    DOSTEPNE_BLOKI["T1"] = "T1";
    DOSTEPNE_BLOKI["T2"] = "T2";
    DOSTEPNE_BLOKI["T3"] = "T3";
    DOSTEPNE_BLOKI["T4"] = "T4";
    DOSTEPNE_BLOKI["T5"] = "T5";
    DOSTEPNE_BLOKI["T6"] = "T6";
    DOSTEPNE_BLOKI["T7"] = "T7";
    DOSTEPNE_BLOKI["T8"] = "T8";
    DOSTEPNE_BLOKI["T9"] = "T9";
    DOSTEPNE_BLOKI["BARIERKA_POZIOMA"] = "BARIERKA_POZIOMA";
    DOSTEPNE_BLOKI["BARIERKA_PIONOWA"] = "BARIERKA_PIONOWA";
    DOSTEPNE_BLOKI["BRAMA"] = "BRAMA";
    DOSTEPNE_BLOKI["KULKA"] = "KULKA";
    DOSTEPNE_BLOKI["PALETKA"] = "PALETKA";
})(DOSTEPNE_BLOKI || (DOSTEPNE_BLOKI = {}));
class Blok extends Prostokat {
    /**
     * Tworzy blok gry
     * @param {Punkt} pozycja
     * @param {DOSTEPNE_BLOKI} typ
     */
    constructor(pozycja, typ) {
        super(pozycja, GRAFIKI[typ].width, GRAFIKI[typ].height);
        this.grafika = GRAFIKI[typ];
        this.typ = typ;
    }
    /**
     * Klonuje blok
     * @returns {Blok}
     */
    klonuj() {
        return new Blok(this.pozycja.klonuj(), this.typ);
    }
}
