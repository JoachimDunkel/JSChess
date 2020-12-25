class MoveValidator {
    constructor(gameState) {
        this._gameState = gameState;
    }


    moveIsValid(move){
        //Check if move is in bounds
        let position = move.piece.getPosition().add(move.newPosition);
        if(this._gameState.board.moveIsOutOfBounds(position))
            return false;

        //Check if move is blocked by own piece
        let obj = this._gameState.board.getObjAtPosition(position)
        if(obj instanceof Piece){
            if(obj.getPlayerType() === move.piece.getPlayerType()){
                return false;
            }
        }
        //if my own king is in check the move has to end the check otherwise not valid..
        //or if i move the king he can not move into a check..
        if(this._gameState.iAmInCheck() || move.moveType === MoveType.KING_MOVE){
            //deep copy board.. fuck javascript //TODO probably not working like this..
            let newGameState = JSON.parse(JSON.stringify(this._gameState))
            newGameState.makeMove(move);

            for (let checkingPiece in newGameState.checkingHandler.checkingPieces) {
                let myKingPosition = newGameState.checkingHandler.getMyKing();
                let movesOfCheckingPieces = new MoveGenerator(newGameState).generateMovesFor(checkingPiece);
                movesOfCheckingPieces.forEach(move => {
                    if(move === myKingPosition){
                        return false;
                    }
                })
            }
        }
        return true;
    }

    invalidateAllMoves(piece, movesToValidate){
        let validMoves = [];
        movesToValidate.forEach( move => {
            if(this.moveIsValid(piece, move)) validMoves.push(move);
        })
        return validMoves;
    }
}
