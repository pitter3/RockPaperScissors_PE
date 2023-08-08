// QUERY SELECTORS

var selectionButtons = document.querySelectorAll(".selector-image");
var playZone = document.querySelector(".play-zone");
var resultSection = document.querySelector(".result-section");
var humanSection = document.querySelector(".human-section");
var humanScores = document.querySelector("#human-wins");
var robotScores = document.querySelector("#robot-wins");
var selectorContainer = document.querySelector(".selector-container")
var changeGameWrapper = document.querySelector(".change-game-wrapper");


// DATA MODEL

var humanScore = 0;
var robotScore = 0;
var changeGameButtonCreated = false;
var gameInProgress = false;
var difficultMode = false;


// EVENT LISTENERS

playZone.addEventListener("click", function(event) {
  if (event.target.classList.contains("game-selection")) {
    launchGame(event);
  }
  if (event.target.classList.contains("selector-image")) {
    playRound(event);
    renderComputerChoosing();
  }
});

 
// GAME FLOW

function playRound(event) {
  if (gameInProgress) {
    return; 
  }
  gameInProgress = true;
  var humanSelection = getHumanSelection(event);   // renderHumanSelection(event); // pass in event.target.id only?
  var robotSelection = getRobotSelection();
  var humanPlayer = createPlayer("Human", humanSelection);
  var robotPlayer = createPlayer("Robot", robotSelection);
  var game = createGame(humanPlayer, robotPlayer);
  var resultMessage = gameResult(game);
  renderSelection(event.target.id, true) 

  setTimeout(function() {
    renderSelection(robotSelection, false);
    renderWinner(resultMessage);
    updateScores(game); // remove nested functions
  }, 2000);
}


// GAME LOGIC

function createPlayer(name, selection) {
  var player = {
    name: name,
    selection: selection,
  }
  return player
}

function getHumanSelection(event) {
  var humanSelection = event.target.id;
  return humanSelection
}

function getRobotSelection() {
  if (difficultMode === true) {
    var selectionChoices = ["Rock", "Paper", "Scissors", "Spock", "Devil"];
  } else {
    var selectionChoices = ["Rock", "Paper", "Scissors"];
  }
  
  return selectionChoices[Math.floor(Math.random() * selectionChoices.length)];
}

function createGame(human, robot) {
  var game = {
    human: {
      selection: human.selection,
      gameWon: false
    },
    robot: {
      selection: robot.selection,
      gameWon: false,
    }
  }
  return game
}

function gameResult(game) {
  if (game.human.selection === game.robot.selection) {
    return ` DRAW! You both picked ${game.human.selection}`;
  }
  
  if (
    (game.human.selection === 'Rock' && (game.robot.selection === 'Scissors' || game.robot.selection === 'Devil')) ||
    (game.human.selection === 'Paper' && (game.robot.selection === 'Rock' || game.robot.selection === 'Spock')) ||
    (game.human.selection === 'Scissors' && (game.robot.selection === 'Paper' || game.robot.selection === 'Devil')) ||
    (game.human.selection === 'Spock' && (game.robot.selection === 'Rock' || game.robot.selection === 'Scissors')) ||
    (game.human.selection === 'Devil' && (game.robot.selection === 'Spock' || game.robot.selection === 'Paper'))
  ) {
    game.human.gameWon = true;
    return `You win! ${game.human.selection} beats ${game.robot.selection}!`;
  }

  game.robot.gameWon = true;
  return `You lost :( ${game.human.selection} loses to ${game.robot.selection}!`;
}

function updateScores(game) {
  if (game.human.gameWon === true) {
    humanScore++
  }
  if (game.robot.gameWon === true) {
    robotScore++
  }
  renderWins(); //bug
  delayLaunchClassic();
}

// DOM MANIPULATION


function launchGame(event) {
  if (event.target.id === 'classic') {
    launchClassic();
  }
  if (event.target.id === 'difficult') {
    difficultMode = true;
    launchDifficult();
  }
}

function launchClassic() {
  if (!changeGameButtonCreated) {
    createChangeGameButton();
  }
  playZone.innerHTML = "";
  playZone.innerHTML += 
    `
    <img class="selector-image" id="Rock" src="./assets/Rock.png"> 
    <img class="selector-image" id="Paper" src="./assets/Paper.png">
    <img class="selector-image" id="Scissors" src="./assets/Scissors.png">
    `;
  renderWinner("Choose your fighter!")
}

function launchDifficult() {
  if (!changeGameButtonCreated) {
    createChangeGameButton();
  }
  playZone.innerHTML = "";
  playZone.innerHTML += 
    `
    <img class="selector-image" id="Rock" src="./assets/Rock.png"> 
    <img class="selector-image" id="Paper" src="./assets/Paper.png">
    <img class="selector-image" id="Scissors" src="./assets/Scissors.png">
    <img class="selector-image" id="Spock" src="./assets/SPOCK.png">
    <img class="selector-image" id="Devil" src="./assets/Devil.png">
    `
  renderWinner("Difficult Mode -- Choose your fighter!")
}

function delayLaunchClassic() {
  var delayTime = 850;
  setTimeout(function() {
    if (difficultMode) {
      launchDifficult();
    } else {
      launchClassic();
    }
    gameInProgress = false;
  }, delayTime);
}


function renderWins() {
  console.log(humanScore, robotScore)
  humanScores.innerText = `Wins: ${humanScore}` //bug
  robotScores.innerText = `Wins: ${robotScore}`
}

function renderWinner(resultMessage) { // rename this
  resultSection.innerText = resultMessage;
}

function renderSelection(selection, resetField) {
  var img = document.createElement('img');
  img.classList.add('selector-image');
  img.id = selection;
  img.src = `./assets/${selection}.png`;
  if (resetField) {
    playZone.innerHTML = ""
  } 
    playZone.appendChild(img);
}

function renderComputerChoosing() {
  resultSection.innerText = 'Robot is choosing...';
}

function createChangeGameButton() { // rename this... it is CREATING the button, not showing it
  var changeGameButton = document.createElement('button');
  changeGameButton.innerHTML = 'CHANGE GAME?';
  changeGameButton.id = 'change-game-button';
  changeGameWrapper.appendChild(changeGameButton);
  changeGameButtonCreated = true;
}

// humanSection.addEventListener("click", function(event) {
//   if (event.target.id === "change-game-button") {
//     backToGameSelection();
//   }
// });

// if (!changeGameButtonCreated) {
//   showChangeGameButton();
// }