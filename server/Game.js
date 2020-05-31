let Player = require('./Player');
let Enemy = require('./Enemy');
let Loot = require('./Loot');
let BossEnemy = require('./BossEnemy');
let TypeManager = require('./TypeManager');
const shortid = require('shortid');
const consts = require('./constants/TypingConstants');

class Game {
    constructor() {
        this.players = [];
        this.enemies = [];
        this.loot = [];
        this.tManager = new TypeManager();
        this.timer = 0;
        this.freqCoef = 200;
    }

    onKey = (id, key) => {
        const playerIndex = this.players.findIndex(player => player.id === id);
        if (playerIndex === -1) {
            return "err";
        }
        const result = this.players[playerIndex].setKey(key);
        switch(result) {
            case consts.TM_TYPING_FULLMATCH:
                this.players[playerIndex].registerKill(2);
                break;
            case consts.TM_TYPING_PARTMATCH:
                this.players[playerIndex].registerKill(1);
                break;
            case consts.TM_TYPING_TYPO:
                this.players[playerIndex].registerKill(-1);
                break;
            case consts.TM_TYPING_TYPO_RESET:
                this.players[playerIndex].registerKill(-2);
                break;
            case consts.TM_TYPING_TYPO_NO_MATCH:
                this.players[playerIndex].registerKill(-0.5);
                break;
        }
    };

    removePlayer = (id) => {
        this.players.forEach(player => player.moveBack());
        this.players = this.players.filter(player => player.id !== id);
    };

    addPlayer = (id) => {
        this.players.forEach(player => player.moveAway());
        let newPlayer = new Player(id, this.players.length, this.tManager);
        this.tManager.registerPlayer(newPlayer);
        this.players.push(newPlayer);
    };

    addLoot = () => {
        let newLoot = new Loot(shortid.generate());
        this.loot.push(newLoot);
        this.tManager.registerTypeble(newLoot);
    };

    addEnemy = () => {
        let enemy = new Enemy(shortid.generate(), this.getRandomItem(this.players));
        this.enemies.push(enemy);
        this.tManager.registerTypeble(enemy);
    };

    addBossEnemy = () => {
        let enemy = new BossEnemy(shortid.generate(), this.getRandomItem(this.players));
        this.enemies.push(enemy);
        this.tManager.registerTypeble(enemy);
    };

    updateFrequencyCoef = () => {
        if(this.freqCoef<=10){
            this.freqCoef=10;
        } else {
            this.freqCoef-=10;
            if(this.freqCoef <= 10) {
                this.freqCoef = 10;
            }
        }
    };

    distributeDamage = (enemy) => {
        if(Math.floor(this.timer%10)===0) {
            if(enemy.getIsInHitArea()){
                this.players.forEach(player => {
                    if(player.id === enemy.getPlayerId()){
                        player.hit(enemy.getHitPower());
                    }
                });
            }
        }
    };

    getEmitable = () => {
        return {
            'players': this.players,
            'enemies': this.enemies,
            'loot': this.loot
        }
    };

    updateEnemies = () => {
        this.loot.forEach((lootLoc) => {
            if(lootLoc.getToExplode()){
                lootLoc.explode(this.enemies);
            }
        });
        this.enemies.forEach((enemy) => {
            enemy.update();
            this.distributeDamage(enemy);
        });
    };

    update = () => {
        this.timer++;
        if (this.players[0]) {
            if (Math.floor(this.timer % (this.freqCoef * 5)) === 0) {
                this.addBossEnemy();
                this.updateFrequencyCoef();
            }else if(Math.floor(this.timer % (this.freqCoef * 6)) === 0) {
                this.addLoot();
            }
            this.updateEnemies();

            if (Math.floor(this.timer % this.freqCoef) === 0) {
                this.addEnemy();
            }
        }
        if (this.timer > 100000) {
            this.timer -= 100000;
        }
    };

    getRandomItem = (arrayOfItems) => {
        return arrayOfItems[Math.floor(Math.random() * arrayOfItems.length)];
    };
}

module.exports = Game;