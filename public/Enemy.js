class Enemy {
    constructor(enemy, fxManager) {
        this.x = enemy.x;
        this.y = enemy.y;
        this.id = enemy.id;
        this.rgb = enemy.rgb;
        this.fillRGB = enemy.fillRGB;
        this.words = enemy.words;
        this.typedWords = enemy.typedWords;
        this.speed = enemy.speed;
        this.bDead = enemy.bDead;
        this.size = enemy.size;
        this.shot = false;
        this.fxManager = fxManager;
        this.killerColor = enemy.killerColor;
        this.texture = enemy.texture;
    }

    modify = (enemy) => {
        if(this.typedWords.length < enemy.typedWords.length){
            this.shot = true;
        }
        this.typedWords = enemy.typedWords;
        this.fillRGB = enemy.fillRGB;
        this.speed = enemy.speed;
        this.x = enemy.x;
        this.y = enemy.y;
        this.killerColor = enemy.killerColor;
        if (enemy.bDead && !this.bDead)
        {
            this.bDead = enemy.bDead;
            this.fxManager.createExplosion(this.x, this.y, this.killerColor, this.size);
        }
    };

    getId = () =>  {
        return this.id;
    };

    getWords = () =>  {
        return this.words;
    };

    kill = () => {
        fetch('/killEnemy/'+this.id)
            .then( res => {
                console.log(res);
            }).catch(err => {
                console.log('Fetch Error :-S', err);
            });
        this.bDead = true;
    };

    update = () =>  {
        if (this.shot) {
            this.shot = false;
        }
    };
  
    drawBody = () => {
        if (this.bDead){
            fill(this.rgb.r * 0.5, this.rgb.g * 0.5, this.rgb.b * 0.5);
        } else {
            fill(this.rgb.r, this.rgb.g, this.rgb.b);
        }
        
        circle(this.x, this.y, this.size);
        this.drawUI();
    
    };
    
    drawUI = () => {

        if (this.bDead)
            return;

        textSize(16);
        textAlign(LEFT, TOP);
        strokeWeight(2);
        stroke(51);
        fill(255, 255, 255);
        rect(this.x - this.words.length*2 -8, this.y +5+ this.size, this.words.length*14 + 10, 20);
        strokeWeight(1);

        fill(0, 0, 0);
        text(this.words, this.x - 5, this.y +10+ this.size);
        fill(this.fillRGB.r, this.fillRGB.g, this.fillRGB.b);
        text(this.typedWords, this.x - 5, this.y +10+ this.size);
    };
  
}