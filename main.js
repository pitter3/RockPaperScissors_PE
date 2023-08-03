var humanScore = 0;
var robotScore = 0;

function createPlayer(name, selection) {
  var player = {
    name: name,
    selection: selection,
    wins: 0,
  }
  return player
}