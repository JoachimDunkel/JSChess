describe("Game state", () =>{
    let moveValidator;
    let gameState;

    beforeEach(() => {
        gameState = new GameState();
        gameState.setMyColor(Player.WHITE);
        moveValidator = new MoveValidator(gameState);
    });


    //update Castling rights
    it('removes my queen side castling rights if Move with the queen side rook', function () {
        let rookPawnBoard = new TestHelper().onlyRookAndPawnOnBoard();
        let rook = rookPawnBoard[0];
        gameState.board = rookPawnBoard[2];

        let move = new Move(rook, MoveType.DEFAULT,new Position(0,3));
        gameState.updateCastlingRights(move);
        expect(gameState.iHaveQueenSideCastlingRights()).toBeFalse();
        expect(gameState.iHaveKingSideCastlingRights()).toBeTrue();
    });

    it('removes my king side castling rights if Move with the kings side rook', function () {
        let rookPawnBoard = new TestHelper().onlyRookAndPawnOnBoard();
        let rook = rookPawnBoard[0];
        gameState.board = rookPawnBoard[2];
        gameState.board.clearField(rook.getPosition());
        rook.setPosition(new Position(7,0));
        gameState.board.setPiece(rook);

        let move = new Move(rook, MoveType.DEFAULT,new Position(0,3));
        gameState.updateCastlingRights(move);
        expect(gameState.iHaveKingSideCastlingRights()).toBeFalse();
        expect(gameState.iHaveQueenSideCastlingRights()).toBeTrue();
    });

    it('updating castle rights work with the whole update function', function () {
        new TestHelper().createValidBoard(gameState);
        let rook = gameState.board.getObjAtPosition(new Position(0,0));

        let move = new Move(rook, MoveType.DEFAULT,new Position(0,3));
        gameState.update(move);
        expect(gameState.iHaveQueenSideCastlingRights()).toBeFalse();
        expect(gameState.iHaveKingSideCastlingRights()).toBeTrue();

    });

    it('updating the castling rights also works for black', function () {
        let rook = new Piece(Player.BLACK, PieceType.ROOK,new Position(0,7), "");
        gameState.board.setPiece(rook);

        let move = new Move(rook, MoveType.DEFAULT, new Position(3,0));
        gameState.myColor = Player.BLACK;
        gameState.opponentColor = Player.WHITE;
        gameState.updateCastlingRights(move);
        expect(gameState.castlePermissions).toBe(7);
    });

    it('removes all of my castling rights if I move with the king', function () {
        let king = new Piece(Player.WHITE, PieceType.KING, new Position(4,0), "");
        gameState.board.setPiece(king);

        let move = new Move(king, MoveType.DEFAULT, new Position(1,0));
        gameState.updateCastlingRights(move);

        expect(gameState.castlePermissions).toBe(12);
        expect(gameState.iHaveKingSideCastlingRights()).toBeFalse();
        expect(gameState.iHaveQueenSideCastlingRights()).toBeFalse();
    });

    it('I have king side castling rights if I really have them', function () {

        let before = (gameState.iHaveKingSideCastlingRights());

        gameState.castlePermissions = gameState.castlePermissions ^ CastlePermissions.WHITE_KING_SIDE;

        let after = (gameState.iHaveKingSideCastlingRights());

        expect(before).toBeTrue();
        expect(after).toBeFalse();
    });

    it('I have queen side castling rights if I really have them', function () {
        let before = (gameState.iHaveQueenSideCastlingRights());

        gameState.castlePermissions = gameState.castlePermissions ^ CastlePermissions.WHITE_QUEEN_SIDE;

        let after = (gameState.iHaveQueenSideCastlingRights());

        expect(before).toBeTrue();
        expect(after).toBeFalse();
    });

    //update
    it('increases half move counter correctly', function () {
        new TestHelper().createValidBoard(gameState);

        let expectedHalveMoveCounter = gameState.halfMoveCounter + 1;
        let rook = gameState.board.getObjAtPosition(new Position(0,0));

        let move = new Move(rook, MoveType.DEFAULT,new Position(0,3));
        gameState.update(move);
        expect(gameState.halfMoveCounter).toBe(expectedHalveMoveCounter);
    });

    it('increases fiftyMoves coutner correctly', function () {
        new TestHelper().createValidBoard(gameState);

        let expectedFiftyMoveCounter = gameState.fiftyMovesCounter + 1;
        let rook = gameState.board.getObjAtPosition(new Position(0,0));

        let move = new Move(rook, MoveType.DEFAULT,new Position(0,3));
        gameState.update(move);
        expect(gameState.fiftyMovesCounter).toBe(expectedFiftyMoveCounter);

        gameState.setMyColor(Player.BLACK);
        let oppRook = new Piece(Player.BLACK, PieceType.ROOK, new Position(0,7), "");
        gameState.board.setPiece(oppRook);

        let oppMove = new Move(oppRook, MoveType.DEFAULT,new Position(0,-3));
        gameState.update(oppMove);
        expect(gameState.fiftyMovesCounter).toBe(expectedFiftyMoveCounter);

    });

    it('Resets fifty moves counter if I make a pawn move', function () {
        new TestHelper().createValidBoard(gameState);
        gameState.fiftyMovesCounter = 12;

        let pawn = new Piece(Player.WHITE, PieceType.PAWN, new Position(0,1), "wPawn");
        gameState.board.setPiece(pawn);

        let move = new Move(pawn, MoveType.DEFAULT, new Position(0,1));
        gameState.update(move);
        expect(gameState.fiftyMovesCounter).toBe(0);
    });

    it('Resets fifty moves counter if I take a piece', function () {

        gameState.fiftyMovesCounter = 123;

        new TestHelper().createValidBoard(gameState);

        let oppRook = new Piece(Player.BLACK, PieceType.ROOK, new Position(0,7), "");
        gameState.board.setPiece(oppRook);
        let rook = gameState.board.getObjAtPosition(new Position(0,0));


        let move = new Move(rook, MoveType.DEFAULT, new Position(0,7));
        gameState.update(move);
        expect(gameState.fiftyMovesCounter).toBe(0);
    });

    it('deletes the correct pawn on an enPassant move', function () {
        new TestHelper().createValidBoard(gameState);

        gameState.halfMoveCounter = 12;
        gameState.setMyColor(Player.BLACK);
        let bPawn = new Piece(Player.BLACK, PieceType.PAWN, new Position(1,6), "black pawn");
        let wPawn = new Piece(Player.WHITE, PieceType.PAWN, new Position(0,4), "white pawn");
        gameState.board.setPiece(bPawn);
        gameState.board.setPiece(wPawn);
        let bPawnMove = new Move(bPawn, MoveType.DEFAULT, new Position(0,-2));
        gameState.update(bPawnMove);
        gameState.setMyColor(Player.WHITE);
        let possibleMovesForWhite = new MoveGenerator(gameState).generateMovesFor(wPawn);

        let containsENPassantMove = false;
        let enPassantMove = null;
        for (const pMove of possibleMovesForWhite) {
            if(pMove.newPosition.equals(new Position(1,5))){
                containsENPassantMove = true;
                enPassantMove = pMove;
            }
        }

        expect(containsENPassantMove).toBeTrue();

        gameState.update(enPassantMove);

        expect(wPawn.getPosition().equals(new Position(1,5))).toBeTrue();
        expect(gameState.board.getObjAtPosition(bPawn.getPosition())).toBe(null);
    });

    it('Inserts a queen on the right spot and deletes the pawn on promotion', function () {
        new TestHelper().createValidBoard(gameState);
        let pawn = new Piece(Player.WHITE, PieceType.PAWN, new Position(6,6),"");
        gameState.board.setPiece(pawn);

        let move = new Move(pawn, MoveType.PAWN_PROMOTION, new Position(0,1));
        gameState.update(move);

        let piece = gameState.board.getObjAtPosition(move.newPosition);
        expect(piece.getType() === PieceType.QUEEN).toBeTrue();
        expect(gameState.opponentInCheck()).toBeTrue();

    });

    it('update opponent Is in check if move leads to check', function () {
        new TestHelper().createValidBoard(gameState);
        let rook = gameState.board.getObjAtPosition(new Position(0,0));

        let move = new Move(rook, MoveType.DEFAULT, new Position(0,7));
        gameState.update(move);

        expect(gameState.opponentInCheck()).toBeTrue();
    });

    it('updating the gamestate sets the piece position to the new position inside the move', function () {
        new TestHelper().createValidBoard(gameState);
        let rook = gameState.board.getObjAtPosition(new Position(0,0));

        let move = new Move(rook, MoveType.DEFAULT, new Position(0,7));
        gameState.update(move);

        expect(rook.getPosition().equals(move.newPosition)).toBeTrue();
    });
});
