const express = require('express');
const socket = require('socket.io');
const app = express();
const shortid = require('shortid');
let Player = require('./Player');
let Enemy = require('./Enemy');
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
  game.players.push(new Player(socket.id, tManager));

  socket.on("disconnect", () => {
    io.sockets.emit("disconnect", socket.id);
    game.players = game.players.filter(player => player.id !== socket.id);
  });
});


io.sockets.on("disconnect", socket => {
  io.sockets.emit("disconnect", socket.id);

  game.players = game.players.filter(player => player.id !== socket.id);
});



function updateGame() {
  timer++;
  if(game.enemies && game.players) {
    if(game.players.entries().next().value) {
      game.enemies.forEach((value, key) => {
        let player = game.players.entries().next().value[1];
        value.update(player.x, player.y);
      });
    }
  }
  if(timer-200 > 0) {
    timer-=200;
    let enemy = new Enemy(shortid.generate());
    game.enemies.push(enemy);
    tManager.register(enemy);
  }
  io.sockets.emit("heartbeat", game);
}




