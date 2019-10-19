"use strict";
class Kulka extends Prostokat {
    /**
     * Tworzy obiekt Kulka
     * @param {Wektor} pozycja Pozycja kulki
     * @param {Wektor} kierunek Kierunek w jakim ma się poruszać lub domyślny
     */
    constructor(pozycja, kierunek) {
        super(pozycja, 20, 20);
        this.grafika = GRAFIKI.kulka;
        //Poruszanie się kulki
        this._kierunek = kierunek ? kierunek.normalizuj() : new Wektor(0, -1).normalizuj();
        this.szybkosc = 2;
    }
    /**
     * Ustawia kierunek
     * @param {Wektor} w
     */
    set kierunek(w) {
        this._kierunek = w.normalizuj();
    }
    /**
     * Aktualizuje pozycje kulki
     * @param {T[]} przeszkody Przeszkody od jakich się odbija
     * @returns {T[]} Przeszkody w jakie uderzyła podczas przesunięcia
     */
    aktualizujPozycje(przeszkody) {
        //Uderzone obiekty
        const uderzone = [];
        //Aktualizacja pozycji
        const iKrokow = 2;
        for (let i = 0; i < iKrokow; i++) {
            //Jeżeli w coś uderzyłem zapisuje
            przeszkody.forEach(value => {
                if (uderzone.indexOf(value) < 0 && DetektorKolizji.ProstokatProstokat(this, value))
                    uderzone.push(value);
            });
            //Obliczam przesuniecie
            let przesuniecie = Wektor.PomnozSkalarnie(this._kierunek, this.szybkosc);
            //Zapisuje poprzednia pozycje
            const poprzednia = this.pozycja.klonuj();
            //Aktualizuje pozycje
            DetektorKolizji.AktualizujProstokatUnikajac(this, Wektor.PodzielSkalarnie(przesuniecie, iKrokow), przeszkody);
            //Pozycja bez zmian -> odbijam kulke
            if (poprzednia.x === this.pozycja.x)
                this._kierunek.x *= -1;
            if (poprzednia.y === this.pozycja.y)
                this._kierunek.y *= -1;
        }
        //Zwracam uderzone obiekty
        return uderzone;
    }
    /**
     * Sprawdza czy kulka znajduje się na ekranie
     * @param {Prostokat} ekran
     * @returns {boolean}
     */
    jestNaEkranie(ekran) {
        return DetektorKolizji.ProstokatProstokat(this, ekran);
    }
}
