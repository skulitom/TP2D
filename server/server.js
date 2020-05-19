const express = require('express');
const socket = require('socket.io');
const app = express();
const shortid = require('shortid');
let Player = require('./Player');
let Enemy = require('./Enemy');
let BossEnemy = require('./BossEnemy');
let TypeManager = require('./TypeManager');
let timer = 0;

let server = app.listen(80);
app.use(express.static("public"));

let io = socket(server);
let tManager = new TypeManager();

let game = {
  'players': [],
  'enemies': [],
};

setInterval(updateGame, 16);

app.get('/killEnemy/:id', (req, res) => {
  game.enemies = game.enemies.filter(enemy => enemy.id !== req.params.id);
  res.sendStatus(200);
});

app.get('/registerKey/:key/:id', (req, res) => {
  const playerIndex = game.players.findIndex(player => player.id === req.params.id);
  const result = game.players[playerIndex].setKey(req.params.key);
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(result.toString());
});

io.sockets.on("connection", socket => {
  console.log(`New connection ${socket.id}`);
  game.players.forEach(player => player.moveAway());
  game.players.push(new Player(socket.id, game.players.length, tManager));

  socket.on("disconnect", () => {
    io.sockets.emit("disconnect", socket.id);
    game.players.forEach(player => player.moveBack());
    game.players = game.players.filter(player => player.id !== socket.id);
  });
});


io.sockets.on("disconnect", socket => {
  io.sockets.emit("disconnect", socket.id);

  game.players = game.players.filter(player => player.id !== socket.id);
});

function distributeDamage(timer, enemy, player) {
  if(Math.floor(timer%10)===0) {
    if(enemy.getIsInHitArea()){
      player.hit(enemy.getHitPower());
    }
  }
}

function updateGame() {
  timer++;
  if(Math.floor(timer%1000)===0) {
    let enemy = new BossEnemy(shortid.generate());
    game.enemies.push(enemy);
    tManager.register(enemy);
  }
  if(game.players.entries().next().value) {
    game.enemies.forEach((value, key) => {
      let player = game.players.entries().next().value[1];
      value.update(player.x, player.y);
      distributeDamage(timer, value, player);
    });
  }
  if(Math.floor(timer%200)===0) {
    let enemy = new Enemy(shortid.generate());
    game.enemies.push(enemy);
    tManager.register(enemy);
  }
  if(timer > 100000){
    timer -= 100000;
  }
  io.sockets.emit("heartbeat", game);
}




