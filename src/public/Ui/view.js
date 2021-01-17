class View {
    constructor() {
        this.playMoveEvent = new MvcEvent();
        this.askPossibleMovesEvent = new SingleReturnEvent();
        this.askAllMyPiecePositions = new SingleReturnEvent();
        this.userClickMoveHandler = new UserClickMoveHandler(this.playMoveEvent, this.askPossibleMovesEvent, this.askAllMyPiecePositions);
        this.boardUi = new BoardUi(this.userClickMoveHandler);
    }

    initUi(isWhite){


        this.boardUi.initEmptyBoard();
        if(isWhite){
            this.boardUi.invertBoardUiCellColoring();
        }
    }

    updateBoard(gameState){
        this.boardUi.clearBoardUi();

        if(gameState.myColor === Player.WHITE && !getRotated()) {
            setRotated(true);
            console.log("Rotate");
            this.boardUi.invertBoardUiCellColoring();
        }

        this.boardUi.fillBoardUi(gameState.board, getRotated());

    }

    gameOver(gameStatus){
        let message = "Congratulation you won!";
        if(gameStatus === GameStatus.LOST){
            message = "You lost, better luck next time";
        }
        if(gameStatus === GameStatus.DRAW){
            message = "It's a draw.";
        }

        alert(message);
    }
}
