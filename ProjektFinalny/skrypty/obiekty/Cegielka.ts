//Typy cegielek
enum TYPY_CEGIELEK {
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
}

//Klasa cegiełki
class Cegielka extends Prostokat {

    public readonly typ: TYPY_CEGIELEK;
    private _iloscZyc: number;

    /**
     * Tworzy obiekt cegiełki
     * @param {Wektor} pozycja
     * @param {number} szerokosc
     * @param {number} wysokosc
     * @param {TYPY_CEGIELEK} typ
     */
    constructor(pozycja: Wektor, szerokosc: number, wysokosc: number, typ: TYPY_CEGIELEK) {
        super(pozycja, szerokosc, wysokosc);
        this.grafika = GRAFIKI.cegielki[typ];

        //W zależności od typu odpowiednia ilość żyć
        switch (typ) {
            case 'T4':
            case 'T5':
                this._iloscZyc = 3;
                break;

            case 'T0':
            case 'T1':
            case 'T2':
            case 'T3':
            case 'T6':
            case 'T7':
            case 'T8':
            case 'T9':
                this._iloscZyc = 1;
                break;
            default:
                throw new Error(`Typ cegiełki ${typ} nie jest znany`);
        }
        this.typ = typ;

    }

    /**
     * Sprawdza czy cegielka jest rozwalona
     * @returns {boolean}
     */
    public get jestRozwalona(): boolean {
        return this._iloscZyc === 0;
    }

    /**
     * Rozwala cegielke
     */
    public rozwal(): void {
        //Jeżeli rozwalona to nic nie robie
        if (this.jestRozwalona) return;

        //Jeżeli nie zmiejszam zycia
        this._iloscZyc--;
    }

}