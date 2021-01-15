class View {
    constructor() {
        this.playEvent = new MvcEvent();
        this.userClickMoveHandler = new UserClickMoveHandler(this.playEvent);
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

        let rotate = false;
        if(gameState.myColor === Player.WHITE) rotate = true;
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
