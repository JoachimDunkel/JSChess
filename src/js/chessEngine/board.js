class Board {

    constructor() {
        this.initEmptyBoard();
    }

    //Fuck javascript doesn't even have 2D-arrays?
    initEmptyBoard() {
        this._board = [];
        for(let i = 0; i < BoardSize; i++){ //y
            this._board[i] = [];
            for(let j = 0; j < BoardSize; j++){ //x

                this._board[i][j] = null;
            }
        }
    }

    setPieces(pieces){
        pieces.forEach(piece => this.setPiece(piece));
    }

    setPiece(piece){
        let position = piece.getPosition();
        this._board[position.y][position.x] = piece; //x,y switched in oder to print board correctly
    }

    getObjAtPosition(Position){
        return this._board[Position.y][Position.x]; //x,y switched
    }

    //movePiece ?
    //helper function delete later..

    //feel free to change it and make it so the pieces are printed in a good way.

    printBoard(){
        console.log("Current Board is: ");
        console.log("==========================================");

        for(let i = 0; i < BoardSize; i++){
            let row = "| "
            for(let j = 0; j < BoardSize; j++){
                let field = this._board[i][j];
                let toPrint = "";
                let colorPrefix ="0";

                if(field !== null){
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
        this.clearField(move.previousPosition);
        piece.setPosition(move.newPosition);
        this.clearField(move.newPosition);
        this.setPiece(piece);
    }

    makeCastle(move){
        let rookMove = move.getRookMoveForCastling(this);
        this.makeMove(move);
        if(rookMove === null) return;
        this.makeMove(rookMove);
    }

    clearField(position){
        this._board[position.y][position.x] = null; //switched
    }

    getAllPiecesOfPlayer(playerType){
        let myPieces = [];

        for(let i = 0; i < BoardSize; i++){
            for(let j = 0; j < BoardSize; j++){
                let piece = this.getObjAtPosition(new Position(j,i)); // i,j switched
                if(piece !== null && piece.getPlayerType() === playerType){
                    myPieces.push(piece);
                }
            }
        }
        return myPieces;
    }
}

