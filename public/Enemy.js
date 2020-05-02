class Enemy {
    constructor(enemy) {
      this.x = enemy.x;
      this.y = enemy.y;
      this.id = enemy.id;
      this.rgb = enemy.rgb;
      this.words = enemy.words;
    }
  
  
    draw() {
      fill(this.rgb.r, this.rgb.g, this.rgb.b);
      circle(this.x, this.y, 20);
    }
  
}