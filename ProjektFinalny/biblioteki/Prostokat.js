"use strict";
class Prostokat {
    /**
     * Tworzy obiekt Prostokąta
     * @param {Wektor} pozycja
     * @param {number} szerokosc
     * @param {number} wysokosc
     */
    constructor(pozycja, szerokosc, wysokosc) {
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
    get srodek() {
        let w = this.pozycja.klonuj();
        w.x += this.szerokosc / 2;
        w.y += this.wysokosc / 2;
        return w;
    }
    /**
     * Rysuje prostokąt na canvasie
     * @param {CanvasRenderingContext2D} ctx
     */
    rysuj(ctx) {
        //Brak koloru i grafiki
        if (this.grafika === undefined && this.kolorWypelnienia === undefined)
            return;
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
