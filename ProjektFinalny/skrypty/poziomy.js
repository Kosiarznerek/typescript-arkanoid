"use strict";
//Dostępne w grze bloki
var DOSTEPNE_BLOKI;
(function (DOSTEPNE_BLOKI) {
    DOSTEPNE_BLOKI["T0"] = "T0";
    DOSTEPNE_BLOKI["T1"] = "T1";
    DOSTEPNE_BLOKI["T2"] = "T2";
    DOSTEPNE_BLOKI["T3"] = "T3";
    DOSTEPNE_BLOKI["T4"] = "T4";
    DOSTEPNE_BLOKI["T5"] = "T5";
    DOSTEPNE_BLOKI["T6"] = "T6";
    DOSTEPNE_BLOKI["T7"] = "T7";
    DOSTEPNE_BLOKI["T8"] = "T8";
    DOSTEPNE_BLOKI["T9"] = "T9";
    DOSTEPNE_BLOKI["BARIERKA_POZIOMA"] = "BARIERKA_POZIOMA";
    DOSTEPNE_BLOKI["BARIERKA_PIONOWA"] = "BARIERKA_PIONOWA";
    DOSTEPNE_BLOKI["BRAMA"] = "BRAMA";
    DOSTEPNE_BLOKI["KULKA"] = "KULKA";
    DOSTEPNE_BLOKI["PALETKA"] = "PALETKA";
})(DOSTEPNE_BLOKI || (DOSTEPNE_BLOKI = {}));
//Tu będą znajdowały się wszyzstkie poziomy (index odpowiada numerowi poziomu)
const DANE_POZIOMOW = [];
/**
 * Wczytuje poziom z pliku JSON i wrzuca go do DANE_POZIOMOW
 * @param {number} numerPoziomu
 * @param {string} sciezka
 * @returns {Promise<LEVEL_JSON>}
 */
async function ZaladujPoziom(numerPoziomu, sciezka) {
    const daneJSON = await fetch(sciezka);
    const dane = await daneJSON.json();
    DANE_POZIOMOW[numerPoziomu] = dane;
    return dane;
}
/**
 * Przygotowywuje wszystkie poziomy do przeładowania
 * @param {number} maxPoziom
 * @returns {Promise<LEVEL_JSON>[]}
 */
function PrzeladujPoziomy(maxPoziom) {
    return new Array(maxPoziom)
        .fill(0)
        .map((value, index) => ZaladujPoziom(index, `danePoziomow/poziom${index + 1}.json`));
}
/**
 * Generuje wybrany poziom
 * @param {number} numerPoziomu
 * @returns {ElementyGry}
 */
function GenerujPoziom(numerPoziomu) {
    //Elementy gry
    const elementyGry = {
        paletka: Paletka,
        cegielki: [],
        kulki: [],
        fiolki: [],
        przeciwnicy: [],
        barierki: [],
        bramy: []
    };
    //Brak poziomu
    if (DANE_POZIOMOW[numerPoziomu - 1] === undefined)
        throw new Error(`Brak poziomu o numerze ${numerPoziomu}`);
    //Dane poziomu
    let dane = DANE_POZIOMOW[numerPoziomu - 1];
    //Zczytuje dane
    elementyGry.paletka = new Paletka(new Wektor(dane.paletka.pozycja.x, dane.paletka.pozycja.y), dane.paletka.szerokosc, dane.paletka.wysokosc);
    elementyGry.paletka.wskrzes();
    elementyGry.cegielki = dane.bloki
        .filter(value => TYPY_CEGIELEK[value.typ] !== undefined)
        .map(value => new Cegielka(new Wektor(value.pozycja.x, value.pozycja.y), value.szerokosc, value.wysokosc, value.typ));
    elementyGry.kulki = dane.bloki
        .filter(value => value.typ === 'KULKA')
        .map(value => new Kulka(new Wektor(value.pozycja.x, value.pozycja.y)));
    elementyGry.przeciwnicy = dane.przeciwnicy.map(value => new Przeciwnik(new Wektor(value.x, value.y), TYPY_PRZECIWNIKOW[Math.randomKey(TYPY_PRZECIWNIKOW)]));
    elementyGry.barierki =
        dane.bloki
            .filter(value => value.typ === 'BARIERKA_POZIOMA')
            .map(value => new Barierka(new Wektor(value.pozycja.x, value.pozycja.y), value.szerokosc, value.wysokosc, TYPY_BARIEREK.POZIOMA))
            .concat(dane.bloki
            .filter(value => value.typ === 'BARIERKA_PIONOWA')
            .map(value => new Barierka(new Wektor(value.pozycja.x, value.pozycja.y), value.szerokosc, value.wysokosc, TYPY_BARIEREK.PIONOWA)));
    elementyGry.bramy = dane.bloki
        .filter(value => value.typ === 'BRAMA')
        .map(value => new Brama(new Wektor(value.pozycja.x, value.pozycja.y), value.szerokosc, value.wysokosc));
    return elementyGry;
}
