class Move {

    constructor(piece, MoveType, newPosition) {
        this.piece = piece;
        this.moveType = MoveType;
        this.newPosition = piece.getPosition().add(newPosition);
        this.previousPosition = piece.getPosition();
    }

}
