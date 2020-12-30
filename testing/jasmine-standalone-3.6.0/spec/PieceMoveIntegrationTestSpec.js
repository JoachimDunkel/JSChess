describe("PieceMoveIntegrationTestSpec", () => {
    let moveHandler;
    let gameState;

    beforeEach(() => {
        gameState = new GameState();
        moveHandler = new MoveHandler(gameState);
    });


    //========================
    //Move handler tests

    it('lookup move returns move if it is in list', function () {

    });

    it('generate all possible moves for player works', function () {

    });

    it('generates all valid moves for target piece', function () {

    });

    it('Create Bishop moves works', function () {

    });

    it('Create Rook moves works', function () {

    });

    it('Create pawn moves works..', function () {

    });

    it('Create king moves works', function () {

    });

    //================
    //generate valid moves works..

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


    it('pawn can take left after valid pawn opening..', function () {
        gameState.setMyColor(Player.WHITE);
        gameState.fillBoardWithPieces();

        let pawn = gameState.board.getObjAtPosition(new Position(3,1));

        let wMove = new Move(pawn,MoveType.DEFAULT,new Position(0,2));
        gameState.update(wMove);

        gameState.setMyColor(Player.BLACK);

        let bPawn = gameState.board.getObjAtPosition(new Position(4,6));
        let bMove = new Move(pawn,MoveType.DEFAULT,new Position(0,- 2));

        gameState.update(bMove);

        gameState.setMyColor(Player.WHITE);

        let result = new MoveGenerator(gameState)._pawnCanTake(new Position(-1,1), pawn);

        expect(result).toBeTrue();
    });

    it('EN Passant works in a real world scenario...', function () {

    });


});
