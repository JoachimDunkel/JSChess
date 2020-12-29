class MoveValidator {

    constructor(gameState) {
        this._gameState = gameState;
    }

    moveLeadsToCheck(move, attackedPlayer){
        let newGameState = _.cloneDeep(this._gameState);
        newGameState.makeMove(move);
        newGameState.setMyColor(attackedPlayer);
        let opponentPieces = this._gameState.board.getAllPiecesOfPlayer(attackedPlayer);

        let myKingPosition = this._gameState.checkingHandler.getMyKing().getPosition();
        for (const opponentPiece of opponentPieces) {
            let possibleMoves = new MoveGenerator(newGameState).generateMovesFor(opponentPiece);
            let validMoves = this.moveIsValid(possibleMoves);
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
        movesToValidate.forEach(move => {
            if(this.moveIsValid(move) && !this.moveLeadsToCheck(move, this._gameState.myColor)){
                validMoves.push(move);
            }
        })
        return validMoves;
    }
}
