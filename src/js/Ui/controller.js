class Controller {
    constructor(view ,game) {
        this._view = view;
        this._game = game;

        this._view.playEvent.addListener(move => {this._game.tryMakeMove(move)});

        this._game.updateGameStateEvent.addListener(gameState => {this._view.updateBoard(gameState) });
        this._game.gameOverEvent.addListener(gameStatus => {this._view.gameOver(gameStatus)});
    }

    run(){
        this._view.initUi();
        this._game.startTurn();
    }
}
