

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
                var move = new MoveHandler(this.gameState).provideValidMove();
                this.gameState.update(move);
                // connectionHandler... send update over server..
            }
            else{
                var move = this.connectionHandler.awaitOpponentMove();
                this.gameState.update(move);
            }
        }
    }

}
