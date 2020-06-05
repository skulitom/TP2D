class Settings {
    constructor() {
        this.menuUtils = new MenuUtils();
        this.backBtn = undefined;
        this.lastPos = 1;
    }

    createBackButton = (backFunc) => {
        this.backBtn = this.menuUtils.createButton(this.backBtn, 'Back', backFunc, this.lastPos)
    };

    removeSettings = () => {
        this.backBtn = this.menuUtils.removeButton(this.backBtn)
    };

}