

class Game {
    constructor(connectionHandler, myPlayerType) {
        this.connectionHandler = connectionHandler;
        this.gameState = new GameState();
        this.gameState.setMyColor(this.connectionHandler.provideUserColorFromServer());

        this.gameState.initBoardUI(myPlayerType)
        this.gameState.fillBoardWithPieces(myPlayerType); // filling depends on the player's colour

        this.myPlayerType = myPlayerType;
    }

    run(){
        //check states
        //update
        //wait x time and run run() again.
        
        // No WHILE-LOOP here anymore

        this.gameState.currentPlayer = this.connectionHandler.getCurrentPlayer()

        if(this.gameState.currentPlayer === this.myPlayerType){
            let moveHandler = new MoveHandler(this.gameState);

            moveHandler.startTurnInteraction();
            moveHandler.askMoveFromUser();

        }
        else
            {
                let move = this.connectionHandler.awaitOpponentMove();
                this.gameState.update(move);
            }
        }
}


