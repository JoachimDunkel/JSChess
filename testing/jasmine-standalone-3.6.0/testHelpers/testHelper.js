class TestHelper {
    onlyRookAndPawnOnBoard(){
        let rook = new Piece(Player.WHITE, PieceType.ROOK, new Position(1,0), "irrelevant");
        let pawn = new Piece(Player.WHITE, PieceType.PAWN, new Position(1,6), "irrelevant");

        let board = new Board();
        board.setPiece(rook);
        board.setPiece(pawn);
        return [rook,pawn, board];
    }

    //TODO helper function for testing possible moves...


}
