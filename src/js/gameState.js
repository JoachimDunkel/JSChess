class GameState {
    currentPlayer;
    constructor() {
        this.fiftyMovesCounter = 0;
        this.halfMoveCounter = 0;
        this.castlePermissions = 0;
        this.blackIsInCheck = false;
        this.whiteIsInCheck = false;
        this.enPassantPossible = false;
        this.board = new Board();
        this.currentPlayer = Player.WHITE;
    }

    fillBoardWithPieces(){
        let pieceFactory = new PieceFactory();
        let whiteSet = pieceFactory.createFullSetFor(Player.WHITE);
        let blackSet = pieceFactory.createFullSetFor(Player.BLACK);

        //TODO maybe access it from the board but does not really matter
        this.whiteKing = whiteSet[4];
        this.blackKing = blackSet[4];

        this.board.setPieces(whiteSet);
        this.board.setPieces(blackSet);

        console.log("Board initialized");
    }

    update(move){
        console.log("Game state updated");
        //update counters
        //change currentplayer
        //update board..
        //and so on..
    }

}
