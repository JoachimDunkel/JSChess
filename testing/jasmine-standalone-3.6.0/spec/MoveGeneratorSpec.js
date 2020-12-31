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

        gameState.board.clearField(rook.getPosition());
        rook.setPosition(new Position(1,0));

        gameState.board.setPiece(rook);
        let expectedNumOfMoves = 1;

        let result = [];
        moveGenerator._addMoveForEveryEmptyField(result, rook, moveDirection)

        expect(result.length).toBe(expectedNumOfMoves);
    });


    //TODO add tests for every piece type..

    it('pawn Can move TwoSquares Works Correctly', function () {
        new TestHelper().createValidBoard(gameState);
        let pawn = new Piece(Player.WHITE, PieceType.PAWN, new  Position(0,1), "");
        let result = moveGenerator._pawnCanMoveTwoSquares(pawn);
        expect(result).toBeTrue();
    });

    it('pawn Can move TwoSquares also works for black', function () {
        new TestHelper().createValidBoard(gameState);
        gameState.setMyColor(Player.BLACK);
        let pawn = new Piece(Player.BLACK, PieceType.PAWN, new  Position(0,6), "");
        let result = moveGenerator._pawnCanMoveTwoSquares(pawn);
        expect(result).toBeTrue();
    });

    it('pawnsCanMoveTwoSquaresOnAnOfficialInitBoardState', function () {
        gameState.setMyColor(Player.WHITE);
        gameState.fillBoardWithPieces();

        let pawn = gameState.board.getObjAtPosition(new Position(3,1));
        let result = moveGenerator._pawnCanMoveTwoSquares(pawn);
        expect(result).toBeTrue();

    });

    it('pawn can not move two squares if it is not in start position', function () {
        new TestHelper().createValidBoard(gameState);
        gameState.setMyColor(Player.BLACK);
        let pawn = new Piece(Player.BLACK, PieceType.PAWN, new  Position(0,5), "");
        let result = moveGenerator._pawnCanMoveTwoSquares(pawn);
        expect(result).toBeFalse();

    });

    it('pawn can take left works', function () {

        let pawns = new TestHelper().createPawnTakingScenario(gameState);

        let takeLeft = new MoveGenerator(gameState)._pawnCanTake(new Position(-1, 1) ,pawns[0]);
        expect(takeLeft).toBeTrue();
    });

    it('pawn can take rights works', function () {
        let wPawn = new TestHelper().createPawnTakingScenario(gameState)[0];
        let move = new Move(wPawn, MoveType.DEFAULT,new Position(-2,0))
        gameState.board.makeMove(move);

        let takeRight = new MoveGenerator(gameState)._pawnCanTake(new Position(1, 1) , wPawn);
        expect(takeRight).toBeTrue();

        let takeLeft = new MoveGenerator(gameState)._pawnCanTake(new Position(-1, 1) , wPawn);
        expect(takeLeft).toBeFalse();
    });

    it('pawn can take also works for black', function () {
        let pawns = new TestHelper().createPawnTakingScenario(gameState);

        let result = new MoveGenerator(gameState)._pawnCanTake(new Position(1, -1) , pawns[1]);

        expect(result).toBeTrue();
    });

    it('pawn can En Passant works', function () {
        let wPawn = new TestHelper().createEnPassantScenario(gameState)[0];

        let result = new MoveGenerator(gameState)._pawnCanEnPassant(wPawn);
        expect(result).toBeTrue();
    });

    it('can not en passant if game just started', function () {
        let wPawn = new TestHelper().createEnPassantScenario(gameState)[0];
        gameState.halfMoveCounter = 2;

        let result = new MoveGenerator(gameState)._pawnCanEnPassant(wPawn);
        expect(result).toBeFalse();

    });


    //deep copy does not work with the king reference..
    it('queen side CastlePossible works', function () {
        new TestHelper().createValidBoard(gameState);
        let result = new MoveGenerator(gameState)._queenSideCastlePossible();
        expect(result).toBeTrue();
    });

    it('king side castle possible works', function () {

        new TestHelper().createValidBoard(gameState);
        let kSideRook = new Piece(Player.WHITE, PieceType.ROOK, new Position(7,0), "kSide rook");
        gameState.board.setPiece(kSideRook);

        let result = new MoveGenerator(gameState)._kingSideCastlePossible();
        expect(result).toBeTrue();
    });

    it('castling not possible if king in check', function () {
        new TestHelper().createValidBoard(gameState);
        let oppRook = new Piece(Player.BLACK, PieceType.ROOK, new Position(7,0), "black kSide rook");
        gameState.board.setPiece(oppRook);

        let result = new MoveGenerator(gameState)._kingSideCastlePossible();
        expect(result).toBeFalse();
    });

    it('castling not possible moves are blocked', function () {
        new TestHelper().createValidBoard(gameState);
        let knight = new Piece(Player.BLACK, PieceType.KNIGHT, new Position(1,0), "qSide Knight");
        gameState.board.setPiece(knight);

        let result = new MoveGenerator(gameState)._kingSideCastlePossible();
        expect(result).toBeFalse();

    });

    it('castling not possible if no castlingPermissions exist', function () {
        new TestHelper().createValidBoard(gameState);
        gameState.castlePermissions = 0;
        let result = new MoveGenerator(gameState)._queenSideCastlePossible();
        expect(result).toBeFalse();
    });

    it('castling not possible if king would receive check along the way', function () {
        new TestHelper().createValidBoard(gameState);
        let oppRook = new Piece(Player.BLACK, PieceType.ROOK, new Position(2,7), "black kSide rook");
        gameState.board.setPiece(oppRook);

        let result = new MoveGenerator(gameState)._kingSideCastlePossible();
        expect(result).toBeFalse();
    });

    it('pawnCanMoveOneSquareWhen Not Blocked', function (){
        new TestHelper().createValidBoard(gameState);
        let e4Pawn = new Piece(Player.WHITE, PieceType.PAWN, Position.fromChessNumbering(FILE.E,4), "wE4Pawn");
        let e6Pawn = new Piece(Player.BLACK, PieceType.PAWN, Position.fromChessNumbering(FILE.E,6), "be6Pawn");
        gameState.board.setPiece(e4Pawn);
        gameState.board.setPiece(e6Pawn);

        let canMove = new MoveGenerator(gameState)._pawnCanMoveOneSquare(e4Pawn);

        expect(canMove).toBeTrue();
    });

    it('pawn can not move if blocked by opponent piece', function () {
        new TestHelper().createValidBoard(gameState);
        let e4Pawn = new Piece(Player.WHITE, PieceType.PAWN, Position.fromChessNumbering(FILE.E,4), "wE4Pawn");
        let e5Pawn = new Piece(Player.BLACK, PieceType.PAWN, Position.fromChessNumbering(FILE.E,5), "be5Pawn");
        gameState.board.setPiece(e4Pawn);
        gameState.board.setPiece(e5Pawn);

        let canMove = new MoveGenerator(gameState)._pawnCanMoveOneSquare(e4Pawn);

        expect(canMove).toBeFalse();

    });


});
