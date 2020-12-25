class Move {

    constructor(piece, MoveType, newPosition) {
        this.piece = piece;
        this.moveType = MoveType;
        this.newPosition = newPosition;

        //does it make sense ?
        this.pawnToTakeByENPassant = null;
    }

}
