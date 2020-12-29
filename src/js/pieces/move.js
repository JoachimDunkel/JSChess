class Move {

    constructor(piece, MoveType, direction) {
        this.piece = piece;
        this.moveType = MoveType;
        this.newPosition = piece.getPosition().add(direction);
        this.previousPosition = piece.getPosition();
    }


}
