class Explosion {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.time = 0;
    }

    update() {
        const dt = 0.1;
        this.time = this.time + dt;

        if (this.time > 0.8)
        {
            return true;    
        }

        return false;

    }

    draw() {

        const START_SIZE = 16;
        const size = sqrt(START_SIZE * this.time * 100); 

        fill(this.color.r, this.color.g, this.color.b);
        circle(this.x, this.y, size);

    }
  
}