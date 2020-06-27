class Player {
    constructor(player) {
        this.x = player.x*resolutionMultipleX;
        this.y = player.y*resolutionMultipleY;
        this.id = player.id;
        this.rgb = player.rgb;
        this.health = player.health;
        this.bDead = player.bDead;
        this.size = player.size**Math.sqrt(resolutionMultipleX**2 + resolutionMultipleY**2);
        this.score = player.score;
        this.direction = player.direction + Math.PI / 2;
        this.shotsMade = player.shotsMade;
        this.shotsFired = 0;
        this.timer = 0;
        this.drawManager = new DrawManager();
        this.drawManager.uploadAnimation("playerFire", playerFireAnim, 0.01, false);

    }

    modify = (player) => {
        this.health = player.health;
        this.bDead = player.bDead;
        this.x = player.x*resolutionMultipleX;
        this.y = player.y*resolutionMultipleY;
        this.score = player.score;
        this.size = player.size*Math.sqrt(resolutionMultipleX**2 + resolutionMultipleY**2);
        this.direction = player.direction + Math.PI / 2;
        this.shotsMade = player.shotsMade;
    };

    getX = () =>  {
        return this.x;
    };

    getY = () =>  {
        return this.y;
    };

    getScore = () =>  {
        return this.score;
    };

    getColor = () =>  {
        return this.rgb;
    };

    drawHealthBar = () => {
        fill(0,0,0);
        rect(this.x - 25, this.y + 30, 50, 5);
        fill(255, 0, 0);
        rect(this.x - 25, this.y + 30, this.health / 2, 5);
    };

    draw = () =>  {
        if(!this.bDead) {
            this.drawManager.putImageWithDirection(playerSkin, [this.x, this.y], this.direction,  this.size*8);

            if(this.shotsMade > this.shotsFired && this.timer<1) {
                gunSound.play();
                this.drawManager.startAnimation("playerFire");
            }
            if(this.shotsMade > this.shotsFired && this.drawManager.getIsAcriveAnimations("playerFire")) {
                this.drawManager.putAnimationWithDirection("playerFire", [this.x, this.y], this.direction , this.size * 8);
                this.timer++;
            } else if(this.shotsMade > this.shotsFired) {
                this.timer = 0;
                this.shotsFired += 1;
            }
            this.drawHealthBar();
        } else {
            this.drawManager.putImage(deadPlayerSkin, [this.x, this.y], this.size*8);
        }
    };
}