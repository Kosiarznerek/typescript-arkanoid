class Kontroler {

    public readonly maxPoziomow: number;
    public strzelanieGracza: boolean;
    private _obecnyRekord: number;

    /**
     * Tworzy kontroler gry
     * @param {number} maxPoziomow
     */
    constructor(maxPoziomow: number) {
        //Poziomy
        this.maxPoziomow = maxPoziomow;
        this.resetuj();
    }

    private _obecnyPoziom: number;

    public get obecnyPoziom(): number {
        return this._obecnyPoziom;
    }

    public set obecnyPoziom(value: number) {
        value = Math.floor(value);
        if (value > this.maxPoziomow) value = 1;
        if (value <= 0) value = 1;
        this._obecnyPoziom = value;
    }

    private _punktyGracza: number;

    get punktyGracza(): number {
        return this._punktyGracza;
    }

    set punktyGracza(value: number) {
        if (value > 999999) value = 999999;
        this._punktyGracza = value;
    }

    private _zyciaGracza: number;

    get zyciaGracza(): number {
        return this._zyciaGracza;
    }

    set zyciaGracza(value: number) {
        if (value > 5) value = 5;
        if (value < 0) value = 0;
        this._zyciaGracza = value;
    }

    /**
     * Resetuje statystyki
     */
    public resetuj(): void {
        this._punktyGracza = 0;
        this._zyciaGracza = 3;
        this._obecnyPoziom = 1;
        this.strzelanieGracza = false;
        this._obecnyRekord = 0;
        this.aktualizujNajlepszy();
    }

    /**
     * Zapisuje do localstorage najlepszy wynik
     */
    public aktualizujNajlepszy(): void {
        //Zczytuje i porównuje z obecnym wynikiem
        const naj: string | null = localStorage.getItem('najlepszy');
        if (naj !== null && parseInt(naj) < this._punktyGracza) this._obecnyRekord = this._punktyGracza;
        else if (naj !== null && parseInt(naj) > this._punktyGracza) this._obecnyRekord = parseInt(naj);
        else if (naj === null) this._obecnyRekord = 0;

        //Aktualizuje
        localStorage.setItem('najlepszy', this._obecnyRekord.toString());
    }

    /**
     * Wyswietla statystyki na canvasie
     * @param {CanvasRenderingContext2D} ctx Kontekst na którym będą rysowane
     * @param {Prostokat} ekran 'Ekran' na środku, którego będą się wyświetlać
     */
    public wyswietlStatystyki(ctx: CanvasRenderingContext2D, ekran: Prostokat): void {
        //Tło
        ctx.fillStyle = 'black';
        ctx.fillRect(ekran.pozycja.x, ekran.pozycja.y, ekran.szerokosc, ekran.wysokosc);

        //Tytuł
        ctx.font = '24px PressStart2P';
        ctx.fillStyle = '#fafa8b';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        ctx.fillText('ARKANOID', ekran.srodek.x, 10);

        //Statystyki
        ctx.font = '16px PressStart2P';
        ctx.fillStyle = '#fafa8b';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        ctx.fillText(`POZIOM: ${this.obecnyPoziom.toString().padStart(2, '0')}`, ekran.srodek.x, ekran.srodek.y - 40);
        ctx.fillText(`ZYCIA: ${this.zyciaGracza.toString().padStart(2, '0')}`, ekran.srodek.x, ekran.srodek.y - 20);
        ctx.fillText(`STRZAL: ${this.strzelanieGracza ? 'TAK' : 'NIE'}`, ekran.srodek.x, ekran.srodek.y);
        ctx.fillText(`PUNKTY: ${this.punktyGracza.toString().padStart(6, '0')}`, ekran.srodek.x, ekran.srodek.y + 20);
        ctx.fillText(`REKORD: ${this._obecnyRekord.toString().padStart(6, '0')}`, ekran.srodek.x, ekran.srodek.y + 40);
    }

}
