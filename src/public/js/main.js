
$( document ).ready(function() {

});

function init() {

	let connectionHandler = new ConnectionHandler();
	let game = new Game(connectionHandler);

	let view = new View();
	let controller = new Controller(view, game);

	controller.run();
	console.log("Finished main");

	return [game, view];
}
