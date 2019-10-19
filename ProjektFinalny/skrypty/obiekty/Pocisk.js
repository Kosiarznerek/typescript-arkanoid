"use strict";
class Pocisk extends Prostokat {
    /**
     * Tworzy pocisk
     * @param {Wektor} pozycja
     * @param {Wektor} kierunek
     */
    constructor(pozycja, kierunek) {
        super(pozycja, GRAFIKI.pocisk.width, GRAFIKI.pocisk.height);
        this.grafika = GRAFIKI.pocisk;
        //Poruszanie sie pocisku
        this._kierunek = kierunek.klonuj().normalizuj();
        this._szybkosc = 5;
    }
    /**
     * Aktualizuje pozycje pocisku
     * @param {T[]} obiekty Obiekty, które mogą zostać zestrzelone
     * @returns {T[]} Obiekty jakie zostały trafione
     */
    aktualizujPozycje(obiekty) {
        //Aktualizuje pozycje
        this.pozycja.dodaj(Wektor.PomnozSkalarnie(this._kierunek, this._szybkosc));
        //Zwracam te w które uderzyłem
        return obiekty.filter(value => DetektorKolizji.ProstokatProstokat(this, value));
    }
}
