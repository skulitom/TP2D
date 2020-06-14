class Enemy {
    constructor(enemy, fxManager) {
        this.x = enemy.x*resolutionMultipleX;
        this.y = enemy.y*resolutionMultipleY;
        this.id = enemy.id;
        this.rgb = enemy.rgb;
        this.fillRGB = enemy.fillRGB;
        this.words = enemy.words;
        this.typedWords = enemy.typedWords;
        this.speed = enemy.speed;
        this.bDead = enemy.bDead;
        this.size = enemy.size*resolutionMultipleX*resolutionMultipleY;
        this.shot = false;
        this.fxManager = fxManager;
        this.killerColor = enemy.killerColor;
        this.texture = enemy.texture;
        this.direction = enemy.direction;
        this.drawManager = new DrawManager();
        this.drawManager.uploadAnimation('move', frodoMove, 0.01, true, true);
    }

    modify = (enemy) => {
        if(this.typedWords.length < enemy.typedWords.length) {
            this.shot = true;
        }
        this.size = enemy.size*resolutionMultipleX*resolutionMultipleY;
        this.typedWords = enemy.typedWords;
        this.fillRGB = enemy.fillRGB;
        this.speed = enemy.speed;
        this.x = enemy.x*resolutionMultipleX;
        this.y = enemy.y*resolutionMultipleY;
        this.killerColor = enemy.killerColor;
        this.direction = enemy.direction;
        if (enemy.bDead && !this.bDead) {
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
//        this.drawManager.putImageWithDirection(frodo, [this.x, this.y], this.direction, this.size*4);
        this.drawManager.putAnimationWithDirection('move', [this.x, this.y], this.direction, this.size * 8);
        this.drawUI();
    
    };
    
    drawUI = () => {

        if (this.bDead) {
            return;
        }

        this.drawManager.putInputText(this.words, this.typedWords, [this.x, this.y], this.size, this.fillRGB);
    };
  
}