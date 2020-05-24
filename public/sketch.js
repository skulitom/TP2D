const socket = io.connect('localhost');

let players = new Map();
let enemies = new Map();
let lootList = new Map();
let loaded = false;
let angle = 0;
let gunSound;
let gui = new GUI(players);
let fxManger = new EffectsManager();

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

function songLoaded(loadedSong) {
  loaded = true;
  loadedSong.setVolume(0.2);
  loadedSong.play();
}

function gunSoundfun(sound) {
  sound.setVolume(0.1);
  sound.loop = false;
}

function setup() {
  createCanvas(1366, 768);
  gunSound = loadSound('assets/sfx/gun-shot.mp3', gunSoundfun);
  loadSound('assets/music/DST-BetaTron.mp3', songLoaded);
  loaded = true;
}

function draw() {
  background(220);
  if(loaded) {
    update();
    enemies.forEach(enemy => enemy.drawBody());
    lootList.forEach(loot => loot.drawBody());
    enemies.forEach(enemy => enemy.drawUI());
    lootList.forEach(loot => loot.drawUI());
//    console.log(players);
    players.forEach(player => player.draw());
  } else {
    translate(1366/2, 768/2);
    rotate(angle);
    strokeWeight(4);
    stroke(255,0,255);
    line(0,0,100,0);
    angle += 0.1;
  }
  fxManger.draw();
  gui.draw();
}

function update() {
  enemies.forEach(enemy => {
    enemy.update();
  });
  fxManger.update();
}

function updateEnemies(serverEnemies) {
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
}

function enemyExists(enemyFromServer) {
    if(enemies instanceof Map) {
      return enemies.has(enemyFromServer.id);
    } else {
      return false;
    }
}

function updatePlayers(serverPlayers) {
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
}

function updateLoot(serverLoot) {
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
}

function lootExists(lootFromServer) {
  if(lootList instanceof Map) {
    return lootList.has(lootFromServer.id);
  } else {
    return false;
  }
}

function playerExists(playerFromServer) {
  if(players instanceof Map) {
    return players.has(playerFromServer.id);
  } else {
    return false;
  }
}

function removePlayer(playerId) {
  if(players instanceof Map) {
    players.delete(playerId);
  }
}

function removeEnemy(enemyId) {
  if(enemies instanceof Map) {
    enemies.delete(enemyId);
  }
}

function keyTyped() {
  gunSound.play();
  fetch('/registerKey/'+key+'/'+socket.id)
      .then( res => {

      }).catch(err => {
    console.log('Fetch Error :-S', err);
  });
}
