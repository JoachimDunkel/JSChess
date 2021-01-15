class Controller {
    constructor(view ,game) {
        this._view = view;
        this._game = game;

        this._view.playEvent.addListener(move => {this._game.tryMakeMove(move)});

        this._game.updateGameStateEvent.addListener(this._view.updateBoard(this._game.gameState.board));
        this._game.gameOverEvent.addListener(gameStatus => {this._view.gameOver(gameStatus)});
    }

    run(){
        this._view.initUi();
        this._game.startTurn();
    }
}
