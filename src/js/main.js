
$(function() {
	init();
});

function init() {

	//if i started my player type is white.. else black
	//init gui..
	//update gui based on gamestate.

	var myPlayerType = Player.WHITE;
	var connectionHandler = new ConnectionHandler();
	var game = new Game(connectionHandler, myPlayerType);

	game.run();
	console.log("Finished main");

}
