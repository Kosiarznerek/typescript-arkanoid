class Kulka extends Prostokat {

    public szybkosc: number;

    /**
     * Tworzy obiekt Kulka
     * @param {Wektor} pozycja Pozycja kulki
     * @param {Wektor} kierunek Kierunek w jakim ma się poruszać lub domyślny
     */
    constructor(pozycja: Wektor, kierunek?: Wektor) {
        super(pozycja, 20, 20);
        this.grafika = GRAFIKI.kulka;

        //Poruszanie się kulki
        this._kierunek = kierunek ? kierunek.normalizuj() : new Wektor(0, -1).normalizuj();
        this.szybkosc = 2;
    }

    private _kierunek: Wektor;

    /**
     * Ustawia kierunek
     * @param {Wektor} w
     */
    public set kierunek(w: Wektor) {
        this._kierunek = w.normalizuj();
    }

    /**
     * Aktualizuje pozycje kulki
     * @param {T[]} przeszkody Przeszkody od jakich się odbija
     * @returns {T[]} Przeszkody w jakie uderzyła podczas przesunięcia
     */
    public aktualizujPozycje<T extends Prostokat>(przeszkody: T[]): T[] {
        //Uderzone obiekty
        const uderzone: T[] = [];

        //Aktualizacja pozycji
        const iKrokow: number = 2;
        for (let i = 0; i < iKrokow; i++) {
            //Jeżeli w coś uderzyłem zapisuje
            przeszkody.forEach(value => {
                if (uderzone.indexOf(value) < 0 && DetektorKolizji.ProstokatProstokat(this, value))
                    uderzone.push(value);
            });

            //Obliczam przesuniecie
            let przesuniecie: Wektor = Wektor.PomnozSkalarnie(this._kierunek, this.szybkosc);

            //Zapisuje poprzednia pozycje
            const poprzednia: Wektor = this.pozycja.klonuj();

            //Aktualizuje pozycje
            DetektorKolizji.AktualizujProstokatUnikajac(this, Wektor.PodzielSkalarnie(przesuniecie, iKrokow), przeszkody);

            //Pozycja bez zmian -> odbijam kulke
            if (poprzednia.x === this.pozycja.x) this._kierunek.x *= -1;
            if (poprzednia.y === this.pozycja.y) this._kierunek.y *= -1;
        }

        //Zwracam uderzone obiekty
        return uderzone;
    }

    /**
     * Sprawdza czy kulka znajduje się na ekranie
     * @param {Prostokat} ekran
     * @returns {boolean}
     */
    public jestNaEkranie(ekran: Prostokat): boolean {
        return DetektorKolizji.ProstokatProstokat(this, ekran);
    }
}
