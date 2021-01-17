
$( document ).ready(function() {

});

function init(white) {

	let game = new Game();

	let view = new View();
	let controller = new Controller(view, game);

	controller.run(white);
	console.log("Finished main");

	return [game, view];
}
