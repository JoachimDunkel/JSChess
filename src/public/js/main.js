
$( document ).ready(function() {

});

function init(white) {

	let connectionHandler = new ConnectionHandler();
	let game = new Game(connectionHandler);

	let view = new View();
	let controller = new Controller(view, game);

	controller.run(white);
	console.log("Finished main");

	return [game, view];
}
