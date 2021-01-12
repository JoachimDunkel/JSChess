
$( document ).ready(function() {

});



function init() {

	//if i started my player type is white.. else black
	//init gui..
	//update gui based on gamestate.
	var elem = document.getElementById('newGameBtn');
	elem.parentNode.removeChild(elem);
	var elem2 = document.getElementById('FenInDiv');
	elem2.parentNode.removeChild(elem2);
	//Make here backend request for start new game.
	//For now we assume, that we are White.

	var connectionHandler = new ConnectionHandler();
	var myPlayerType = connectionHandler.findGame();

	var game = new Game(connectionHandler, myPlayerType);

	game.run();
	console.log("Finished main");

}

// todo testing stuff
function displayBoard()
{
	//document.getElementById('ChessBoard').style.display = 'inline';
	var elem = document.getElementById('newGameBtn');
	elem.parentNode.removeChild(elem);
	var elem2 = document.getElementById('resumeGameBtn');
	elem2.parentNode.removeChild(elem2);
}
