let Player = require('./Player');
let Enemy = require('./Enemy');
let Loot = require('./Loot');
let BossEnemy = require('./BossEnemy');
let TypeManager = require('./TypeManager');
const shortid = require('shortid');
const typingConsts = require('./constants/TypingConstants');
const gameConsts = require('./constants/GameConstants');

class Game {
    constructor() {
        this.players = [];
        this.enemies = [];
        this.loot = [];
        this.availablePositions = [0,1,2,3];
        this.takenPositions = new Map();
        this.tManager = new TypeManager();
        this.timer = 0;
        this.freqCoef = gameConsts.INITIAL_FREQUENCY;
        this.gameOver = false;
        this.gameMap = "Green Desert";
    }

    onKey = (id, key) => {
        const playerIndex = this.players.findIndex(player => player.id === id);
        if (playerIndex === -1) {
            return "err";
        }
        this.players[playerIndex].shoot();
        const result = this.players[playerIndex].setKey(key);
        switch(result) {
            case typingConsts.TM_TYPING_FULLMATCH:
                this.players[playerIndex].registerKill(gameConsts.POINTS_ENEMY_KILLED);
                break;
            case typingConsts.TM_TYPING_PARTMATCH:
                this.players[playerIndex].registerKill(gameConsts.POINTS_NOBODY_HIT);
                break;
            case typingConsts.TM_TYPING_TYPO:
                this.players[playerIndex].registerKill(gameConsts.POINTS_ENEMY_MISSED);
                break;
            case typingConsts.TM_TYPING_TYPO_RESET:
                this.players[playerIndex].registerKill(gameConsts.POINTS_ENEMY_MISSED_RESET);
                break;
            case typingConsts.TM_TYPING_TYPO_NO_MATCH:
                this.players[playerIndex].registerKill(gameConsts.POINTS_NOBODY_HIT);
                break;
        }
    };

    removePlayer = (id) => {
        this.availablePositions.push(this.takenPositions.get(id));
        this.takenPositions.delete(id);
        this.players = this.players.filter(player => player.id !== id);
    };

    addPlayer = (id) => {
        const positionIndex = this.availablePositions.pop();
        this.takenPositions.set(id, positionIndex);
        console.log(gameConsts.PLAYER_POSITIONS[positionIndex]);
        let newPlayer = new Player(id, gameConsts.PLAYER_POSITIONS[positionIndex], this.players.length, this.tManager);
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
        if(this.freqCoef<=gameConsts.LOWEST_FREQUENCY){
            this.freqCoef=gameConsts.LOWEST_FREQUENCY;
        } else {
            this.freqCoef-=gameConsts.FREQUENCY_STEP;
            if(this.freqCoef <= gameConsts.LOWEST_FREQUENCY) {
                this.freqCoef = gameConsts.LOWEST_FREQUENCY;
            }
        }
    };

    distributeDamage = (enemy) => {
        if(this.isTimeTo(gameConsts.DAMAGE_COEF)) {
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
            'loot': this.loot,
            'gamestatus': this.gameOver,
            'gamemap': this.gameMap
        }
    };

    updateEnemies = () => {
        this.loot.forEach((lootLoc) => {
            if(lootLoc.getToExplode()){
                lootLoc.explode(this.enemies);
            }
        });
        this.enemies.forEach((enemy) => {
            let enemyHasPlayer = false;
            this.players.forEach(player => {
               if(player.getId() === enemy.getPlayerId()){
                   if(!player.getIsDead()) {
                       enemyHasPlayer = true;
                   }
               }
            });
            if(!enemyHasPlayer && !this.gameOver){
                enemy.updatePlayer(this.getRandomItem(this.players));
            }
            enemy.update();
            this.distributeDamage(enemy);
        });
    };

    isCreationTime = (coef) => {
        return this.isTimeTo(this.freqCoef * coef);
    };

    isTimeTo = (coef) => {
        return Math.floor(this.timer % coef) === 0;
    };

    update = () => {
        this.timer++;
        if (this.players[0]) {
            let allDead = true;
            this.players.forEach(player => {
                if(!player.getIsDead()){
                    allDead = false;
                }
            });
            if(allDead){
                this.gameOver = true;
            }

            if (this.isCreationTime(gameConsts.BOSS_ENEMY_COEF)) {
                this.addBossEnemy();
                this.updateFrequencyCoef();
            }else if(this.isCreationTime(gameConsts.LOOT_COEF)) {
                this.addLoot();
            }
            this.updateEnemies();

            if (this.isCreationTime(gameConsts.ENEMY_COEF)) {
                this.addEnemy();
            }
        }
        if (this.timer > gameConsts.MAX_TIME) {
            this.timer -= gameConsts.MAX_TIME;
        }
    };

    getRandomItem = (arrayOfItems) => {
        return arrayOfItems[Math.floor(Math.random() * arrayOfItems.length)];
    };
}

module.exports = Game;