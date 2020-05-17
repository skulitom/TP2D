class Player {
  constructor(id) {
    this.x = Math.floor(1366/2);
    this.y = Math.floor(768/2);
    this.id = id;
    this.weapon = 'pistol';
    this.health = 100;

    this.rgb = {
      r: Math.random() * 255,
      g: Math.random() * 255,
      b: Math.random() * 255,
    }
  }

}

module.exports = Player;