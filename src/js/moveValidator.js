class MoveValidator {
    constructor(gameState) {
        this._gameState = gameState;
    }

    moveIsValid(piece, move){
        //for every case check if i am in check and if that move blocks the check.. otherwhise i cant move...
        //check for every move if it is out of bounds..

        switch (piece.getType()) {
            case PieceType.PAWN:
                //canFiancetto
                //canMoveTwoSquares
                //canTakePiece
                return true;
            case PieceType.ROOK:
                return true;
            case PieceType.KING:
                //canCastleQueenside & castleKingSide
                return true;
            case PieceType.QUEEN:
                return true;
            case PieceType.KNIGHT:
                return true;
            case PieceType.BISHOP:
                return true;
        }
    }

    invalidateAllMoves(piece, movesToValidate){
        let validMoves = [];
        movesToValidate.forEach( move => {
            if(this.moveIsValid(piece, move)) validMoves.push(move);
        })
        return validMoves;
    }
}
