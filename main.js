// QUERY SELECTORS

var selectionButtons = document.querySelectorAll(".selector-image");
var playZone = document.querySelector(".play-zone")

// EVENT LISTENERS
playZone.addEventListener("click", function(event) {
  if (event.target.classList.contains("selector-image")) {
    var humanSelection = getHumanSelection(event);
    var robotSelection = getRobotSelection();
    var humanPlayer = createPlayer("Patrick", humanSelection);
    var robotPlayer = createPlayer("Robot", robotSelection);
    var game = createGame(humanPlayer, robotPlayer);
    console.log(gameResult(game));
    updateScores(game); // clean this all up condense to 1 function
    // resetWinner(game);
  }
  if (event.target.classList.contains("game-selection")) {
    launchGame(event);
  }
});





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
    return `You both picked ${game.human.selection} It's a Draw!!`
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
    return `You lose :( ${game.robot.selection} beats ${game.human.selection}!`
  }

function updateScores(game) {
  if (game.human.gameWon === true) {
    humanScore++
    return console.log(`Human Score is:`, humanScore, `Robot Score is`, robotScore)
  }
  if (game.robot.gameWon === true) {
    robotScore++
    return console.log(`Human Score is:`, humanScore, `Robot Score is`, robotScore)
  }
  return console.log(`Human Score is:`, humanScore, `Robot Score is`, robotScore)
}

// DOM MANIPULATION

/* <img class="selector-image" id="Rock" src="./assets/Rock.png">
<img class="selector-image" id="Paper" src="./assets/Paper.png">
<img class="selector-image" id="Scissors" src="./assets/Scissors.png"> */

// INSERT THESE TO HTML WHEN USER CLICKS A GAME TYPE

