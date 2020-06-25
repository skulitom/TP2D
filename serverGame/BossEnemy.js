const randomWords = require('random-words');
let Enemy = require('./Enemy');
const gameConsts = require('./constants/GameConstants');

class BossEnemy extends Enemy {
    constructor(id, player) {
        super(id, player);
        this.words = randomWords().toUpperCase();
        this.size = 30;
        this.speed = 1;
        this.rgb = gameConsts.GREEN;
    }
}

module.exports = BossEnemy;