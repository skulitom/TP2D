class Player {
  constructor(player) {
    this.x = player.x;
    this.y = player.y;
    this.id = player.id;
    this.rgb = player.rgb;
    this.weapon = player.weapon;
    this.health = player.health;
    this.bDead = player.bDead;
  }

  modify(player) {
    this.weapon = player.weapon;
    this.health = player.health;
    this.bDead = player.bDead;
    this.x = player.x;
    this.y = player.y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  draw() {
    if(!this.bDead) {
      fill(this.rgb.r, this.rgb.g, this.rgb.b);
      circle(this.x, this.y, 20);
      fill(0, 0, 0);
      rect(this.x - 10, this.y - 10, 5, 5);
      rect(this.x - 25, this.y + 30, 50, 5);
      fill(255, 0, 0);
      rect(this.x - 25, this.y + 30, this.health / 2, 5);
    } else {
      fill(0, 0, 255);
      circle(this.x, this.y, 20);
    }
  }

}