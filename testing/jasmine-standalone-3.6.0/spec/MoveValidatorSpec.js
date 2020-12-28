function isValidOnRookCheckingScenario(myRookMoveDirection, gameState, moveValidator) {
    let oppRook = new Piece(Player.BLACK, PieceType.ROOK, new Position(3,3), "irrelevant");
    let myRook = new Piece(Player.BLACK, PieceType.ROOK, new Position(1,1), "irrelevant");
    let oppKing = new Piece(Player.BLACK, PieceType.KING, new Position(7,7), "irrelevant")
    let myKing = new Piece(Player.WHITE, PieceType.KING, new Position(0,3), "irrelevant");


    gameState.board.setPiece(oppRook);
    gameState.board.setPiece(myRook);
    gameState.board.setPiece(oppKing);
    gameState.board.setPiece(myKing);

    gameState.checkingHandler.setupKings(myKing,oppKing);
    gameState.checkingHandler.whiteIsInCheck = true;
    gameState.checkingHandler.checkingPieces.push(oppRook);

    let rookMove = new Move(myRook, MoveType.DEFAULT, myRookMoveDirection);
    return moveValidator.moveIsValid(rookMove);
}

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
            let result = moveValidator.moveIsValid(move);
            expect(result).toBeFalse();
        });
    });

    it('InvalidateAllMoves Filters out invalid Moves', () => {
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

        let result = moveValidator.moveIsValid(move);
        expect(result).toBeFalse();
    });

    it('move is invalid If it does not end the check', () => {
        let result = isValidOnRookCheckingScenario(new Position(1,0), gameState, moveValidator);
        expect(result).toBeFalse();
    });

    it('move is valid If it ends the check', () => {
        let result = isValidOnRookCheckingScenario(new Position(0,2), gameState, moveValidator);
        expect(result).toBeTrue();
    });


    //TODO if I make a king move...

});
