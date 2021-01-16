class Controller {
    constructor(view ,game) {
        this._view = view;
        this._game = game;

        this._view.playMoveEvent.addListener(move => {this._game.tryMakeMove(move)});
        this._view.askPossibleMovesEvent.registerEvent(fromPosition => {
            this._view.askPossibleMovesEvent.result = this._game.requestPossibleMoves(fromPosition);
        });
        this._view.askAllMyPiecePositions.registerEvent( fromPosition => {
            this._view.askAllMyPiecePositions.result = this._game.getAllMyPiecePositions(fromPosition);
        })

        this._game.updateGameStateEvent.addListener(gameState => {this._view.updateBoard(gameState)});
        this._game.gameOverEvent.addListener(gameStatus => {this._view.gameOver(gameStatus)});
    }

    run(){
        this._view.initUi();
        this._game.startTurn();
    }
}
