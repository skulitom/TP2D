class Player {
    constructor(player) {
        this.x = player.x*resolutionMultipleX;
        this.y = player.y*resolutionMultipleY;
        this.id = player.id;
        this.rgb = player.rgb;
        this.health = player.health;
        this.bDead = player.bDead;
        this.size = player.size*resolutionMultipleX*resolutionMultipleY;
        this.score = player.score;
        this.direction = player.direction;
        this.shotsMade = player.shotsMade;
        this.shotsFired = 0;
        this.timer = 0;
    }

    modify = (player) => {
        this.health = player.health;
        this.bDead = player.bDead;
        this.x = player.x*resolutionMultipleX;
        this.y = player.y*resolutionMultipleY;
        this.score = player.score;
        this.size = player.size*resolutionMultipleX*resolutionMultipleY;
        this.direction = player.direction;
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

    draw = () =>  {
        if(!this.bDead) {
            translate(this.x, this.y);
            rotate(this.direction + Math.PI / 2);

            imageMode(CENTER);
            image(playerSkin, 0, 0, this.size * 6, this.size * 6);
            imageMode(CORNER);

            if(this.shotsMade > this.shotsFired && this.timer<1) {
                gunSound.play();
            }
            if(this.shotsMade > this.shotsFired && this.timer<10) {
                rotate(-Math.PI);
                imageMode(CENTER);
                translate(0, this.size*5);
                rotate(-Math.PI);
                image(tracer, 0, 0, this.size*2, this.size*10);
                rotate(Math.PI);
                translate(0, -this.size*5);
                imageMode(CORNER);
                rotate(Math.PI);
                this.timer++;
            } else if(this.shotsMade > this.shotsFired) {
                this.timer = 0;
                this.shotsFired += 1;
            }
            rotate(-this.direction - Math.PI / 2);
            translate(-(this.x), -(this.y));
            fill(0,0,0);
            rect(this.x - 25, this.y + 30, 50, 5);
            fill(255, 0, 0);
            rect(this.x - 25, this.y + 30, this.health / 2, 5);
        } else {
            imageMode(CENTER);
            image(deadPlayerSkin, this.x, this.y, this.size * 6, this.size * 6);
            imageMode(CORNER);
        }
    };
}