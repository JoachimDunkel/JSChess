class MoveValidator {
    constructor(gameState) {
        this._gameState = gameState;
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
        //if my own king is in check the move has to end the check otherwise not valid..
        if(this._gameState.checkingHandler.iAmInCheck()){
            //deep copy board.. fuck javascript //TODO probably not working like this..
            let newGameState = _.cloneDeep(this._gameState);
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

        //if king move .. we need to know if any opponent piece attacks that field
        if( move.moveType === MoveType.KING_MOVE){
            //TODO not working yet..
            //To get this to work we maybe have to always save every field attacked by every opponent piece..
        }
        return true;
    }

    bulkSetIsCheckingMove(moves){
        let opponentKing = this._gameState.checkingHandler.getOpponentKing();

        for (let move of moves) {
            if(move.moveType === MoveType.KING_MOVE){
                continue;
            }

            //we have to copy the game state otherwise pieces block itself is blocked by itself..

            let newGameState = _.cloneDeep(this._gameState);
            //let newGameState = $.extend(true,this._gameState);

            newGameState.makeMove(move);
            //only works if the piece is updated.. on makeMove..
            let possibleMovesOnNextRound = new MoveGenerator(newGameState).generateMovesFor(move.piece);

            for (let possibleMove of possibleMovesOnNextRound) {
                if(possibleMove.newPosition.equals(opponentKing.getPosition())){
                    move.moveType = move.moveType | MoveType.CHECKING;
                    break;
                }
            }
        }
    }

    invalidateAllMoves(movesToValidate){
        let validMoves = [];
        movesToValidate.forEach(move => {
            if(this.moveIsValid(move)) validMoves.push(move);
        })
        return validMoves;
    }
}
