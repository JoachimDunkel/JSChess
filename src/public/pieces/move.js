class Move {

    constructor(piece, MoveType, direction) {
        this.piece = piece;
        this.moveType = MoveType;
        this.newPosition = piece.getPosition().add(direction);
        this.previousPosition = piece.getPosition();
    }

    getRookMoveForCastling(board){
        if(this.moveType !== MoveType.CASTLE) return null;
        //find out the correct rook.
        let myKing = this.piece;
        let myKingRank = myKing.getPosition().y + 1;
        let rookPosition = myKing.getPosition().add(new Position(-4, 0));
        let rookDirection = new Position(3,0);
        if(this.newPosition.equals(Position.fromChessNumbering(FILE.G,myKingRank))){
            rookPosition = myKing.getPosition().add(new Position(3,0))
            rookDirection = new Position(-2,0);
        }

        if(board.moveIsOutOfBounds(rookPosition)) return null;
        let rook = board.getObjAtPosition(rookPosition);
        if(rook.getType() !== PieceType.ROOK || rook.getPlayerType() !== this.piece.getPlayerType()) return null;
        return new Move(rook, MoveType.DEFAULT, rookDirection);
    }
}
