const Kolizja: Kolizja = {//środek do wywalenia
    PunktWProstokacie: () => true,
    ProstokatProstokat: () => true,
    AktualizujProstokatUnikajac: () => console.log(),
};

interface Kolizja {
    PunktWProstokacie: (punkt: Punkt, prt: Blok) => boolean,
    ProstokatProstokat: (prt1: Blok, prt2: Blok) => boolean,
    AktualizujProstokatUnikajac: (obj: Blok, wekt: Punkt, przeszkody: Blok[]) => void,
}

/**
 * Sprawdza czy punkt nalezy do prostokatu
 * @param {Punkt} punkt
 * @param {Blok} prt
 * @returns {boolean}
 */
Kolizja.PunktWProstokacie = (punkt: Punkt, prt: Blok): boolean => {
    return punkt.x >= prt.pozycja.x &&
        punkt.x <= prt.pozycja.x + prt.szerokosc &&
        punkt.y >= prt.pozycja.y &&
        punkt.y <= prt.pozycja.y + prt.wysokosc
};

/**
 * Sprawdza czy dwa prostokąty nachodzą na siebie
 * https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection#Axis-Aligned_Bounding_Box
 * @param {Blok} prt1
 * @param {Blok} prt2
 * @returns {boolean}
 */
Kolizja.ProstokatProstokat = (prt1: Blok, prt2: Blok): boolean => {
    return prt1.pozycja.y + prt1.wysokosc > prt2.pozycja.y
        && prt1.pozycja.y < prt2.pozycja.y + prt2.wysokosc
        && prt1.pozycja.x + prt1.szerokosc > prt2.pozycja.x
        && prt1.pozycja.x < prt2.pozycja.x + prt2.szerokosc;
};

/**
 * Aktualizuje pozycje prostokąta unikając przeszkód
 * @param {Blok} obj Obiekt, który przesuwamy
 * @param {Punkt} wekt Wektor o jaki nastąpi przesunięcie obiektu
 * @param {Blok[]} przeszkody Przeszkody jakich ma uniknąć obiekt podczas przesuwania o wektor
 */
Kolizja.AktualizujProstokatUnikajac = (obj: Blok, wekt: Punkt, przeszkody: Blok[]): void => {
    //Aktualizacja pozycji X
    obj.pozycja.x += wekt.x;
    if (wekt.x > 0) {//Obiekt porusza się w prawo
        przeszkody.filter(przeszkoda => Kolizja.ProstokatProstokat(obj, przeszkoda)).forEach(prt => {
            if (obj.pozycja.x + obj.szerokosc > prt.pozycja.x) {
                obj.pozycja.x = prt.pozycja.x - obj.szerokosc;
            }
        });
    } else if (wekt.x < 0) {//Obiekt porusza się w lewo
        przeszkody.filter(przeszkoda => Kolizja.ProstokatProstokat(obj, przeszkoda)).forEach(prt => {
            if (obj.pozycja.x < prt.pozycja.x + prt.szerokosc) {
                obj.pozycja.x = prt.pozycja.x + prt.szerokosc;
            }
        });
    }

    //Aktualizacja pozycji Y
    obj.pozycja.y += wekt.y;
    if (wekt.y > 0) {//Obiekt porusza sie na dol
        przeszkody.filter(przeszkoda => Kolizja.ProstokatProstokat(obj, przeszkoda)).forEach(prt => {
            if (obj.pozycja.y + obj.wysokosc > prt.pozycja.y) {
                obj.pozycja.y = prt.pozycja.y - obj.wysokosc;
            }
        });
    } else if (wekt.y < 0) {//Obiekt porusza sie do góry
        przeszkody.filter(przeszkoda => Kolizja.ProstokatProstokat(obj, przeszkoda)).forEach(prt => {
            if (obj.pozycja.y < prt.pozycja.y + prt.wysokosc) {
                obj.pozycja.y = prt.pozycja.y + prt.wysokosc;
            }
        });
    }
};