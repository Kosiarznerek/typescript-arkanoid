"use strict";
class AnimowanyProstokat extends Prostokat {
    /**
     * Tworzy animowany Prostokąt
     * @param {Wektor} pozycja
     * @param {number} szerokosc
     * @param {number} wysokosc
     * @param {HTMLImageElement[]} klatkiAnimacji
     * @param {number} mnoznikAnimacji
     */
    constructor(pozycja, szerokosc, wysokosc, klatkiAnimacji, mnoznikAnimacji) {
        super(pozycja, szerokosc, wysokosc);
        this._animacja = new Animacja(klatkiAnimacji, mnoznikAnimacji);
    }
    /**
     * Aktualizuje animacje
     */
    aktualizujAnimacje() {
        let grafika = this._animacja.nastepnaKlatka();
        if (grafika !== null)
            this.grafika = grafika;
        else {
            this._animacja.cofnijDoPoczatku();
            this.grafika = this._animacja.nastepnaKlatka() || new Image;
        }
    }
}
