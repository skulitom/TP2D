const randomWords = require('random-words');

class Enemy {
    constructor(id) {
        this.x = Math.random() * 400 + 1;
        this.y = Math.random() * 400 + 1;
        this.id = id;
        this.words = randomWords();

        this.rgb = {
            r: 255,
            g: 0,
            b: 0,
        }
    }
}

module.exports = Enemy;