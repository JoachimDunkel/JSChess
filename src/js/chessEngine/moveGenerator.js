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
            new Move(piece,MoveType.DEFAULT, new Position(-1,1)),
            new Move(piece,MoveType.DEFAULT,new Position(-1,0)),
            new Move(piece,MoveType.DEFAULT,new Position(-1,-1)),

            new Move(piece,MoveType.DEFAULT,new Position(0,1)),
            new Move(piece,MoveType.DEFAULT,new Position(0,-1)),

            new Move(piece,MoveType.DEFAULT,new Position(1,1)),
            new Move(piece,MoveType.DEFAULT,new Position(1,0)),
            new Move(piece,MoveType.DEFAULT,new Position(1,-1)),
        ]


        //TODO implement both functions...

        if(this._queenSideCastlePossible(piece)){
            possibleMoves.add(new Move(piece, MoveType.DEFAULT, new Position(-3,0)))
        }

        if(this._kingSideCastlePossible(piece)){
            possibleMoves.add(new Move(piece, MoveType.DEFAULT, new Position(2,0)))
        }

        return possibleMoves;
    }

    _createPawnMoves(piece){
        let y = 1;
        let promotion_row = 7;

        if(piece.getPlayerType() === Player.BLACK){
            y = -1;
            promotion_row = 0;
        }

        let pawnMoves = [
            new Move(piece, MoveType.DEFAULT, new Position(0, y)),
        ]
        if(this._pawnCanMoveTwoSquares(piece)){
            pawnMoves.push(new Move(piece, MoveType.DEFAULT, new Position(0,2*y)));
        }

        if(this._pawnCanTakeLeft(piece)){
            pawnMoves.push(new Move(piece, MoveType.DEFAULT, new Position(-1, y)));
        }

        if(this._pawnCanTakeRight(piece)){
            pawnMoves.push(new Move(piece, MoveType.DEFAULT, new Position(1, y)));
        }

        if(this._pawnCanEnPassant(piece)){
            if(this._gameState.lastMoveMade.piece.getPosition().x > piece.getPosition().x){
                pawnMoves.push(new Move(piece, MoveType.EN_PASSANT, new Position(1,y)));
            }
            else{
                pawnMoves.push(new Move(piece, MoveType.EN_PASSANT, new Position(-1, y)));
            }
        }

        pawnMoves.forEach(move => {
           if(move.newPosition.y === promotion_row){
               move.moveType = move.moveType | MoveType.PAWN_PROMOTION;
           }
        });

        return pawnMoves;
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
            new Move(piece, MoveType.DEFAULT, new Position(-1, 2)),
            new Move(piece, MoveType.DEFAULT, new Position(1, 2)),

            new Move(piece, MoveType.DEFAULT, new Position(2, -1)),
            new Move(piece, MoveType.DEFAULT, new Position(2, 1)),

            new Move(piece, MoveType.DEFAULT, new Position(-1, -2)),
            new Move(piece, MoveType.DEFAULT, new Position(1, -2)),

            new Move(piece, MoveType.DEFAULT, new Position(-2, 1)),
            new Move(piece, MoveType.DEFAULT, new Position(-2, -1)),
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
            let field = this._gameState.board.getObjAtPosition(move);
            if(field instanceof Piece){
                if(piece.getPlayerType() !== field.getPlayerType()){
                    possibleMoves.push(new Move(piece,MoveType.DEFAULT, position));
                }
                break;
            }
            possibleMoves.push(new Move(piece,MoveType.DEFAULT, position));
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

    _pawnCanEnPassant(pawn){
        //IF THE last move was a pawn move of two squares and it is now on the same x as my pawn then yes..
        //and it is an x distance of one..
        return ((this._gameState.lastMoveMade.piece.getType() === PieceType.PAWN &&
            this._gameState.lastMoveMade.piece.getPosition().y === pawn.getPosition().y &&
            Math.abs(this._gameState.lastMoveMade.previousPosition.y - this._gameState.lastMoveMade.piece.getPosition().y) === 2) &&
            Math.abs(this._gameState.lastMoveMade.piece.getPosition().x - pawn.getPosition().x) === 1);
    }

    //TODO implement
    _queenSideCastlePossible(){
        // -3/ 0
        //if i have the rights to castle queenside
        //if the way between king and rook is not blocked
        //if the king is not in check or any move the king has to make while castling does not lead to check
    }

    //TODO implement
    _kingSideCastlePossible(){
        // -2/ 0
        //if i have the rights to castle kingside
        //if the way between king and rook is not blocked
        //if the king is not in check or any move the king has to make while castling does not lead to check
    }

}
