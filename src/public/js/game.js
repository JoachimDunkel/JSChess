
class Game {
    constructor() {
        this.gameState = new GameState();

        this.gameState.setMyColor(getColor());
        this.gameState.fillBoardWithPieces();

        this.updateGameStateEvent = new MvcEvent();
        this.gameOverEvent = new MvcEvent();
    }

    startTurn() {
        this.moveHandler = new MoveHandler(this.gameState);
        let gameStatus = this.moveHandler.startTurnInteraction();
        if(gameStatus !== GameStatus.RUNNING){
            this.gameOver(gameStatus);
        }

        this.updateGameStateEvent.trigger(this.gameState);
    }

    tryMakeMove(moveUserWantsToMake){
        let from = moveUserWantsToMake[0];
        let to = moveUserWantsToMake[1];

        let rotatedFrom = Util._uiPositionCoordinateTranslation(from, this.gameState);
        let rotatedTo = Util._uiPositionCoordinateTranslation(to, this.gameState);
        moveUserWantsToMake = [rotatedFrom, rotatedTo];

        let move = this.moveHandler.lookupMove(moveUserWantsToMake);

        if(move == null){
            return;
        }
        this.gameState.update(move);
        play();


        this.updateGameStateEvent.trigger(this.gameState);
    }

    gameOver(gameStatus){
        this.gameOverEvent.trigger(gameStatus);
        console.log("Game over event triggered");
    }

    requestPossibleMoves(fromPosition){
        let rotatedFrom = Util._uiPositionCoordinateTranslation(fromPosition, this.gameState);

        let possibleMoves = this.moveHandler.requestPossibleMovesForPosition(rotatedFrom);
        let parsedMoves = [];
        for (const move of possibleMoves) {
            let newMove = _.cloneDeep(move);

            newMove.newPosition = Util._uiPositionCoordinateTranslation(newMove.newPosition, this.gameState);
            newMove.previousPosition = Util._uiPositionCoordinateTranslation(newMove.previousPosition , this.gameState);
            parsedMoves.push(newMove);
        }
        return parsedMoves;
    }

    getAllMyPiecePositions(){
        let myPieces = this.gameState.board.getAllPiecesOfPlayer(this.gameState.myColor);
        let positions = []
        for (const piece of myPieces) {
            let position = _.cloneDeep(piece.getPosition());
            position = Util._uiPositionCoordinateTranslation(position, this.gameState);
            positions.push(position);
        }
        return positions;
    }
}
