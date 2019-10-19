"use strict";
const KONTROLER = new Kontroler(5);
//Eventy na window
window.addEventListener('load', () => {
    Promise.all(new Array()
        .concat(PrzeladujGrafiki())
        .concat(PrzeladujPoziomy(KONTROLER.maxPoziomow))).then(poWczytaniu);
});
window.addEventListener('keydown', klawiszDol);
window.addEventListener('keyup', klawiszGora);
//Canvas
let CTX;
const EKRAN = {
    GRA: new Prostokat(new Wektor, 540, 652),
    STAT: new Prostokat(new Wektor(540, 0), 300, 652)
};
let EL_GRY;
/**
 * Obsługa klawiatury
 * @param {KeyboardEvent} e
 */
function klawiszDol(e) {
    switch (e.key.toUpperCase()) {
        case 'A':
            EL_GRY.paletka.ruch.lewo = true;
            break;
        case 'D':
            EL_GRY.paletka.ruch.prawo = true;
            break;
        case ' ':
            if (KONTROLER.strzelanieGracza) {
                KontrolerDzwieku.Odtworz(DZWIEKI.strzal);
                EL_GRY.paletka.wystrzelPocisk();
            }
            break;
    }
}
/**
 * Obsluga klawiatury
 * @param {KeyboardEvent} e
 */
function klawiszGora(e) {
    switch (e.key.toUpperCase()) {
        case 'A':
            EL_GRY.paletka.ruch.lewo = false;
            break;
        case 'D':
            EL_GRY.paletka.ruch.prawo = false;
            break;
    }
}
/**
 * Funckcja po wczytaniu strony
 */
function poWczytaniu() {
    //Tworze canvas
    const canvas = document.createElement('canvas');
    canvas.width = EKRAN.GRA.szerokosc + EKRAN.STAT.szerokosc;
    canvas.height = EKRAN.GRA.wysokosc;
    canvas.style.margin = '0 auto';
    canvas.style.display = 'block';
    document.body.appendChild(canvas);
    CTX = canvas.getContext('2d') || new CanvasRenderingContext2D();
    //Tło
    EKRAN.GRA.grafika = GRAFIKI.tlo;
    //Tworze elementy gry
    EL_GRY = GenerujPoziom(KONTROLER.obecnyPoziom);
    //Rozpoczynam animacje
    animacja();
}
/**
 * Animacja
 */
function animacja() {
    //Tło
    EKRAN.GRA.rysuj(CTX);
    //Aktualizacja paletki
    EL_GRY.paletka.aktualizujPozycje(new Array()
        .concat(EL_GRY.barierki)
        .concat(EL_GRY.bramy));
    EL_GRY.paletka.aktualizujGrafike();
    EL_GRY.paletka.aktualizujSzerokosc();
    EL_GRY.paletka.aktualizujPociski(
    //Obiekty jakie można zestrzelić
    new Array()
        .concat(EL_GRY.przeciwnicy)
        .concat(EL_GRY.cegielki)
        .concat(EL_GRY.barierki)
        .concat(EL_GRY.bramy)).forEach((value) => {
        //Zestrzelone obiekty
        if (value instanceof Przeciwnik) {
            value.zabij();
            if (value.jestZabity) {
                KONTROLER.punktyGracza += 200;
                KontrolerDzwieku.Odtworz(DZWIEKI.smierc);
            }
        }
        if (value instanceof Cegielka) {
            KONTROLER.punktyGracza += 100;
            value.rozwal();
        }
    });
    //Aktualizacja fiolek
    EL_GRY.fiolki.forEach(value => {
        value.aktualizujAnimacje();
        value.aktualizujPozycje();
    });
    //Aktualizacja bram
    EL_GRY.bramy.forEach(value => value.aktualizujGrafike());
    //Aktualizacja kulek
    EL_GRY.kulki.forEach(value => value
        .aktualizujPozycje(new Array()
        .concat(EL_GRY.kulki.filter(value2 => value !== value2))
        .concat(EL_GRY.paletka)
        .concat(EL_GRY.cegielki)
        .concat(EL_GRY.przeciwnicy)
        .concat(EL_GRY.barierki)
        .concat(EL_GRY.bramy))
        .forEach((value2) => {
        //Kulka uderzyla w cegiełke
        if (value2 instanceof Cegielka) {
            value2.rozwal();
            //[X]% szans na wypadnięcie losowej fioli z rozwalonej cegielki
            if (value2.jestRozwalona && Math.randomInt(1, 100) <= 20) {
                EL_GRY.fiolki.push(new Fiolka(value2.pozycja.klonuj(), TYPY_FIOLEK[Math.randomKey(TYPY_FIOLEK)]));
            }
            if (value2.jestRozwalona)
                KONTROLER.punktyGracza += 100;
        }
        //Kulka uderzyła w paletke
        if (value2 instanceof Paletka && value.pozycja.y + value.wysokosc <= value2.pozycja.y) {
            //[value2] -> paletka [value] -> kulka do odbicia
            const kierunek = new Wektor;
            kierunek.y = -1;
            const rozX = value.srodek.x - value2.srodek.x;
            kierunek.x = Math.mapLinear(rozX, -value2.szerokosc / 2, value2.szerokosc / 2, -1, 1);
            value.kierunek = kierunek;
            value.pozycja.y = value2.pozycja.y - value.wysokosc - 1;
        }
        //Kulka uderzyła w przeciwnika
        if (value2 instanceof Przeciwnik) {
            value2.zabij();
            if (value2.jestZabity) {
                KONTROLER.punktyGracza += 200;
                KontrolerDzwieku.Odtworz(DZWIEKI.smierc);
            }
        }
        //Dźwięk
        KontrolerDzwieku.Odtworz(DZWIEKI.uderzenie);
    }));
    //Aktualizacja przeciwnikow
    EL_GRY.przeciwnicy.forEach(value => {
        value.aktualizujAnimacje();
        value.aktualizujPozycje(
        //Od nich odbijają się przeciwnicy
        new Array()
            .concat(EL_GRY.przeciwnicy.filter(value2 => value !== value2))
            .concat(EL_GRY.barierki)
            .concat(EL_GRY.cegielki)
            .concat(EL_GRY.kulki)
            .concat(EL_GRY.bramy));
    });
    //Aktualizacja najlepszego wyniku
    KONTROLER.aktualizujNajlepszy();
    //Jeżeli gracz zbierze fiolke
    EL_GRY.paletka.dotknela(EL_GRY.fiolki).forEach(value => {
        //W zależności od zeranej fiolki odpowiednia akcja
        switch (value.typ) {
            case TYPY_FIOLEK.B:
                EL_GRY.paletka.ustawSzerokosc(80);
                KONTROLER.punktyGracza += 50;
                break;
            case TYPY_FIOLEK.C:
                //Dodaje dwie kulki
                const pozycja1 = EL_GRY.kulki[Math.randomInt(0, EL_GRY.kulki.length - 1)].pozycja.klonuj();
                for (let i = 0; i < 2; i++)
                    EL_GRY.kulki.push(new Kulka(pozycja1, new Wektor(0, 1)));
                break;
            case TYPY_FIOLEK.D:
                EL_GRY.paletka.ustawSzerokosc(32);
                KONTROLER.strzelanieGracza = true;
                break;
            case TYPY_FIOLEK.E:
                EL_GRY.paletka.ustawSzerokosc(64);
                KONTROLER.zyciaGracza++;
                break;
            case TYPY_FIOLEK.L:
                EL_GRY.paletka.maxSzybkosc = 5;
                break;
            case TYPY_FIOLEK.M:
                EL_GRY.paletka.maxSzybkosc = 5;
                break;
            case TYPY_FIOLEK.R:
                EL_GRY.paletka.maxSzybkosc = 10;
                KONTROLER.strzelanieGracza = true;
                break;
            case TYPY_FIOLEK.S:
                EL_GRY.kulki.forEach(value2 => value2.szybkosc = 6);
                break;
            default:
                throw new Error(`Zebrany typ fiolki '${value.typ} nie jest znany.'`);
        }
    });
    //Jeżeli gracz uderzy przeciwnika -> oboje umieraja
    EL_GRY.paletka.dotknela(EL_GRY.przeciwnicy).forEach(value => {
        value.zabijPernamentnie();
        KontrolerDzwieku.Odtworz(DZWIEKI.smierc);
        EL_GRY.paletka.rozwal(() => {
            KONTROLER.zyciaGracza--;
            if (KONTROLER.zyciaGracza === 0) {
                //Brak żyć -> gra od nowa
                KONTROLER.resetuj();
                EL_GRY = GenerujPoziom(KONTROLER.obecnyPoziom);
            }
            else
                EL_GRY.paletka.wskrzes();
        });
    });
    //Jeżeli na ekranie 0 kulek -> gracz umiera
    if (EL_GRY.kulki.length === 0)
        EL_GRY.paletka.rozwal(() => {
            KONTROLER.zyciaGracza--;
            if (KONTROLER.zyciaGracza === 0) {
                //Brak żyć -> gra od nowa
                KONTROLER.resetuj();
                EL_GRY = GenerujPoziom(KONTROLER.obecnyPoziom);
            }
            else {
                EL_GRY.paletka.wskrzes();
                EL_GRY.kulki.push(new Kulka(new Wektor(EL_GRY.paletka.srodek.x, EL_GRY.paletka.pozycja.y), new Wektor(0, 1)));
            }
        });
    //Zostawiam tylko te cegielki, które nie są rozwalone
    EL_GRY.cegielki = EL_GRY.cegielki.filter(value => !value.jestRozwalona);
    //Usuwam zebrane fiolki
    EL_GRY.fiolki = EL_GRY.fiolki.filter(value => !DetektorKolizji.ProstokatProstokat(value, EL_GRY.paletka));
    //Usuwam nieżywych przeciwników lub tych co 'uciekli' i wstawiam na ich miejsce nowe
    EL_GRY.przeciwnicy = EL_GRY.przeciwnicy.filter(value => {
        //Wstawiam nowego
        if ((value.jestZabity || !value.jestNaEkranie(EKRAN.GRA)) && EL_GRY.bramy.filter(value2 => value2.jestZamknieta).length > 0) {
            //Losuje zamkniętą brame, z której wyjdzie przeciwnik
            const otwarte = EL_GRY.bramy.filter(value2 => value2.jestZamknieta);
            const wylosowana = otwarte[Math.randomInt(0, otwarte.length - 1)];
            wylosowana.otworz(() => {
                const przeciwnik = new Przeciwnik(new Wektor, TYPY_PRZECIWNIKOW[Math.randomKey(TYPY_PRZECIWNIKOW)]);
                przeciwnik.pozycja = new Wektor(wylosowana.srodek.x - przeciwnik.szerokosc / 2, wylosowana.pozycja.y + wylosowana.wysokosc);
                EL_GRY.przeciwnicy.push(przeciwnik);
                wylosowana.zamknij();
            });
        }
        //Zostawiam tylko żywych i tych co są na ekranie
        return !value.jestZabity && value.jestNaEkranie(EKRAN.GRA);
    });
    //Usuwam kulki, które opuściły ekran
    EL_GRY.kulki = EL_GRY.kulki.filter(value => value.jestNaEkranie(EKRAN.GRA));
    //Jeżeli wszystkie cegiełki rozwalone -> następny poziom
    if (EL_GRY.cegielki.length === 0) {
        KONTROLER.obecnyPoziom++;
        EL_GRY = GenerujPoziom(KONTROLER.obecnyPoziom);
    }
    //Rysuje obiekty związane z grą
    EL_GRY.paletka.rysuj(CTX);
    EL_GRY.kulki.forEach(value => value.rysuj(CTX));
    EL_GRY.cegielki.forEach(value => value.rysuj(CTX));
    EL_GRY.barierki.forEach(value => value.rysuj(CTX));
    EL_GRY.fiolki.forEach(value => value.rysuj(CTX));
    EL_GRY.paletka.rysujPociski(CTX);
    EL_GRY.bramy.forEach(value => value.rysuj(CTX));
    EL_GRY.przeciwnicy.forEach(value => value.rysuj(CTX));
    //Rysuje satystyki
    KONTROLER.wyswietlStatystyki(CTX, EKRAN.STAT);
    //RequestAnimationFrame
    requestAnimationFrame(animacja);
}
