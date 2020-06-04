class GameMenu {
    constructor() {
        this.buttonExit = undefined;
        this.buttonSettings = undefined;
        this.buttonResume = undefined;
        this.menuDimentions = resolution.map(x => x / 1.2);
        this.menuLoc = resolution.map(x => x / 12);
        this.buttonWidth = this.menuDimentions[0]/2;
        this.buttonHeight = 70;
        this.buttonFontSize = 24;
        this.menuShow = false;
        this.settings = new Settings();
        this.currentMenuItem = 0;
    }

    toggleMenu = () => {
      this.menuShow = !this.menuShow;
        this.currentMenuItem = 0;
    };

    draw = () => {
        if(this.menuShow) {
            let menuColor = color(100, 100, 110);
            menuColor.setAlpha(120);
            fill(menuColor);
            rect(...this.menuLoc, ...this.menuDimentions);
            this.displayCurrentMenuItems();
        } else {
            this.buttonResume = this.removeButton(this.buttonResume);
            this.buttonExit = this.removeButton(this.buttonExit);
            this.buttonSettings = this.removeButton(this.buttonSettings);
        }
    };

    displayCurrentMenuItems = () => {
        switch (this.currentMenuItem) {
            case 0:
                this.buttonResume = this.createButton(this.buttonResume, 'Resume', this.resumeButtonClicked, 1);
                this.buttonSettings = this.createButton(this.buttonSettings, 'Settings', this.settingsButtonClicked, 2);
                this.buttonExit = this.createButton(this.buttonExit, 'Exit', this.exitButtonClicked, 3);
                break;
            case 1:
                this.settings.draw();
                break;
            default:
                break;

        }
    };

    createButton = (btn, name, clickFunction, position) => {
        if(!btn) {
            btn = createButton(name);
            btn.mouseClicked(clickFunction);
            btn.size(this.buttonWidth, this.buttonHeight);
            btn.position(resolution[0]/2-this.buttonWidth/2, this.menuLoc[1] + 100*position);
            btn.style("font-family", "Bodoni");
            btn.style("font-size", this.buttonFontSize+"px");
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

    resumeButtonClicked = () => {
        this.currentMenuItem = 0;
        this.menuShow = false;
    };

    exitButtonClicked = () => {

    };

    settingsButtonClicked = () => {
        this.currentMenuItem = 1;
        this.buttonResume = this.removeButton(this.buttonResume);
        this.buttonExit = this.removeButton(this.buttonExit);
        this.buttonSettings = this.removeButton(this.buttonSettings);
    };

}