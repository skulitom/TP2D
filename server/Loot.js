const consts = require('./constants/LootConstants');
let Typeble = require('./Typeble');

class Loot extends Typeble {
    constructor(id) {
        super(id);
        this.y = Math.random()*768;
        this.x = Math.random()*1366;
        this.words = consts.CHARACTERS.charAt(Math.floor(Math.random() * consts.CHARACTERS.length));
        this.isOpen = false;
        this.toExplode = false;
        this.size = 10;
        this.radius = 100;
        this.fillRGB = {
            r: 255,
            g: 255,
            b: 0,
        };

        this.rgb = {
            r: 255,
            g: 255,
            b: 0,
        };

        this.killerColor = {
            r: 255,
            g: 0,
            b: 0,
        };
    }

    getToExplode = () => {
        return this.toExplode;
    };

    explode = (enemies) => {
        enemies.forEach(enemy => {
            if(Math.abs(enemy.getX()-this.x)< this.radius && Math.abs(enemy.getY()-this.y)< this.radius) {
                enemy.destroy();
            }
        });
        this.toExplode = false;
    };

    kill = (killer) => {
        super.kill(killer);
        this.isOpen = true;
        this.toExplode = true;
    };
}

module.exports = Loot;