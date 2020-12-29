class GameState {
    currentPlayer;
    constructor(myColor) {
        this.fiftyMovesCounter = 0;
        this.halfMoveCounter = 0;

        this.board = new Board();

        this.castlePermissions =
            CastlePermissions.BLACK_KING_SIDE |
            CastlePermissions.BLACK_QUEEN_SIDE |
            CastlePermissions.WHITE_KING_SIDE |
            CastlePermissions.WHITE_QUEEN_SIDE;

        this.lastMoveMade = null;
        this.allMovesMade = [];

        this.checkingHandler = new CheckHandler();

        this.gameStatus = GameStatus.RUNNING;
    }

    setMyColor(myColor){
        this.myColor = myColor;
        this.opponenColor = Player.BLACK;
        if(this.myColor === Player.BLACK){
            this.opponenColor = Player.WHITE;
        }
        this.checkingHandler.myColor = this.myColor;
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

        //always add a half move.. add a full move every time white is on the move...
        this.halfMoveCounter += 1;
        if(this.myColor === Player.WHITE){
            this.fiftyMovesCounter += 1;
        }

        //if pawn move or taking move reset fifty move counter...
        if(move.piece.getType() === PieceType.PAWN){
            this.fiftyMovesCounter = 0;
        }

        let field = this.board.getObjAtPosition(move.newPosition);
        if(field !== null && field.getPlayerType() === this.opponenColor){
            this.fiftyMovesCounter = 0;
        }

        this.updateCastlingRights(move);

        this.makeMove(move);

        //check if move leads to check.
        let opponentNowInCheck = new MoveValidator(this).moveLeadsToCheck(move, this.opponenColor);
        if(opponentNowInCheck){
            this.checkingHandler.setOpponentInCheck();
        }

        this.lastMoveMade = move;
        this.allMovesMade.push(move);
    }

    makeMove(move){
        //TODO
        if(move.moveType === MoveType.EN_PASSANT){
            //delete the correct pawn...
        }

        else if(move.moveType === MoveType.PAWN_PROMOTION){
            //start pawn user interaction or send it before..
            //or we just auto-queen
            move.piece = new PieceFactory().createPiece(PieceType.QUEEN, this.myColor, move.newPosition);
        }

        if(move.moveType === MoveType.CASTLE){
            this.board.makeCastle(move);
        }
        else{
            this.board.makeMove(move);
        }
    }

    updateCastlingRights(move){
        if(!this.iHaveKingSideCastlingRights() && !this.iHaveQueenSideCastlingRights()){
            return;
        }

        let yPosition = 0;
        let kingSideCastleFlag = CastlePermissions.WHITE_KING_SIDE;
        let queenSideCastleFlag = CastlePermissions.WHITE_QUEEN_SIDE;
        if(this.myColor === Player.BLACK) {
            yPosition = 7;
            kingSideCastleFlag = CastlePermissions.BLACK_KING_SIDE;
            queenSideCastleFlag = CastlePermissions.BLACK_QUEEN_SIDE;
        }

        //if i move the kingside rook i loose king side castling
        if(move.piece.equals(new Piece(this.myColor,PieceType.ROOK, new Position(7, yPosition)))){
            this.castlePermissions = this.castlePermissions ^ kingSideCastleFlag;
        }

        //if i moved the queensideRook I loose queenside castling
        if(move.piece.equals(new Piece(this.myColor,PieceType.ROOK, new Position(0, yPosition)))){
            this.castlePermissions = this.castlePermissions ^ queenSideCastleFlag;
        }

        //if i move the king i loose both castling rights..
        let bothCastlingRights = kingSideCastleFlag | queenSideCastleFlag;
        if(move.piece.equals(new Piece(this.myColor, PieceType.KING, new Position(4, yPosition)))){
            this.castlePermissions = this.castlePermissions ^ bothCastlingRights;
        }
    }

    iHaveKingSideCastlingRights(){
        let castlingRights = CastlePermissions.BLACK_KING_SIDE;
        if(this.myColor === Player.WHITE){
            castlingRights = CastlePermissions.WHITE_KING_SIDE;
        }

        return (this.castlePermissions & castlingRights) === castlingRights;
    }

    iHaveQueenSideCastlingRights(){
        let castlingRights = CastlePermissions.BLACK_QUEEN_SIDE;
        if(this.myColor === Player.WHITE){
            castlingRights = CastlePermissions.WHITE_QUEEN_SIDE;
        }

        return (this.castlePermissions & castlingRights) === castlingRights;
    }
}
