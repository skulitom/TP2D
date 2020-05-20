const socket = io.connect('http://localhost');

let players = new Map();
let enemies = new Map();
let lootList = new Map();

socket.on("heartbeat", (game) => {
  if(players instanceof Map && enemies instanceof Map && lootList instanceof Map) {
    updatePlayers(game.players);
    updateEnemies(game.enemies);
    updateLoot(game.loot)
  }
});

socket.on("disconnect", playerId => removePlayer(playerId));


function setup() {
  createCanvas(1366, 768);
}

function draw() {
  update();
  background(220);
  enemies.forEach(enemy => enemy.draw());
  lootList.forEach(loot => loot.draw());
  players.forEach(player => player.draw());
}

function update() {
  enemies.forEach(enemy => {
    enemy.update()
  });
}

function updateEnemies(serverEnemies) {
  for (let i = 0; i < serverEnemies.length; i++) {
    let enemyFromServer = serverEnemies[i];
    if (!enemyExists(enemyFromServer)) {
      let newEnemy = new Enemy(enemyFromServer);
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
      console.log("player push");
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
    players = players.delete(playerId);
  }
}

function removeEnemy(enemyId) {
  if(enemies instanceof Map) {
    enemies = enemies.delete(enemyId);
  }
}

function keyTyped() {
  fetch('/registerKey/'+key+'/'+socket.id)
      .then( res => {

      }).catch(err => {
    console.log('Fetch Error :-S', err);
  });
}
