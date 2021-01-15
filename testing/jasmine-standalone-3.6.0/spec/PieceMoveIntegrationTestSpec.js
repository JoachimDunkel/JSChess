describe("PieceMoveIntegrationTestSpec", () => {
    let moveHandler;
    let gameState;

    beforeEach(() => {
        gameState = new GameState();
        moveHandler = new MoveHandler(gameState);
    });


    //========================
    //Move handler tests, needs some integration testing if the structure should change for now..

    it('lookup move returns move if it is in list', function () {
        

    });

    it('generate all possible moves for player works', function () {

    });

    it('generates all valid moves for target piece', function () {

    });

    it('is a draw on fifty moves rule', function () {

    });

    //both should be working..
    //check mate
    it('the game is lost if active player cant make any more moves and is in check', function () {

    });

    //stale mate...
    it('the game is a draw if active player cant make any moves and is not in check', function () {

    });


    //================
    //generate valid moves works..  should be working... to lazy atm

    it('Create Bishop moves works', function () {

    });

    it('Create Rook moves works', function () {

    });

    it('Create pawn moves works..', function () {

    });

    it('Create king moves works', function () {

    });


    it('Knight moves are correct when in corner', () =>  {
        new TestHelper().createValidBoard(gameState);

        let knight = new Piece(Player.WHITE, PieceType.KNIGHT, new Position(0,0), "irrelevant");
        gameState.board.setPiece(knight);

        let moves = moveHandler.moveGenerator.generateMovesFor(knight);
        let result = moveHandler.moveValidator.invalidateAllMoves(moves);

        expect(result.length).toBe(2);
        expect(result[0].newPosition.equals(new Position(1,2))).toBeTrue();
        expect(result[1].newPosition.equals(new Position(2,1))).toBeTrue();
    });

    it('Knight moves are correct when in the middle of the board', () =>  {
        new TestHelper().createValidBoard(gameState);

        let knight = new Piece(Player.WHITE, PieceType.KNIGHT, new Position(3,3), "irrelevant");
        gameState.board.setPiece(knight);

        let moves = moveHandler.moveGenerator.generateMovesFor(knight);
        let result = moveHandler.moveValidator.invalidateAllMoves(moves);

        expect(result.length).toBe(8);

        expect(result[0].newPosition.equals(new Position(2,5)));
        expect(result[1].newPosition.equals(new Position(4,5)));
        expect(result[2].newPosition.equals(new Position(5,2)));
        expect(result[3].newPosition.equals(new Position(5,4)));

        expect(result[4].newPosition.equals(new Position(2,1)));
        expect(result[5].newPosition.equals(new Position(4,1)));
        expect(result[6].newPosition.equals(new Position(1,4)));
        expect(result[7].newPosition.equals(new Position(1,2)));
    });

    it('Knight moves are correct if own piece blocks the way', () =>  {
        new TestHelper().createValidBoard(gameState);

        let knight = new Piece(Player.WHITE, PieceType.KNIGHT, new Position(0,0), "irrelevant");
        let ownPawn = new Piece(Player.WHITE, PieceType.PAWN, new Position(2,1), "irrelevant");
        gameState.board.setPiece(knight);
        gameState.board.setPiece(ownPawn);

        let moves = moveHandler.moveGenerator.generateMovesFor(knight);
        let result = moveHandler.moveValidator.invalidateAllMoves(moves);


        expect(result.length).toBe(1);
        expect(result[0].newPosition.equals(new Position(1,2)));
    });


    it('pawn can take right after valid pawn opening..', function () {
        gameState.setMyColor(Player.WHITE);
        gameState.fillBoardWithPieces();

        let pawn = gameState.board.getObjAtPosition(new Position(3,1));

        let wMove = new Move(pawn,MoveType.DEFAULT,new Position(0,2));
        gameState.update(wMove);

        gameState.setMyColor(Player.BLACK);

        let bPawn = gameState.board.getObjAtPosition(new Position(4,6));
        let bMove = new Move(bPawn,MoveType.DEFAULT,new Position(0,- 2));

        gameState.update(bMove);

        gameState.setMyColor(Player.WHITE);

        let result = new MoveGenerator(gameState)._pawnCanTake(new Position(1,1), pawn);

        expect(result).toBeTrue();
    });

    it('Pawns can not take straight', function () {
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

        gameState.setMyColor(Player.WHITE);
        let possibleMovesOfe4Pawn = moveHandler.moveGenerator.generateMovesFor(e2Pawn);
        expect(possibleMovesOfe4Pawn.length).toBe(0);
    });

    it('King is not in check if it blocks opposing pawn..', function () {
        new TestHelper().createValidBoard(gameState);
        let pawn = new Piece(Player.WHITE,PieceType.PAWN,Position.fromChessNumbering(FILE.E, 6), "wE6Pawn");
        gameState.board.setPiece(pawn);

        let move = new Move(pawn, MoveType.DEFAULT, new Position(0,1));

        gameState.update(move);
        expect(gameState.blackIsInCheck).toBe(false);
    });

    it('King can block pawn from promoting..', function () {
        new TestHelper().createValidBoard(gameState);
        let pawn = new Piece(Player.WHITE,PieceType.PAWN,Position.fromChessNumbering(FILE.D, 7), "wE7Pawn");
        gameState.board.setPiece(pawn);

        gameState.setMyColor(Player.BLACK);
        let blackKing = gameState.getMyKing();


        let move = new Move(blackKing, MoveType.DEFAULT, new Position(-1,0));

        let moveLeadsToCheck = new MoveValidator(gameState).moveLeadsToCheckOn(move, Player.BLACK);
        expect(moveLeadsToCheck).toBeFalse();

        let possibleKingMoves = new MoveGenerator(gameState).generateMovesFor(blackKing);

        let containsKEToD8 = false;
        for (const kingMove of possibleKingMoves) {
            if(kingMove.newPosition.equals(Position.fromChessNumbering(FILE.D, 8))){
                containsKEToD8 = true;
            }
        }

        expect(containsKEToD8).toBeTrue();
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

        gameState.setMyColor(Player.BLACK);
        let gameStatus = moveHandler.startTurnInteraction();
        expect(gameStatus).toBe(GameStatus.LOST);
    });

    it('from Chess numbering works', function () {
        let pos = new Position(0,0);

        let fromNumbering = Position.fromChessNumbering(FILE.A, 1);

        expect(pos.equals(fromNumbering)).toBeTrue();
    });

    it('Performs queen-side castling', function () {
        new TestHelper().createValidBoard(gameState);

        let myKing = gameState.getMyKing();

        let queenSideCastle = new Move(myKing, MoveType.CASTLE, new Position(-2,0));
        gameState.update(queenSideCastle);

        let rook = gameState.board.getObjAtPosition(Position.fromChessNumbering(FILE.D,1));
        let king = gameState.board.getObjAtPosition(Position.fromChessNumbering(FILE.C,1));

        expect(rook !== null).toBeTrue();
        expect(king !== null).toBeTrue();

        let kingIsInRightPosition = myKing.getPosition().equals(Position.fromChessNumbering(FILE.C,1));
        expect(kingIsInRightPosition).toBeTrue();
        expect(gameState.board.getObjAtPosition(new Position(0,0)) === null).toBeTrue();
    });

    it('Performs king_side castling', function () {
        new TestHelper().createValidBoard(gameState);

        let myKing = gameState.getMyKing();

        let kSideRook = new Piece(Player.WHITE, PieceType.ROOK, new Position(7,0),"wQSRook");

        gameState.board.setPiece(kSideRook);
        let kingSideCastle = new Move(myKing, MoveType.CASTLE, new Position(2,0));
        gameState.update(kingSideCastle);

        let rook = gameState.board.getObjAtPosition(Position.fromChessNumbering(FILE.F,1));
        let king = gameState.board.getObjAtPosition(Position.fromChessNumbering(FILE.G,1));

        expect(rook !== null).toBeTrue();
        expect(king !== null).toBeTrue();

        let kingIsInRightPosition = myKing.getPosition().equals(Position.fromChessNumbering(FILE.G,1));
        expect(kingIsInRightPosition).toBeTrue();
        expect(gameState.board.getObjAtPosition(new Position(7,0)) === null).toBeTrue();
    });

    it('move getRookForCastling works as expected on queen-side', function () {
        new TestHelper().createValidBoard(gameState);

        let myKing = gameState.getMyKing();

        let queenSideCastle = new Move(myKing, MoveType.CASTLE, new Position(-2,0));
        let rookMove = queenSideCastle.getRookMoveForCastling(gameState.board);

        expect(rookMove !== null).toBeTrue();
        expect(rookMove.newPosition.equals(new Position(3,0))).toBeTrue();
    });

    it('Castling queen-side leads to check on opponent if his king is on D8', function () {
        new TestHelper().createValidBoard(gameState);

        gameState.setMyColor(Player.BLACK);
        let bKing = gameState.getMyKing();
        let move = new Move(bKing, MoveType.DEFAULT, new Position(-1,0));
        gameState.update(move);

        expect(gameState.iAmInCheck()).toBeFalse();

        gameState.setMyColor(Player.WHITE);
        let wKing = gameState.getMyKing();

        let queenSideCastle = new Move(wKing, MoveType.CASTLE, new Position(-2,0));
        gameState.update(queenSideCastle);

        expect(gameState.blackIsInCheck).toBeTrue();
        expect(gameState.iAmInCheck()).toBeFalse();
        expect(gameState.opponentInCheck()).toBeTrue();
    });

    it('move getRookForCastling works as expected on king-side', function () {
        new TestHelper().createValidBoard(gameState);

        let myKing = gameState.getMyKing();
        let kSideRook = new Piece(Player.WHITE, PieceType.ROOK,new Position(7,0));
        gameState.board.setPiece(kSideRook);

        let kSideCastle = new Move(myKing, MoveType.CASTLE, new Position(2,0));
        let rookMove = kSideCastle.getRookMoveForCastling(gameState.board);

        expect(rookMove !== null).toBeTrue();
        expect(rookMove.newPosition.equals(new Position(5,0))).toBeTrue();

    });

    it('i am out of check if i move out of check', function () {

        new TestHelper().createValidBoard(gameState);

        gameState.setMyColor(Player.BLACK);
        let bKing = gameState.getMyKing();
        let move = new Move(bKing, MoveType.DEFAULT, new Position(-1,0));
        gameState.update(move);

        gameState.setMyColor(Player.WHITE);
        let wKing = gameState.getMyKing();

        let queenSideCastle = new Move(wKing, MoveType.CASTLE, new Position(-2,0));
        gameState.update(queenSideCastle);

        gameState.setMyColor(Player.BLACK);
        let blackKing = gameState.getMyKing();
        let outOfCheck = new Move(blackKing,MoveType.DEFAULT, new Position(-1,0));

        gameState.update(outOfCheck);

        expect(gameState.iAmInCheck()).toBeFalse();
        expect(gameState.castlePermissions).toBe(0);
    });
});
