//TO DO
//1. Card integration (Weapons, Move, Failure)
//2. User Interface
//3. Ability to kill Dr. Lucky
//4. Convert to MVC for better code organization
//5. Add online play

//Element Selectors
const boardTiles = document.querySelectorAll('.board-tile');
const modal = document.querySelector('.modal');
const modalHeader = document.querySelector('.modal-header');
const modalBody = document.querySelector('.modal-body');
const modalFooter = document.querySelector('.modal-footer');
const playerList = document.getElementById('players-list');
const killButton = document.querySelector('.kill-button');
const endTurnButton = document.querySelector('.end-turn-button');
const turnIndicator = document.getElementById('current-turn');
const currentRoundIndicator = document.getElementById('game-turn-count');
const cardContainerUI = document.getElementById('controls-cards');

const socket = io();

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
    visitableRooms: [0, 1, 2, 4, 5, 7, 8, 9, 10, 14, 15, 16, 17, 22]
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
    lineOfSight: [1, 14, 17, 23],
    visitableRooms: [1, 2, 3, 14, 15, 17, 23]
  },
  {
    id: 17,
    name: 'Hedge Maze',
    tileName: 'tile-hedge-maze',
    lineOfSight: [6, 18, 19, 23],
    visitableRooms: [1, 2, 3, 14, 15, 16, 18, 19, 23]
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
    visitableRooms: [6, 17, 18, 20]
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
  },
  {
    id: 6,
    name: 'Killing Joke',
    baseDamage: 3,
    modifierDamage: null,
    modifierRoomID: null,
    available: true
  },
  {
    id: 7,
    name: 'Letter Opener',
    baseDamage: 2,
    modifierDamage: 5,
    modifierRoomID: 13,
    available: true
  },
  {
    id: 8,
    name: 'Loud Noise',
    baseDamage: 2,
    modifierDamage: 6,
    modifierRoomID: 18,
    available: true
  },
  {
    id: 9,
    name: 'Silken Cord',
    baseDamage: 3,
    modifierDamage: null,
    modifierRoomID: null,
    available: true
  },
  {
    id: 10,
    name: 'Tight Hat',
    baseDamage: 2,
    modifierDamage: null,
    modifierRoomID: null,
    available: true
  },
  {
    id: 11,
    name: 'Trowel',
    baseDamage: 2,
    modifierDamage: 6,
    modifierRoomID: 21,
    available: true
  },
  {
    id: 12,
    name: 'Monkey Hand',
    baseDamage: 2,
    modifierDamage: 8,
    modifierRoomID: 20,
    available: true
  },
  {
    id: 13,
    name: 'Piece of Rope',
    baseDamage: 2,
    modifierDamage: 8,
    modifierRoomID: 22,
    available: true
  },
  {
    id: 14,
    name: 'Pinking Shears',
    baseDamage: 2,
    modifierDamage: 6,
    modifierRoomID: 15,
    available: true
  },
  {
    id: 15,
    name: 'Rat Poison',
    baseDamage: 2,
    modifierDamage: 5,
    modifierRoomID: 6,
    available: true
  },
  {
    id: 16,
    name: 'Civil War Cannon',
    baseDamage: 3,
    modifierDamage: 5,
    modifierRoomID: 12,
    available: true
  },
  {
    id: 17,
    name: 'Crepe Pan',
    baseDamage: 3,
    modifierDamage: 4,
    modifierRoomID: 8,
    available: true
  },
  {
    id: 18,
    name: 'Runcible Spoon',
    baseDamage: 3,
    modifierDamage: null,
    modifierRoomID: null,
    available: true
  },
  {
    id: 19,
    name: 'Shoe Horn',
    baseDamage: 2,
    modifierDamage: 7,
    modifierRoomID: 9,
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
  },
  {
    id: 2,
    failureValue: 2,
    description:
      'You cannot think over the sound of a passing train that no one else can hear.'
  },
  {
    id: 3,
    failureValue: 2,
    description: 'Your feet stick to the floor. The Doctor escapes.'
  },
  {
    id: 4,
    failureValue: 2,
    description:
      'A flock of bats engulfs your head. You are powerless to evade them.'
  },
  {
    id: 5,
    failureValue: 2,
    description: "You have somehow mistaken a child's toy for Doctor Lucky."
  },
  {
    id: 6,
    failureValue: 1,
    descrption:
      'The burden of wasted life weighs heavily on your brow. You miss.'
  },
  {
    id: 7,
    failureValue: 1,
    description: 'You are stupid, stupid, stupid.'
  },
  {
    id: 8,
    failureValue: 3,
    descrption:
      'You are overcome with a sense of affection for the old man. It passes.'
  },
  {
    id: 9,
    failureValue: 3,
    description:
      'The Doctor wheels around and accidentally hits you in the head with a shovel.'
  },
  {
    id: 10,
    failureValue: 3,
    description: 'As you approach the Doctor, you tumble through a trap door.'
  },
  {
    id: 11,
    failureValue: 2,
    description:
      'For a moment you believe yourself to be someone else. It is alarming.'
  },
  {
    id: 12,
    failureValue: 2,
    description:
      'Without warning, the Doctor begins to spin. It drives you to distraction.'
  },
  {
    id: 13,
    failureValue: 2,
    description:
      'Loose ceiling tiles crash to the floor as you approach the Doctor. He escapes.'
  },
  {
    id: 14,
    failureValue: 1,
    description:
      'Suddenly you find yourself unable to recall whether a straight beats a flush.'
  },
  {
    id: 15,
    failureValue: 1,
    description:
      'What you thought was a weapon wa only a banana. You abandon the peel.'
  },
  {
    id: 16,
    failureValue: 1,
    description:
      'The Doctor disappears from your path, ducking randomly here and there.'
  },
  {
    id: 17,
    failureValue: 1,
    description:
      'Your cares melt away as the distant strains of Mozart drift through the mansion.'
  },
  {
    id: 18,
    failureValue: 1,
    description: 'An allergy to dust mites gets the better of you.'
  },
  {
    id: 19,
    failureValue: 1,
    description:
      'The Doctor turns to you, waxing rhapsodic on his recent polar advenutre.'
  },
  {
    id: 20,
    failureValue: 1,
    description:
      'Doctor Lucky pauses to examine his own thumbs. You are thrown off guard.'
  },
  {
    id: 21,
    failureValue: 1,
    description:
      "Doctor Lucky's cat howls. You hate it more than him. The moment passes."
  },
  {
    id: 22,
    failureValue: 1,
    description:
      'While sneaking up on the Doctor you are overcome by the urge to sing.'
  },
  {
    id: 23,
    failureValue: 1,
    description:
      'You slip on an out of place banana peel, hurtling hilariously into the air.'
  },
  {
    id: 24,
    failureValue: 1,
    description: 'A sense of dread inhibits your every physical act.'
  },
  {
    id: 25,
    failureValue: 1,
    description:
      'Clattering mice distract you momentarily from your chosen course.'
  },
  {
    id: 26,
    failureValue: 1,
    description:
      'A drip of water. Is it rain? Another, and you slip, falling on your nose.'
  },
  {
    id: 27,
    failureValue: 1,
    description:
      "Doctor Lucky's jacket conceals a well-placed deck of playing cards."
  },
  {
    id: 28,
    failureValue: 1,
    description: 'Your thoughts turn to a misspent youth.'
  },
  {
    id: 29,
    failureValue: 1,
    description: 'You question your freshness.'
  },
  {
    id: 30,
    failureValue: 1,
    description:
      'Suddenly, a pause; a thought; a shudder. Did you leave the iron on?'
  },
  {
    id: 31,
    failureValue: 1,
    description:
      'In the darkness, a shadow. Another guest. You pause. The Doctor is gone.'
  },
  {
    id: 32,
    failureValue: 1,
    description:
      'Creaking floorboards. The trickery of shadows. Fate conspires against you.'
  },
  {
    id: 33,
    failureValue: 1,
    description: 'This tastes like Rat Poison! I love Rat Poison!'
  },
  {
    id: 34,
    failureValue: 3,
    description:
      "A wizened kung fu master intervenes on the Doctor's behalf, then vanishes."
  },
  {
    id: 35,
    failureValue: 2,
    description: 'You forget.'
  },
  {
    id: 36,
    failureValue: 2,
    description:
      'Your attack passes through the Doctor as if he were not even there.'
  },
  {
    id: 37,
    failureValue: 2,
    description: 'The doctor inexplicably vanishes in a cloud of feathers.'
  },
  {
    id: 38,
    failureValue: 1,
    description:
      'You are frozen in place by the garish melody of a passing ice cream truck.'
  },
  {
    id: 39,
    failureValue: 1,
    description:
      'A door frame hits you squarely in the head. The Doctor moves on.'
  },
  {
    id: 40,
    failureValue: 1,
    description:
      'The Doctor turns to you and asks you for the time. You are distracted.'
  },
  {
    id: 41,
    failureValue: 1,
    description: "A hint of regret stays your hand. It won't last."
  }
];

const moveCards = [
  {
    id: 0,
    name: 'Move-1',
    type: 'Free',
    movement: 1,
    quantity: 8,
    description:
      'Play this card to move yourself or Dr. Lucky 1 room in any direction.',
    available: true
  },
  {
    id: 1,
    name: 'Move-2',
    type: 'Free',
    movement: 2,
    quantity: 2,
    description:
      'Play this card to move yourself or Dr. Lucky up to 2 rooms in any direction.'
  }
];

let gameData = {
  playerCount: 4,
  gameType: null,
  gameSession: null,
  gameStatus: null,
  Players: [],
  DoctorLucky: {
    location: null
  },
  MurderAttempt: {
    location: null,
    AttackingPlayer: null,
    CurrentDefendingPlayer: null,
    defenders: [],
    damagePoints: null,
    failurePoints: null
  },
  currentTurn: 0,
  currentRound: 0
};

class Player {
  constructor(id, color) {
    this.id = id;
    this.htmlID = 'player-' + id;
    this.color = color;
    this.location = 0;
    this.damage = 0;
    this.spite = 0;
    this.weaponCards = [];
    this.failureCards = [];
    this.moveCards = [];
    this.socketID = null;
  }
}

// Starts a new game by hiding the modal, allowing game board to be visible
const startNewGame = () => {
  weaponCards.forEach(weapon => (weapon.available = true));
  gameData.Players = [];
  gameData.DoctorLucky.location = null;
  gameData.currentTurn = 0;
  gameData.currentRound = 1;
  currentRoundIndicator.innerText = `Round: ${gameData.currentRound}`;
  modal.style.display = 'none';

  //Generate unique players and insert them into gameData object
  // Assigns ID based on increments of i, assigns color randomly
  for (let index = 0; index < gameData.playerCount; index++) {
    gameData.Players.push(new Player(index, generateRandomColor()));
  }

  // Sets a random location for Doctor Lucky
  gameData.DoctorLucky.location = Math.floor(Math.random() * 20) + 1;

  renderDoctorLucky();
  renderPlayers();
  updatePlayerList();

  if (gameData.gameType == 'online') {
    updateGame();
  }
  renderMovableRooms(gameData.Players[gameData.currentTurn]);
};

const generateRandomColor = () => {
  let options = '0123456789ABCDEF';
  let color = '#';
  for (let index = 0; index < 6; index++) {
    color += options[Math.floor(Math.random() * 16)];
  }

  return color;
};

// Iterates through the game data, to nest players within game tiles
// Removes old player sprites if they exist
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

  updatePlayerList();
};

const updatePlayerList = () => {
  playerList.innerHTML = '';
  playerList.innerHTML = `
		<li>
      <div class="player-icon" style="background-color: #000;"></div>
      <div class="player-info">
        <p>Doctor Lucky</p>
  			<p>${rooms[gameData.DoctorLucky.location].name}</p>
      </div>
		</li>
	`;

  gameData.Players.forEach(
    player =>
      (playerList.innerHTML += `
		<li>
      <div class="player-icon" style="background-color: ${player.color};"></div>
      <div class="player-info">
        <p>Player ${player.id + 1}</p>
  			<p>Spite: ${player.spite}</p>
  			<p>
          ${rooms[player.location].name}
          </p>
      </div>
		</li>`)
  );
};

const renderPlayerCard = player => {
  cardContainerUI.innerHTML = '';
  if (player.moveCards.length != 0) {
    player.moveCards.forEach(card => {
      cardContainerUI.innerHTML += `<div class="card" id=${card.id}>Movement<p>${card.name}</div>`;
    });
  }

  cardContainerUI
    .querySelectorAll('.card')
    .forEach(card => card.addEventListener('click', useMoveCard));
};

const useMoveCard = e => {
  let card = moveCards[e.target.id];
  let selection;

  modalHeader.innerHTML = `<h2>Who would you like to move?`;
  modalBody.innerHTML = `
    <div class="card-container>
      <div class="card" id="Yourself">Yourself</div>
      <div class="card" id="Lucky">Dr. Lucky</div>
    </div><div class="Btn">Cancel</div>`;

  modalFooter.innerHTML = `Movement`;
  modal.style.display = 'block';

  document
    .getElementById('Yourself')
    .addEventListener('click', moveYourself(card));

  document.getElementById('Lucky').addEventListener('click', moveLucky(card));

  document
    .querySelector('.Btn')
    .addEventListener('click', () => (modal.style.display = 'none'));
};

const moveYourself = (e, card) => {};

const moveLucky = (e, card) => {};
// Renders the doctor lucky sprite on the game board
// Removes any previous doctor lucky sprites if they exist
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
      <div class="doctorLucky" style="background-color: black; border: 2px solid red"></div>
    `
    );

  updatePlayerList();
};

// Moves doctor lucky accepting an id if necessary.
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

const updatecurrentRound = () => {
  currentRoundIndicator.innerText = `Round: ${gameData.currentRound}`;
};

// Takes a player object and retrieves the location
// Using the player location, references the list of movable rooms
// Assigns movable rooms a class to highlight them and a click handler to move player
const renderMovableRooms = player => {
  updatecurrentRound();
  renderPlayerCard(player);
  let playerLocation = player.location;
  turnIndicator.innerText = `It's Player ${gameData.currentTurn + 1}'s turn!`;
  rooms[playerLocation].visitableRooms.forEach(room => {
    let roomName = getRoomName(room);
    document.querySelector(`#${roomName}`).classList.add('possible-move');
    document
      .querySelector(`#${roomName}`)
      .addEventListener('click', movePlayer);
  });

  rooms[playerLocation].lineOfSight.forEach(room => {
    let roomName = getRoomName(room);
    document.querySelector(`#${roomName}`).classList.add('in-sight');
  });
};

const setupButtons = player => {
  if (
    player.location == gameData.DoctorLucky.location &&
    checkLineOfSight(player.location) == false
  ) {
    killButton.disabled = false;
    killButton.addEventListener('click', murderAttempt);
  }
  endTurnButton.disabled = false;
  endTurnButton.addEventListener('click', nextTurn);
};

const resetButton = () => {
  killButton.disabled = true;
  endTurnButton.disabled = true;
};

// Function to move players around the board
// Takes in mouse event, acting as an event handler
// Grabs room ID from the event using getRoomID function
// retrieves players ID using the currentTurn variable
// Renders the game board, resets movable rooms, initiates next turn
function movePlayer(event, roomID) {
  let playerID = gameData.Players[gameData.currentTurn].id;
  if (roomID) {
    gameData.Players[playerID].location = roomID;
  } else {
    gameData.Players[playerID].location = getRoomID(event.target.id);
  }
  setupButtons(gameData.Players[gameData.currentTurn]);
  renderPlayers();
  updatePlayerList();

  resetMovableRooms(playerID);

  if (
    checkLineOfSight(gameData.Players[gameData.currentTurn].location) == false
  ) {
    DrawRandomCard(gameData.Players[gameData.currentTurn]);
  }
}

// Function to reset all movable rooms before starting new turn
// Also resets the mouse handler to ensure players can't move twice
const resetMovableRooms = () => {
  boardTiles.forEach(room => {
    room.classList.remove('possible-move');
    room.removeEventListener('click', movePlayer);
    room.classList.remove('in-sight');
  });
};

// Starts the next turn for the next player
// Also checks if all players have had turn
// If all players have went, Doctor Lucky moves
// Allows for lucky train to be passed in, allowing for another turn
const nextTurn = async (e, luckyTrain) => {
  if (!luckyTrain) {
    gameData.currentTurn++;
  }

  if (gameData.currentTurn == gameData.playerCount) {
    gameData.currentRound++;
    gameData.currentTurn = 0;
    moveDoctorLucky();
    renderMovableRooms(gameData.Players[gameData.currentTurn]);
  } else {
    renderMovableRooms(gameData.Players[gameData.currentTurn]);
    moveDoctorLucky();
  }
  resetButton();
  if (gameData.gameType == 'online') {
    updateGame();
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

// Checks if a room is within line of sight, of players.
// Returns true, if visible, or false if not visible
const checkLineOfSight = roomID => {
  let visible = false;

  let playersInRoom = gameData.Players.filter(
    player => player.location == roomID
  ).length;

  if (playersInRoom != 1) {
    visible = true;
  }

  const occupiedRooms = gameData.Players.map(player => player.location);
  occupiedRooms.forEach(room => {
    if (rooms[roomID].lineOfSight.includes(room)) {
      visible = true;
    }
  });

  return visible;
};

// Function to generate a random card from the deck of available cards
// Will only return cards that are available in the deck still.
const DrawRandomCard = player => {
  //Generates a random number between 0 and 2
  let cardType = Math.floor(Math.random() * 3);
  let possibleCards = [];
  let randomCard;

  // Switches on the number generated
  switch (cardType) {
    case 0:
      weaponCards.forEach(card => {
        if (card.available == true) {
          possibleCards.push(weaponCards.indexOf(card));
        }
      });
      randomCard = Math.floor(Math.random() * possibleCards.length);
      weaponCards[randomCard].available = false;
      player.weaponCards.push(weaponCards[randomCard]);
      displayGameCard(weaponCards[randomCard]);
      break;
    case 1:
      moveCards.forEach(card => {
        if (card.available == true) {
          possibleCards.push(moveCards.indexOf(card));
        }
      });
      randomCard = Math.floor(Math.random() * possibleCards.length);
      moveCards[randomCard].available = false;
      player.moveCards.push(moveCards[randomCard]);
      displayGameCard(moveCards[randomCard]);
      break;
    case 2:
      failureCards.forEach(card => {
        if (card.available == true) {
          possibleCards.push(failureCards.indexOf(card));
        }
      });
      randomCard = Math.floor(Math.random() * possibleCards.length);
      failureCards[randomCard].available = false;
      player.failureCards.push(failureCards[randomCard]);
      displayGameCard(failureCards[randomCard]);
      break;
  }
};

// Function to display a modal for a game card
// Accepts input of header, body and footer
const displayGameCard = card => {
  modalHeader.innerHTML = `<h2>You stumbed upon something that may be of use...</h2>`;
  modalBody.innerHTML = '';

  if (card.baseDamage) {
    modalBody.innerHTML += `
    <div class="card-container">
    <div class="card">
      ${card.name}
      <p>Damage: ${card.baseDamage}</p>
    </div>
    </div>`;
    if (card.modifierDamage != null) {
      modalBody.innerHTML += `<p class="card-bonus-damage">Worth ${card.modifierDamage} in the ${rooms[card.modifierRoomID].name}</p></div>`;
    }
    modalFooter.innerHTML = `<h3>Weapon cards allow you to deal additional damage</h3>`;
  } else if (card.failureValue) {
    modalBody.innerHTML = `
    <div class="card-container">
    <div class="card">
      Failure
      <p>Points: ${card.failureValue}</p>
    </div>
    </div>`;
    modalFooter.innerHTML = `<h3>Failure cards can help prevent murder!</h3>`;
  } else {
    modalBody.innerHTML = `
    <div class="card-container">
    <div class="card">
      Movement
      <p>${card.name}</p>
    </div>
    </div>`;
    modalBody.innerHTML += `<p>${card.description}</p>`;
    modalFooter.innerHTML = `<h3>Movement cards help you, or Lucky, move around.</h3>`;
  }

  modalBody.innerHTML += `  <div class="Btn">
  Continue
  </div>`;

  modal.style.display = 'block';

  document
    .querySelector('.Btn')
    .addEventListener('click', () => (modal.style.display = 'none'));
};

// Shows a modal with the option to select cards to contribute failure points
// Towards stopping a murder attempt
// After each confirmation, will continue the failureattempt to the next player
const displayFailureCard = player => {
  modalHeader.innerHTML = `<h2>Someone attempted a murder with: ${gameData.MurderAttempt.damagePoints} damage!</h2>`;

  let failureCardHTML;
  let failureContribution = 0;
  if (player.failureCards.length == 0) {
    failureCardHTML =
      '<p>Unfortuntely you do not have any failure cards available to use...</p>';
  } else {
    failureCardHTML = `<p>Player ${player.id +
      1} Selection: </p><div class="card-container">`;
    player.failureCards.forEach(card => {
      failureCardHTML += `<div class="card" id="${card.id}">F-${card.failureValue}</div>`;
    });
    failureCardHTML += '</div>';
  }

  modalBody.innerHTML = ` ${failureCardHTML}
  <div class="Btn failure-contribute">
  Continue
  </div>`;
  modalFooter.innerHTML = `<h3>Current Failure Points: ${gameData.MurderAttempt.failurePoints}</h3>`;
  modal.style.display = 'block';

  document.querySelectorAll('.card').forEach(card =>
    card.addEventListener('click', () => {
      failureContribution = failureCards[card.id].failureValue;
      clearSelectedCards();
      card.classList.add('card-selected');
    })
  );

  document.querySelector('.Btn').addEventListener('click', () => {
    gameData.MurderAttempt.failurePoints += failureContribution;
    modal.style.display = 'none';
    if (gameData.gameType != 'online') {
      failureAttempt();
    } else {
      socket.emit('contributeFailure', {
        gameID: gameData.gameSession,
        failurePoints: failureContribution
      });
      displayWaitingForTurn();
    }
  });
};

// Function to handle switching between players selecting failure cards
// After each switch, it will display the modal using displayFailureCard
const failureAttempt = () => {
  if (gameData.MurderAttempt.CurrentDefendingPlayer == null) {
    gameData.MurderAttempt.CurrentDefendingPlayer = 0;
    displayFailureCard(gameData.MurderAttempt.defenders[0]);
  } else if (
    gameData.MurderAttempt.CurrentDefendingPlayer <
    gameData.playerCount - 2
  ) {
    displayFailureCard(
      gameData.MurderAttempt.defenders[
        gameData.MurderAttempt.CurrentDefendingPlayer + 1
      ]
    );
    gameData.MurderAttempt.CurrentDefendingPlayer++;
  } else {
    calculuateMurderChance();
  }
};

// Decides whether the murder was successful or not based from damage vs failure
const calculuateMurderChance = () => {
  if (
    gameData.MurderAttempt.damagePoints > gameData.MurderAttempt.failurePoints
  ) {
    murderSuccess();
  } else {
    murderFailure();
  }
};

// Shows a modal signifying that the murder attempt has failed and allows players
// To return to the game and calls a function to reset murderattempt data
const murderFailure = () => {
  modalHeader.innerHTML = `<h2>Lucky is alive!</h2>`;
  modalBody.innerHTML = `
  <p>Someone has made an attempt on Lucky's life but thankfully the group was able to defend him properly, no one is quite sure who the perpetrator was but Player ${gameData
    .MurderAttempt.AttackingPlayer + 1} sure looks suspicious.</p>
  <div class="Btn">
  Continue
  </div>`;
  modalFooter.innerHTML = `<h3>Murder thwarted!</h3>`;
  modal.style.display = 'block';

  document.querySelector('.Btn').addEventListener('click', () => {
    modal.style.display = 'none';
    gameData.Players[gameData.MurderAttempt.AttackingPlayer].spite++;
    resetMurderAttemptData();
    if (gameData.gameType == 'online') {
      displayWaitingForTurn();
      socket.emit('murderFailed', {
        gameID: gameData.gameSession,
        gameData: gameData,
        player: socket.id
      });
    }
  });

  killButton.disabled = true;
};

// Resets all data associated with a murder attempt to null
// This allows it to be written to again later, ensuring data stability
const resetMurderAttemptData = () => {
  gameData.MurderAttempt.AttackingPlayer = null;
  gameData.MurderAttempt.CurrentDefendingPlayer = null;
  gameData.MurderAttempt.damagePoints = null;
  gameData.MurderAttempt.defenders = [];
  gameData.MurderAttempt.location = null;
  gameData.MurderAttempt.failurePoints = null;
};

// Function to show a modal signifying the game being completed due to a
// successful murder attempt on Lucky's life
const murderSuccess = player => {
  modalHeader.innerHTML = `<h2>Lucky is dead!</h2>`;
  modalBody.innerHTML = `
  <p>Dr. Lucky has been murdered, now one is quite sure who has done it but Player ${gameData
    .MurderAttempt.AttackingPlayer +
    1} sure did leave the mansion quite quickly after. Whatever the matter, you are quite happy that the man is finally no more.</p>
  <div class="Btn">
  New Game
  </div>`;
  modalFooter.innerHTML = `<h3>Game Over</h3>`;
  modal.style.display = 'block';

  document
    .querySelector('.Btn')
    .addEventListener('click', () => location.reload());
};

// Displays the card that will take in the proper elements to display
// For weapon selection
const displayMurderCard = (body, footer) => {
  modalHeader.innerHTML = `<h2>What will be your weapon of choice?</h2>`;
  modalBody.innerHTML = `${body}
  <div class="Btn">
  Continue
  </div>`;
  modalFooter.innerHTML = `<h3>${footer}</h3>`;
  modal.style.display = 'block';
};

// Initiates a murder attempt by passing in a player object
// The player is then prompted with a modal for weapon options
// From there the failureAttempt function is called to counter the attack
const murderAttempt = () => {
  let player = gameData.Players[gameData.currentTurn];
  let damage = 0;

  let weaponHTML = '';
  if (player.weaponCards.length == 0) {
    weaponHTML += `It doesn't look like you have any weapons...`;
  } else {
    weaponHTML += '<div class="card-container">';
    player.weaponCards.forEach(card => {
      weaponHTML =
        weaponHTML +
        `<div class="card" id="${card.id}">${card.name}<p>Damage: ${card.baseDamage}</p>`;
      if (card.modifierDamage != null) {
        weaponHTML += `<p class="card-bonus-damage">Worth ${card.modifierDamage} in the ${rooms[card.modifierRoomID].name}</p></div>`;
      } else {
        weaponHTML += '</div>';
      }
    });
    weaponHTML += '</div>';
  }

  displayMurderCard(weaponHTML, `Spite Bonus: ${player.spite}`);

  document.querySelectorAll('.card').forEach(card =>
    card.addEventListener('click', () => {
      damage = 0 + player.spite;
      if (player.location == weaponCards[card.id].modifierRoomID) {
        damage += parseInt(weaponCards[card.id].modifierDamage);
      } else {
        damage += parseInt(weaponCards[card.id].baseDamage);
      }
      clearSelectedCards();
      card.classList.add('card-selected');
    })
  );

  document.querySelector('.Btn').addEventListener('click', () => {
    gameData.MurderAttempt.damagePoints = damage;
    gameData.MurderAttempt.location = player.location;
    gameData.MurderAttempt.AttackingPlayer = player.id;
    gameData.MurderAttempt.failurePoints = 0;
    modal.style.display = 'none';

    gameData.Players.forEach(player => {
      if (player.id != gameData.MurderAttempt.AttackingPlayer) {
        gameData.MurderAttempt.defenders.push(player);
      }
    });

    if (gameData.gameType != 'online') {
      failureAttempt();
    } else {
      socket.emit('murderAttempt', {
        gameID: gameData.gameSession,
        gameData: gameData,
        player: socket.id
      });
      displayWaitingForTurn();
    }
  });
};

// Clears the selection effect on hovering over cards in any menus
const clearSelectedCards = () => {
  document
    .querySelectorAll('.card')
    .forEach(card => card.classList.remove('card-selected'));
};

// Function to display the modal that configures game
// Plays background music during game setup
const displayGameSetup = () => {
  modalHeader.innerHTML = `<h2>Kill Doctor Lucky</h2>`;
  modalBody.innerHTML = `<p class="welcomeMessage">
  How many guests are we hosting tonight?</p>

  <div class="playerCounter-container">
   <span class="decrementBtn"> - </span>
   <span class="playerCount">${gameData.playerCount}</span>
   <span class="incrementBtn"> + </span>
  </div>

  <div class="Btn">
    Start Game
  </div>
  `;
  modalFooter.innerHTML = `<h3>Game Setup</h3>`;
  modal.style.display = 'block';

  document
    .querySelector('.incrementBtn')
    .addEventListener('click', () => incrementPlayerCount());
  document
    .querySelector('.decrementBtn')
    .addEventListener('click', () => decrementPlayerCount());

  document.querySelector('.Btn').addEventListener('click', () => {
    if (gameData.gameType == 'local') {
      startNewGame();
    } else {
      startOnlineGame();
    }
  });
};

const startOnlineGame = () => {};

const displayWaitingForTurn = () => {
  modalHeader.innerHTML = `<h2>Other players are plotting</h2>`;
  modalBody.innerHTML = `<p class="welcomeMessage">You wait patiently as the others move around the mansion and make their moves...
  <div class="loader">Loading...</div>
  </p>
  `;
  modalFooter.innerHTML = `<h3>Waiting for turn</h3>`;
  modal.style.display = 'block';
};

const displayWaitingForPlayers = () => {
  let players = 1;
  modalHeader.innerHTML = `<h2>Waiting for guests</h2>`;
  modalBody.innerHTML = `<p class="welcomeMessage">You wait patiently as the rest of your party has yet to arrive...perhaps they should use this code: ${gameData.gameSession}</p>
  <div class="loader">Loading...</div>
  <p class="welcomeMessage">
  There are currently <span id="playerCount">${players}</span> / ${gameData.playerCount} players in attendance.
  </p>
  `;
  modalFooter.innerHTML = `<h3>Waiting for players</h3>`;
  modal.style.display = 'block';

  let playerCountChecker = setInterval(() => {
    socket.emit('checkPlayerCount', { id: gameData.gameSession });
  }, 1000);

  socket.on('returnPlayerCount', data => {
    console.log(data.playerCount);
    players = data.playerCount;
    document.getElementById('playerCount').innerText = players;
  });

  socket.on('gameReady', data => {
    gameData = data.gameData;
    clearInterval(playerCountChecker);
    startNewGame();
  });
};

const gameModeSelection = () => {
  document.getElementById('menu-music').muted = false;
  modalHeader.innerHTML = `<h2>Kill Doctor Lucky</h2>`;
  modalBody.innerHTML = `<p class="welcomeMessage">Welcome to Lucky Mansion, a sprawling country estate filled with unusual weapons, good hiding places, and craven killers. Killers like you.
  <br>
  <br>
  How are we going to be attending the festivities tonight?
  <br>
  <br>
  <div class="gameMode-container">
  <span class="Btn" id="localBtn">Local</span>
  <span class="Btn" id="onlineBtn">Online</span>
  </div>
  </p>
  `;
  modalFooter.innerHTML = `<h3>Game Setup</h3>`;
  modal.style.display = 'block';
  document.getElementById('localBtn').addEventListener('click', () => {
    gameData.gameType = 'local';
    displayGameSetup();
  });

  document.getElementById('onlineBtn').addEventListener('click', () => {
    gameData.gameType = 'online';
    displayOnlineGameSelection();
  });
};

const displayOnlineGameSelection = () => {
  modalHeader.innerHTML = `<h2>Online Game</h2>`;
  modalBody.innerHTML = `<p class="welcomeMessage">Are you looking to host your own party, or will you be joining another party dying to make your acquaintance?
  <br>
  <br>
  <div class="gameMode-container">
  <span class="Btn" id="createGameBtn">Create</span>
  <span class="Btn" id="joinGameBtn">Join</span>
  </div>
  </p>
  `;
  modalFooter.innerHTML = `<h3>Selection</h3>`;
  modal.style.display = 'block';

  document
    .getElementById('createGameBtn')
    .addEventListener('click', displayCreateGameMenu);

  document
    .getElementById('joinGameBtn')
    .addEventListener('click', displayJoinGameMenu);
};

const displayCreateGameMenu = () => {
  modalHeader.innerHTML = `<h2>Kill Doctor Lucky</h2>`;
  modalBody.innerHTML = `<p class="welcomeMessage">
  How many guests are we hosting tonight?</p>

  <div class="playerCounter-container">
   <span class="decrementBtn"> - </span>
   <span class="playerCount">${gameData.playerCount}</span>
   <span class="incrementBtn"> + </span>
  </div>

  <div class="Btn" id="Btn">
    Start Game
  </div>
  `;
  modalFooter.innerHTML = `<h3>Game Setup</h3>`;
  modal.style.display = 'block';

  document
    .querySelector('.incrementBtn')
    .addEventListener('click', () => incrementPlayerCount());
  document
    .querySelector('.decrementBtn')
    .addEventListener('click', () => decrementPlayerCount());

  document.getElementById('Btn').addEventListener('click', () => {
    let gameID = Math.floor(Math.random() * 1000000000);
    gameData.gameSession = gameID;
    gameData.gameStatus = 'preparing';
    socket.emit('createSession', {
      sessionID: gameID,
      gameData: gameData,
      playerID: socket.id
    });
    displayWaitingForPlayers();
  });
};

const displayJoinGameMenu = () => {
  modalHeader.innerHTML = `<h2>Join A Game</h2>`;
  modalBody.innerHTML = `<p class="welcomeMessage">
  Who will you be joining tonight for the event?
  <br>
  <br>
  <input type="text" id="gameIDTextBox" />

  </p>

  <div class="Btn" id="joinGameBtn">
    Join Game
  </div>
  `;
  modalFooter.innerHTML = `<h3>Game Setup</h3>`;
  modal.style.display = 'block';

  document.getElementById('joinGameBtn').addEventListener('click', () => {
    let gameIDTextBox = document.getElementById('gameIDTextBox');
    socket.emit('playerJoin', {
      gameID: gameIDTextBox.value,
      playerID: socket.id
    });
    socket.on('joinResult', data => {
      if (data.result) {
        gameData = data.gameData;
        displayWaitingForPlayers();
      }
    });
  });
};

const playerDisconnected = () => {
  modalHeader.innerHTML = `<h2>Someone is lost!</h2>`;
  modalBody.innerHTML = `
  <p>A guest of the mansion has unfortunately disappeared into thin air, having felt that the connection is lost. You leave on your way, and we hope to see you again.</p>
  <div class="Btn">
  New Game
  </div>`;
  modalFooter.innerHTML = `<h3>Game Over</h3>`;
  modal.style.display = 'block';

  document
    .querySelector('.Btn')
    .addEventListener('click', () => location.reload());
};

//Function to increment player count
// Updates player count and visual representation in game setup modal
const incrementPlayerCount = () => {
  if (gameData.playerCount < 8) {
    gameData.playerCount++;
    document.querySelector('.playerCount').textContent = gameData.playerCount;
  }

  if (gameData.playerCount == 8) {
    document.querySelector('.incrementBtn').classList.add('hidden');
  }

  if (document.querySelector('.decrementBtn').classList.contains('hidden')) {
    document.querySelector('.decrementBtn').classList.remove('hidden');
  }
};

//Function to decrement player count
// Updates player count and visual representation in game setup modal
const decrementPlayerCount = () => {
  if (gameData.playerCount !== 2) {
    gameData.playerCount--;
    document.querySelector('.playerCount').textContent = gameData.playerCount;
  }

  if (gameData.playerCount == 2) {
    document.querySelector('.decrementBtn').classList.add('hidden');
  }

  if (document.querySelector('.incrementBtn').classList.contains('hidden')) {
    document.querySelector('.incrementBtn').classList.remove('hidden');
  }
};

// On load handler for the window to show game setup screen
window.onload = () => {
  gameModeSelection();
};

const updateGame = () => {
  socket.emit('updateGame', {
    gameID: gameData.gameSession,
    gameData: gameData
  });
};

socket.on('connect', () => {
  console.log(`Connected with ID: ${socket.id}`);
});

socket.on('disconnect', () => {
  console.log(`Disconnected user: ${socket.id}`);
});

socket.on('gameReady', data => {
  gameData = data.gameData;
  console.log('game Ready');
});

socket.on('waitForTurn', data => {
  gameData = data.gameData;
  renderPlayers();
  renderDoctorLucky();
  displayWaitingForTurn();
});

socket.on('activePlayer', data => {
  gameData = data.gameData;
  renderPlayers();
  renderDoctorLucky();
  modal.style.display = 'none';
  renderMovableRooms(gameData.Players[gameData.currentTurn]);
});

socket.on('attemptFailure', data => {
  gameData = data.gameData;
  renderPlayers();
  renderDoctorLucky();
  modal.style.display = 'none';
  displayFailureCard(gameData.Players[data.player]);
});

socket.on('calculateMurder', data => {
  gameData = data.gameData;
  modal.style.display = 'none';
  calculuateMurderChance();
});

socket.on('continueTurn', data => {
  gameData = data.gameData;
  modal.style.display = 'none';
});

socket.on('playerDisconnected', data => {
  playerDisconnected();
});
