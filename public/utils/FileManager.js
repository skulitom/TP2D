let playerSkin;
let deadPlayerSkin;
let rocketSkin;
let themeSound;
let tracer;
let bg;
let frodo;
let frodoMove;
let frodoDead1;
let frodoDeadImg;
let gunSound;
let testAnimation;
let playerFireAnim;
let rocketAnimation;
let currentLoadedAssets = 0;
const NUMBER_OF_ASSETS = 8;

class FileManager {

    songLoaded = (loadedSong) => {
        loadedSong.setVolume(0.2);
        loadedSong.play();
        currentLoadedAssets+=1;
    };

    gunSoundfun = (sound) => {
        sound.setVolume(0.1);
        sound.loop = false;
        currentLoadedAssets+=1;
    };

    somethingLoaded = () => {
        currentLoadedAssets+=1;
    };

    loadAllAssets = () => {
        bg = loadImage('assets/textures/background/Ground.jpg', this.somethingLoaded);
        gunSound = loadSound('assets/sfx/gun-shot.mp3', this.gunSoundfun);
        themeSound = loadSound('assets/music/DST-BetaTron.mp3', this.songLoaded);
        frodo = loadImage('assets/textures/npcs/frodo/frodo.png', this.somethingLoaded);
        frodoMove = this.loadAnimation('assets/textures/npcs/frodo/moveAnim/move0001.png', 'assets/textures/npcs/frodo/moveAnim/move0016.png');
        playerSkin = loadImage('assets/textures/player/player.png', this.somethingLoaded);
        deadPlayerSkin = loadImage('assets/textures/player/PlayerDead.png', this.somethingLoaded);
        rocketSkin = loadImage('assets/textures/rocket/LandAnim/land0022.png', this.somethingLoaded);
        tracer = loadImage('assets/textures/player/trace.png', this.somethingLoaded);
        testAnimation = this.loadAnimation('assets/textures/testAnim/anim001.png', 'assets/textures/testAnim/anim010.png');
        playerFireAnim = this.loadAnimation('assets/textures/player/FireAnim/fire0001.png', 'assets/textures/player/FireAnim/fire0013.png');
        rocketAnimation = this.loadAnimation('assets/textures/rocket/LandAnim/land0001.png','assets/textures/rocket/LandAnim/land0022.png');
        frodoDead1 = this.loadAnimation('assets/textures/npcs/frodo/deadAnim/dead0001.png','assets/textures/npcs/frodo/deadAnim/dead0016.png');
        frodoDeadImg = loadImage('assets/textures/npcs/frodo/deadAnim/dead0016.png');
    };

    loadAnimation = (path1, path2) => {
        let animationArr = [];
        const pathType = path1.slice(-4);
        const pathNoType1 = path1.substring(0,path1.length-4);
        const pathNoType2 = path2.substring(0,path1.length-4);
        let startPos = +(pathNoType1.slice(-3));
        const endPos = +(pathNoType2.slice(-3));
        const basePath = path1.substring(0,path1.length-7);
        if(startPos <= endPos) {
            while(startPos <= endPos) {
                animationArr.push(loadImage(basePath+this.getNumString(startPos)+pathType));
                startPos+=1;
            }
        }
        return animationArr;
    };

    getNumString = (num) => {
        if(num < 10) {
            return '00'+num;
        } else if (num < 100) {
            return '0'+num;
        } else {
            return num.toString();
        }
    }

}