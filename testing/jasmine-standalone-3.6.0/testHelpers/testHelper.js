class TestHelper {
    onlyRookAndPawnOnBoard(){
        let rook = new Piece(Player.WHITE, PieceType.ROOK, new Position(0,0), "irrelevant");
        let pawn = new Piece(Player.WHITE, PieceType.PAWN, new Position(0,6), "irrelevant");

        let board = new Board();
        board.setPiece(rook);
        board.setPiece(pawn);
        return [rook,pawn, board];
    }

    createValidBoard(gameState){
        let oppKing = new Piece(Player.BLACK, PieceType.KING, new Position(4,7), "bKing");
        let myKing = new Piece(Player.WHITE, PieceType.KING, new Position(4,0), "wKing");

        gameState.board.setPiece(oppKing);
        gameState.board.setPiece(myKing);

        gameState.setMyColor(Player.WHITE);
        gameState.setupKings(myKing, oppKing);

        let rook = new Piece(Player.WHITE, PieceType.ROOK, new Position(0,0), "wQSide Rook");
        gameState.board.setPiece(rook);
    }

    createPawnTakingScenario(gameState){
        let wPawn = new Piece(Player.WHITE, PieceType.PAWN, new  Position(3,4), "");
        gameState.board.setPiece(wPawn);

        let bPawn = new Piece(Player.BLACK, PieceType.PAWN, new  Position(2,5), "");
        gameState.board.setPiece(bPawn);
        return [wPawn, bPawn];
    }

    createEnPassantScenario(gameState){
        let wPawn = new Piece(Player.WHITE, PieceType.PAWN, new Position(3,4), "white Pawn");
        let bPawn = new Piece(Player.BLACK, PieceType.PAWN, new Position(4,6), "black Pawn");

        gameState.board.setPiece(wPawn);
        gameState.board.setPiece(bPawn);

        let move = new Move(bPawn, MoveType.DEFAULT, new Position(0,-2));
        gameState.board.makeMove(move);

        gameState.lastMoveMade = move;
        gameState.halfMoveCounter = 7;

        return [wPawn, bPawn];
    }
}
