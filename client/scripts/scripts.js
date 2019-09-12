//Element Selectors
const boardTiles = document.querySelectorAll('.board-tile');
const modal = document.querySelector('.modal');
const modalHeader = document.querySelector('.modal-header');
const modalBody = document.querySelector('.modal-body');
const modalFooter = document.querySelector('.modal-footer');

const rooms = [
  {
    id: 0,
    name: 'Drawing Room',
    tileName: 'tile-drawing-room',
    lineOfSight: [1, 3, 5, 19, 20, 22],
    visitableRooms: [1, 3, 5, 20]
  },
  {
    id: 1,
    name: 'Parlor',
    tileName: 'tile-parlor',
    lineOfSight: [0, 2, 5, 16, 18],
    visitableRooms: [0, 2, 14, 15, 16, 17, 18]
  },
  {
    id: 2,
    name: 'Billiard Room',
    tileName: 'tile-billiard-room',
    lineOfSight: [1, 3, 4],
    visitableRooms: [1, 3, 14, 15, 16, 17]
  },
  {
    id: 3,
    name: 'Dining Hall',
    tileName: 'tile-dining-hall',
    lineOfSight: [0, 2, 4, 19, 20, 22],
    visitableRooms: [0, 1, 2, 4, 5, 7, 8, 9, 10, 14, 15, 16, 17]
  },
  {
    id: 4,
    name: 'Sitting Room',
    tileName: 'tile-sitting-room',
    lineOfSight: [2, 3, 5],
    visitableRooms: [3, 5, 7, 8, 9, 10]
  },
  {
    id: 5,
    name: 'Trompy Room',
    tileName: 'tile-trompy-room',
    lineOfSight: [0, 1, 4, 6, 8],
    visitableRooms: [0, 3, 4, 6, 7, 8, 9, 10]
  },
  {
    id: 6,
    name: 'Green House',
    tileName: 'tile-green-house',
    lineOfSight: [5, 7, 17, 18, 19],
    visitableRooms: [5, 7, 19]
  },
  {
    id: 7,
    name: 'Winter Garden',
    tileName: 'tile-winter-garden',
    lineOfSight: [6, 8, 18, 19, 21],
    visitableRooms: [3, 4, 5, 6, 8, 9, 10, 21]
  },
  {
    id: 8,
    name: 'Kitchen',
    tileName: 'tile-kitchen',
    lineOfSight: [5, 7, 10, 11],
    visitableRooms: [3, 4, 5, 7, 9, 10, 21]
  },
  {
    id: 9,
    name: 'Lancaster Room',
    tileName: 'tile-lancaster-room',
    lineOfSight: [10],
    visitableRooms: [3, 4, 5, 7, 8, 10, 11]
  },
  {
    id: 10,
    name: 'Master Suite',
    tileName: 'tile-master-suite',
    lineOfSight: [8, 9, 11, 13, 22],
    visitableRooms: [3, 4, 5, 7, 8, 9, 11]
  },
  {
    id: 11,
    name: 'Nursery',
    tileName: 'tile-nursery',
    lineOfSight: [10, 12, 13, 14, 22],
    visitableRooms: [9, 10, 12, 22]
  },
  {
    id: 12,
    name: 'Armory',
    tileName: 'tile-armory',
    lineOfSight: [11, 13, 14],
    visitableRooms: [11, 13]
  },
  {
    id: 13,
    name: 'Library',
    tileName: 'tile-library',
    lineOfSight: [10, 11, 12, 14, 22],
    visitableRooms: [12, 14, 15, 22]
  },
  {
    id: 14,
    name: 'Tennessee Room',
    tileName: 'tile-tennessee-room',
    lineOfSight: [11, 12, 13, 15, 16],
    visitableRooms: [1, 2, 3, 13, 15, 16, 17]
  },
  {
    id: 15,
    name: 'Lilac Room',
    tileName: 'tile-lilac-room',
    lineOfSight: [14],
    visitableRooms: [1, 2, 3, 13, 14, 16, 17]
  },
  {
    id: 16,
    name: 'Servants Quarters',
    tileName: 'tile-servants-quarters',
    lineOfSight: [1, 14, 17],
    visitableRooms: [1, 2, 3, 14, 15, 17]
  },
  {
    id: 17,
    name: 'Hedge Maze',
    tileName: 'tile-hedge-maze',
    lineOfSight: [6, 18, 19, 23],
    visitableRooms: [1, 2, 3, 14, 15, 16, 18, 23]
  },
  {
    id: 18,
    name: 'Carriage House',
    tileName: 'tile-carriage-house',
    lineOfSight: [1, 6, 17, 19],
    visitableRooms: [1, 17, 19]
  },
  {
    id: 19,
    name: 'Piazza',
    tileName: 'tile-piazza',
    lineOfSight: [0, 3, 6, 18, 20, 22],
    visitableRooms: [6, 18, 20]
  },
  {
    id: 20,
    name: 'Foyer',
    tileName: 'tile-foyer',
    lineOfSight: [0, 3, 19, 22],
    visitableRooms: [0, 19]
  },
  {
    id: 21,
    name: 'Wine Cellar',
    tileName: 'tile-wine-cellar',
    lineOfSight: [7, 8],
    visitableRooms: [7, 8]
  },
  {
    id: 22,
    name: 'Gallery',
    tileName: 'tile-gallery',
    lineOfSight: [0, 3, 10, 11, 13, 19, 20],
    visitableRooms: [3, 11, 13]
  },
  {
    id: 23,
    name: 'White Room',
    tileName: 'tile-white-room',
    lineOfSight: [16, 17],
    visitableRooms: [16, 17]
  }
];

const weaponCards = [
  {
    id: 0,
    name: 'Bad Cream',
    baseDamage: 2,
    modifierDamage: 5,
    modifierRoomID: 4,
    description: 'Worth 5 points in the Sitting Room.',
    available: true
  },
  {
    id: 1,
    name: 'Big Red Hammer',
    baseDamage: 4,
    modifierDamage: null,
    modifierRoomID: null,
    available: true
  },
  {
    id: 2,
    name: 'Billiard Cue',
    baseDamage: 2,
    modifierDamage: 5,
    modifierRoomID: 2,
    available: true
  },
  {
    id: 3,
    name: 'Broom Stick',
    baseDamage: 2,
    modifierDamage: 7,
    modifierRoomID: 16,
    available: true
  },
  {
    id: 4,
    name: 'Chain Saw',
    baseDamage: 4,
    modifierDamage: null,
    modifierRoomID: null,
    available: true
  },
  {
    id: 5,
    name: 'Duck Decoy',
    baseDamage: 3,
    modifierDamage: 4,
    modifierRoomID: 5,
    available: true
  }
];

const failureCards = [
  {
    id: 0,
    failureValue: 2,
    description:
      'You are caught on a piece of furniture and unable to free yourself for minutes.'
  },
  {
    id: 1,
    failureValue: 2,
    description:
      'The Doctor speaks to you about a subject that on reflection makes no sense.'
  }
];

const gameData = {
  playerCount: 4,
  Players: [],
  DoctorLucky: {
    location: null
  },
  currentTurn: 0
};

class Player {
  constructor(id, color) {
    this.id = id;
    this.htmlID = 'player-' + id;
    this.color = color;
    this.location = 0;
    this.damage = 0;
    this.spite = 0;
  }
}

// Starts a new game
const startNewGame = () => {
  weaponCards.forEach(weapon => (weapon.available = true));
  modal.style.display = 'none';

  //Generate unique players and insert them into gameData object
  // Assigns ID based on increments of i, assigns color randomly
  for (i = 0; i < gameData.playerCount; i++) {
    gameData.Players.push(
      new Player(i, '#' + (((1 << 24) * Math.random()) | 0).toString(16))
    );
  }

  renderPlayers();

  gameData.DoctorLucky.location = Math.floor(Math.random() * 20) + 1;

  renderDoctorLucky();

  renderMovableRooms(gameData.Players[gameData.currentTurn]);
};

const renderPlayers = () => {
  let players = document.querySelectorAll('.player');
  if (players) {
    players.forEach(player => player.remove());
  }

  gameData.Players.forEach(player =>
    document
      .querySelector(`#${getRoomName(player.location)}`)
      .insertAdjacentHTML(
        'beforeend',
        `
      <div class="player" style="background-color: ${player.color}"></div>
    `
      )
  );
};

const renderDoctorLucky = () => {
  let doctorLuckySprite = document.querySelector('.doctorLucky');
  if (doctorLuckySprite) {
    doctorLuckySprite.remove();
  }

  document
    .querySelector(`#${getRoomName(gameData.DoctorLucky.location)}`)
    .insertAdjacentHTML(
      'beforeend',
      `
      <div class="doctorLucky" style="background-color: black; border: 1px solid red"></div>
    `
    );
};

const moveDoctorLucky = id => {
  if (id) {
    gameData.DoctorLucky.location = id;
  } else if (
    gameData.DoctorLucky.location == 20 ||
    gameData.DoctorLucky.location > 20
  ) {
    gameData.DoctorLucky.location = 0;
  } else {
    gameData.DoctorLucky.location++;
  }

  renderDoctorLucky();
};

const renderMovableRooms = player => {
  let playerLocation = player.location;
  rooms[playerLocation].visitableRooms.forEach(room => {
    let roomName = getRoomName(room);
    document.querySelector(`#${roomName}`).style.border = '2px dashed green';
    document
      .querySelector(`#${roomName}`)
      .addEventListener('click', movePlayer);
  });
};

// Function to move players around the board
// Takes in mouse event, acting as an event handler
// Grabs room ID from the event using getRoomID function
// retrieves players ID using the currentTurn variable
// Renders the game board, resets movable rooms, initiates next turn
function movePlayer(event) {
  let playerID = gameData.Players[gameData.currentTurn].id;
  gameData.Players[playerID].location = getRoomID(event.target.id);
  renderPlayers();
  resetMovableRooms(playerID);
  nextTurn();
}

// Function to reset all movable rooms before starting new turn
// Also resets the mouse handler to ensure players can't move twice
const resetMovableRooms = () => {
  boardTiles.forEach(room => {
    room.style.border = '';
    room.removeEventListener('click', movePlayer);
  });
};

// Starts the next turn for the next player
// Also checks if all players have had turn
// If all players have went, Doctor Lucky moves
const nextTurn = () => {
  gameData.currentTurn++;
  if (gameData.currentTurn == gameData.playerCount) {
    moveDoctorLucky();
    gameData.currentTurn = 0;
    renderMovableRooms(gameData.Players[gameData.currentTurn]);
  } else {
    renderMovableRooms(gameData.Players[gameData.currentTurn]);
  }
};

// Takes in a room ID and filters out the rooms array to return tile name
const getRoomName = id => {
  return rooms.filter(room => room.id == id)[0].tileName;
};

// Accepts a rooms tile-name to retrieve it's proper ID
const getRoomID = name => {
  return rooms.filter(room => room.tileName == name)[0].id;
};

// Function to display the modal that configures game
// Plays background music during game setup
const displayGameSetup = () => {
  document.getElementById('menu-music').muted = false;
  modalHeader.innerHTML = `<h2>Kill Doctor Lucky</h2>`;
  modalBody.innerHTML = `<p class="welcomeMessage">Welcome to Lucky Mansion, a sprawling country estate filled with unusual weapons, good hiding places, and craven killers. Killers like you.
  <br>
  <br>
  How many guests are we hosting tonight?</p>
  
  <div class="playerCounter-container">
   <span class="decrementBtn"> - </span>
   <span class="playerCount">${gameData.playerCount}</span>
   <span class="incrementBtn"> + </span>
  </div>

  <div class="startGameBtn Btn">
    Start Game
  </div>
  `;
  modalFooter.innerHTML = `<h3>Game Setup</h3>`;

  document
    .querySelector('.incrementBtn')
    .addEventListener('click', () => incrementPlayerCount());
  document
    .querySelector('.decrementBtn')
    .addEventListener('click', () => decrementPlayerCount());

  document
    .querySelector('.startGameBtn')
    .addEventListener('click', () => startNewGame());
};

//Function to increment player count
// Updates player count and visual representation in game setup modal
const incrementPlayerCount = () => {
  if (gameData.playerCount < 8) {
    gameData.playerCount++;
    document.querySelector('.playerCount').textContent = gameData.playerCount;
  }
};

//Function to decrement player count
// Updates player count and visual representation in game setup modal
const decrementPlayerCount = () => {
  if (gameData.playerCount !== 2) {
    gameData.playerCount--;
    document.querySelector('.playerCount').textContent = gameData.playerCount;
  }
};

window.onload = () => {
  displayGameSetup();
};
