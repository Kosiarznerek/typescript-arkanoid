//Dostępne w grze bloki
enum DOSTEPNE_BLOKI {
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

    BARIERKA_POZIOMA = 'BARIERKA_POZIOMA',
    BARIERKA_PIONOWA = 'BARIERKA_PIONOWA',
    BRAMA = 'BRAMA',
    KULKA = 'KULKA',
    PALETKA = 'PALETKA'
}

//Tak wygląda JSON jednego z poziomów wygenerowany generatorem poziomów
interface LEVEL_JSON {
    bloki: {
        typ: DOSTEPNE_BLOKI,
        pozycja: Wektor,
        wysokosc: number,
        szerokosc: number
    }[],
    paletka: {
        pozycja: Wektor,
        wysokosc: number,
        szerokosc: number
    },
    przeciwnicy: Wektor[],
    canvas: {
        wysokosc: number,
        szerokosc: number
    }
}

//Tu będą znajdowały się wszyzstkie poziomy (index odpowiada numerowi poziomu)
const DANE_POZIOMOW: LEVEL_JSON[] = [];

/**
 * Wczytuje poziom z pliku JSON i wrzuca go do DANE_POZIOMOW
 * @param {number} numerPoziomu
 * @param {string} sciezka
 * @returns {Promise<LEVEL_JSON>}
 */
async function ZaladujPoziom(numerPoziomu: number, sciezka: string): Promise<LEVEL_JSON> {
    const daneJSON = await fetch(sciezka);
    const dane: LEVEL_JSON = await daneJSON.json();
    DANE_POZIOMOW[numerPoziomu] = dane;
    return dane;
}

/**
 * Przygotowywuje wszystkie poziomy do przeładowania
 * @param {number} maxPoziom
 * @returns {Promise<LEVEL_JSON>[]}
 */
function PrzeladujPoziomy(maxPoziom: number): Promise<LEVEL_JSON>[] {
    return new Array(maxPoziom)
        .fill(0)
        .map((value, index) => ZaladujPoziom(index, `danePoziomow/poziom${index + 1}.json`))
}

/**
 * Generuje wybrany poziom
 * @param {number} numerPoziomu
 * @returns {ElementyGry}
 */
function GenerujPoziom(numerPoziomu: number): ElementyGry {
    //Elementy gry
    const elementyGry: ElementyGry = {
        paletka: Paletka,
        cegielki: [],
        kulki: [],
        fiolki: [],
        przeciwnicy: [],
        barierki: [],
        bramy: []
    };

    //Brak poziomu
    if (DANE_POZIOMOW[numerPoziomu - 1] === undefined) throw new Error(`Brak poziomu o numerze ${numerPoziomu}`);

    //Dane poziomu
    let dane: LEVEL_JSON = DANE_POZIOMOW[numerPoziomu - 1];


    //Zczytuje dane
    elementyGry.paletka = new Paletka(
        new Wektor(dane.paletka.pozycja.x, dane.paletka.pozycja.y),
        dane.paletka.szerokosc,
        dane.paletka.wysokosc
    );
    elementyGry.paletka.wskrzes();

    elementyGry.cegielki = dane.bloki
        .filter(value => TYPY_CEGIELEK[value.typ] !== undefined)
        .map(value => new Cegielka(
            new Wektor(value.pozycja.x, value.pozycja.y),
            value.szerokosc,
            value.wysokosc,
            value.typ
        ));

    elementyGry.kulki = dane.bloki
        .filter(value => value.typ === 'KULKA')
        .map(value => new Kulka(new Wektor(
            value.pozycja.x,
            value.pozycja.y
        )));

    elementyGry.przeciwnicy = dane.przeciwnicy.map(value => new Przeciwnik(
        new Wektor(value.x, value.y),
        TYPY_PRZECIWNIKOW[Math.randomKey(TYPY_PRZECIWNIKOW)])
    );

    elementyGry.barierki =
        dane.bloki
            .filter(value => value.typ === 'BARIERKA_POZIOMA')
            .map(value => new Barierka(
                new Wektor(value.pozycja.x, value.pozycja.y),
                value.szerokosc,
                value.wysokosc,
                TYPY_BARIEREK.POZIOMA
            ))
            .concat(dane.bloki
                .filter(value => value.typ === 'BARIERKA_PIONOWA')
                .map(value => new Barierka(
                    new Wektor(value.pozycja.x, value.pozycja.y),
                    value.szerokosc,
                    value.wysokosc,
                    TYPY_BARIEREK.PIONOWA
                ))
            );

    elementyGry.bramy = dane.bloki
        .filter(value => value.typ === 'BRAMA')
        .map(value => new Brama(
            new Wektor(value.pozycja.x, value.pozycja.y),
            value.szerokosc,
            value.wysokosc
        ));

    return elementyGry;
}