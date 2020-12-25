class MoveGenerator {
    constructor(gameState) {
        this._gameState = gameState;
    }

    generateMovesFor(piece){
        switch (piece.getType()) {
            case PieceType.PAWN:
                return this._createPawnMoves(piece);
            case PieceType.ROOK:
                return this._createRookMoves(piece);
            case PieceType.KING:
                return this._createKingMoves(piece);
            case PieceType.QUEEN:
                return this._createQueenMoves(piece);
            case PieceType.KNIGHT:
                return this._createKnightMoves(piece);
            case PieceType.BISHOP:
                return this._createBishopMoves(piece);
        }
    }
    _createKingMoves(piece){
        let possibleMoves = [
            new Move(piece,MoveType.KING_MOVE, new Position(-1,1)),
            new Move(piece,MoveType.KING_MOVE,new Position(-1,0)),
            new Move(piece,MoveType.KING_MOVE,new Position(-1,-1)),

            new Move(piece,MoveType.KING_MOVE,new Position(0,1)),
            new Move(piece,MoveType.KING_MOVE,new Position(0,-1)),

            new Move(piece,MoveType.KING_MOVE,new Position(1,1)),
            new Move(piece,MoveType.KING_MOVE,new Position(1,0)),
            new Move(piece,MoveType.KING_MOVE,new Position(1,-1)),
        ]


        //TODO implement both functions...

        if(this._queenSideCastlePossible(piece)){
            possibleMoves.add(new Move(piece, MoveType.KING_MOVE, new Position(3,0)))
        }

        if(this._kingSideCastlePossible(piece)){
            possibleMoves.add(new Move(piece, MoveType.KING_MOVE, new Position(-2,0)))
        }

        return possibleMoves;
    }

    //todo check promotion move outside
    //TODO dynamically add pawn moves based on methods what the pawn can do...
    _createPawnMoves(piece){
        let blackPawnMoves = [new Position(0, -1), new Position(0, -2), new Position(-1,-1), new Position(1,-1)];
        let whitePawnMoves = [new Position(0, 1), new Position(0, 2), new Position(-1,1), new Position(1,1)];
        let possibleMoves = blackPawnMoves;
        if(piece.getPlayerType() === Player.WHITE){
            possibleMoves = whitePawnMoves;
        }
        return possibleMoves;
    }

    _createRookMoves(piece){
        let possibleMoves = [];

        //create left moves
        this._addMoveForEveryEmptyField(possibleMoves, piece, new Position(-1,0));
        //create right moves
        this._addMoveForEveryEmptyField(possibleMoves, piece, new Position(1,0));
        //create up moves
        this._addMoveForEveryEmptyField(possibleMoves, piece, new Position(0,1));
        //create down moves
        this._addMoveForEveryEmptyField(possibleMoves, piece, new Position(0,-1));

        return possibleMoves;
    }

    _createBishopMoves(piece){
        let possibleMoves = [];

        //create Moves For All Diagonals
        this._addMoveForEveryEmptyField(possibleMoves, piece, new Position(-1,-1));
        this._addMoveForEveryEmptyField(possibleMoves, piece, new Position(1,-1));
        this._addMoveForEveryEmptyField(possibleMoves, piece, new Position(-1,1));
        this._addMoveForEveryEmptyField(possibleMoves, piece, new Position(1,1));

        return possibleMoves;
    }

    _createQueenMoves(piece){
        return this._createRookMoves(piece).concat(this._createBishopMoves(piece));
    }

    _createKnightMoves(piece){
        return [
            new Position(-1, 2),
            new Position(1, 2),

            new Position(2, -1),
            new Position(2, 1),

            new Position(-1, -2),
            new Position(1, -2),

            new Position(-2, 1),
            new Position(-2, -1),
        ];
    }

    _addMoveForEveryEmptyField(possibleMoves, piece, moveDirection){
        for (let i = 1; i < BoardSize -1; i++) {
            //füge solange hinzu bis ein piece am board ist, falls es opponent piece ist dann füge das auch hinzu
            let position = moveDirection.multiply(new Position(i,i));

            let move = position.add(piece.getPosition());
            if(this._gameState.board.moveIsOutOfBounds(move)){
                break;
            }
            let field = this._gameState.board.getObjAtPosition(position);
            if(field instanceof Piece){
                if(piece.getPlayerType() !== field.getPlayerType()){
                    possibleMoves.add(position);
                }
                break;
            }
            possibleMoves.add(position);
        }
    }

    _pawnCanMoveTwoSquares(pawn){
        let requiredXPositionForDoubleMove = 6;
        if(pawn.getPlayerType() === Player.WHITE){
            requiredXPositionForDoubleMove = 1;
        }
        return (pawn.getPosition().x === requiredXPositionForDoubleMove);
    }

    _pawnCanTakeLeft(pawn){
        let reqForLeftTake = new Position(-1,-1);
        if(pawn.getPlayerType() === Player.WHITE){
            reqForLeftTake = new Position(-1,1)
        }
        return this._pawnCanTake(reqForLeftTake, pawn)
    }

    _pawnCanTakeRight(pawn){
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

    //TODO all of them...

    _pawnCanEnPassantLeft(move, pawn){

    }

    _pawnCanEnPassantRight(move, pawn){

    }


    _pawnCanBePromoted(pawn){

    }

    _queenSideCastlePossible(king){

    }

    _kingSideCastlePossible(king){

    }

}
