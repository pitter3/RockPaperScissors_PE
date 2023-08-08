// QUERY SELECTORS

var selectionButtons = document.querySelectorAll(".selector-image");
var playZone = document.querySelector(".play-zone");
var resultSection = document.querySelector(".result-section");
var humanSection = document.querySelector(".human-section");
var humanScores = document.querySelector("#human-wins");
var robotScores = document.querySelector("#robot-wins");

// EVENT LISTENERS
playZone.addEventListener("click", function(event) {
  if (event.target.classList.contains("selector-image")) {
    playRound(event);
    renderComputerChoosing();
  }
  if (event.target.classList.contains("game-selection")) {
    launchGame(event);
  }
});

function playRound(event) {
  var humanSelection = getHumanSelection(event);
  
  renderHumanSelection(event);

  setTimeout(function() {
    var robotSelection = getRobotSelection();
    renderRobotSelection(robotSelection);

    var humanPlayer = createPlayer("Human", humanSelection);
    var robotPlayer = createPlayer("Robot", robotSelection);
    var game = createGame(humanPlayer, robotPlayer);
    var resultMessage = gameResult(game);
    renderWinner(resultMessage);
    updateScores(game);
  }, 2000);
}


// DATA MODEL

var humanScore = 0;
var robotScore = 0;


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
  var selectionChoices = ["Rock", "Paper", "Scissors"];
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
    return ` DRAW! You both picked ${game.human.selection}`
  }
  if (game.human.selection === 'Rock' && game.robot.selection === 'Scissors') {
    game.human.gameWon = true
    return `You win! ${game.human.selection} beats ${game.robot.selection}!`
  }
  if (game.human.selection === 'Paper' && game.robot.selection === 'Rock') {
    game.human.gameWon = true
    return `You win! ${game.human.selection} beats ${game.robot.selection}!`
  }
  if (game.human.selection === 'Scissors' && game.robot.selection === 'Paper') {
    game.human.gameWon = true
    return `You win! ${game.human.selection} beats ${game.robot.selection}!`
  }
    game.robot.gameWon = true
    return `You lost :( ${game.human.selection} loses to ${game.robot.selection}!`
  }

function updateScores(game) {
  if (game.human.gameWon === true) {
    humanScore++
    renderWins();
  }
  if (game.robot.gameWon === true) {
    robotScore++
    renderWins();
  }
  delayLaunchClassic();
}

// DOM MANIPULATION


function launchGame(event) {
  if (event.target.id = 'classic') {
    launchClassic();
  }
  // if (event.target.id = 'difficult') {
  //   launchDifficult();
  // }
}

function launchClassic() {
  
  playZone.innerHTML = ""; // do we need these??
  resultSection.innerText = "";
  playZone.innerHTML += 
    '<img class="selector-image" id="Rock" src="./assets/Rock.png">' +
    '<img class="selector-image" id="Paper" src="./assets/Paper.png">' +
    '<img class="selector-image" id="Scissors" src="./assets/Scissors.png">';
  resultSection.innerText = "Choose your fighter!"
  showChangeGameButton();
}

function delayLaunchClassic() {
  setTimeout(launchClassic, 2000);
} // this will need to be dynamic and work for difficult as well as classic.

function showChangeGameButton() {
  var changeGameButton = document.createElement('button');
  changeGameButton.innerHTML = 'CHANGE GAME?';
  humanSection.appendChild(changeGameButton);
}

function renderWins() {
  humanScores.innerText = `Wins: ${humanScore}`
  robotScores.innerText = `Wins: ${robotScore}`
}

function renderWinner(resultMessage) {
  resultSection.innerText = resultMessage;
}

function renderHumanSelection(event) {
  var humanSelectionImg = document.createElement('img');
  humanSelectionImg.classList.add('selector-image');
  humanSelectionImg.id = event.target.id;
  humanSelectionImg.src = `./assets/${event.target.id}.png`;
  playZone.innerHTML = ""
  playZone.appendChild(humanSelectionImg);
}

function renderRobotSelection(robotSelection) {
  var robotSelectionImg = document.createElement('img');
  robotSelectionImg.classList.add('selector-image');
  robotSelectionImg.id = robotSelection;
  robotSelectionImg.src = `./assets/${robotSelection}.png`;
  playZone.appendChild(robotSelectionImg);
}

function renderComputerChoosing() {
  resultSection.innerText = 'Computer is choosing...';
}
