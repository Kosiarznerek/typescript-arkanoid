//Dostępne w grze bloki
enum DOSTEPNE_BLOKI {
    T0 = 'T0',
    T1 = 'T1',
    T2 = 'T2',
    T3 = 'T3',
    T4 = 'T4',
    T5 = 'T5',
    T6 = 'T6',
    T7 = 'T7',
    T8 = 'T8',
    T9 = 'T9',

    BARIERKA_POZIOMA = 'BARIERKA_POZIOMA',
    BARIERKA_PIONOWA = 'BARIERKA_PIONOWA',
    BRAMA = 'BRAMA',
    KULKA = 'KULKA',
    PALETKA = 'PALETKA'
}

class Blok extends Prostokat {

    public readonly typ: DOSTEPNE_BLOKI;

    /**
     * Tworzy blok gry
     * @param {Punkt} pozycja
     * @param {DOSTEPNE_BLOKI} typ
     */
    constructor(pozycja: Punkt, typ: DOSTEPNE_BLOKI) {
        super(pozycja, GRAFIKI[typ].width, GRAFIKI[typ].height);
        this.grafika = GRAFIKI[typ];
        this.typ = typ;
    }

    /**
     * Klonuje blok
     * @returns {Blok}
     */
    public klonuj(): Blok {
        return new Blok(this.pozycja.klonuj(), this.typ);
    }
}