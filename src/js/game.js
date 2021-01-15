
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

    //TODO for debugging for now..
    //if its opponents turn block all view events
    //and wait for move from connectionhandler then update view..
    startTurn(){
        this.moveHandler = new MoveHandler(this.gameState);
        let gameStatus = this.moveHandler.startTurnInteraction();
        if(gameStatus !== GameStatus.RUNNING){
            this.gameOver(gameStatus);
        }

        this.updateGameStateEvent.trigger(this.gameState);
    }

    tryMakeMove(moveUserWantsToMake){
        let move = this.moveHandler.lookupMove(moveUserWantsToMake);

        if(move !== null){
            this.gameState.update(move);
        }
        this.updateGameState();
    }

    gameOver(gameStatus){
        this.gameOverEvent.trigger(gameStatus);
        console.log("Game over event triggered");
    }

    updateGameState(){
        this.updateGameStateEvent.trigger(this.gameState);
        console.log("Update game state event triggered");
    }
}
