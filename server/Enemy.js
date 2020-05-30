const consts = require('./constants/EnemyConstants');
let Typeble = require('./Typeble');

class Enemy extends Typeble {
    constructor(id, player) {
        super(id);
        this.size = 20;
        let random = Math.random();
        if(random <= 0.25){
            this.x = 0 - this.size;
            this.y = Math.random()*768 + 1;
        } else if(random <= 0.5) {
            this.x = 1367 + this.size;
            this.y = Math.random()* 768 + 1;
        } else if(random <= 0.75) {
            this.y = 0 - this.size;
            this.x = Math.random()*1366 +1;
        } else {
            this.y = 769 + this.size;
            this.x = Math.random()*1366 +1;
        }
        this.words = consts.CHARACTERS.charAt(Math.floor(Math.random() * consts.CHARACTERS.length));
        this.speed = 2;
        this.typedWords = "";
        this.bDead = false;
        this.inHitArea = false;
        this.hitPower = 1;
        this.playerX = player.x;
        this.playerY = player.y;
        this.playerId = player.id;
        this.texture = 'frodo';
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

    getPlayerId = () =>  {
        return this.playerId;
    };

    getSpeed = () =>  {
        return this.speed;
    };

    getIsInHitArea = () =>  {
        return this.inHitArea;
    };

    getHitPower = () =>  {
        return this.hitPower;
    };

    getIsDead = () => {
        return this.bDead;
    };

    update = () => {
        if(this.bDead) {
            return;
        }
        const rotation = Math.atan2(this.playerY - this.y, this.playerX - this.x);
        this.x += Math.cos(rotation) * this.speed;
        this.y += Math.sin(rotation) * this.speed;
        if(Math.abs(this.playerY-this.y) < 5 && Math.abs(this.playerX-this.x) < 5) {
            this.inHitArea = true;
        }
    };

    kill = (killer) => {
        super.kill(killer);
        this.bDead = true;
        this.speed = 0;
        this.hitPower = 0;
        this.inHitArea = false;
    };
}

module.exports = Enemy;