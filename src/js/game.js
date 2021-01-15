
class Game {
    constructor(connectionHandler) {
        this.connectionHandler = connectionHandler;
        this.gameState = new GameState();
        this.gameState.setMyColor(this.connectionHandler.provideUserColorFromServer());
        this.gameState.fillBoardWithPieces();
        this.myPlayerType = this.gameState.myColor;

        this.updateGameStateEvent = new MvcEvent();
        this.gameOverEvent = new MvcEvent();
    }

    // run(){
    //     if(this.gameState.currentPlayer === this.myPlayerType){
    //
    //         // connectionHandler... send update over server..
    //     }
    //     else{
    //         let move = this.connectionHandler.awaitOpponentMove();
    //         this.gameState.update(move);
    //     }
    // }

    tryMakeMove(moveUserWantsToMake){
        let moveHandler = new MoveHandler(this.gameState).startTurnInteraction();
        let move = moveHandler.lookupMove(moveUserWantsToMake);

        if(move !== null){
            this.gameState.update(move);
        }
        this.updateGameStateEvent.trigger();
    }

    gameOver(){
        this.gameOverEvent.trigger();
        console.log("Game over event triggered");
    }

    updateGameState(){
        this.updateGameStateEvent.trigger();
        console.log("Update game state event triggered");
    }

}
