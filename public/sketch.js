const socket = io.connect('25.91.191.83');

let players = [];
let enemies = [];

socket.on("heartbeat", (game) => {
  updatePlayers(game.players);
  updateEnemies(game.enemies);
});

socket.on("disconnect", playerId => removePlayer(playerId));


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  players.forEach(player => player.draw());
  enemies.forEach(enemy => enemy.draw());
}

function updateEnemies(serverEnemies) {
  for (let i = 0; i < serverEnemies.length; i++) {
    let enemyFromServer = serverEnemies[i];
    enemies.push(new Enemy(enemyFromServer));
  }
}

function updatePlayers(serverPlayers) {
  for (let i = 0; i < serverPlayers.length; i++) {
    let playerFromServer = serverPlayers[i];
    if (!playerExists(playerFromServer)) {
      players.push(new Player(playerFromServer));
    }
  }
}

function playerExists(playerFromServer) {
  for (let i = 0; i < players.length; i++) {
    if (players[i].id === playerFromServer) {
      return true;
    }
  }
  return false;
}

function removePlayer(playerId) {
  players = players.filter(player => player.id !== playerId);
}

function removeEnemy(enemyId) {
  enemies = enemies.filter(enemy => enemy.id !== enemyId);
}
