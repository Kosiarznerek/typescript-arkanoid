//Typy dostępnych przeciwników
enum TYPY_PRZECIWNIKOW {
    kulki = 'kulki',
    orbita = 'orbita',
    stozek = 'stozek',
    szescian = 'szescian',
    trojkat = 'trojkat',
    ziemia = 'ziemia',
}


//Klasa przeciwnika
class Przeciwnik extends AnimowanyProstokat {

    public readonly typ: TYPY_PRZECIWNIKOW;
    private _kierunek: Wektor;
    private _szybkosc: number;
    private _iloscZyc: number;

    /**
     * Tworzy obiekt przeciwnika
     * @param {Wektor} pozycja
     * @param {TYPY_PRZECIWNIKOW} typ
     */
    constructor(pozycja: Wektor, typ: TYPY_PRZECIWNIKOW) {
        super(pozycja, GRAFIKI.przeciwnicy[typ][0].width, GRAFIKI.przeciwnicy[typ][0].height, GRAFIKI.przeciwnicy[typ], 4);

        //Ilosc żyć w zależności od typu
        switch (typ) {
            case 'kulki':
                this._iloscZyc = 3;
                break;
            case 'orbita':
                this._iloscZyc = 3;
                break;
            case 'stozek':
                this._iloscZyc = 2;
                break;
            case 'szescian':
                this._iloscZyc = 1;
                break;
            case 'trojkat':
                this._iloscZyc = 2;
                break;
            case 'ziemia':
                this._iloscZyc = 1;
                break;
        }
        this.typ = typ;

        //Poruszanie się
        this._kierunek = new Wektor(Math.randomFloat(-1, 1), 1).normalizuj();
        this._szybkosc = Math.randomFloat(1, 2);
    }

    /**
     * Sprawdza czy przeciwnik jest zabity
     * @returns {boolean}
     */
    public get jestZabity(): boolean {
        return this._iloscZyc <= 0;
    }

    /**
     * Aktualizuje pozycje przeciwników
     * @param {Prostokat[]} przeszkody
     */
    public aktualizujPozycje(przeszkody: Prostokat[]): void {
        //Aktualizacja pozycji
        const iKrokow: number = 2;
        for (let i = 0; i < iKrokow; i++) {
            //Obliczam przesuniecie
            let przesuniecie: Wektor = Wektor.PomnozSkalarnie(this._kierunek, this._szybkosc);

            //Zapisuje poprzednia pozycje
            const poprzednia: Wektor = this.pozycja.klonuj();

            //Aktualizuje pozycje
            DetektorKolizji.AktualizujProstokatUnikajac(this, Wektor.PodzielSkalarnie(przesuniecie, iKrokow), przeszkody);

            //Pozycja bez zmian -> odbijam sie
            if (poprzednia.x === this.pozycja.x) this._kierunek.x *= -1;
            if (poprzednia.y === this.pozycja.y) this._kierunek.y *= -1;
        }
    }

    /**
     * Zabija przeciwika
     */
    public zabij(): void {
        //Jeżeli już zabity to nic nie robie
        if (this.jestZabity) return;

        //Zmiejszam życia
        this._iloscZyc--;
    }

    /**
     * Zabija przeciwnika pernametnie
     */
    public zabijPernamentnie(): void {
        //Jeżeli już jest zabity nic nie robie
        if (this.jestZabity) return;

        //Zeruje życia
        this._iloscZyc = 0;
    }

    /**
     * Sprawdza czy przeciwnik znajduje się na ekranie
     * @param {Prostokat} ekran
     * @returns {boolean}
     */
    public jestNaEkranie(ekran: Prostokat): boolean {
        return DetektorKolizji.ProstokatProstokat(this, ekran);
    }
}
