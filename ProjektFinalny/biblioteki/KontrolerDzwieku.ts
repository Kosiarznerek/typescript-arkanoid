//Wspomaga korzystanie z plików audio
class KontrolerDzwieku {

    /**
     * Odtwarza dźwięk audio
     * @param {HTMLAudioElement} audio
     */
    public static Odtworz(audio: HTMLAudioElement): void {
        audio.currentTime = 0;
        audio.play();
    }

    /**
     * Zatrzymuje audio
     * @param {HTMLAudioElement} audio
     */
    public static Zatrzymaj(audio: HTMLAudioElement): void {
        audio.pause();
    }

}