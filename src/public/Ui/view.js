class View {
    constructor() {
        this.playMoveEvent = new MvcEvent();
        this.askPossibleMovesEvent = new SingleReturnEvent();
        this.askAllMyPiecePositions = new SingleReturnEvent();
        this.userClickMoveHandler = new UserClickMoveHandler(this.playMoveEvent, this.askPossibleMovesEvent, this.askAllMyPiecePositions);
        this.boardUi = new BoardUi(this.userClickMoveHandler);
    }

    initUi(isWhite){

        this.message = document.createElement('div');
        this.message.className = 'message';
        document.body.appendChild(this.message);

        this.boardUi.initEmptyBoard();
        if(isWhite){
            this.boardUi.invertBoardUiCellColoring();
        }
    }

    updateBoard(gameState){
        this.boardUi.clearBoardUi();

        let rotate = false;
        if(gameState.myColor === Player.WHITE) {
            rotate = true;
        }
        this.boardUi.fillBoardUi(gameState.board, rotate);
        console.log("View. Update board was called");
    }

    gameOver(gameStatus){
        //TODO change message based on gameStatus
        this.message.innerHTML = '${gameStatus} wins!';
        console.log("View.game over was triggered");
        // console.log("Game has ended it's a: ")
        // console.log(gameStatus);
    }
}
