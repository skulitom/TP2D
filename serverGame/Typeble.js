const gameConsts = require('./constants/GameConstants');

class Typeble {
    constructor(id) {
        this.id = id;
        this.words = 'o';
        this.typedWords = "";
        this.textEnd = false;
        this.fillRGB = gameConsts.RED;
    }

    getId = () => {
        return this.id;
    };

    getWords = () => {
        return this.words;
    };

    setFillRgb = (rgb) => {
        this.fillRGB = rgb;
    };

    setTypedText = (text) => {
        this.typedWords = text;
    };

    getTextEnd = () => {
        return this.textEnd;
    };

    destroy() {
        this.textEnd = true;
    }

    kill(killer) {
        this.textEnd = true;
        this.killerColor = killer.getColor();
    }
}

module.exports = Typeble;