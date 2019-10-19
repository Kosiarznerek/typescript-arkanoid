"use strict";
class Brama extends Prostokat {
    /**
     * Tworzy obiekt Brama
     * @param {Wektor} pozycja
     * @param {number} szerokosc
     * @param {number} wysokosc
     */
    constructor(pozycja, szerokosc, wysokosc) {
        super(pozycja, szerokosc, wysokosc);
        //Animacje
        this._animacje = {
            otwarcie: new Animacja(GRAFIKI.brama.otwarcie, 3),
            zamkniecie: new Animacja(GRAFIKI.brama.zamkniecie, 3)
        };
        //Domyślnie brama jest zamknięta
        this._obecnyStan = 'zamknieta';
        this._zadanyStan = 'zamknieta';
        //Callback po otwarciu lub zamknieciu bramy
        this._callback = undefined;
    }
    /**
     * Sprawdza czy brama jest otwarta
     * @returns {boolean}
     */
    get jestOtwarta() {
        return this._obecnyStan === 'otwarta' && this._zadanyStan === 'otwarta';
    }
    /**
     * Sprawdza czy brama jest zamknieta
     * @returns {boolean}
     */
    get jestZamknieta() {
        return this._obecnyStan === 'zamknieta' && this._zadanyStan === 'zamknieta';
    }
    /**
     * Aktualizuje grafike bramy
     */
    aktualizujGrafike() {
        //Zwykła grafika
        if (this._zadanyStan === this._obecnyStan) {
            this.grafika = GRAFIKI.brama[this._obecnyStan];
            return;
        }
        //Zamykanie
        if (this._zadanyStan === 'zamknieta') {
            const grafika = this._animacje.zamkniecie.nastepnaKlatka();
            if (grafika)
                this.grafika = grafika;
            else {
                this._animacje.zamkniecie.cofnijDoPoczatku();
                this._obecnyStan = this._zadanyStan;
                if (this._callback)
                    this._callback();
                this._callback = undefined;
            }
            return;
        }
        //Otwieranie
        if (this._zadanyStan === 'otwarta') {
            const grafika = this._animacje.otwarcie.nastepnaKlatka();
            if (grafika)
                this.grafika = grafika;
            else {
                this._animacje.otwarcie.cofnijDoPoczatku();
                this._obecnyStan = this._zadanyStan;
                if (this._callback)
                    this._callback();
                this._callback = undefined;
            }
            return;
        }
    }
    /**
     * Otwiera brame
     * @param {Function} callback Callback po otwarciu bramy
     */
    otworz(callback) {
        //Jeżeli już jest otwarta
        if (this._obecnyStan === 'otwarta')
            return;
        //Jeżeli jest w trakcjie otwierania lub zamykania
        if (this._obecnyStan !== this._zadanyStan)
            return;
        //Aktualizuje stan
        this._zadanyStan = 'otwarta';
        this._callback = callback;
    }
    /**
     * Zamyka brame
     * @param {Function} callback Callback po zamknięciu bramy
     */
    zamknij(callback) {
        //Jeżeli już jest zamknieta
        if (this._obecnyStan === 'zamknieta')
            return;
        //Jeżeli jest w trakcjie otwierania lub zamykania
        if (this._obecnyStan !== this._zadanyStan)
            return;
        //Aktualizuje stan
        this._zadanyStan = 'zamknieta';
        this._callback = callback;
    }
}
