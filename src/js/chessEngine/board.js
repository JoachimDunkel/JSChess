class Board {

    constructor() {
        this.initEmptyBoard();
    }

    //Fuck javascript doesn't even have 2D-arrays?
    initEmptyBoard() {
        this._board = [];
        for(let i = 0; i < BoardSize; i++){
            this._board[i] = [];
            for(let j = 0; j < BoardSize; j++){

                //TODO change with null;
                //having multiple different object types is kinda dirty... maybe create field object that contains a piece or not..
                this._board[i][j] = PieceType.NONE;
            }
        }
    }

    setPieces(pieces){
        pieces.forEach(piece => this.setPiece(piece));
    }

    setPiece(piece){
        let position = piece.getPosition();
        this._board[position.x][position.y] = piece;
    }

    getObjAtPosition(Position){
        return this._board[Position.x][Position.y];
    }

    //movePiece ?
    //helper function delete later..

    printBoard(){
        console.log("Current Board is: ");
        console.log("==========================================");

        for(let i = 0; i < BoardSize; i++){
            let row = "| "
            for(let j = 0; j < BoardSize; j++){
                let field = this._board[i][j];
                let toPrint = field;
                let colorPrefix ="0";

                if(field instanceof Piece){
                    toPrint = field.getType();
                    if(field.getPlayerType() === Player.WHITE){
                        colorPrefix = "w";
                    }
                    else{
                        colorPrefix = "b";
                    }
                }
                row += colorPrefix + toPrint + " | ";
            }
            console.log(row);
            console.log("------------------------------------------");
        }
        console.log("==========================================");
    }

    moveIsOutOfBounds(position) {
        return (position.x < 0 || position.x > 7 || position.y < 0 || position.y > 7);
    }

    makeMove(move){
        let piece = move.piece;
        this.clearField(piece);
        piece.setPosition(move.newPosition);
        this.clearField(piece);
        this.setPiece(piece);
    }

    makeCastle(move){
        //find out the correct rook.
        //then makeMove(rook)
        //and makeMove(king)
    }

    clearField(piece){
        this._board[piece.getPosition().x][piece.getPosition().y] = PieceType.NONE;
    }
}

