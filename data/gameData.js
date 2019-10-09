let onlineGames = {
  playersConnected: [],
  sessions: []
};

class GameSession {
  constructor(id, gameData) {
    this.id = id;
    this.players = [];
    this.gameData = gameData;
  }

  addPlayer(player) {
    this.players;
  }
}

module.exports = { onlineGames, GameSession };
