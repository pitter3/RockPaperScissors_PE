
// create a player on page load-- params will probably be global variables to start


function createPlayer(name, token, wins) {
  var player = {
    name: name,
    token: token,
    wins: wins,
  }
  return player
}