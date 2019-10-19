"use strict";
//Obiekt zawiera wszystkie grafiki dostępne w grze
const GRAFIKI = {
    cegielki: {
        T0: new Image, T1: new Image, T2: new Image,
        T3: new Image, T4: new Image, T5: new Image,
        T6: new Image, T7: new Image, T8: new Image,
        T9: new Image,
    },
    fiolki: {
        B: [new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image],
        C: [new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image],
        D: [new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image],
        E: [new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image],
        L: [new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image],
        M: [new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image],
        R: [new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image],
        S: [new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image]
    },
    paletka: {
        rozwalenie: [new Image, new Image, new Image, new Image],
        wskrzeszenie: [new Image, new Image, new Image, new Image],
        domyslna: new Image
    },
    przeciwnicy: {
        kulki: [
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
        ],
        orbita: [
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
        ],
        stozek: [
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
        ],
        szescian: [
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
        ],
        trojkat: [
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
        ],
        ziemia: [
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
            new Image, new Image, new Image, new Image, new Image,
        ]
    },
    kulka: new Image,
    pocisk: new Image,
    brama: {
        otwarta: new Image,
        zamknieta: new Image,
        otwarcie: [new Image, new Image, new Image, new Image, new Image, new Image, new Image],
        zamkniecie: [new Image, new Image, new Image, new Image, new Image, new Image, new Image],
    },
    barierka: {
        pozioma: new Image,
        pionowa: new Image
    },
    tlo: new Image
};
/**
 * Łąduje pojedyńczą grafike
 * @param {HTMLImageElement} img
 * @param {string} src
 * @returns {Promise<HTMLImageElement>}
 */
function ZaladujGrafike(img, src) {
    return new Promise((resolve, reject) => {
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => resolve();
    });
}
/**
 * Przygotowywuje wszystkie grafiki z 'GRAFIKI' do użytku
 * @returns {Promise<HTMLImageElement>[]}
 */
function PrzeladujGrafiki() {
    return [
        //Cegiełki
        ZaladujGrafike(GRAFIKI.cegielki['T0'], 'grafiki/cegielki/T0.png'),
        ZaladujGrafike(GRAFIKI.cegielki['T1'], 'grafiki/cegielki/T1.png'),
        ZaladujGrafike(GRAFIKI.cegielki['T2'], 'grafiki/cegielki/T2.png'),
        ZaladujGrafike(GRAFIKI.cegielki['T3'], 'grafiki/cegielki/T3.png'),
        ZaladujGrafike(GRAFIKI.cegielki['T4'], 'grafiki/cegielki/T4.png'),
        ZaladujGrafike(GRAFIKI.cegielki['T5'], 'grafiki/cegielki/T5.png'),
        ZaladujGrafike(GRAFIKI.cegielki['T6'], 'grafiki/cegielki/T6.png'),
        ZaladujGrafike(GRAFIKI.cegielki['T7'], 'grafiki/cegielki/T7.png'),
        ZaladujGrafike(GRAFIKI.cegielki['T8'], 'grafiki/cegielki/T8.png'),
        ZaladujGrafike(GRAFIKI.cegielki['T9'], 'grafiki/cegielki/T9.png'),
        //Fiolki.B
        ...GRAFIKI.fiolki.B
            .map((value, index) => ZaladujGrafike(GRAFIKI.fiolki.B[index], `grafiki/fiolki/B/${index}.png`)),
        //Fiolki.C
        ...GRAFIKI.fiolki.C
            .map((value, index) => ZaladujGrafike(GRAFIKI.fiolki.C[index], `grafiki/fiolki/C/${index}.png`)),
        //Fiolki.D
        ...GRAFIKI.fiolki.D
            .map((value, index) => ZaladujGrafike(GRAFIKI.fiolki.D[index], `grafiki/fiolki/D/${index}.png`)),
        //Fiolki.E
        ...GRAFIKI.fiolki.E
            .map((value, index) => ZaladujGrafike(GRAFIKI.fiolki.E[index], `grafiki/fiolki/E/${index}.png`)),
        //Fiolki.L
        ...GRAFIKI.fiolki.L
            .map((value, index) => ZaladujGrafike(GRAFIKI.fiolki.L[index], `grafiki/fiolki/L/${index}.png`)),
        //Fiolki.M
        ...GRAFIKI.fiolki.M
            .map((value, index) => ZaladujGrafike(GRAFIKI.fiolki.M[index], `grafiki/fiolki/M/${index}.png`)),
        //Fiolki.R
        ...GRAFIKI.fiolki.R
            .map((value, index) => ZaladujGrafike(GRAFIKI.fiolki.R[index], `grafiki/fiolki/R/${index}.png`)),
        //Fiolki.S
        ...GRAFIKI.fiolki.S
            .map((value, index) => ZaladujGrafike(GRAFIKI.fiolki.S[index], `grafiki/fiolki/S/${index}.png`)),
        //Paletka.rozwalenie
        ...GRAFIKI.paletka.rozwalenie
            .map((value, index) => ZaladujGrafike(GRAFIKI.paletka.rozwalenie[index], `grafiki/paletka/rozwalenie/${index}.png`)),
        //Paletka.wskrzeszenie
        ...GRAFIKI.paletka.wskrzeszenie
            .map((value, index) => ZaladujGrafike(GRAFIKI.paletka.wskrzeszenie[index], `grafiki/paletka/wskrzeszenie/${index}.png`)),
        //Paletka domyślna
        ZaladujGrafike(GRAFIKI.paletka.domyslna, 'grafiki/paletka/domyslna.png'),
        //Przeciwnicy.kulki
        ...GRAFIKI.przeciwnicy.kulki
            .map((value, index) => ZaladujGrafike(GRAFIKI.przeciwnicy.kulki[index], `grafiki/przeciwnicy/kulki/${index}.png`)),
        //Przeciwnicy.orbita
        ...GRAFIKI.przeciwnicy.orbita
            .map((value, index) => ZaladujGrafike(GRAFIKI.przeciwnicy.orbita[index], `grafiki/przeciwnicy/orbita/${index}.png`)),
        //Przeciwnicy.stozek
        ...GRAFIKI.przeciwnicy.stozek
            .map((value, index) => ZaladujGrafike(GRAFIKI.przeciwnicy.stozek[index], `grafiki/przeciwnicy/stozek/${index}.png`)),
        //Przeciwnicy.szescian
        ...GRAFIKI.przeciwnicy.szescian
            .map((value, index) => ZaladujGrafike(GRAFIKI.przeciwnicy.szescian[index], `grafiki/przeciwnicy/szescian/${index}.png`)),
        //Przeciwnicy.kulki
        ...GRAFIKI.przeciwnicy.trojkat
            .map((value, index) => ZaladujGrafike(GRAFIKI.przeciwnicy.trojkat[index], `grafiki/przeciwnicy/trojkat/${index}.png`)),
        //Przeciwnicy.ziemia
        ...GRAFIKI.przeciwnicy.ziemia
            .map((value, index) => ZaladujGrafike(GRAFIKI.przeciwnicy.ziemia[index], `grafiki/przeciwnicy/ziemia/${index}.png`)),
        //Kulka
        ZaladujGrafike(GRAFIKI.kulka, 'grafiki/kulka.png'),
        //Pocisk
        ZaladujGrafike(GRAFIKI.pocisk, 'grafiki/pocisk.png'),
        //Brama.otwarta
        ZaladujGrafike(GRAFIKI.brama.otwarta, 'grafiki/brama/otwarta.png'),
        //Brama.zamknieta
        ZaladujGrafike(GRAFIKI.brama.zamknieta, 'grafiki/brama/zamknieta.png'),
        //Brama.otwarcie
        ...GRAFIKI.brama.otwarcie
            .map((value, index) => ZaladujGrafike(GRAFIKI.brama.otwarcie[index], `grafiki/brama/otwarcie/${index}.png`)),
        //Brama.zamkniecie
        ...GRAFIKI.brama.zamkniecie
            .map((value, index) => ZaladujGrafike(GRAFIKI.brama.zamkniecie[index], `grafiki/brama/zamkniecie/${index}.png`)),
        //Barierki
        ZaladujGrafike(GRAFIKI.barierka.pionowa, 'grafiki/barierka/pionowa.png'),
        ZaladujGrafike(GRAFIKI.barierka.pozioma, 'grafiki/barierka/pozioma.png'),
        //Tło
        ZaladujGrafike(GRAFIKI.tlo, 'grafiki/tlo.png')
    ];
}
