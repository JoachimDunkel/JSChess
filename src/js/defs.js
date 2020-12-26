const PieceType = {NONE: 0, PAWN: 1, KNIGHT: 2, BISHOP: 3, ROOK: 4, QUEEN: 5, KING: 6};

const CastlePermissions = {WHITE_KING_SIDE : 1, WHITE_QUEEN_SIDE : 2, BLACK_KING_SIDE : 4, BLACK_QUEEN_SIDE : 8};

const BOOL = { FALSE:0, TRUE:1 };

const Player = {WHITE :0, BLACK: 1};

const BoardSize = 8;

const MoveType = {DEFAULT : 1, EN_PASSANT : 2, CASTLE : 4,  CHECKING : 8, PAWN_PROMOTION : 16, KING_MOVE : 32}
