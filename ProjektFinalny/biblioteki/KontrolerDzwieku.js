"use strict";
//Wspomaga korzystanie z plików audio
class KontrolerDzwieku {
    /**
     * Odtwarza dźwięk audio
     * @param {HTMLAudioElement} audio
     */
    static Odtworz(audio) {
        audio.currentTime = 0;
        audio.play();
    }
    /**
     * Zatrzymuje audio
     * @param {HTMLAudioElement} audio
     */
    static Zatrzymaj(audio) {
        audio.pause();
    }
}
