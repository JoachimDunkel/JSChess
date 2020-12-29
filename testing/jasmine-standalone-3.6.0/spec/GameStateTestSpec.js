//TODO everything...


//Test fillboardwithPieces
//test update

//Test makeMove..


//TODO add tests for the checking handler ...
// do all functions work
// does a king move propergate to the kings that are referenced here.. (update this king here properly)


//after a check occurs checking inCheckflag is set correctly..

describe("Game state", () =>{
    let moveValidator;
    let gameState;

    beforeEach(() => {
        gameState = new GameState();
        gameState.setMyColor(Player.WHITE);
        moveValidator = new MoveValidator(gameState);
    });


    //update Castling rights
    it('removes my queen side castling rights if Move with the queen side rook', function () {
        let rookPawnBoard = new TestHelper().onlyRookAndPawnOnBoard();
        let rook = rookPawnBoard[0];
        gameState.board = rookPawnBoard[2];

        let move = new Move(rook, MoveType.DEFAULT,new Position(0,3));
        gameState.updateCastlingRights(move);
        expect(gameState.iHaveQueenSideCastlingRights()).toBeFalse();
    });

    it('removes my king side castling rights if Move with the kings side rook', function () {
        let rookPawnBoard = new TestHelper().onlyRookAndPawnOnBoard();
        let rook = rookPawnBoard[0];
        gameState.board = rookPawnBoard[2];
        gameState.board.clearField(rook);
        rook.setPosition(new Position(7,0));
        gameState.board.setPiece(rook);

        let move = new Move(rook, MoveType.DEFAULT,new Position(0,3));
        gameState.updateCastlingRights(move);
        expect(gameState.iHaveKingSideCastlingRights()).toBeFalse();
        expect(gameState.iHaveQueenSideCastlingRights()).toBeTrue();
    });

    it('updating castle rights work with the whole update function', function () {

    });

    it('updating the castling rights also works for black', function () {

    });

    it('removes all of my castling rights if I move with the king', function () {

    });

    it('I have king side castling rights if I really have them', function () {

        let before = (gameState.iHaveKingSideCastlingRights());

        gameState.castlePermissions = gameState.castlePermissions ^ CastlePermissions.WHITE_KING_SIDE;

        let after = (gameState.iHaveKingSideCastlingRights());

        expect(before).toBeTrue();
        expect(after).toBeFalse();
    });

    it('I have queen side castling rights if I really have them', function () {
        let before = (gameState.iHaveQueenSideCastlingRights());

        gameState.castlePermissions = gameState.castlePermissions ^ CastlePermissions.WHITE_QUEEN_SIDE;

        let after = (gameState.iHaveQueenSideCastlingRights());

        expect(before).toBeTrue();
        expect(after).toBeFalse();
    });

    //update
    it('increases half move counter correctly', function () {

    });

    it('increases fiftyMoves coutner correctly', function () {

    });

    it('Resets fifty moves counter if I make a pawn move', function () {

    });

    it('Resets fifty moves counter if I take a piece', function () {

    });

    it('deletes the correct pawn on an enPassant move', function () {

    });

    it('Inserts a queen on the right spot and deletes the pawn on promotion', function () {

    });

    it('update opponent Is in check if move leads to check', function () {

    });


});
