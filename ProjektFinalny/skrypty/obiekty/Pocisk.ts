class Pocisk extends Prostokat {

    private _kierunek: Wektor;
    private _szybkosc: number;

    /**
     * Tworzy pocisk
     * @param {Wektor} pozycja
     * @param {Wektor} kierunek
     */
    constructor(pozycja: Wektor, kierunek: Wektor) {
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
    public aktualizujPozycje<T extends Prostokat>(obiekty: T[]): T[] {
        //Aktualizuje pozycje
        this.pozycja.dodaj(Wektor.PomnozSkalarnie(this._kierunek, this._szybkosc));

        //Zwracam te w które uderzyłem
        return obiekty.filter(value => DetektorKolizji.ProstokatProstokat(this, value))
    }

}