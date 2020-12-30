class MoveValidator {

    constructor(gameState) {
        this._gameState = gameState;
    }

    moveLeadsToCheckOn(move, thisPlayer){
        let newGameState = _.cloneDeep(this._gameState);
        let moveCopy = _.cloneDeep(move);

        newGameState.setMyColor(moveCopy.piece.getPlayerType());
        newGameState.makeMove(moveCopy);
        newGameState.setMyColor(thisPlayer);
        let opponentPieces = newGameState.board.getAllPiecesOfPlayer(newGameState.opponenColor);

        let myKingPosition = newGameState.getMyKing().getPosition();
        newGameState.setMyColor(newGameState.opponenColor);
        for (const opponentPiece of opponentPieces) {
            let moveGenerator = new MoveGenerator(newGameState);
            moveGenerator.withCastleMoves = false;
            let possibleMoves = moveGenerator.generateMovesFor(opponentPiece);
            let validMoves = this.validateAllMoves(possibleMoves);
            for (const validMove of validMoves) {
                if(validMove.newPosition.equals(myKingPosition)){
                    return true;
                }
            }
        }
        return false;
    }

    moveIsValid(move){
        //Check if move is in bounds
        if(this._gameState.board.moveIsOutOfBounds(move.newPosition))
            return false;

        //Check if move is blocked by own piece
        let obj = this._gameState.board.getObjAtPosition(move.newPosition)
        if(obj instanceof Piece){
            if(obj.getPlayerType() === move.piece.getPlayerType()){
                return false;
            }
        }
        return true;
    }

    invalidateAllMoves(movesToValidate){
        let validMoves = [];

        for (const move of movesToValidate) {
            if(this.moveIsValid(move) && !this.moveLeadsToCheckOn(move, this._gameState.myColor)){
                validMoves.push(move);
            }
        }
        return validMoves;
    }

    validateAllMoves(movesToValidate){
        let validMoves = [];

        for (const move of movesToValidate) {
            if(this.moveIsValid(move)){
                validMoves.push(move);
            }
        }
        return validMoves;

    }

    movesDoNotLeadToCheck(movesToValidate){
        let validMoves = [];

        for (const move of movesToValidate) {
            if(!this.moveLeadsToCheckOn(move, this._gameState.myColor)){
                validMoves.push(move);
            }
        }
        return validMoves;
    }
}
