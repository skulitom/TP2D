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
        this.typedWords = "";
        this.bDead = false;

        this.rgb = {
            r: 255,
            g: 0,
            b: 0,
        }
    }

    getId() {
        return this.id;
    }

    getWords() {
        return this.words;
    }

    getSpeed() {
        return this.speed;
    }

    setTypedText(text) {
        this.typedWords = text;
    }

    update(playerPosX, playerPosY){
        const rotation = Math.atan2(playerPosY - this.y, playerPosX - this.x);
        this.x += Math.cos(rotation) * this.speed;
        this.y += Math.sin(rotation) * this.speed;
    }

    kill() {
        this.bDead = true;
        this.speed = 0;
    }
}

module.exports = Enemy;