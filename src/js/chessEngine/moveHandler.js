class MoveHandler {
    constructor(gameState) {
        this._gameState = gameState;
        this.moveGenerator = new MoveGenerator(this._gameState);
        this.moveValidator = new MoveValidator(this._gameState);

    }

    askMoveFromUser(){
        while (BOOL.TRUE){
            //Await user move. from ui hook here...

            //lets say we want to make a knight move...
            let moveUserWantsToMake = {oldPosition : new Position(1,0), newPosition : new Position(0,2)};

            let move = this._invalidateMove(moveUserWantsToMake);

            if(move !== null){
                return move;
            }
            //re-do until user makes a valid move...
        }

    }

    _invalidateMove(moveUserWantsToMake){
        let piece = this._gameState.board.getObjAtPosition(moveUserWantsToMake.oldPosition);
        if(!(piece instanceof(Piece)))
            return null;

        let possibleMoves = this.moveGenerator.generateMovesFor(piece);
        let validMoves = this.moveValidator.invalidateAllMoves(piece, possibleMoves);
        validMoves.forEach( move => {
            if(move.newPosition === moveUserWantsToMake.newPosition){
                console.log("Found valid user move");
                return move;
            }
        });

        this.moveValidator.bulkSetIsCheckingMove(validMoves);

        return null;
    }

}
