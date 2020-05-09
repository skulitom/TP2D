class Enemy {
    constructor(enemy) {
        this.x = enemy.x;
        this.y = enemy.y;
        this.id = enemy.id;
        this.rgb = enemy.rgb;
        this.words = enemy.words;
        this.typedWords = "";
        this.speed = enemy.speed;
        this.bDead = false;
    }

    getId() {
        return this.id;
    }

    getWords() {
        return this.words;
    }

    getSpeed() {
        return this.speed;
    }

    setTypedText(text) {
        this.typedWords = text;
    }

    kill(){
        this.bDead = true;
    }

    update(playerPosX, playerPosY) {

        if (this.bDead)
            return;

        if(Math.random() >= 0.5) {
            if (this.x - playerPosX > 0) {
                this.x -= this.speed;
            } else if (this.x - playerPosX < 0) {
                this.x += this.speed;
            }
        } else {
            if (this.y - playerPosY > 0) {
                this.y -= this.speed;
            } else if (this.y - playerPosY < 0) {
                this.y += this.speed;
            }
        }
    }
  
    draw() {
        fill(this.rgb.r, this.rgb.g, this.rgb.b);
        circle(this.x, this.y, 20);
        fill(0, 0, 0);
        text(this.words, this.x-50, this.y+50);
        fill(255, 0, 0);
        text(this.typedWords, this.x - 50, this.y + 50);
    }
  
}