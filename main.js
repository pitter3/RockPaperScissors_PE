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

var humanPlayer = createPlayer("Human", "Rock");
var robotPlayer = createPlayer("Robot", "Scissors");


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

var game = createGame(humanPlayer, robotPlayer);


function gameResult(game) {
  if (game.human.selection === 'Rock' && game.robot.selection === 'Scissors') {
    game.human.gameWon = true
  }
  return game
}

var playerWins = gameResult(game)


function updateScores(game) {
  if (game.human.gameWon === true) {
    humanScore++
  }
  return humanScore
}

updateScores(game)


function resetWinner(game) {
  game.human.gameWon = false;
  game.robot.gameWon = false;
}

resetWinner(game)
