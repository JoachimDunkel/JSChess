
$( document ).ready(function() {

});

function init() {

	//if i started my player type is white.. else black
	//init gui..
	//update gui based on gamestate.
	let connectionHandler = new ConnectionHandler();
	let game = new Game(connectionHandler);

	let view = new View();
	let controller = new Controller(view, game);

	controller.run();
	console.log("Finished main");

}
