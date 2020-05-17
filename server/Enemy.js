const randomWords = require('random-words');

class Enemy {
    constructor(id) {
        let random = Math.random();
        if(random <= 0.25){
            this.x = 0;
            this.y = Math.random()*768 + 1;
        } else if(random <= 0.5) {
            this.x = 1367;
            this.y = Math.random()* 768 + 1;
        } else if(random <= 0.75) {
            this.y = 0;
            this.x = Math.random()*1366 +1;
        } else {
            this.y = 769;
            this.x = Math.random()*1366 +1;
        }
        this.id = id;
        this.words = randomWords();
        this.speed = 1;
        this.bDead = false;

        this.rgb = {
            r: 255,
            g: 0,
            b: 0,
        }
    }
}

module.exports = Enemy;