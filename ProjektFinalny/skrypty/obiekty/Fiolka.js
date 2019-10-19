"use strict";
//Dostępne typy fiolek
var TYPY_FIOLEK;
(function (TYPY_FIOLEK) {
    TYPY_FIOLEK["B"] = "B";
    TYPY_FIOLEK["C"] = "C";
    TYPY_FIOLEK["D"] = "D";
    TYPY_FIOLEK["E"] = "E";
    TYPY_FIOLEK["L"] = "L";
    TYPY_FIOLEK["M"] = "M";
    TYPY_FIOLEK["R"] = "R";
    TYPY_FIOLEK["S"] = "S";
})(TYPY_FIOLEK || (TYPY_FIOLEK = {}));
//Klasa fiolki
class Fiolka extends AnimowanyProstokat {
    /**
     * Tworzy obiekt fiolki
     * @param {Wektor} pozycja
     * @param {TYPY_FIOLEK} typ
     */
    constructor(pozycja, typ) {
        super(pozycja, 44, 22, GRAFIKI.fiolki[typ], 3);
        this.typ = typ;
        //Spadanie w dół
        this._grawitacja = new Wektor(0, 1);
        this._szybkosc = 2;
    }
    /**
     * Aktualizuje pozycje fiolki
     */
    aktualizujPozycje() {
        this.pozycja.dodaj(Wektor.PomnozSkalarnie(this._grawitacja, this._szybkosc));
    }
}
