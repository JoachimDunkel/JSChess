class GameState {
    currentPlayer;
    constructor() {
        this.fiftyMovesCounter = 0;
        this.halfMoveCounter = 0;
        this.castlePermissions = 0;
        this.board = new Board();
        this.fillBoardWithPieces();
        this.currentPlayer = Player.WHITE;
    }

    fillBoardWithPieces(){
        let pieceFactory = new PieceFactory();
        this.board.setPieces(pieceFactory.createFullSetFor(Player.WHITE));
        this.board.setPieces(pieceFactory.createFullSetFor(Player.BLACK));
        console.log("Board initialized");

        //Testing my Engine implementation...
        this.board.printBoard();
        let ePawn = this.board.getObjAtPosition(new Position(4,1));
        let moveGenerator = new MoveGenerator(this);
        let possibleMoves = moveGenerator.generateMovesFor(ePawn);
        

    }

    update(move){
        console.log("Game state updated");
        //update counters
        //change currentplayer
        //update board..
        //and so on..
    }

}
