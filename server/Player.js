let TypeInput = require('./TypeInput');

class Player {
  constructor(id, tManager) {
    this.x = Math.floor(1366/2);
    this.y = Math.floor(768/2);
    this.id = id;
    this.weapon = 'pistol';
    this.health = 100;
    this.typeInput = new TypeInput(0, tManager);
    this.bDead = false;

    this.rgb = {
      r: Math.random() * 255,
      g: Math.random() * 255,
      b: Math.random() * 255,
    }
  }

  hit(damage) {
    if(this.health<=damage){
      this.health=0;
    } else {
      this.health-=damage;
    }
  }

  setKey(key) {
    return this.typeInput.updateInKey(key);
  }

}

module.exports = Player;