

describe("MoveValidator", () =>{
   let moveValidator;
   let gameState;

   beforeEach(() => {
       gameState = new GameState();
       moveValidator = new MoveValidator(gameState);
   });

    it('Out of bounds moves are invalid', () => {
        let rook = new Piece(Player.WHITE, PieceType.ROOK, new Position(3,3), "irrelevant");
        gameState.board.setPiece(rook);

        let moves = [
            new Move(rook, MoveType.DEFAULT, new Position(0,-4)),
            new Move(rook, MoveType.DEFAULT, new Position(-4, 0)),
            new Move(rook, MoveType.DEFAULT, new Position(0,8)),
            new Move(rook, MoveType.DEFAULT, new Position(8,0)),
        ]

        moves.forEach(move => {
            let result = moveValidator.moveIsValid(move, gameState);
            expect(result).toBeFalse();
        });
    });

    it('InvalidateAllMoves Filters out invalid Moves', () => {
        new TestHelper().createValidBoard(gameState);
        let rook = new Piece(Player.WHITE, PieceType.ROOK, new Position(3,3), "irrelevant");
        gameState.board.setPiece(rook);

        let moves = [
            new Move(rook, MoveType.DEFAULT, new Position(0,-4)),
            new Move(rook, MoveType.DEFAULT, new Position(-4, 0)),
            new Move(rook, MoveType.DEFAULT, new Position(0,8)),
            new Move(rook, MoveType.DEFAULT, new Position(0,4)),
        ]

        let result = moveValidator.invalidateAllMoves(moves);

        expect(result.length).toBe(1);
    });

    it('If move Is blocked by own piece it is invalid', () => {
        let rook = new Piece(Player.WHITE, PieceType.ROOK, new Position(3,3), "irrelevant");

        let pawn = new Piece(Player.WHITE, PieceType.PAWN, new Position(3,4));
        gameState.board.setPiece(rook);
        gameState.board.setPiece(pawn);

        let move = new Move(rook, MoveType.DEFAULT, new Position(0,1));

        let result = moveValidator.moveIsValid(move, gameState);
        expect(result).toBeFalse();
    });

    it('move Is Invalid If it does not end the check', () => {
        new TestHelper().createValidBoard(gameState);
        let oppRook = new Piece(Player.BLACK, PieceType.ROOK, new Position(7,0), "bQSide Rook");
        gameState.board.setPiece(oppRook);

        let myBishop = new Piece(Player.WHITE, PieceType.BISHOP, new Position(5,1), "wBishop");
        gameState.board.setPiece(myBishop);
        let invalidMove = new Move(myBishop, MoveType.DEFAULT, new Position(1,1));

        let leadsToCheck = moveValidator.moveLeadsToCheckOn(invalidMove,gameState.myColor);
        expect(leadsToCheck).toBeTrue();
    });

    it('move is valid If it ends the check', () => {
        new TestHelper().createValidBoard(gameState);
        let oppRook = new Piece(Player.BLACK, PieceType.ROOK, new Position(7,0), "bQSide Rook");
        gameState.board.setPiece(oppRook);

        let myBishop = new Piece(Player.WHITE, PieceType.BISHOP, new Position(5,1), "wBishop");
        gameState.board.setPiece(myBishop);
        let validMove = new Move(myBishop, MoveType.DEFAULT, new Position(1,-1));

        let leadsToCheck = moveValidator.moveLeadsToCheckOn(validMove,gameState.myColor);
        expect(leadsToCheck).toBeFalse();
    });

    it('Move is valid If I move the king out of harm', () => {
        new TestHelper().createValidBoard(gameState);
        let oppRook = new Piece(Player.BLACK, PieceType.ROOK, new Position(7,0), "bQSide Rook");
        gameState.board.setPiece(oppRook);

        let myKing = gameState.getMyKing();
        let move = new Move(myKing, MoveType.DEFAULT, new Position(0,1));
        expect(moveValidator.moveLeadsToCheckOn(move, gameState.myColor)).toBeFalse();
    });

    it('Move is invalid If I move the king into harm.', () => {
        new TestHelper().createValidBoard(gameState);
        let oppRook = new Piece(Player.BLACK, PieceType.ROOK, new Position(7,0), "bQSide Rook");
        gameState.board.setPiece(oppRook);

        let myKing = gameState.getMyKing();
        let move = new Move(myKing, MoveType.DEFAULT, new Position(-1,0));

        expect(moveValidator.moveLeadsToCheckOn(move, gameState.myColor)).toBeTrue();
    });

    it('move leads to check on opponent', function () {
        new TestHelper().createValidBoard(gameState);
        let rook = gameState.board.getObjAtPosition(new Position(0,0));

        let move = new Move(rook, MoveType.DEFAULT, new Position(0,7));

        let moveLeadsToCheck = moveValidator.moveLeadsToCheckOn(move, gameState.opponenColor);

        expect(moveLeadsToCheck).toBeTrue();
    });

    it('move leads to check returns true if i move my king into harm', function () {
        new TestHelper().createValidBoard(gameState);
        let rook = new Piece(Player.BLACK, PieceType.ROOK, new Position(7,1), "bQSide Rook");
        gameState.board.setPiece(rook);

        let move = new Move(gameState.getMyKing(), MoveType.DEFAULT, new Position(0,1));

        let moveLeadsToCheck = moveValidator.moveLeadsToCheckOn(move, gameState.myColor);
        expect(moveLeadsToCheck).toBeTrue();
    });

    it('changing a deep copy version of a game state does not affect the original', function () {
        new TestHelper().createValidBoard(gameState);

        let newGameState = _.cloneDeep(gameState);
        newGameState.fiftyMovesCounter = 123;

        expect(gameState.fiftyMovesCounter).toBe(0);
    });

    it('changing a piece of a deep copy game state does not affect the original', function () {
        new TestHelper().createValidBoard(gameState);

        let newGameState = _.cloneDeep(gameState);
        let rook = newGameState.board.getObjAtPosition(new Position(0,0));
        let move = new Move(rook, MoveType.DEFAULT, new Position(2,0));
        newGameState.update(move);

        let newRook = newGameState.board.getObjAtPosition(new Position(2,0));
        let oldRook = gameState.board.getObjAtPosition(new Position(0,0));
        expect(newRook.getType() === PieceType.ROOK).toBeTrue();
        expect(oldRook.getType() === PieceType.ROOK).toBeTrue();
        expect(oldRook.getPosition().equals(new Position(0,0)));

    });

    it('changing the king position in a deep copied game state does not effect the original', function () {
        new TestHelper().createValidBoard(gameState);

        let newGameState = _.cloneDeep(gameState);
        let king = newGameState.board.getObjAtPosition(new Position(4,0));
        let move = new Move(king, MoveType.DEFAULT, new Position(1,0));
        newGameState.update(move);

        expect(newGameState.getMyKing().getPosition().equals(new Position(5,0))).toBeTrue();
        expect(gameState.getMyKing().getPosition().equals(new Position(4,0))).toBeTrue();
    });
});
