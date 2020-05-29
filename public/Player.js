class Player {
    constructor(player) {
        this.x = player.x;
        this.y = player.y;
        this.id = player.id;
        this.rgb = player.rgb;
        this.health = player.health;
        this.bDead = player.bDead;
        this.size = player.size;
        this.score = player.score;
        this.direction = player.direction;
    }

    modify = (player) => {
        this.health = player.health;
        this.bDead = player.bDead;
        this.x = player.x;
        this.y = player.y;
        this.score = player.score;
        this.direction = player.direction;
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
            rotate(this.direction);
            fill(this.rgb.r, this.rgb.g, this.rgb.b);
            circle(0, 0, this.size);
            fill(0, 0, 0);
            rect( -this.size, -this.size/2, 20, 5);
            rotate(-this.direction);
            translate(-(this.x), -(this.y));
            rect(this.x - 25, this.y + 30, 50, 5);
            fill(255, 0, 0);
            rect(this.x - 25, this.y + 30, this.health / 2, 5);
//      console.log(this.x);
//      console.log(this.y);
        } else {
            fill(0, 0, 255);
            circle(this.x, this.y, this.size);
        }
    };
}