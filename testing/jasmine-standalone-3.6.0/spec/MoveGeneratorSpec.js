describe("MoveGenerator", () => {
    let moveGenerator;
    let gameState;

    beforeEach(() => {
        gameState = new GameState();
        moveGenerator = new MoveGenerator(gameState);
    });

    it('CanMoveEveryEmptyFieldInSpecificDirection', () => {
        let moveDirection = new Position(0,1);
        let objects = new TestHelper().onlyRookAndPawnOnBoard();
        gameState.board = objects[2];
        let rook = objects[0];

        let expectedNumOfMoves = 5;

        let result = [];
        moveGenerator._addMoveForEveryEmptyField(result, rook, moveDirection)

       expect(result.length).toBe(expectedNumOfMoves);
    });

    it('CanMoveEveryEmptyFieldPlusOneIfFirstPieceIsOfOppositColor', () => {
        let moveDirection = new Position(0,1);
        let objects = new TestHelper().onlyRookAndPawnOnBoard();
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
        let objects = new TestHelper().onlyRookAndPawnOnBoard();
        gameState.board = objects[2];
        let rook = objects[0];
        let expectedNumOfMoves = 1;

        let result = [];
        moveGenerator._addMoveForEveryEmptyField(result, rook, moveDirection)

        expect(result.length).toBe(expectedNumOfMoves);
    });


    //TODO add tests for every piece type..
    //TODO test bulk set is checking move...
    //test king side castle possible
    //test queenside castle possible
    //test pawncanEnpassant.
    //test pawncantake right
    //test pawncan take left..
    //test pawn can move two squares..

});
