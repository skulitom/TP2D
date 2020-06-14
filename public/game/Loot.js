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
        this.size = loot.size*resolutionMultipleX*resolutionMultipleY;
        this.killerColor = loot.killerColor;
        this.radius = loot.radius;
        this.timer = 0;
        this.drawManager = new DrawManager();
    }

    modify = (loot) => {
        this.x = loot.x*resolutionMultipleX;
        this.y = loot.y*resolutionMultipleY;
        this.size = loot.size*resolutionMultipleX*resolutionMultipleY;
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

    drawBody = () =>  {
        if(!this.isOpen) {
            this.drawManager.putImage(rocketSkin, [this.x, this.y], this.size * 5)
            this.drawUI();
        } else if(this.timer < 10) {
            fill(this.killerColor.r, this.killerColor.g, this.killerColor.b);
            circle(this.x, this.y, this.radius * (this.timer/10));
            this.timer+=1;
        }
    };

    drawUI = () =>  {
        this.drawManager.putInputText(this.words, this.typedWords,[this.x, this.y], this.size, this.fillRGB);
    };

}