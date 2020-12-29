class MoveHandler {
    constructor(gameState) {
        this._gameState = gameState;
        this.moveGenerator = new MoveGenerator(this._gameState);
        this.moveValidator = new MoveValidator(this._gameState);

    }

    startTurnInteraction(){

        //game over
        if(this._gameState.gameStatus !== GameStatus.RUNNING){
            this.startGameOverEvent(this._gameState.gameStatus);
        }

        //TODO if fifty move rule game over draw...

        this.allPossiblesMovesForPlayer = this._generateAllPossibleMovesForPlayer(this._gameState.myColor);

        //game over
        if(this.allPossiblesMovesForPlayer.length === 0){
            if(this._gameState.checkingHandler.iAmInCheck()){
                this._gameState.gameStatus = GameStatus.LOST;
            }
            else{
                this._gameState.gameStatus = GameStatus.DRAW;
            }
            this.startGameOverEvent(this._gameState.gameStatus);
        }

        let move = this.askMoveFromUser();
        this._gameState.update(move);
    }

    startGameOverEvent(gameStatus){
        console.log("Game is over, its a ", gameStatus);
        // => show in ui hook
        // => send signal over server..
    }

    _lookupMove(moveUserWantsToMake) {
        //iterate over every move and see if it fits..
        for (const move of this.allPossiblesMovesForPlayer) {
            if(move.previousPosition === moveUserWantsToMake.oldPosition && move.newPosition === moveUserWantsToMake.newPosition){
                return move;
            }
        }
        return null;
    }

    _generateAllPossibleMovesForPlayer(playerType){
        //get all pieces from the board..
        let myPieces = this._gameState.board.getAllPiecesOfPlayer(playerType);

        //trivial datastructure for now..
        let possibleMoves = [];
        for (const piece of myPieces) {
            let moves = this._generateValidMovesFor(piece);
            possibleMoves.push(moves);
        }

        return possibleMoves;

    }

    askMoveFromUser(){
        while (BOOL.TRUE){
            //Await user move. from ui hook here...

            //lets say we want to make a knight move... this should be retrieved from ui.
            let moveUserWantsToMake = {oldPosition : new Position(1,0), newPosition : new Position(0,2)};

            //look up if we can make this move in our datastructure..
            let move =  this._lookupMove(moveUserWantsToMake);

            if(move !== null){
                return move;
            }
            //re-do until user makes a valid move...
        }

    }

    _generateValidMovesFor(piece){
        let possibleMoves = this.moveGenerator.generateMovesFor(piece);
        return this.moveValidator.invalidateAllMoves(possibleMoves);
    }
}
