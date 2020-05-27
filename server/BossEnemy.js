const randomWords = require('random-words');
let Enemy = require('./Enemy');

class BossEnemy extends Enemy {
    constructor(id, player) {
        super(id, player);
        this.words = randomWords().toUpperCase();
        this.size = 30;
        this.speed = 1;
        this.rgb = {
            r: 0,
            g: 255,
            b: 0,
        }
    }
}

module.exports = BossEnemy;