const socket = io.connect('http://localhost');

let players = new Map();
let enemies = new Map();

socket.on("heartbeat", (game) => {
  updatePlayers(game.players);
  updateEnemies(game.enemies);
});

socket.on("disconnect", playerId => removePlayer(playerId));

let tInput = new TypeInput();

let tManager = new TypeManager();

function setup() {
  createCanvas(1366, 768);
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
  enemies.forEach(enemy => {
    enemy.update(players.values().next().value.getX(), players.values().next().value.getY())
  });
}

function updateEnemies(serverEnemies) {
  for (let i = 0; i < serverEnemies.length; i++) {
    let enemyFromServer = serverEnemies[i];
    if (!enemyExists(enemyFromServer)) {
      let newEnemy = new Enemy(enemyFromServer);
      tManager.register(newEnemy);
      enemies.set(newEnemy.id, newEnemy);
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
      tInput.setup(newPlayer, 0, tManager);
      console.log("player push");
      players.set(newPlayer.id, newPlayer);
    }
  }
}

function playerExists(playerFromServer) {
  return players.has(playerFromServer.id);
}

function removePlayer(playerId) {
  players = players.delete(playerId);
}

function removeEnemy(enemyId) {
  enemies = enemies.delete(enemyId);
}

function keyTyped() {
  tInput.updateInKey(key);
}

function keyPressed()
{

  if (keyCode  == BACKSPACE)
  {
    tInput.resetInput();  
  }
}
