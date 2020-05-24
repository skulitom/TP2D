const consts = require('./constants/EnemyConstants');

class Enemy {
    constructor(id, player) {
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
        this.words = consts.CHARACTERS.charAt(Math.floor(Math.random() * consts.CHARACTERS.length));
        this.speed = 1;
        this.typedWords = "";
        this.bDead = false;
        this.inHitArea = false;
        this.hitPower = 1;
        this.size = 20;
        this.playerX = player.x;
        this.playerY = player.y;
        this.playerId = player.id;
        this.fillRGB = {
            r: 255,
            g: 0,
            b: 0,
        };

        this.rgb = {
            r: 255,
            g: 0,
            b: 0,
        };
    }

    getId() {
        return this.id;
    }

    getPlayerId() {
        return this.playerId;
    }

    getWords() {
        return this.words;
    }

    getSpeed() {
        return this.speed;
    }

    setFillRgb(rgb) {
        this.fillRGB = rgb;
    }

    getIsInHitArea() {
        return this.inHitArea;
    }

    getHitPower() {
        return this.hitPower;
    }

    setTypedText(text) {
        this.typedWords = text;
    }

    getIsDead() {
        return this.bDead;
    }

    update(){
        if(this.bDead) {
            return;
        }
        const rotation = Math.atan2(this.playerY - this.y, this.playerX - this.x);
        this.x += Math.cos(rotation) * this.speed;
        this.y += Math.sin(rotation) * this.speed;
        if(Math.abs(this.playerY-this.y) < 5 && Math.abs(this.playerX-this.x) < 5) {
            this.inHitArea = true;
        }
    }

    kill(killerColor) {
        this.bDead = true;
        this.speed = 0;
        this.hitPower = 0;
        this.inHitArea = false;
        this.killerColor = killerColor;
    }
}

module.exports = Enemy;