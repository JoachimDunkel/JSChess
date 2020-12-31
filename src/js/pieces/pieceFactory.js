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
            this.createPiece(PieceType.ROOK, PlayerType, new Position(0,figures_y)),
            this.createPiece(PieceType.KNIGHT, PlayerType, new Position(1,figures_y)),
            this.createPiece(PieceType.BISHOP, PlayerType, new Position(2,figures_y)),

            this.createPiece(PieceType.QUEEN, PlayerType, new Position(3,figures_y)),
            this.createPiece(PieceType.KING, PlayerType, new Position(4,figures_y)),

            this.createPiece(PieceType.BISHOP, PlayerType, new Position(5,figures_y)),
            this.createPiece(PieceType.KNIGHT, PlayerType, new Position(6,figures_y)),
            this.createPiece(PieceType.ROOK, PlayerType, new Position(7,figures_y)),

            this.createPiece(PieceType.PAWN, PlayerType, new Position(0,pawns_y)),
            this.createPiece(PieceType.PAWN, PlayerType, new Position(1,pawns_y)),
            this.createPiece(PieceType.PAWN, PlayerType, new Position(2,pawns_y)),
            this.createPiece(PieceType.PAWN, PlayerType, new Position(3,pawns_y)),

            this.createPiece(PieceType.PAWN, PlayerType, new Position(4,pawns_y)),
            this.createPiece(PieceType.PAWN, PlayerType, new Position(5,pawns_y)),
            this.createPiece(PieceType.PAWN, PlayerType, new Position(6,pawns_y)),
            this.createPiece(PieceType.PAWN, PlayerType, new Position(7,pawns_y)),
        ];
    }
}
