class View {
    constructor() {
        this.playEvent = new MvcEvent();
        this.boardUi = new BoardUi();
    }

    initUi(){

        this.message = document.createElement('div');
        this.message.className = 'message';
        document.body.appendChild(this.message);

        this.boardUi.initEmptyBoard(this.playEvent);
    }

    updateBoard(board){
        this.boardUi.fillBoardWithPieces(board);
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
