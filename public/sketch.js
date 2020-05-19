const socket = io.connect('http://localhost');

let players = new Map();
let enemies = new Map();

socket.on("heartbeat", (game) => {
  updatePlayers(game.players);
  updateEnemies(game.enemies);
});

socket.on("disconnect", playerId => removePlayer(playerId));


function setup() {
  createCanvas(1366, 768);
}

function draw() {
  update();
  background(220);
  players.forEach(player => player.draw());
  enemies.forEach(enemy => enemy.draw());

  //text("text", 10, 30);
  
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
    return enemies.has(enemyFromServer.id);
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

function playerExists(playerFromServer) {
  if(players) {
    return players.has(playerFromServer.id);
  } else {
    return false;
  }
}

function removePlayer(playerId) {
  players = players.delete(playerId);
}

function removeEnemy(enemyId) {
  enemies = enemies.delete(enemyId);
}

function keyTyped() {
  fetch('/registerKey/'+key+'/'+socket.id)
      .then( res => {

      }).catch(err => {
    console.log('Fetch Error :-S', err);
  });
}
