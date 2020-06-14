class DrawManager {

    putImage = (img, position, size) => {
        imageMode(CENTER);
        image(img, position[0], position[1], size, size);
        imageMode(CORNER);
    };

    putImageWithDirection = (img, position, direction, size) => {
        imageMode(CENTER);
        translate(...position);
        rotate(direction);
        image(img, 0, 0, size, size);
        rotate(-direction);
        translate(...position.map(x => -x));
        imageMode(CORNER);
    };

    putInputText = (words, typedWords, position, size, fillRGB) => {
        textSize(16);
        textAlign(LEFT, TOP);
        strokeWeight(2);
        stroke(51);
        fill(255, 255, 255);
        rect(position[0] - words.length*2 -8, position[1] +5+ size, words.length*14 + 10, 20);
        strokeWeight(1);

        fill(0, 0, 0);
        text(words, position[0] - 5, position[1] +10+ size);
        fill(fillRGB.r, fillRGB.g, fillRGB.b);
        text(typedWords, position[0] - 5, position[1] +10+ size);
    };

}