class GameState {
    currentPlayer;
    constructor(myColor) {
        this.fiftyMovesCounter = 0;
        this.halfMoveCounter = 0;

        this.whiteIsInCheck = false;
        this.blackIsInCheck = false;

        this.whiteKing = null;
        this.blackKing = null;


        this.board = new Board();

        this.castlePermissions =
            CastlePermissions.BLACK_KING_SIDE |
            CastlePermissions.BLACK_QUEEN_SIDE |
            CastlePermissions.WHITE_KING_SIDE |
            CastlePermissions.WHITE_QUEEN_SIDE;

        this.lastMoveMade = null;
        this.allMovesMade = [];

        this.gameStatus = GameStatus.RUNNING;
    }

    setMyColor(myColor){
        this.myColor = myColor;
        this.opponenColor = Player.BLACK
        if(this.myColor === Player.BLACK){
            this.opponenColor = Player.WHITE;
        }
    }

    getMyColor(){
        return this.myColor;
    }

    initBoardUI(myColor){
        var cls='';
        var gray ='gray';
        var white = "white";

        var x = 1;
        for(let i = 1; i<=64;i++)
        {
            if(x && i%2!=0 ||!x&&i%2==0)
            {
                cls = white;
            }
            else
            {
                cls = gray;
            }
            var id_div = i - 1;
            var content="<div id='"+id_div.toString()+"' class='"+cls+"'></div>";
            $("#board_game").append(content);
            if(i%8===0)
                x=!x;
        }
    }

    renderBoard()
    {
        var black_p = this.board.getAllPiecesOfPlayer(Player.BLACK);
        //TODO: Take the length and not 16 since during the game it might be less
        for(let i = 0; i < 16; i++)
        {
            var position = black_p[i].getPosition();
            var piece_name = black_p[i].getImageSource();
            var img = new Image();
            img.src = "images/"+piece_name;
            console.log("Board Visual piece_name_b ",img.src);

            var location = (position.y * 8) + (position.x);
            console.log("Piece_name_b position",location);

            console.log("position " + position);

            // add img of the piece to the correct location(= correct div id)
            $(`#board_game div:eq(${location})`).append(img);
            $(`#board_game div:eq(${location}) img`).attr('id', location.toString());

        }

        var white_p = this.board.getAllPiecesOfPlayer(Player.WHITE);
        //TODO: Take the length and not 16 since during the game it might be less
        for(let i = 0; i < 16; i++)
        {
            var position = white_p[i].getPosition();
            var piece_name = white_p[i].getImageSource();
            var img = new Image();
            img.src = "images/"+piece_name;
            console.log("Board Visual piece_name ",img.src);

            var location = (position.y * 8) + (position.x);
            console.log("Piece_name position",location);

            // add img of the piece to the correct location(= correct div id)
            $(`#board_game div:eq(${location})`).append(img);
            $(`#board_game div:eq(${location}) img`).attr('id', location.toString());

        }


    }

    fillBoardWithPieces(myColor){
        //TODO: CHeck if board is reverted. IF not then revert/transpose the pieces for black
        //If this is the case, don't forget to do this any time when we render/update the board.
        if(myColor === Player.BLACK) {
            //
        }

        let pieceFactory = new PieceFactory();
        let whiteSet = pieceFactory.createFullSetFor(Player.WHITE);
        let blackSet = pieceFactory.createFullSetFor(Player.BLACK);

        this.whiteKing = whiteSet[4];
        this.blackKing = blackSet[4];

        this.setupKings(this.whiteKing, this.blackKing);

        this.board.setPieces(whiteSet);
        this.board.setPieces(blackSet);

        console.log("Board initialized");

        this.renderBoard();
        this.board.printBoard();
    }

    update(move){
        //i am not in check anymore after a move otherwise the move shouldn't have been possible
        this.setIamOutOfCheck();

        //always add a half move.. add a full move every time white is on the move...
        this.halfMoveCounter += 1;
        if(this.myColor === Player.WHITE){
            this.fiftyMovesCounter += 1;
        }

        //if pawn move or taking move reset fifty move counter...
        if(move.piece.getType() === PieceType.PAWN){
            this.fiftyMovesCounter = 0;
        }

        //check if move leads to check on opponent.
        this.invalidateOpponentInCheck(move);

        //if we made a castling move we have to consider the new rook position aswell
        if (move.moveType === MoveType.CASTLE){
            this.invalidateOpponentInCheck(move.getRookMoveForCastling(this.board));
        }

        let field = this.board.getObjAtPosition(move.newPosition);
        if(field !== null && field.getPlayerType() === this.opponenColor){
            this.fiftyMovesCounter = 0;
        }

        this.updateCastlingRights(move);
        this.makeMove(move);

        this.lastMoveMade = move;
        this.allMovesMade.push(move);
        //TODO: render board
        // + printBoard()

        this.board.printBoard();
    }

    invalidateOpponentInCheck(move){
        let opponentNowInCheck = new MoveValidator(this).moveLeadsToCheckOn(move, this.opponenColor);
        if(opponentNowInCheck){
            this.setOpponentInCheck();
        }
    }

    makeMove(move){
        if(move.moveType === MoveType.EN_PASSANT){
            //delete the correct pawn...
            let lastMovedPiece = this.lastMoveMade.piece;
            this.board.clearField(lastMovedPiece.getPosition());
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

        //update the king reference broken for some reason ??
        if(move.piece.getType() === PieceType.KING){
            if(move.piece.getPlayerType() === Player.WHITE){
                this.whiteKing = move.piece;
            }
            else {
                this.blackKing = move.piece;
            }
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

    setupKings(whiteKing, blackKing){
        this.whiteKing = whiteKing;
        this.blackKing = blackKing;
    }

    iAmInCheck(){
        if(this.myColor === Player.WHITE && this.whiteIsInCheck){
            return true;
        }
        else if(this.myColor === Player.BLACK && this.blackIsInCheck){
            return true;
        }
        return false;
    }

    opponentInCheck(){
        if(this.myColor === Player.WHITE && this.blackIsInCheck){
            return true;
        }
        else if(this.myColor === Player.BLACK && this.whiteIsInCheck){
            return true;
        }
        return false;
    }

    getMyKing(){
        if(this.myColor === Player.WHITE){
            return this.whiteKing;
        }
        else{
            return this.blackKing;
        }
    }

    getOpponentKing(){
        if(this.myColor === Player.WHITE){
            return this.blackKing;
        }
        else{
            return this.whiteKing;
        }

    }

    setOpponentInCheck(){
        if(this.myColor === Player.WHITE){
            this.blackIsInCheck = true;
        }
        else{
            this.whiteIsInCheck = true;
        }
    }


    setIamOutOfCheck(){
        if(this.myColor === Player.WHITE){
            this.whiteIsInCheck = false;
        }
        else{
            this.blackIsInCheck = false;
        }
    }

    //TODO delete this two maybe if we do not need them at all..
    setIamInCheck(){
        if(this.myColor === Player.WHITE){
            this.whiteIsInCheck = true;
        }
        else{
            this.blackIsInCheck = true;
        }
    }


    setOpponentOufOfCheck(){
        if(this.myColor === Player.WHITE){
            this.blackIsInCheck = false;
        }
        else{
            this.whiteIsInCheck = false;
        }
    }
}
