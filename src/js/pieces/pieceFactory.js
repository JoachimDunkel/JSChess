class PieceFactory {
    constructor() {
        this._imageSourceProvider = new ImageSourceProvider();
    }

    createPiece(PieceTye, PlayerType, Position){
        const imageSource = this._imageSourceProvider.provideImageFor(PlayerType, PieceTye);
        return new Piece(PlayerType, PieceTye,Position, imageSource);
    }

    createFullSetFor(PlayerType){
        var figures_y;
        var pawns_y;
        if(PlayerType === Player.WHITE){
            figures_y = 0;
            pawns_y = 1;
        }
        else{
            figures_y = 7;
            pawns_y = 6;
        }
        return [
            this.createPiece(PieceType.ROOK, PlayerType, new Position(figures_y,0)),
            this.createPiece(PieceType.KNIGHT, PlayerType, new Position(figures_y,1)),
            this.createPiece(PieceType.BISHOP, PlayerType, new Position(figures_y,2)),

            this.createPiece(PieceType.QUEEN, PlayerType, new Position(figures_y,3)),
            this.createPiece(PieceType.KING, PlayerType, new Position(figures_y,4)),

            this.createPiece(PieceType.BISHOP, PlayerType, new Position(figures_y,5)),
            this.createPiece(PieceType.KNIGHT, PlayerType, new Position(figures_y,6)),
            this.createPiece(PieceType.ROOK, PlayerType, new Position(figures_y,7)),

            this.createPiece(PieceType.PAWN, PlayerType, new Position(pawns_y,0)),
            this.createPiece(PieceType.PAWN, PlayerType, new Position(pawns_y,1)),
            this.createPiece(PieceType.PAWN, PlayerType, new Position(pawns_y,2)),
            this.createPiece(PieceType.PAWN, PlayerType, new Position(pawns_y,3)),

            this.createPiece(PieceType.PAWN, PlayerType, new Position(pawns_y,4)),
            this.createPiece(PieceType.PAWN, PlayerType, new Position(pawns_y,5)),
            this.createPiece(PieceType.PAWN, PlayerType, new Position(pawns_y,6)),
            this.createPiece(PieceType.PAWN, PlayerType, new Position(pawns_y,7)),
        ];
    }
}
