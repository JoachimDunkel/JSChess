

class Game {
    constructor(connectionHandler, myPlayerType) {
        this.connectionHandler = connectionHandler;
        this.gameState = new GameState();
        this.gameState.setMyColor(this.connectionHandler.provideUserColorFromServer());
        this.gameState.fillBoardWithPieces();
        this.myPlayerType = myPlayerType;
    }

    run(){
        while (BOOL.TRUE){
            if(this.gameState.currentPlayer === this.myPlayerType){
                let moveHandler = new MoveHandler(this.gameState).startTurnInteraction();
                let move = moveHandler.askMoveFromUser();

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
