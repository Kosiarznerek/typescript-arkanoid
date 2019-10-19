//Dostępne typy fiolek
enum TYPY_FIOLEK {
    B = 'B',
    C = 'C',
    D = 'D',
    E = 'E',
    L = 'L',
    M = 'M',
    R = 'R',
    S = 'S',
}

//Klasa fiolki
class Fiolka extends AnimowanyProstokat {

    public readonly typ: TYPY_FIOLEK;

    private _grawitacja: Wektor;
    private _szybkosc: number;

    /**
     * Tworzy obiekt fiolki
     * @param {Wektor} pozycja
     * @param {TYPY_FIOLEK} typ
     */
    constructor(pozycja: Wektor, typ: TYPY_FIOLEK) {
        super(pozycja, 44, 22, GRAFIKI.fiolki[typ], 3);
        this.typ = typ;

        //Spadanie w dół
        this._grawitacja = new Wektor(0, 1);
        this._szybkosc = 2;
    }

    /**
     * Aktualizuje pozycje fiolki
     */
    public aktualizujPozycje(): void {
        this.pozycja.dodaj(Wektor.PomnozSkalarnie(this._grawitacja, this._szybkosc));
    }
}