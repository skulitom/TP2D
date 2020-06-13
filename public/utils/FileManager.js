let playerSkin;
let deadPlayerSkin;
let rocketSkin;
let themeSound;
let tracer;
let bg;
let frodo;
let gunSound;

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
        playerSkin = loadImage('assets/textures/player/player.png', this.somethingLoaded);
        deadPlayerSkin = loadImage('assets/textures/player/PlayerDead.png', this.somethingLoaded);
        rocketSkin = loadImage('assets/textures/rocket/Rocket.png', this.somethingLoaded);
        tracer = loadImage('assets/textures/player/trace.png', this.somethingLoaded);
    };

    loadAnimation = (path1, path2) => {
        let animationArr = [];
        let startPos = +(path1.slice(-3));
        const endPos = +(path2.slice(-3));
        const basePath = path1.substring(0,path1.length-3);
        if(startPos <= endPos) {
            while(startPos < endPos) {
                animationArr.push(loadImage(basePath+this.getNumString(startPos)));
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