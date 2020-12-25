

class Game {
    constructor(connectionHandler, myPlayerType) {
        this.connectionHandler = connectionHandler;
        this.gameState = new GameState();
        this.gameState.fillBoardWithPieces();
        this.myPlayerType = myPlayerType;
    }

    run(){
        while (BOOL.TRUE){
            if(this.gameState.currentPlayer === this.myPlayerType){
                let move = new MoveHandler(this.gameState).askMoveFromUser();
                this.gameState.update(move);
                // connectionHandler... send update over server..
            }
            else{
                let move = this.connectionHandler.awaitOpponentMove();
                this.gameState.update(move);
            }
        }
    }

}
