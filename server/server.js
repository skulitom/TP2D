const express = require("express");
const socket = require('socket.io');
const app = express();
const shortid = require('shortid');
let Player = require("./Player");
let Enemy = require("./Enemy");

let server = app.listen(80);
app.use(express.static("public"));


let io = socket(server);

let game = {
  'players': [],
  'enemies': []
};

setInterval(updateGame, 16);

io.sockets.on("connection", socket => {
  console.log(`New connection ${socket.id}`);
  game.players.push(new Player(socket.id));
  game.enemies.push(new Enemy(shortid.generate()));

  socket.on("disconnect", () => {
    io.sockets.emit("disconnect", socket.id);
    game.players = game.players.filter(player => player.id !== socket.id);
  });
});


io.sockets.on("disconnect", socket => {
  io.sockets.emit("disconnect", socket.id);

  game.players = game.players.filter(player.id !== socket.id);
});



function updateGame() {
  io.sockets.emit("heartbeat", game);
}




