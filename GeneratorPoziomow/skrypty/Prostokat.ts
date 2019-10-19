class Prostokat {

    public pozycja: Punkt;
    public szerokosc: number;
    public wysokosc: number;
    public grafika: HTMLImageElement | undefined;
    public kolorWypelnienia: string | undefined;

    /**
     * Tworzy obiekt Prostokąta
     * @param {Punkt} pozycja
     * @param {number} szerokosc
     * @param {number} wysokosc
     */
    constructor(pozycja: Punkt, szerokosc: number, wysokosc: number) {
        this.pozycja = pozycja.klonuj();
        this.szerokosc = szerokosc;
        this.wysokosc = wysokosc;

        this.grafika = undefined;
        this.kolorWypelnienia = undefined;
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