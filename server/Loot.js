const consts = require('./constants/LootConstants');

class Loot {
    constructor(id) {
        this.y = Math.random()*768;
        this.x = Math.random()*1366;
        this.id = id;
        this.words = consts.CHARACTERS.charAt(Math.floor(Math.random() * consts.CHARACTERS.length));
        this.typedWords = "";
        this.isOpen = false;
        this.size = 10;
        this.fillRGB = {
            r: 255,
            g: 255,
            b: 0,
        };

        this.rgb = {
            r: 255,
            g: 255,
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

    kill() {
        this.isOpen = true;
    }
}

module.exports = Loot;