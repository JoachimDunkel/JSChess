class GameState {
    currentPlayer;
    constructor() {
        this.fiftyMovesCounter = 0;
        this.halfMoveCounter = 0;
        this.castlePermissions = 0;
        this.enPassantPossible = false;
        this.board = new Board();
        this.currentPlayer = Player.WHITE;
        this.myColor = Player.WHITE; //get from server.

        this.whiteKingHasMoved = false;
        this.blackKingHasMoved = false;

        this.lastMoveMade = null;

        this.checkingHandler = new CheckHandler(this.myColor);
    }

    fillBoardWithPieces(){
        let pieceFactory = new PieceFactory();
        let whiteSet = pieceFactory.createFullSetFor(Player.WHITE);
        let blackSet = pieceFactory.createFullSetFor(Player.BLACK);

        this.whiteKing = whiteSet[4];
        this.blackKing = blackSet[4];

        this.checkingHandler.setupKings(this.whiteKing, this.blackKing);

        this.board.setPieces(whiteSet);
        this.board.setPieces(blackSet);

        console.log("Board initialized");
    }

    update(move){
        console.log("Game state updated");
        this.makeMove(move);
        this.lastMoveMade = move;
        //TODO and so on...
        //update counters
        //change currentplayer
        //update board..
        //and so on..
    }

    makeMove(move){

        //TODO convert to if checks... so we can have multiple cases..
        switch (move.moveType) {
            case MoveType.CHECKING:
                //add to checking pieces..

                this.checkingHandler.setOpponentInCheck();
                this.board.makeMove(move);
                //TODO check for check make ..
                //TODO signal game over..

                break;
            case MoveType.DEFAULT:
                this.board.makeMove(move);
                break;
            case MoveType.PAWN_PROMOTION:
                //change the existing pawn on the board with a queen.. or something that the user selected
                //.. start pawn-promotion user interaction..
                //if we want to implement that.

                //after promotion check if the king is now in check..
                break;
            case MoveType.CASTLE:
                this.board.makeCastle(move);
                //perform the castle.
                this._myKingHasMoved();
                break;
            case MoveType.EN_PASSANT:
                //delete the correct pawn..
                this.board.makeMove(move);
                break;
            case MoveType.KING_MOVE:
                this.board.makeMove(move);
                this._myKingHasMoved();
        }
    }

    _myKingHasMoved(){
        if(this.myColor === Player.WHITE){
            this.whiteKingHasMoved = true;
        }
        else{
            this.blackKingHasMoved = true;
        }
    }

    print(){
        console.log(json.stringify(this));
    }
}
