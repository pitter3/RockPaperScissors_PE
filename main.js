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

humanSection.addEventListener("click", function(event) {
  if (event.target.id === "change-game-button") {
    backToGameSelection();
  }
});

function playRound(event) {
  if (gameInProgress) {
    return; 
  }

  gameInProgress = true;

  var humanSelection = getHumanSelection(event);
  
  // renderHumanSelection(event); // pass in event.target.id only

renderSelection(event.target.id, true) //

  setTimeout(function() {
    var robotSelection = getRobotSelection();
    renderSelection(robotSelection, false);

    var humanPlayer = createPlayer("Human", humanSelection);
    var robotPlayer = createPlayer("Robot", robotSelection);
    var game = createGame(humanPlayer, robotPlayer);
    var resultMessage = gameResult(game);
    renderWinner(resultMessage);
    updateScores(game); // remove nested function

    gameInProgress = false; // Reset the flag after the round is complete
  }, 2000);
}



// DATA MODEL

var humanScore = 0;
var robotScore = 0;
var changeGameButtonCreated = false;
var gameInProgress = false;


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
  }
  if (game.robot.gameWon === true) {
    robotScore++
  }
  console.log("test")
  renderWins(); //bug
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
  
  playZone.innerHTML = "";
  // resultSection.innerText = "";
  playZone.innerHTML += 
    '<img class="selector-image" id="Rock" src="./assets/Rock.png">' +
    '<img class="selector-image" id="Paper" src="./assets/Paper.png">' +
    '<img class="selector-image" id="Scissors" src="./assets/Scissors.png">';
  // resultSection.innerText = "Choose your fighter!"
  renderWinner("Choose your fighter!")
  if (!changeGameButtonCreated) {
    showChangeGameButton();
  }
}

function delayLaunchClassic() {
  setTimeout(function() {
     launchClassic();
  }, 2000);
} // this will need to be dynamic and work for difficult as well as classic.

function showChangeGameButton() { // rename this... it is CREATING the button, not showing it
  var changeGameButton = document.createElement('button');
  changeGameButton.innerHTML = 'CHANGE GAME?';
  changeGameButton.id = 'change-game-button';
  humanSection.appendChild(changeGameButton);
  changeGameButtonCreated = true;
}

function renderWins() {
  console.log(humanScore, robotScore)
  humanScores.innerText = `Wins: ${humanScore}` //bug
  robotScores.innerText = `Wins: ${robotScore}`
}

function renderWinner(resultMessage) { // rename this
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

function backToGameSelection() {
  changeGameButtonCreated = false;
  playZone.innerHTML = `
    <section class="game-selection">
      CLASSIC
      
      Rock > Scissors
      Paper > Rock
      Scissors > Paper
    </section>
    <section class="game-selection" id="difficult">
      DIFFICULT
      
      Rock > Scissors & Something
      Paper > Rock & Something
      Scissors > Paper & Something
    </section>
    <!-- Rock, Paper, and Scissor Images Here -->
  `;
  resultSection.innerHTML = `Choose your game!`
  humanSection.innerHTML = `        <section class="side-container">
  <p class="image">🧠 Human</p>
  <p class="score-counter" id="human-wins">Wins: ${humanScore} </p>
</section>
<!-- Change Game Button Here -->`
}