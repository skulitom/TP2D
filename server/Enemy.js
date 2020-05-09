const randomWords = require('random-words');

class Enemy {
    constructor(id) {
        if(Math.random() >= 0.5){
            this.x = 0;
        } else {
            this.x = 401
        }
        if(Math.random() >= 0.5){
            this.y = 0;
        } else {
            this.y = 401
        }
        this.id = id;
        this.words = randomWords();
        this.speed = 1;

        this.rgb = {
            r: 255,
            g: 0,
            b: 0,
        }
    }
}

module.exports = Enemy;