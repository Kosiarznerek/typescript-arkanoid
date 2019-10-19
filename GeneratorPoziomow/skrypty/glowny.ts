//Eventy
window.addEventListener('load', () => ZaladujWszystkieGrafiki(poWczytaniu));
window.addEventListener('keydown', ev => {
    if ([32, 37, 38, 39, 40].indexOf(ev.keyCode) > -1) ev.preventDefault();
    wcisniecieKlawisza(ev.key);
});
window.addEventListener('keyup', ev => zwolnienieKlawisza(ev.key));

//Zmienne canvasu
let CTX: CanvasRenderingContext2D;
const EKRAN: Prostokat = new Prostokat(new Punkt(0, 0), 540, 652);

//Elementy HTML
const HTML = {
    CANVAS_POJEMNIK: HTMLElement,
    DOSTEPNE_BLOKI_POJEMNIK: HTMLElement,
    OBECNIE_WYBRANY_POJEMNIK: HTMLElement,
    GENERUJ_JSON: HTMLElement,
    WCZYTAJ_JSON: HTMLElement,
    DANE_JSON: HTMLElement,
};

//Zmienne globalne
let OBECNIE_WYBRANY: Blok | null = null;
let BIERZACE_BLOKI: Blok[] = [];
let PRZECIWNICY: Kolo[] = [];

const KLAWIATURA = {
    StrzalkaLewo: false,
    StrzalkaPrawo: false,
    StrzalkaGora: false,
    StrzalkaDol: false
};
const MYSZ: Punkt = new Punkt(0, 0);

/**
 * Wywołuje się za każdorazawym poruszeniem myszy na canvasie
 * @param {MouseEvent} ev
 * @param {HTMLCanvasElement} canvas
 */
function ruszenieMysza(ev: MouseEvent, canvas: HTMLCanvasElement): void {
    //Przeliczanie pozycji
    MYSZ.x = ev.clientX - canvas.getBoundingClientRect().left;
    MYSZ.y = ev.clientY - canvas.getBoundingClientRect().top;

    MYSZ.x = Math.round(MYSZ.x / 20) * 20;
    MYSZ.y = Math.round(MYSZ.y / 20) * 20;
}

/**
 * Klik myszy na canvasie
 */
function klikMyszy(): void {
    //Jeżeli nie ma obecnie wybranego
    if (OBECNIE_WYBRANY === null) return;

    //Sprawdzam czy już nie ma dodanej paletki
    if (OBECNIE_WYBRANY.typ === DOSTEPNE_BLOKI.PALETKA) {
        const i: number = BIERZACE_BLOKI
            .map(value => value.typ)
            .indexOf(DOSTEPNE_BLOKI.PALETKA);
        if (i >= 0) {
            alert('Próba dodania więcej niż jednej paletki');
            return;
        }
    }

    //Dodaje do listy
    BIERZACE_BLOKI.push(OBECNIE_WYBRANY.klonuj());
}

/**
 * Wcisniecie klawisza
 * @param {string} klawisz
 */
function wcisniecieKlawisza(klawisz: string): void {
    //Strzałki
    if (klawisz === 'ArrowLeft') KLAWIATURA.StrzalkaLewo = true;
    if (klawisz === 'ArrowRight') KLAWIATURA.StrzalkaPrawo = true;
    if (klawisz === 'ArrowUp') KLAWIATURA.StrzalkaGora = true;
    if (klawisz === 'ArrowDown') KLAWIATURA.StrzalkaDol = true;

    //Dodawanie przeciwnikow
    if (klawisz.toUpperCase() === 'P') PRZECIWNICY.push(new Kolo(5, MYSZ.klonuj()));

    //Usuwanie klockow
    if (klawisz.toUpperCase() === 'D') BIERZACE_BLOKI = BIERZACE_BLOKI.filter(value => !Kolizja.PunktWProstokacie(MYSZ, value));
}

/**
 * Zwolnienie klawisza
 * @param {string} klawisz
 */
function zwolnienieKlawisza(klawisz: string): void {
    if (klawisz === 'ArrowLeft') KLAWIATURA.StrzalkaLewo = false;
    if (klawisz === 'ArrowRight') KLAWIATURA.StrzalkaPrawo = false;
    if (klawisz === 'ArrowUp') KLAWIATURA.StrzalkaGora = false;
    if (klawisz === 'ArrowDown') KLAWIATURA.StrzalkaDol = false;
}

interface LEVEL_JSON {
    bloki: {
        typ: DOSTEPNE_BLOKI,
        pozycja: Punkt,
        wysokosc: number,
        szerokosc: number
    }[],
    paletka: {
        pozycja: Punkt,
        wysokosc: number,
        szerokosc: number
    },
    przeciwnicy: Punkt[],
    canvas: {
        wysokosc: number,
        szerokosc: number
    }
}

/**
 * Generuje kod JSON
 */
function GenerujJSON(): void {
    //Filtruje bloki
    const bloki: Blok[] = BIERZACE_BLOKI.filter(value => value.typ !== DOSTEPNE_BLOKI.PALETKA);
    let paletki: Blok[] = BIERZACE_BLOKI.filter(value => value.typ === DOSTEPNE_BLOKI.PALETKA);
    let paletka: Blok;
    if (paletki.length !== 1) {
        alert('Nie dodano paletki do mapy');
        return;
    } else paletka = paletki[0];

    //Generuje JSON
    let dane: LEVEL_JSON = {
        bloki: bloki.map(value => {
            return {
                typ: value.typ,
                pozycja: value.pozycja.klonuj(),
                wysokosc: value.wysokosc,
                szerokosc: value.szerokosc
            }
        }),
        paletka: {
            pozycja: paletka.pozycja.klonuj(),
            wysokosc: paletka.wysokosc,
            szerokosc: paletka.szerokosc
        },
        przeciwnicy: PRZECIWNICY.map(value => value.pozycja.klonuj()),
        canvas: {
            wysokosc: EKRAN.wysokosc,
            szerokosc: EKRAN.szerokosc
        }
    };
    HTML.DANE_JSON.value = JSON.stringify(dane, null, 5);
}

/**
 * Wczytyje dane JSON
 */
function WczytajJSON(): void {
    let dane: string = HTML.DANE_JSON.value;
    try {
        let json: LEVEL_JSON = JSON.parse(dane);

        //Niezgodność rozmiaru canvasu
        if (json.canvas.wysokosc !== EKRAN.wysokosc || json.canvas.szerokosc !== EKRAN.szerokosc)
            throw new Error('Niezgodność rozmiaru canvasu.');

        //Zczytuje bloki
        BIERZACE_BLOKI = json.bloki.map(value => {
            if (DOSTEPNE_BLOKI[value.typ] !== null)
                return new Blok(new Punkt(value.pozycja.x, value.pozycja.y), value.typ);
            else throw new Error(`Nieznany typ bloku: ${value.typ}`);
        });

        //Dodaje paletke
        BIERZACE_BLOKI.push(new Blok(
            new Punkt(json.paletka.pozycja.x, json.paletka.pozycja.y),
            DOSTEPNE_BLOKI.PALETKA
        ));

        //Zczytuje przeciwnikow
        PRZECIWNICY = json.przeciwnicy.map(value => new Kolo(
            5,
            new Punkt(value.x, value.y)
        ))

    } catch (e) {
        alert('Niepowodzenie odczytu JSON');
        console.log(e);
    }
}

/**
 * Generuje podgląd dostępnych przedmiotów na podstawie danych
 * @param {Object} dane Dane ('DOSTEPNE_BLOKI' | 'DOSTEPNE_ELEMENTY_TLA') na podstawie których generuje się podgląd
 * @param {HTMLElement} POJEMNIK Pojemnik do którego mają zostać wrzucone elementy podglądu
 * @constructor
 */
function GenerujPodglad(dane: Object, POJEMNIK: HTMLElement): void {
    for (let nazwaBloku in dane) {
        let div = document.createElement('div');
        let grafika = new Image;
        grafika.src = `grafiki/${nazwaBloku}.png`;
        let podpis = document.createElement('p');
        podpis.innerHTML = nazwaBloku;
        div.appendChild(podpis);
        div.appendChild(grafika);
        POJEMNIK.appendChild(div);

        //Wybranie bloku
        div.addEventListener('click', () => {
            OBECNIE_WYBRANY = new Blok(new Punkt(0, 0), nazwaBloku);
            HTML.OBECNIE_WYBRANY_POJEMNIK.innerHTML = '';
            let podglad = new Image();
            podglad.src = `grafiki/${nazwaBloku}.png`;
            HTML.OBECNIE_WYBRANY_POJEMNIK.appendChild(podglad);
        });
    }
}

/**
 * Funkcja wykona się po wczytaniu strony
 */
function poWczytaniu(): void {
    //Pobieram pojemniki
    HTML.CANVAS_POJEMNIK = document.getElementById('canvasPojemnik');
    HTML.DOSTEPNE_BLOKI_POJEMNIK = document.getElementById('dostepneBloki');
    HTML.OBECNIE_WYBRANY_POJEMNIK = document.getElementById('obecnieWybrany');
    HTML.GENERUJ_JSON = document.getElementById('generujJSON');
    HTML.WCZYTAJ_JSON = document.getElementById('wczytajJSON');
    HTML.DANE_JSON = document.getElementById('daneJSON');

    //Tworze canvas
    const canvas = document.createElement('canvas');
    canvas.addEventListener('mousemove', (ev => ruszenieMysza(ev, canvas)));
    canvas.addEventListener('click', klikMyszy);
    canvas.width = EKRAN.szerokosc;
    canvas.height = EKRAN.wysokosc;
    HTML.CANVAS_POJEMNIK.appendChild(canvas);
    CTX = canvas.getContext('2d') || new CanvasRenderingContext2D();

    //Generuje wszystkie dostepne bloki
    GenerujPodglad(DOSTEPNE_BLOKI, HTML.DOSTEPNE_BLOKI_POJEMNIK);

    //Generowanie JSON
    HTML.GENERUJ_JSON.addEventListener('click', GenerujJSON);

    //Wczytywanie JSON
    HTML.WCZYTAJ_JSON.addEventListener('click', WczytajJSON);

    //Rozpoczynam animacje
    animacja();
}

function animacja(): void {
    //Tło
    CTX.fillStyle = '#eecbff';
    CTX.fillRect(0, 0, EKRAN.szerokosc, EKRAN.wysokosc);

    //Aktualizowanie pozycji obecnie wyranego
    if (OBECNIE_WYBRANY) {
        let w: Punkt = new Punkt(MYSZ.x - OBECNIE_WYBRANY.szerokosc / 2, MYSZ.y - OBECNIE_WYBRANY.wysokosc / 2);
        w.x -= OBECNIE_WYBRANY.pozycja.x;
        w.y -= OBECNIE_WYBRANY.pozycja.y;
        Kolizja.AktualizujProstokatUnikajac(OBECNIE_WYBRANY, w,
            new Array()
                .concat(BIERZACE_BLOKI)
                .concat([
                    new Prostokat(new Punkt(EKRAN.pozycja.x - 100, EKRAN.pozycja.y - 100), EKRAN.szerokosc + 200, 100),
                    new Prostokat(new Punkt(EKRAN.pozycja.x - 100, EKRAN.pozycja.y + EKRAN.wysokosc), EKRAN.szerokosc + 200, 100),
                    new Prostokat(new Punkt(EKRAN.pozycja.x - 100, EKRAN.pozycja.y), 100, EKRAN.wysokosc),
                    new Prostokat(new Punkt(EKRAN.pozycja.x + EKRAN.szerokosc, EKRAN.pozycja.y), 100, EKRAN.wysokosc)
                ])
        );
    }

    //Rysowanie
    if (OBECNIE_WYBRANY !== null) OBECNIE_WYBRANY.rysuj(CTX);
    BIERZACE_BLOKI.forEach(value => value.rysuj(CTX));
    PRZECIWNICY.forEach(value => value.rysuj(CTX));

    //Request
    CTX.restore();
    requestAnimationFrame(animacja);
}