describe("PieceMoveIntegrationTestSpec", () => {
    let moveHandler;
    let gameState;

    beforeEach(() => {
        gameState = new GameState();
        moveHandler = new MoveHandler(gameState);
    });

    //TODO test move-handler here and all possible move for every piece with validation... ...

    it('Knight moves are correct when in corner', () =>  {
        let knight = new Piece(Player.WHITE, PieceType.KNIGHT, new Position(0,0), "irrelevant");
        gameState.board.setPiece(knight);

        let moves = moveHandler.moveGenerator.generateMovesFor(knight);
        let result = moveHandler.moveValidator.invalidateAllMoves(moves);

        expect(result.length).toBe(2);
        expect(result).toContain(new Position(2,1));
        expect(result).toContain(new Position(1,2));
    });

    it('Knight moves are correct when in the middle of the board', () =>  {
        let knight = new Piece(Player.WHITE, PieceType.KNIGHT, new Position(3,3), "irrelevant");
        gameState.board.setPiece(knight);

        let moves = moveHandler.moveGenerator.generateMovesFor(knight);
        let result = moveHandler.moveValidator.invalidateAllMoves(moves);

        expect(result.length).toBe(8);

        expect(result).toContain(new Position(1,2));
        expect(result).toContain(new Position(1,4));
        expect(result).toContain(new Position(2,5));
        expect(result).toContain(new Position(4,5));

        expect(result).toContain(new Position(5,4));
        expect(result).toContain(new Position(5,2));
        expect(result).toContain(new Position(4,1));
        expect(result).toContain(new Position(2,1));
    });

    it('Knight moves are correct if own piece blocks the way', () =>  {
        let knight = new Piece(Player.WHITE, PieceType.KNIGHT, new Position(0,0), "irrelevant");
        let ownPawn = new Piece(Player.WHITE, PieceType.PAWN, new Position(2,1), "irrelevant");
        gameState.board.setPiece(knight);
        gameState.board.setPiece(ownPawn);

        let moves = moveHandler.moveGenerator.generateMovesFor(knight);
        let result = moveHandler.moveValidator.invalidateAllMoves(moves);


        expect(result.length).toBe(1);
        expect(result).toContain(new Position(1,2));
    });


});
