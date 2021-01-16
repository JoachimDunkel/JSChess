class Board {

    constructor() {
        this.initEmptyBoard();
    }

    static fromJsonObject(object){
        let board = new Board();
        board._board = object._board;

        for(let i = 0; i < BoardSize; i++){
            for(let j = 0; j < BoardSize; j++){
                let newPiece = null;

                let piece = object._board[i][j];
                if(piece !== null) {
                    newPiece = Piece.fromJsonObject(piece);
                }
                board._board[i][j] = newPiece;
            }
        }
        return board;
    }

    initEmptyBoard() {
        this._board = [];
        for(let i = 0; i < BoardSize; i++){
            this._board[i] = [];
            for(let j = 0; j < BoardSize; j++){

                this._board[i][j] = null;
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
        this._board[position.x][position.y] = null;
    }

    getAllPiecesOfPlayer(playerType){
        let myPieces = [];

        for(let i = 0; i < BoardSize; i++){
            for(let j = 0; j < BoardSize; j++){
                let piece = this.getObjAtPosition(new Position(i,j));
                if(piece !== null && piece.getPlayerType() === playerType){
                    myPieces.push(piece);
                }
            }
        }
        return myPieces;
    }
}

