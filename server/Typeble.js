class Typeble {
    constructor(id) {
        this.id = id;
        this.words = 'o';
        this.typedWords = "";
        this.textEnd = false;
        this.fillRGB = {
            r: 255,
            g: 0,
            b: 0,
        };
    }

    getId() {
        return this.id;
    }

    getWords() {
        return this.words;
    }

    setFillRgb(rgb) {
        this.fillRGB = rgb;
    }

    setTypedText(text) {
        this.typedWords = text;
    }

    getTextEnd() {
        return this.textEnd;
    }

    kill(killerColor) {
        this.textEnd = true;
        this.killerColor = killerColor;
    }
}

module.exports = Typeble;