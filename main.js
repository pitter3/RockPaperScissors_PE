// QUERY SELECTORS

var selectionButtons = document.querySelectorAll(".selector-image");
var playZone = document.querySelector(".play-zone")

// EVENT LISTENERS

playZone.addEventListener("click", function() {
testDelegation()
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

function computerSelection() {
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
    return `It's a Draw!!`
  }
  if (game.human.selection === 'Rock' && game.robot.selection === 'Scissors') {
    game.human.gameWon = true
  }
  if (game.human.selection === 'Paper' && game.robot.selection === 'Rock') {
    game.human.gameWon = true
  }
  if (game.human.selection === 'Scissors' && game.robot.selection === 'Paper') {
    game.human.gameWon = true
  }
  if (!game.human.gameWon) {
    game.robot.gameWon = true
  }
  return game
}

function updateScores(game) {
  if (game.human.gameWon === true) {
    humanScore++
    return humanScore
  }
  robotScore++
  return robotScore
}

function resetWinner(game) {
  game.human.gameWon = false;
  game.robot.gameWon = false;
}

function testDelegation() {
  console.log('working')
}