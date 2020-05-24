class EffectsManager {
    constructor() {
        this.explosionEffectsPool = [];
    }

    createExplosion(x, y, color) {
        
        let newExplosion = new Explosion(x, y, color);
        this.explosionEffectsPool.push(newExplosion);
        console.log("exp created");

    }

    update() {
        
        for (let explId = this.explosionEffectsPool.length - 1; explId >= 0; explId = explId - 1)
        {
            const needDestroy = this.explosionEffectsPool[explId].update();
            if (needDestroy)
            {
                this.explosionEffectsPool.splice(explId);
                console.log("exp destroyed");    
            }
            console.log("exp run");    
        }

    }

    draw() {

        for (let explosion of this.explosionEffectsPool)
        {
            explosion.draw();    
        }

    }
  
}