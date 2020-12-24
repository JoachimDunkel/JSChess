class MoveGenerator {
    constructor(gameState) {
        this._gameState = gameState;
        this._moveValidator = new MoveValidator(gameState);

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
            new Position(-1,1),
            new Position(-1,0),
            new Position(-1,-1),

            new Position(0,1),
            new Position(0,-1),

            new Position(1,1),
            new Position(1,0),
            new Position(1,-1),
        ]

        //TODO move validator can quennside castle => add
        //TODO mvoe validator can kingside castle => add
        //TODO can not move into a check..
            //Validate all moves if I go on a square that can be reached from the opponent.

        // let queenCastle = new Position(3,0);
        // let kingSideCastle = new Position(-2,0);
        //
        // possibleMoves.push(queenCastle);
        // possibleMoves.push(kingSideCastle);

        return this._moveValidator.invalidateAllMoves(piece, possibleMoves);
    }

    //todo check promotion move outside
    _createPawnMoves(piece){
        let blackPawnMoves = [new Position(0, -1), new Position(0, -2), new Position(-1,-1), new Position(1,-1)];
        let whitePawnMoves = [new Position(0, 1), new Position(0, 2), new Position(-1,1), new Position(1,1)];
        let movesToValidate = blackPawnMoves;
        if(piece.getPlayerType() === Player.WHITE){
            movesToValidate = whitePawnMoves;
        }
        return this._moveValidator.invalidateAllMoves(piece, movesToValidate);
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

        return this._moveValidator.invalidateAllMoves(piece, possibleMoves);
    }

    _createBishopMoves(piece){
        let possibleMoves = [];

        //create Moves For All Diagonals
        this._addMoveForEveryEmptyField(possibleMoves, piece, new Position(-1,-1));
        this._addMoveForEveryEmptyField(possibleMoves, piece, new Position(1,-1));
        this._addMoveForEveryEmptyField(possibleMoves, piece, new Position(-1,1));
        this._addMoveForEveryEmptyField(possibleMoves, piece, new Position(1,1));

        return this._moveValidator.invalidateAllMoves(piece, possibleMoves);
    }

    _createQueenMoves(piece){
        return this._createRookMoves(piece).concat(this._createBishopMoves(piece));
    }

    _createKnightMoves(piece){
        let possibleMoves = [
            new Position(-1,2),
            new Position(1,2),

            new Position(2,-1),
            new Position(2,1),

            new Position(-1,-2),
            new Position(1,-2),

            new Position(-2,1),
            new Position(-2,-1),
        ]

        return this._moveValidator.invalidateAllMoves(piece, possibleMoves);
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
                    possibleMoves.push(position);
                }
                break;
            }

            //TODO convert to move and see if opponent king is in check. if yes the set move type to check...
            possibleMoves.push(position);
        }
    }

}
