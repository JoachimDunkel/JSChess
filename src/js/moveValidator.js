class MoveValidator {
    constructor(gameState) {
        this._gameState = gameState;
    }

    _moveInBounds(piece, move){
        let resultingPosition = piece.getPosition().add(move);
        return this._gameState.board.moveIsOutOfBounds(resultingPosition);

    }

    _invalidateMove(piece, move){
        return (this._moveInBounds(piece, move)); //&& ..
    }

    moveIsValid(piece, move){
        //Check if move is in bounds
        //Check if move is blocked by own piece
        //if my own king is in check the move has to block the check otherwise not valid..

        return this._invalidateMove(piece,move);
    }

    invalidateAllMoves(piece, movesToValidate){
        let validMoves = [];
        movesToValidate.forEach( move => {
            if(this.moveIsValid(piece, move)) validMoves.push(move);
        })
        return validMoves;
    }

    pawnCanMoveTwoSquares(pawn){
        let requiredXPositionForDoubleMove = 6;
        if(pawn.getPlayerType() === Player.WHITE){
            requiredXPositionForDoubleMove = 1;
        }
        return (pawn.getPosition().x === requiredXPositionForDoubleMove);
    }

    pawnCanTakeLeft(pawn){
        let reqForLeftTake = new Position(-1,-1);
        if(pawn.getPlayerType() === Player.WHITE){
            reqForLeftTake = new Position(-1,1)
        }
        return this._pawnCanTake(reqForLeftTake, pawn)
    }

    pawnCanTakeRight(pawn){
        let reqForLeftTake = new Position(1,-1);
        if(pawn.getPlayerType() === Player.WHITE){
            reqForLeftTake = new Position(1,1)
        }
        return this._pawnCanTake(reqForLeftTake, pawn)
    }

    _pawnCanTake(move, pawn){
        let resultingPosition = move.add(pawn.getPosition());
        let field = this._gameState.board.getObjAtPosition(resultingPosition);
        if(field instanceof Piece){
            if(field.getPlayerType() !== pawn.getPlayerType())
                return true;
        }
        return false;
    }

    pawnCanEnPassantLeft(move, pawn){

    }

    pawnCanEnPassantRight(move, pawn){

    }


    pawnCanBePromoted(pawn){

    }

}
