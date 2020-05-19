class Loot {
    constructor(loot) {
        this.x = loot.x;
        this.y = loot.y;
        this.id = loot.id;
        this.rgb = loot.rgb;
        this.fillRGB = loot.fillRGB;
        this.words = loot.words;
        this.typedWords = loot.typedWords;
        this.isOpen = loot.bDead;
        this.size = loot.size;
    }

    modify(loot) {
        this.typedWords = loot.typedWords;
        this.fillRGB = loot.fillRGB;
        this.isOpen = loot.bDead;
    }

    getId() {
        return this.id;
    }

    getWords() {
        return this.words;
    }

    setTypedText(text) {
        this.typedWords = text;
    }

    draw() {
        fill(this.rgb.r, this.rgb.g, this.rgb.b);
        rect(this.x, this.y, this.size, this.size);

        fill(0, 0, 0);
        text(this.words, this.x-50, this.y+50);
        fill(this.fillRGB.r, this.fillRGB.g, this.fillRGB.b);
        text(this.typedWords, this.x - 50, this.y + 50);
    }

}