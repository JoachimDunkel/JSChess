class MoveHandler {
    constructor(gameState) {
        this._gameState = gameState;
    }

    askMoveFromUser(){
        while (BOOL.TRUE){
            //Await user move. from ui hook here...


            let moveGenerator = new MoveGenerator(this._gameState);
            let moveValidator = new MoveValidator(this._gameState);


            //lets say we want to make a knight move...
            let moveUserWantsToMake = {oldPosition : new Position(1,0), newPosition : new Position(0,2)};

            let piece = this._gameState.board.getObjAtPosition(moveUserWantsToMake.oldPosition);


            let possibleMoves = moveGenerator.generateMovesFor(piece);
            let validMoves = moveValidator.invalidateAllMoves(piece, possibleMoves);
            validMoves.forEach( move => {
                if(move.newPosition === moveUserWantsToMake.newPosition){
                    console.log("Found valid user move");
                    //apply user move to gamestate..
                    return move;
                }
            });

            //re-do until user makes a valid move...

        }

    }

}
