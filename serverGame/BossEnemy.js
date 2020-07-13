const randomWords = require('random-words');
let Enemy = require('./Enemy');
const gameConsts = require('./constants/GameConstants');

class BossEnemy extends Enemy {
    constructor(id, player) {
        super(id, player);
        this.words = randomWords().toUpperCase();
        this.size = 25;
        this.speed = 1;
        this.rgb = gameConsts.GREEN;
    }

    giveBirth = (enemy) => {
        enemy.setPosition([this.x, this.y]);
    };
}

module.exports = BossEnemy;