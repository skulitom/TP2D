let resolution = [1366, 768];
let resolutionMultipleX = resolution[0]/1920;
let resolutionMultipleY = resolution[1]/1080;
let soundLevel = 100;
let menuDimentions = resolution.map(x => x / 1.2);
let menuLoc = resolution.map(x => x / 12);
let buttonWidth = menuDimentions[0]/2;
let buttonHeight = 70;
let buttonFontSize = 24;
const FONT_FAMILY_TP2D = 'Bodoni';

changeGlobalRes = (newRes) => {
    resolution = newRes;
    resolutionMultipleX = resolution[0]/1920;
    resolutionMultipleY = resolution[1]/1080;
    menuDimentions = resolution.map(x => x / 1.2);
    menuLoc = resolution.map(x => x / 12);
    buttonWidth = menuDimentions[0]/2;
};