class ImageSourceProvider {

    //load .. work with relative paths whatever

    constructor() {
        this.blackPieces = {Bishop : "bBishop.png", King : "bKing.png", Knight : "bKnight.png", Pawn : "bPawn.png",
            Queen : "bQueen.png", Rook : "bRook.png"};
        this.whitePieces = {Bishop : "wBishop.png", King : "wKing.png", Knight: "wKnight.png", Pawn :
                "wPawn.png", Queen : "wQueen.png", Rook : "wRook.png"};
    }

    provideImageFor(playerType, pieceType){
        var pieces;
        if(playerType === Player.WHITE){
            pieces = this.whitePieces;
        }
        else {
            pieces = this.blackPieces;
        }
        switch (pieceType) {
            case PieceType.PAWN:
                return pieces.Pawn;
            case PieceType.ROOK:
                return pieces.Rook;
            case PieceType.KING:
                return pieces.King;
            case PieceType.QUEEN:
                return pieces.Queen;
            case PieceType.KNIGHT:
                return pieces.Knight;
            case PieceType.BISHOP:
                return pieces.Bishop;
        }

    }


}
