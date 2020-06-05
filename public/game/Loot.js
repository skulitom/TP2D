class Loot {
    constructor(loot) {
        this.x = loot.x;
        this.y = loot.y;
        this.id = loot.id;
        this.rgb = loot.rgb;
        this.fillRGB = loot.fillRGB;
        this.words = loot.words;
        this.typedWords = loot.typedWords;
        this.isOpen = loot.isOpen;
        this.size = loot.size;
        this.killerColor = loot.killerColor;
        this.radius = loot.radius;
        this.timer = 0;
    }

    modify = (loot) => {
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
            fill(this.rgb.r, this.rgb.g, this.rgb.b);
            rect(this.x, this.y, this.size, this.size);
            this.drawUI();
        } else if(this.timer < 10) {
            fill(this.killerColor.r, this.killerColor.g, this.killerColor.b);
            circle(this.x, this.y, this.radius * (this.timer/10));
            this.timer+=1;
        }
    };

    drawUI = () =>  {
        textSize(16);
        textAlign(LEFT, TOP);
        strokeWeight(2);
        stroke(51);
        fill(255, 255, 255);
        rect(this.x - this.words.length * 2 - 8, this.y + 5 + this.size, this.words.length * 14 + 10, 20);
        strokeWeight(1);

        fill(0, 0, 0);
        text(this.words, this.x - 5, this.y + 10 + this.size);
        fill(this.fillRGB.r, this.fillRGB.g, this.fillRGB.b);
        text(this.typedWords, this.x - 5, this.y + 10 + this.size);
    };

}