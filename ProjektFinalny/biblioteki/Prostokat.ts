class Prostokat {

    public pozycja: Wektor;
    public szerokosc: number;
    public wysokosc: number;
    public grafika: HTMLImageElement | undefined;
    public kolorWypelnienia: string | undefined;

    /**
     * Tworzy obiekt Prostokąta
     * @param {Wektor} pozycja
     * @param {number} szerokosc
     * @param {number} wysokosc
     */
    constructor(pozycja: Wektor, szerokosc: number, wysokosc: number) {
        this.pozycja = pozycja.klonuj();
        this.szerokosc = szerokosc;
        this.wysokosc = wysokosc;

        this.grafika = undefined;
        this.kolorWypelnienia = undefined;
    }

    /**
     * Zwraca środek prostokątka
     * @returns {Wektor}
     */
    public get srodek(): Wektor {
        let w: Wektor = this.pozycja.klonuj();
        w.x += this.szerokosc / 2;
        w.y += this.wysokosc / 2;
        return w;
    }

    /**
     * Rysuje prostokąt na canvasie
     * @param {CanvasRenderingContext2D} ctx
     */
    public rysuj(ctx: CanvasRenderingContext2D): void {
        //Brak koloru i grafiki
        if (this.grafika === undefined && this.kolorWypelnienia === undefined) return;

        //Kolor i grafika
        if (this.grafika !== undefined && this.kolorWypelnienia !== undefined)
            throw new Error('Zadeklarowano kolor i grafike jako wypełnienie prostokąta');

        //Bez grafiki
        if (this.kolorWypelnienia !== undefined) {
            ctx.fillStyle = this.kolorWypelnienia;
            ctx.fillRect(this.pozycja.x, this.pozycja.y, this.szerokosc, this.wysokosc);
        }

        //Z grafiką
        if (this.grafika !== undefined) {
            ctx.drawImage(this.grafika, this.pozycja.x, this.pozycja.y, this.szerokosc, this.wysokosc);
        }
    }

}