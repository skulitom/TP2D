let TypeInput = require('./TypeInput');

class Player {
  constructor(id, side, tManager) {
    this.x = Math.floor(1366/2);
    this.y = Math.floor(768/2);
    this.id = id;
    this.weapon = 'pistol';
    this.health = 100;
    this.typeInput = new TypeInput(side, tManager, id);
    this.bDead = false;
    this.score = 0;

    this.rgb = {
      r: Math.random() * 255,
      g: Math.random() * 255,
      b: Math.random() * 255,
    }
  }

  registerKill(level) {
    if(this.score+level<=0){
      this.score = 0;
      return;
    }
    this.score += level;
  }

  hit(damage) {
    if(this.health<=damage){
      this.health=0;
      this.bDead = true;
    } else {
      this.health-=damage;
    }
  }

  moveAway() {
    this.x -= 100;
  }

  moveBack() {
    this.x += 100;
  }

  setKey(key) {
    if(!this.bDead) {
      return this.typeInput.updateInKey(key);
    } else {
      return 'player dead';
    }
  }

}

module.exports = Player;