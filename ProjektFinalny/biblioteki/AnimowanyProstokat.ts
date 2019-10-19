class AnimowanyProstokat extends Prostokat {

    private _animacja: Animacja;

    /**
     * Tworzy animowany Prostokąt
     * @param {Wektor} pozycja
     * @param {number} szerokosc
     * @param {number} wysokosc
     * @param {HTMLImageElement[]} klatkiAnimacji
     * @param {number} mnoznikAnimacji
     */
    constructor(pozycja: Wektor, szerokosc: number, wysokosc: number, klatkiAnimacji: HTMLImageElement[], mnoznikAnimacji: number) {
        super(pozycja, szerokosc, wysokosc);
        this._animacja = new Animacja(klatkiAnimacji, mnoznikAnimacji);
    }

    /**
     * Aktualizuje animacje
     */
    public aktualizujAnimacje(): void {
        let grafika: HTMLImageElement | null = this._animacja.nastepnaKlatka();
        if (grafika !== null) this.grafika = grafika;
        else {
            this._animacja.cofnijDoPoczatku();
            this.grafika = this._animacja.nastepnaKlatka() || new Image;
        }
    }
}