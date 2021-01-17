class View {
    constructor() {
        this.playMoveEvent = new MvcEvent();
        this.askPossibleMovesEvent = new SingleReturnEvent();
        this.askAllMyPiecePositions = new SingleReturnEvent();
        this.userClickMoveHandler = new UserClickMoveHandler(this.playMoveEvent, this.askPossibleMovesEvent, this.askAllMyPiecePositions);
        this.boardUi = new BoardUi(this.userClickMoveHandler);
    }

    initUi(){

        this.message = document.createElement('div');
        this.message.className = 'message';
        document.body.appendChild(this.message);

        this.boardUi.initEmptyBoard();

    }

    updateBoard(gameState){
        this.boardUi.clearBoardUi();

        // let rotate = false;
        console.log("Rotate color: " + gameState.myColor);
        if(gameState.myColor === Player.WHITE && !getRotated()) {
            // rotate = true;
            setRotated(true);
            console.log("Rotate");
            this.boardUi.invertBoardUiCellColoring();
        }

        this.boardUi.fillBoardUi(gameState.board, getRotated());

    }

    gameOver(gameStatus){
        //TODO change message based on gameStatus
        this.message.innerHTML = '${gameStatus} wins!';
        console.log("View.game over was triggered");
        // console.log("Game has ended it's a: ")
        // console.log(gameStatus);
    }
}
