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
        this.shot = false;
        this.fxManager = fxManager;
        this.killerColor = enemy.killerColor;
        this.texture = enemy.texture;
        this.direction = enemy.direction;
        this.drawManager = new DrawManager();
        this.size = this.drawManager.getAdjustedSize(enemy.size);
        this.drawManager.uploadAnimation('move', frodoMove, 0.01, true, true);
        this.drawManager.uploadAnimation('dead', frodoDead1, 0.01, false, false);
    }

    modify = (enemy) => {
        if(this.typedWords.length < enemy.typedWords.length) {
            this.shot = true;
        }
        this.size = this.drawManager.getAdjustedSize(enemy.size);
        this.typedWords = enemy.typedWords;
        this.fillRGB = enemy.fillRGB;
        this.speed = enemy.speed;
        this.x = enemy.x*resolutionMultipleX;
        this.y = enemy.y*resolutionMultipleY;
        this.killerColor = enemy.killerColor;
        this.direction = enemy.direction;
        if (enemy.bDead && !this.bDead) {
            this.bDead = enemy.bDead;
            this.drawManager.startAnimation('dead');
            //this.fxManager.createExplosion(this.x, this.y, this.killerColor, this.size);
        }
    };

    getId = () =>  {
        return this.id;
    };

    getWords = () =>  {
        return this.words;
    };

    update = () =>  {
        if (this.shot) {
            this.shot = false;
        }
    };
  
    drawBody = () => {
        if(this.bDead) {
            return;
        }
        this.drawManager.putAnimationWithDirection('move', [this.x, this.y], this.direction, this.size);
    
    };

    drawDead = () => {
        if(!this.bDead) {
            return;
        }
        if(this.drawManager.getIsAcriveAnimations('dead')) {
            this.drawManager.putAnimationWithDirection('dead', [this.x, this.y], this.direction, this.size);
        } else {
            this.drawManager.putImageWithDirection(frodoDeadImg,[this.x, this.y], this.direction, this.size);
        }
    };
    
    drawUI = () => {

        if (this.bDead) {
            return;
        }
        textFont(fontOxygenMono);
        this.drawManager.putInputText(this.words, this.typedWords, [this.x, this.y], this.size, this.fillRGB);
    };
  
}