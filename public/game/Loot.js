class Loot {
    constructor(loot) {
        this.x = loot.x*resolutionMultipleX;
        this.y = loot.y*resolutionMultipleY;
        this.id = loot.id;
        this.rgb = loot.rgb;
        this.fillRGB = loot.fillRGB;
        this.words = loot.words;
        this.typedWords = loot.typedWords;
        this.isOpen = loot.isOpen;
        this.killerColor = loot.killerColor;
        this.radius = loot.radius;
        this.timer = 0;
        this.drawManager = new DrawManager();
        this.size = this.drawManager.getAdjustedSize(loot.size);
        this.drawManager.uploadAnimation("rocketLand", rocketAnimation, 0.025, false);
        this.drawManager.startAnimation("rocketLand");
    }

    modify = (loot) => {
        this.x = loot.x*resolutionMultipleX;
        this.y = loot.y*resolutionMultipleY;
        this.size = this.drawManager.getAdjustedSize(loot.size);
        this.typedWords = loot.typedWords;
        this.fillRGB = loot.fillRGB;
        this.isOpen = loot.isOpen;
        this.killerColor = loot.killerColor;
    };

    getId = () =>  {
        return this.id;
    };

    getWords = () =>  {
        return this.words;
    };

    setTypedText = (text) => {
        this.typedWords = text;
    };

    drawBody = () => {
        if (!this.isOpen) {
            if (this.drawManager.getIsAcriveAnimations("rocketLand")) {
                this.drawManager.putAnimation("rocketLand", [this.x, this.y], this.size*2);
            } else {
                this.drawManager.putImage(rocketSkin, [this.x, this.y], this.size*2);
                this.drawUI();
            }
        } else if(this.timer < 10) {
            fill(this.killerColor.r, this.killerColor.g, this.killerColor.b);
            circle(this.x, this.y, this.radius * (this.timer/10));
            this.timer+=1;
        }
    };

    drawUI = () =>  {
        textFont(fontOxygenMono);
        this.drawManager.putInputText(this.words, this.typedWords,[this.x, this.y], this.size, this.fillRGB);
    };

}