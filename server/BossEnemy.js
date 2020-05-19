const randomWords = require('random-words');
let Enemy = require('./Enemy');

class BossEnemy extends Enemy {
    constructor(props) {
        super(props);
        this.words = randomWords();
        this.size = 30;
        this.rgb = {
            r: 0,
            g: 255,
            b: 0,
        }
    }
}

module.exports = BossEnemy;