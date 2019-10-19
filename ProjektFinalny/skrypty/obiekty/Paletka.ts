class Paletka extends Prostokat {

    public ruch: {
        lewo: boolean,
        prawo: boolean
    };
    public maxSzybkosc: number;
    private _kierunek: Wektor;

    private _zadanaSzerokosc: number;

    private _pociski: Pocisk[];

    private _animacje: {
        rozwalenie: Animacja,
        wskrzeszenie: Animacja
    };
    private _tryb: 'normalny' | 'rozwalenie' | 'wskrzeszenie' | 'rozwalona';
    private _poRozwaleniu: Function | undefined;

    /**
     * Tworzy obiekt Palekta
     * @param {Wektor} pozycja
     * @param {number} szerokosc
     * @param {number} wysokosc
     */
    constructor(pozycja: Wektor, szerokosc: number, wysokosc: number) {
        super(pozycja, szerokosc, wysokosc);

        //Poruszanie paletki
        this.ruch = {
            lewo: false,
            prawo: false
        };
        this.maxSzybkosc = 8;
        this._kierunek = new Wektor;

        //Zmiana rozmiaru
        this._zadanaSzerokosc = this.szerokosc;

        //Pociski
        this._pociski = [];

        //Animacje
        this._animacje = {
            wskrzeszenie: new Animacja(GRAFIKI.paletka.wskrzeszenie, 8),
            rozwalenie: new Animacja(GRAFIKI.paletka.rozwalenie, 8)
        };
        this._tryb = 'normalny';
    }

    /**
     * Aktualizuje pozycje paletki
     * @param {T[]} przeszkody Przeszkody przez jakie nie może 'przenikac'
     */
    public aktualizujPozycje<T extends Prostokat>(przeszkody: T[]): void {
        //Jeżeli tryb inny niż normalny
        if (this._tryb !== 'normalny') return;

        //W zależności w którą stronę się poruszam
        if (this.ruch.prawo && Math.abs(this._kierunek.x) < this.maxSzybkosc) this._kierunek.x += 0.5;
        if (this.ruch.lewo && Math.abs(this._kierunek.x) < this.maxSzybkosc) this._kierunek.x -= 0.5;

        //Wytracanie prędkości
        if (this._kierunek.x > 0) this._kierunek.x -= 0.15;
        if (this._kierunek.x < 0) this._kierunek.x += 0.15;
        if (Math.abs(this._kierunek.x) < 0.1) this._kierunek.x = 0;

        //Aktualizacja pozycji
        const kroki: number = 2;
        for (let i = 0; i < kroki; i++) {
            let pop: Wektor = this.pozycja.klonuj();
            DetektorKolizji.AktualizujProstokatUnikajac(this, Wektor.PodzielSkalarnie(this._kierunek, kroki), przeszkody);
            if (Wektor.TakieSame(this.pozycja, pop)) this._kierunek.x = 0;
        }
    }

    /**
     * Sprawdza czy paletka dotknęła jakiś obiektów
     * @param {T[]} obiekty Obiekty do sprawdzenia
     * @returns {T[]} Obiekty, które dotknęła
     */
    public dotknela<T extends Prostokat>(obiekty: T[]): T[] {
        return obiekty.filter(value => DetektorKolizji.ProstokatProstokat(this, value));
    }

    /**
     * Ustawia żądaną długość paletki
     * @param {number} szerokosc
     */
    public ustawSzerokosc(szerokosc: number): void {
        //Jeżeli tryb inny niż normalny
        if (this._tryb !== 'normalny') return;

        //Jeżeli już jest ustawiona nic nie robie
        if (this._zadanaSzerokosc === szerokosc) return;

        //Ustawiam
        this._zadanaSzerokosc = szerokosc;
    }

    /**
     * Aktualizuje szerokość paletki
     */
    public aktualizujSzerokosc(): void {

        //Jeżeli jest odpowiednia nic nie robie
        if (this._zadanaSzerokosc === this.szerokosc) return;

        //Zmieniam o [X]px i środkuje
        if (this._zadanaSzerokosc > this.szerokosc) {
            this.szerokosc += 1;
            this.pozycja.x -= 0.5;
        } else if (this._zadanaSzerokosc < this.szerokosc) {
            this.szerokosc -= 1;
            this.pozycja.x += 0.5;
        }

        //Sprawdzam czy jest w granicy błędu
        if (Math.abs(this._zadanaSzerokosc - this.szerokosc) < 1) this.szerokosc = this._zadanaSzerokosc;
    }

    /**
     * Aktualizuje pociski
     * @param {T[]} obiekty Obiekty jakie może zestrzelić pocisk
     * @returns {T[]} Obiekty jakie zostały zestrzelone
     */
    public aktualizujPociski<T extends Prostokat>(obiekty: T[]): T[] {
        const zestrzelone: T[] = [];
        for (let i = 0; i < this._pociski.length; i++) {
            const trafione: T[] = this._pociski[i].aktualizujPozycje(obiekty);
            zestrzelone.push(...trafione);

            //Jeżeli pocisk w coś trafił to go usuwam
            if (trafione.length > 0) {
                this._pociski.splice(i, 1);
                i--;
            }
        }
        return zestrzelone;
    }

    /**
     * Rysuje pociski na canvasie
     * @param {CanvasRenderingContext2D} ctx
     */
    public rysujPociski(ctx: CanvasRenderingContext2D): void {
        this._pociski.forEach(value => value.rysuj(ctx));
    }

    /**
     * Wystrzela pocisk
     */
    public wystrzelPocisk(): void {
        //Jeżeli tryb inny niż normalny
        if (this._tryb !== 'normalny') return;

        //Odległość do poprzedniego większa niż [X]px
        const min: number = this._pociski
            .map(value => value.pozycja.klonuj())
            .reduce((previousValue: number, currentValue: Wektor): number => {
                const odl: number = Wektor.OdlegloscPomiedzy(this.srodek, currentValue);
                return odl < previousValue ? odl : previousValue;
            }, Infinity);
        if (min <= 50) return;

        //Tworze pociski
        const lewy: Pocisk = new Pocisk(
            new Wektor(this.pozycja.x + 5, this.pozycja.y),
            new Wektor(0, -1)
        );
        const prawy: Pocisk = new Pocisk(
            new Wektor(this.pozycja.x + this.szerokosc - 9, this.pozycja.y),
            new Wektor(0, -1)
        );

        //Dodaje
        this._pociski.push(lewy, prawy);
    }

    /**
     * Aktualizuje grafike paletki
     */
    public aktualizujGrafike(): void {
        //Jeżeli tryb normalny -> domyślna grafika
        if (this._tryb === 'normalny') this.grafika = GRAFIKI.paletka.domyslna;

        //Jeżeli rozwalona -> pusty obrazek
        if (this._tryb === 'rozwalona') this.grafika = new Image;

        //Animacje
        if (this._tryb === 'wskrzeszenie' || this._tryb === 'rozwalenie') {
            const grafika: HTMLImageElement | null = this._animacje[this._tryb].nastepnaKlatka();
            if (grafika) this.grafika = grafika;
            else {
                //Cofam animacje do początku i ustawiam tryb normalny
                this._animacje[this._tryb].cofnijDoPoczatku();
                if (this._tryb === 'wskrzeszenie') this._tryb = 'normalny';
                else {
                    this._tryb = 'rozwalona';
                    if (this._poRozwaleniu) this._poRozwaleniu();
                    this._poRozwaleniu = undefined;
                }
            }
        }
    }

    /**
     * Wkrzesa paletke
     */
    public wskrzes(): void {
        if (this._tryb === 'wskrzeszenie') return;
        else this._tryb = 'wskrzeszenie';
    }

    /**
     * Rozwala paletke
     * @param {Function} callback Callback po rozwaleniu paletki
     */
    public rozwal(callback?: Function): void {
        if (this._tryb === 'rozwalenie' || this._tryb === 'rozwalona') return;
        else this._tryb = 'rozwalenie';
        this._poRozwaleniu = callback;
    }
}
