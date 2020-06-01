class Menu {
    constructor() {
        this.buttonExit = undefined;
        this.buttonSettings = undefined;
    }

    draw = (menuShow) => {
        if(menuShow) {
            let menuColor = color(100, 100, 110);
            menuColor.setAlpha(120);
            fill(menuColor);
            rect(...resolution.map(x => x / 12), ...resolution.map(x => x / 1.2));
            this.buttonExit = this.createButton(this.buttonExit, 'Exit', this.exitButtonClicked, resolution.map(x => x / 8));
            this.buttonSettings = this.createButton(this.buttonSettings, 'Settings', this.settingsButtonClicked, resolution.map(x => x / 5));
        } else {
            this.buttonExit = this.removeButton(this.buttonExit);
            this.buttonSettings = this.removeButton(this.buttonSettings);
        }
    };

    createButton = (btn, name, clickFunction, position) => {
        if(!btn) {
            btn = createButton(name);
            btn.mouseClicked(clickFunction);
            btn.size(200, 100);
            btn.position(...position);
            btn.style("font-family", "Bodoni");
            btn.style("font-size", "48px");
        }
        return btn;
    };

    removeButton = (btn) => {
        if(btn) {
            btn.remove();
            btn = null;
        }
        return btn;
    };

    exitButtonClicked = () => {

    };

    settingsButtonClicked = () => {

    };

}