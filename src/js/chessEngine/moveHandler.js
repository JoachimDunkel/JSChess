class MoveHandler {
    constructor(gameState) {
        this._gameState = gameState;
        this.moveGenerator = new MoveGenerator(this._gameState);
        this.moveValidator = new MoveValidator(this._gameState);
    }

    startTurnInteraction(){

        //game over
        if(this._gameState.gameStatus !== GameStatus.RUNNING){
            this.startGameOverEvent(this._gameState.gameStatus);
        }

        //if fifty moves rule its a draw
        if(this._gameState.fiftyMovesCounter >= 50){
            this.startGameOverEvent(GameStatus.DRAW);
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
            this.startGameOverEvent(this._gameState.gameStatus);
        }
    }

    startGameOverEvent(gameStatus){
        console.log("Game is over, its a ", gameStatus);
        // TODO
        // => show in ui hook
        // => send signal over server..
    }

    _lookupMove(moveUserWantsToMake) {
        //iterate over every move and see if it fits..
        for (const move of this.allPossiblesMovesForPlayer) {
            //debugger;
            if(move.previousPosition.x === moveUserWantsToMake.oldPosition.x
                && move.previousPosition.y === moveUserWantsToMake.oldPosition.y
                && move.newPosition.x === moveUserWantsToMake.newPosition.x
                && move.newPosition.y === moveUserWantsToMake.newPosition.y)
            {
                console.log("previousPosition", move.previousPosition.x);
                console.log("previousPosition", move.previousPosition.y);
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

            console.log("this is my p " + piece);
            let moves = this._generateValidMovesFor(piece);
            for (const move of moves) {
                possibleMoves.push(move);
            }
        }
        return possibleMoves;
    }

    askMoveFromUser(){
        var _thisRef = this;

        $('img').draggable();
        $('div').droppable({
            drop: function(ev, ui) {
                let dropped = ui.draggable;
                let droppedOn = $(this);

                //Position of the img
                console.log("Start pos.: " + dropped.attr("id"));
                let old_pos = dropped.attr("id")
                //Destination aka where it was dropped.
                console.log("Moved pos.: " + droppedOn.attr("id"));
                let new_pos = droppedOn.attr("id")
                //TODO Check if move is valid


                var old_x =  old_pos % 8;
                var old_y = (old_pos - old_x) / 8;
                var new_x =  new_pos % 8;
                var new_y = (new_pos - new_x) / 8;
                let moveUserWantsToMake = {
                    oldPosition : new Position(old_x,old_y),
                    newPosition : new Position(new_x,new_y)
                };

                console.log(moveUserWantsToMake.oldPosition.y + "," + moveUserWantsToMake.oldPosition.x + " -> "
                    + moveUserWantsToMake.newPosition.y + "," + moveUserWantsToMake.newPosition.x);

                console.log("My Color: " + _thisRef._gameState.getMyColor());

                //look up if we can make this move in our datastructure..
                // use function _lookupMove() to see if valid
                let move;
                move = _thisRef._lookupMove(moveUserWantsToMake);

                if(move === null){
                    // not valid move
                    // return to original position
                    $(dropped).css({top: 12, left: -2}).appendTo(dropped);
                    return null;
                }

                console.log("move  ", move);

                //If valid, only then move it.
                $(dropped).detach().css({top: 12, left: -2}).appendTo(droppedOn);


                _thisRef._gameState.update(move);

                _thisRef.allPossiblesMovesForPlayer =
                    _thisRef._generateAllPossibleMovesForPlayer(_thisRef._gameState.myColor);

                // connectionHandler... send update over server..
                // send connectionHandler get move from opponent
                //$(dropped).detach().css({top: 12, left: -2}).appendTo(droppedOn);
                //let moveOpponent = _thisRef.connectionHandler.awaitOpponentMove();
                //this.gameState.update(moveOpponent);
                //_thisRef._gameState.update(move);
            }
        });
        $(' div').not(' div:empty').droppable();

    }

    _generateValidMovesFor(piece){
        let possibleMoves = this.moveGenerator.generateMovesFor(piece);
        return this.moveValidator.invalidateAllMoves(possibleMoves);
    }
}
