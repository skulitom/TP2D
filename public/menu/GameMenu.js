class GameMenu {
    constructor() {
        this.buttonExit = undefined;
        this.buttonSettings = undefined;
        this.buttonResume = undefined;
        this.menuShow = false;
        this.settings = new Settings();
        this.currentMenuItem = 0;
        this.menuUtils = new MenuUtils();
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
            rect(...menuLoc, ...menuDimentions);
            this.displayCurrentMenuItems();
        } else {
            this.buttonResume = this.menuUtils.removeButton(this.buttonResume);
            this.buttonExit = this.menuUtils.removeButton(this.buttonExit);
            this.buttonSettings = this.menuUtils.removeButton(this.buttonSettings);
        }
    };

    displayCurrentMenuItems = () => {
        switch (this.currentMenuItem) {
            case 0:
                this.buttonResume = this.menuUtils.createButton(this.buttonResume, 'Resume', this.resumeButtonClicked, 1);
                this.buttonSettings = this.menuUtils.createButton(this.buttonSettings, 'Settings', this.settingsButtonClicked, 2);
                this.buttonExit = this.menuUtils.createButton(this.buttonExit, 'Exit', this.exitButtonClicked, 3);
                break;
            case 1:
                this.settings.draw();
                break;
            default:
                break;

        }
    };

    resumeButtonClicked = () => {
        this.currentMenuItem = 0;
        this.menuShow = false;
    };

    exitButtonClicked = () => {

    };

    settingsButtonClicked = () => {
        this.currentMenuItem = 1;
        this.buttonResume = this.menuUtils.removeButton(this.buttonResume);
        this.buttonExit = this.menuUtils.removeButton(this.buttonExit);
        this.buttonSettings = this.menuUtils.removeButton(this.buttonSettings);
    };

}