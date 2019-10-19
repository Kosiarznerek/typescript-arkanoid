"use strict";
class DetektorKolizji {
    /**
     * Sprawdza czy dwa prostokąty nachodzą na siebie
     * https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection#Axis-Aligned_Bounding_Box
     * @param {Prostokat} prt1
     * @param {Prostokat} prt2
     * @returns {boolean}
     */
    static _ProstokatProstokat(prt1, prt2) {
        return prt1.pozycja.y + prt1.wysokosc > prt2.pozycja.y
            && prt1.pozycja.y < prt2.pozycja.y + prt2.wysokosc
            && prt1.pozycja.x + prt1.szerokosc > prt2.pozycja.x
            && prt1.pozycja.x < prt2.pozycja.x + prt2.szerokosc;
    }
    /**
     * Sprawdza czy dwa prostokąty nachodzą na siebie
     * https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection#Axis-Aligned_Bounding_Box
     * @param {Prostokat} prt1
     * @param {Prostokat} prt2
     * @returns {boolean}
     */
    static ProstokatProstokat(prt1, prt2) {
        return prt1.pozycja.y + prt1.wysokosc >= prt2.pozycja.y
            && prt1.pozycja.y <= prt2.pozycja.y + prt2.wysokosc
            && prt1.pozycja.x + prt1.szerokosc >= prt2.pozycja.x
            && prt1.pozycja.x <= prt2.pozycja.x + prt2.szerokosc;
    }
    /**
     * Aktualizuje pozycje prostokąta unikając przeszkód
     * @param {Prostokat} obj Obiekt, który przesuwamy
     * @param {Wektor} wekt Wektor o jaki nastąpi przesunięcie obiektu
     * @param {Prostokat[]} przeszkody Przeszkody jakich ma uniknąć obiekt podczas przesuwania o wektor
     */
    static AktualizujProstokatUnikajac(obj, wekt, przeszkody) {
        //Aktualizacja pozycji X
        obj.pozycja.x += wekt.x;
        if (wekt.x > 0) {
            przeszkody.filter(przeszkoda => DetektorKolizji._ProstokatProstokat(obj, przeszkoda)).forEach(prt => {
                if (obj.pozycja.x + obj.szerokosc > prt.pozycja.x) {
                    obj.pozycja.x = prt.pozycja.x - obj.szerokosc;
                }
            });
        }
        else if (wekt.x < 0) {
            przeszkody.filter(przeszkoda => DetektorKolizji._ProstokatProstokat(obj, przeszkoda)).forEach(prt => {
                if (obj.pozycja.x < prt.pozycja.x + prt.szerokosc) {
                    obj.pozycja.x = prt.pozycja.x + prt.szerokosc;
                }
            });
        }
        //Aktualizacja pozycji Y
        obj.pozycja.y += wekt.y;
        if (wekt.y > 0) {
            przeszkody.filter(przeszkoda => DetektorKolizji._ProstokatProstokat(obj, przeszkoda)).forEach(prt => {
                if (obj.pozycja.y + obj.wysokosc > prt.pozycja.y) {
                    obj.pozycja.y = prt.pozycja.y - obj.wysokosc;
                }
            });
        }
        else if (wekt.y < 0) {
            przeszkody.filter(przeszkoda => DetektorKolizji._ProstokatProstokat(obj, przeszkoda)).forEach(prt => {
                if (obj.pozycja.y < prt.pozycja.y + prt.wysokosc) {
                    obj.pozycja.y = prt.pozycja.y + prt.wysokosc;
                }
            });
        }
    }
}
