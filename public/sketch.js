const socket = io.connect('http://localhost');

let players = [];
let enemies = [];

socket.on("heartbeat", (game) => {
  updatePlayers(game.players);
  updateEnemies(game.enemies);
});

socket.on("disconnect", playerId => removePlayer(playerId));

let tInput = new TypeInput();

let tManager = new TypeManager();

function setup() {
  createCanvas(400, 400);
}

function draw() {
  update();
  background(220);
  players.forEach(player => player.draw());
  enemies.forEach(enemy => enemy.draw());
  
  tInput.draw();
  //text("text", 10, 30);
  
}

function update() {
  enemies.forEach(enemy => enemy.update(players[0].getX(), players[0].getY()));
}

function updateEnemies(serverEnemies) {
  for (let i = 0; i < serverEnemies.length; i++) {
    let enemyFromServer = serverEnemies[i];
    if (!enemyExists(enemyFromServer)) {
      let newEnemy = new Enemy(enemyFromServer);
      tManager.register(newEnemy);
      enemies.push(newEnemy);
    }
  }
}

function enemyExists(enemyFromServer) {
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].id === enemyFromServer.id) {
      return true;
    }
  }
  return false;
}

function updatePlayers(serverPlayers) {
  for (let i = 0; i < serverPlayers.length; i++) {
    let playerFromServer = serverPlayers[i];
    if (!playerExists(playerFromServer)) {
      let newPlayer = new Player(playerFromServer);
      tInput.setup(newPlayer, 0);
      console.log("player push");
      players.push(newPlayer);
    }
  }
}

function playerExists(playerFromServer) {
  for (let i = 0; i < players.length; i++) {
    if (players[i].id === playerFromServer.id) {
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

function keyTyped()
{

  tInput.updateInKey(key);

}
