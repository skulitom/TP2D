class Player {
  constructor(player) {
    this.x = player.x;
    this.y = player.y;
    this.id = player.id;
    this.rgb = player.rgb;
    this.weapon = player.weapon;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }


  draw() {
    fill(this.rgb.r, this.rgb.g, this.rgb.b);
    circle(this.x, this.y, 20);
  }

}