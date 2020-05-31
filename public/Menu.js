class Menu {
    constructor() {
        this.buttonExit = undefined;
    }

    draw = (menuShow) => {
        if(menuShow) {
            let menuColor = color(100, 100, 110);
            menuColor.setAlpha(120);
            fill(menuColor);
            rect(...resolution.map(x => x / 12), ...resolution.map(x => x / 1.2));
            this.buttonExit = createButton("Exit");
            this.buttonExit.mouseClicked(this.exitButtonClicked);
            this.buttonExit.size(200, 100);
            this.buttonExit.position(...resolution.map(x => x / 8));
            this.buttonExit.style("font-family", "Bodoni");
            this.buttonExit.style("font-size", "48px");
        } else {
            if(this.buttonExit) {
                this.buttonExit.remove();
                this.buttonExit = null;
            }
        }
    };

    exitButtonClicked = () => {

    };

}