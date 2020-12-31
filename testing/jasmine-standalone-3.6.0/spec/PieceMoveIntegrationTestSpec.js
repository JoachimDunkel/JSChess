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


    it('Pawns can not take straight', function () {

    });

    it('King is not in check if it blocks opposing pawn..', function () {

    });

    it('farmers mate possible...', function () {
        gameState.setMyColor(Player.WHITE);
        gameState.fillBoardWithPieces();

        //e2 -> e4
        let e2Pawn = gameState.board.getObjAtPosition(Position.fromChessNumbering(FILE.E, 2));
        let e2Toe4  = new Move(e2Pawn, MoveType.DEFAULT,new Position(0,2));
        gameState.update(e2Toe4);

        //e7 -> e5
        gameState.setMyColor(Player.BLACK);
        let e7Pawn = gameState.board.getObjAtPosition(Position.fromChessNumbering(FILE.E, 7));
        let e7Toe5  = new Move(e7Pawn, MoveType.DEFAULT,new Position(0,-2));
        gameState.update(e7Toe5);

        //bf1 -> c4
        gameState.setMyColor(Player.WHITE);
        let bf1 = gameState.board.getObjAtPosition(Position.fromChessNumbering(FILE.F, 1));
        let f1ToC4  = new Move(bf1, MoveType.DEFAULT,new Position(-3,3));
        gameState.update(f1ToC4);

        //a7 -> a6
        gameState.setMyColor(Player.BLACK);
        let a7Pawn = gameState.board.getObjAtPosition(Position.fromChessNumbering(FILE.A, 7));
        let a7Toa6  = new Move(a7Pawn, MoveType.DEFAULT,new Position(0,-1));
        gameState.update(a7Toa6);

        //Qd1 -> f3
        gameState.setMyColor(Player.WHITE);
        let Qd1 = gameState.board.getObjAtPosition(Position.fromChessNumbering(FILE.D, 1));
        let qd1Tof3  = new Move(Qd1, MoveType.DEFAULT,new Position(2,2));
        gameState.update(qd1Tof3);

        //a6 -> a5
        gameState.setMyColor(Player.BLACK);
        let a6Pawn = gameState.board.getObjAtPosition(Position.fromChessNumbering(FILE.A, 6));
        let a6Toa5  = new Move(a6Pawn, MoveType.DEFAULT,new Position(0,-1));
        gameState.update(a6Toa5);

        //Qf7#
        gameState.setMyColor(Player.WHITE);
        let Qf3 = gameState.board.getObjAtPosition(Position.fromChessNumbering(FILE.F,3));
        let qf3Tof7MATE = new Move(Qf3, MoveType.DEFAULT,new Position(0,4));
        gameState.update(qf3Tof7MATE);

        gameState.board.printBoard();

        spyOn(moveHandler, 'startGameOverEvent');

        gameState.setMyColor(Player.BLACK);
        moveHandler.startTurnInteraction();
        expect(moveHandler.startGameOverEvent).toHaveBeenCalledWith(GameStatus.LOST);
    });

    it('from Chess numbering works', function () {
        let pos = new Position(0,0);

        let fromNumbering = Position.fromChessNumbering(FILE.A, 1);

        expect(pos.equals(fromNumbering)).toBeTrue();
    });

});
