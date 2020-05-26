let Game = require('./Game');

class GameManager {
    constructor() {
        this.games = new Map();
    }

    removePlayer(room, id) {
        this.games.get(room).removePlayer(id);
    }

    addPlayer(room, id) {
        this.games.get(room).addPlayer(id);
    }

    createGame(room) {
        this.games.set(room, new Game());
    }

    onKey(room, id, key) {
        this.games.get(room).onKey(id, key);
    }

    closeGame(room) {
        this.games.delete(room);
    }

    getEmitable(room) {
        return this.games.get(room).getEmitable();
    }

    updateGame(room) {
        this.games.get(room).update();
    }
}

module.exports = GameManager;