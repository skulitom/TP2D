class Settings {
    constructor(backFnc) {
        this.menuUtils = new MenuUtils();
        this.backBtn = undefined;
        this.resolutionDropdown = undefined;
        this.backFnc = backFnc;
    }

    removeSettings = () => {
        this.backBtn = this.menuUtils.removeItem(this.backBtn);
        this.resolutionDropdown = this.menuUtils.removeItem(this.resolutionDropdown);
    };

    draw = () => {
        this.resolutionDropdown = this.menuUtils.createDropdown(
            this.resolutionDropdown,
            ['1920 x 1080', '1366 x 768'],
            1,
            this.selectResolution,
            1
        );

        this.backBtn = this.menuUtils.createButton(this.backBtn, 'Back', this.backFnc, 2);
    };

    selectResolution = () => {

    };

}