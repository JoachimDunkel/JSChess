describe("MoveGenerator", () => {
    let moveGenerator;
    let gameState;

    beforeEach(() => {
        gameState = new GameState();
        moveGenerator = new MoveGenerator(gameState);
    });

    it('CanMoveEveryEmptyFieldInSpecificDirection', () => {
        let moveDirection = new Position(0,1);
        let objects = new BoardHelper().onlyRookAndPawnOnBoard();
        gameState.board = objects[2];
        let rook = objects[0];

        let expectedNumOfMoves = 5;

        let result = [];
        moveGenerator._addMoveForEveryEmptyField(result, rook, moveDirection)

       expect(result.length).toBe(expectedNumOfMoves);
    });

    it('CanMoveEveryEmptyFieldPlusOneIfFirstPieceIsOfOppositColor', () => {
        let moveDirection = new Position(0,1);
        let objects = new BoardHelper().onlyRookAndPawnOnBoard();
        gameState.board = objects[2];
        let rook = objects[0];
        let pawn = objects[1];
        pawn._playerType = Player.BLACK;

        let expectedNumOfMoves = 6;

        let result = [];
        moveGenerator._addMoveForEveryEmptyField(result, rook, moveDirection)

        expect(result.length).toBe(expectedNumOfMoves);
    });

    it('CanNotMoveOutOfBounds',() => {
        let moveDirection = new Position(-1,0);
        let objects = new BoardHelper().onlyRookAndPawnOnBoard();
        gameState.board = objects[2];
        let rook = objects[0];
        let expectedNumOfMoves = 0;

        let result = [];
        moveGenerator._addMoveForEveryEmptyField(result, rook, moveDirection)

        expect(result.length).toBe(expectedNumOfMoves);
    });

    it('Knight moves are correct when in corner', () =>  {
        let knight = new Piece(Player.WHITE, PieceType.KNIGHT, new Position(0,0), "irrelevant");
        gameState.board.setPiece(knight);
        let result = moveGenerator.generateMovesFor(knight);

        expect(result.length).toBe(2);
        expect(result).toContain(new Position(2,1));
        expect(result).toContain(new Position(1,2));
    });

    it('Knight moves are correct when in the middle of the board', () =>  {
        let knight = new Piece(Player.WHITE, PieceType.KNIGHT, new Position(3,3), "irrelevant");
        gameState.board.setPiece(knight);
        let result = moveGenerator.generateMovesFor(knight);

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
        let result = moveGenerator.generateMovesFor(knight);

        expect(result.length).toBe(1);
        expect(result).toContain(new Position(1,2));
    });


    //TODO add tests for every piece type..

});
