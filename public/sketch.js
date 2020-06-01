const socket = io.connect('http://localhost:8080');
const room = 'abc123';

let players = new Map();
let enemies = new Map();
let lootList = new Map();
let loaded = false;
let angle = 0;
let gunSound;
let gui = new GUI(players);
let fxManger = new EffectsManager();
let menuGUI = new Menu();
let bg;
let resolution = [1366, 768];
let frodo;
let playerSkin;
let tracer;

socket.on('connect', () => {
    socket.emit('room', room);
});

socket.on("heartbeat", (game) => {
    if(players instanceof Map &&
        enemies instanceof Map &&
        lootList instanceof Map &&
        loaded
    ) {
        updatePlayers(game.players);
        updateEnemies(game.enemies);
        updateLoot(game.loot)
    }
});

socket.on("disconnect", playerId => removePlayer(playerId));

songLoaded = (loadedSong) => {
    loaded = true;
    loadedSong.setVolume(0.2);
    loadedSong.play();
};

gunSoundfun = (sound) => {
    sound.setVolume(0.1);
    sound.loop = false;
};

setup = () => {
    createCanvas(...resolution);
    bg = loadImage('assets/textures/background/Ground.jpg');
    gunSound = loadSound('assets/sfx/gun-shot.mp3', gunSoundfun);
    loadSound('assets/music/DST-BetaTron.mp3', songLoaded);
    frodo = loadImage('assets/textures/npcs/frodo/frodo.png');
    playerSkin = loadImage('assets/textures/player/player.png');
    tracer = loadImage('assets/textures/player/trace.png');
    loaded = true;
};

drawMainGame = () => {
    background(bg);
    update();
    enemies.forEach(enemy => {enemy.drawBody(frodo)});
    lootList.forEach(loot => {loot.drawBody()});
    players.forEach(player => player.draw(playerSkin));
};

drawLoadingAnimation = () =>  {
    translate(...resolution.map(x => x/2));
    rotate(angle);
    strokeWeight(4);
    stroke(255,0,255);
    line(0,0,100,0);
    angle += 0.1;
};

draw = () =>  {
    if(loaded) {
        drawMainGame();
    } else {
        background(100);
        drawLoadingAnimation();
    }
    fxManger.draw();
    gui.draw();
    menuGUI.draw();

};

update = () => {
    enemies.forEach(enemy => {
        enemy.update();
    });
    fxManger.update();
};

updateEnemies = (serverEnemies) => {
    for (let i = 0; i < serverEnemies.length; i++) {
        let enemyFromServer = serverEnemies[i];
        if (!enemyExists(enemyFromServer)) {
            let newEnemy = new Enemy(enemyFromServer, fxManger);
            enemies.set(newEnemy.id, newEnemy);
        } else {
            let modEnemy = enemies.get(enemyFromServer.id);
            modEnemy.modify(enemyFromServer);
        }
    }
};

enemyExists = (enemyFromServer) => {
    if(enemies instanceof Map) {
        return enemies.has(enemyFromServer.id);
    } else {
        return false;
    }
};

updatePlayers = (serverPlayers) => {
    for (let i = 0; i < serverPlayers.length; i++) {
        let playerFromServer = serverPlayers[i];
        if (!playerExists(playerFromServer)) {
            let newPlayer = new Player(playerFromServer);
            players.set(newPlayer.id, newPlayer);
        } else {
            let modPlayer = players.get(playerFromServer.id);
            modPlayer.modify(playerFromServer);
        }
    }
};

updateLoot = (serverLoot) => {
    for (let i = 0; i < serverLoot.length; i++) {
        let lootFromServer = serverLoot[i];
        if (!lootExists(lootFromServer)) {
            let newLoot = new Loot(lootFromServer);
            lootList.set(newLoot.id, newLoot);
        } else {
            let modLoot = lootList.get(lootFromServer.id);
            modLoot.modify(lootFromServer);
        }
    }
};

lootExists = (lootFromServer) => {
    if(lootList instanceof Map) {
        return lootList.has(lootFromServer.id);
    } else {
        return false;
    }
};

playerExists = (playerFromServer) => {
    if(players instanceof Map) {
        return players.has(playerFromServer.id);
    } else {
        return false;
    }
};

removePlayer = (playerId) => {
    if(players instanceof Map) {
        players.delete(playerId);
    }
};

removeEnemy = (enemyId) => {
    if(enemies instanceof Map) {
        enemies.delete(enemyId);
    }
};

keyTyped = ()  => {
    if(keyCode === ENTER) {
        menuGUI.toggleMenu();
    } else {
        gunSound.play();
        players.get(socket.id).shoot(tracer);
        socket.emit('set key', {'key': key, 'id': socket.id});
    }
};
