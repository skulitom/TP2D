class Enemy {
    constructor(enemy) {
        this.x = enemy.x;
        this.y = enemy.y;
        this.id = enemy.id;
        this.rgb = enemy.rgb;
        this.words = enemy.words;
        this.typedWords = enemy.typedWords;
        this.speed = enemy.speed;
        this.bDead = enemy.bDead;
    }

    modify(enemy) {
        this.typedWords = enemy.typedWords;
        this.speed = enemy.speed;
        this.bDead = enemy.bDead;
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
        fetch('/killEnemy/'+this.id)
            .then( res => {
                console.log(res);
            }).catch(err => {
                console.log('Fetch Error :-S', err);
            });
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
        if (this.bDead){
            fill(this.rgb.r * 0.5, this.rgb.g * 0.5, this.rgb.b * 0.5);
        } else {
            fill(this.rgb.r, this.rgb.g, this.rgb.b);
        }
        
        circle(this.x, this.y, 20);
        
        if (this.bDead)
            return;
        
        fill(0, 0, 0);
        text(this.words, this.x-50, this.y+50);
        fill(255, 0, 0);
        text(this.typedWords, this.x - 50, this.y + 50);
    }
  
}