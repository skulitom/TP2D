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
        if(this.bDead) {
            return;
        }
        enemy.setPosition(this.getRandomSpawnToss([this.x, this.y]));
        enemy.setSpeed(0);
    };
    
    getRandomSpawnToss = (position) => {
        position[0] = position[0] + (Math.random()*10 -5);
        position[1] = position[1] + (Math.random()*10 -5);
        return position;
    };
}

module.exports = BossEnemy;