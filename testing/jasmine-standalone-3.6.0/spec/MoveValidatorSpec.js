describe("MoveValidator", () =>{
   let moveValidator;
   let gameState;

   beforeEach(() => {
       gameState = new GameState();
       moveValidator = new MoveValidator(gameState);
   });


    [new Position(-4,0), new Position(0,-4), new Position(0,5), new Position(5,0)]
        .forEach(move => {
            it('Out of bounds moves are invalid', () => {
                let rook = new Piece(Player.WHITE, PieceType.ROOK, new Position(3,3), "irrelevant");

                gameState.board.setPiece(rook);

                let result = moveValidator.moveIsValid(rook, move);
                expect(result).toBeFalse();
            });
    });
});
