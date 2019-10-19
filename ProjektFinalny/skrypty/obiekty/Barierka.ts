//Typy barierek
enum TYPY_BARIEREK {
    POZIOMA = 'POZIOMA',
    PIONOWA = 'PIONOWA'
}

//Klasa barierki
class Barierka extends Prostokat {

    /**
     * Tworzy obiekt Barierka
     * @param {Wektor} pozycja
     * @param {number} szerokosc
     * @param {number} wysokosc
     * @param {TYPY_BARIEREK} typ
     */
    constructor(pozycja: Wektor, szerokosc: number, wysokosc: number, typ: TYPY_BARIEREK) {
        super(pozycja, szerokosc, wysokosc);
        switch (typ) {
            case TYPY_BARIEREK.PIONOWA:
                this.grafika = GRAFIKI.barierka.pionowa;
                break;
            case TYPY_BARIEREK.POZIOMA:
                this.grafika = GRAFIKI.barierka.pozioma;
                break;
            default:
                throw new Error(`Typ barierki ${typ} jest nieznany`);
        }
    }
}