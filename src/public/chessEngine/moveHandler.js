class MoveHandler {
    constructor(gameState) {
        this._gameState = gameState;
        this.moveGenerator = new MoveGenerator(this._gameState);
        this.moveValidator = new MoveValidator(this._gameState);
    }

    startTurnInteraction(){

        //game over
        if(this._gameState.gameStatus !== GameStatus.RUNNING){
            return this._gameState.gameStatus;
        }

        //if fifty moves rule its a draw
        if(this._gameState.fiftyMovesCounter >= 50){

            return this._gameState.gameStatus;
        }


        this.allPossiblesMovesForPlayer = this._generateAllPossibleMovesForPlayer(this._gameState.myColor);

        //game over
        if(this.allPossiblesMovesForPlayer.length === 0){
            if(this._gameState.iAmInCheck()){
                this._gameState.gameStatus = GameStatus.LOST;
            }
            else{
                this._gameState.gameStatus = GameStatus.DRAW;
            }
        }
        return this._gameState.gameStatus;
    }

    lookupMove(userMove) {
        let from = userMove[0];
        let to = userMove[1];
        //iterate over every move and see if it fits..
        for (const move of this.allPossiblesMovesForPlayer) {
            if(move.previousPosition.equals(from) && move.newPosition.equals(to)){
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
            for (const move of moves) {
                possibleMoves.push(move);
            }
        }
        return possibleMoves;
    }

    requestPossibleMovesForPosition(fromPosition){
        let possibleMovesToMake = [];
        for (const move of this.allPossiblesMovesForPlayer) {
            if(move.previousPosition.equals(fromPosition)){
                possibleMovesToMake.push(move);
            }
        }
        return possibleMovesToMake;
    }



    _generateValidMovesFor(piece){
        let possibleMoves = this.moveGenerator.generateMovesFor(piece);
        return this.moveValidator.invalidateAllMoves(possibleMoves);
    }
}
