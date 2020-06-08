let resolution = [1366, 768];
let currentLoadedAssets = 0;
const NUMBER_OF_ASSETS = 8;
let frodo;
let gunSound;
let soundLevel = 100;
let playerSkin;
let deadPlayerSkin;
let rocketSkin;
let themeSound;
let tracer;
let bg;
let menuDimentions = resolution.map(x => x / 1.2);
let menuLoc = resolution.map(x => x / 12);
let buttonWidth = menuDimentions[0]/2;
let buttonHeight = 70;
let buttonFontSize = 24;
const FONT_FAMILY_TP2D = 'Bodoni';

changeGlobalRes = (newRes) => {
    resolution = newRes;
    menuDimentions = resolution.map(x => x / 1.2);
    menuLoc = resolution.map(x => x / 12);
    buttonWidth = menuDimentions[0]/2;
};