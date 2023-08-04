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

var humanPlayer = createPlayer("Human", "Scissors");
var robotPlayer = createPlayer("Robot", "Paper");


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

var checkWinner = gameResult(game)


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
