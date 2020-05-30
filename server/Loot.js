const consts = require('./constants/LootConstants');
let Typeble = require('./Typeble');

class Loot extends Typeble {
    constructor(id) {
        super(id);
        this.y = Math.random()*768;
        this.x = Math.random()*1366;
        this.words = consts.CHARACTERS.charAt(Math.floor(Math.random() * consts.CHARACTERS.length));
        this.isOpen = false;
        this.size = 10;
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
    }

    kill = (killer) => {
        super.kill(killer);
        this.isOpen = true;
    };
}

module.exports = Loot;