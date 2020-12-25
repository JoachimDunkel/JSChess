const PieceType = {NONE: 0, PAWN: 1, KNIGHT: 2, BISHOP: 3, ROOK: 4, QUEEN: 5, KING: 6};

const CastlePermissions = {WHITE_KING_SIDE : 1, WHITE_QUEEN_SIDE : 2, BLACK_KING_SIDE : 4, BLACK_QUEEN_SIDE : 8};

const BOOL = { FALSE:0, TRUE:1 };

const Player = {WHITE :0, BLACK: 1};

const BoardSize = 8;

const MoveType = {DEFAULT : 0, EN_PASSANT : 1, CASTLE : 2,  CHECKING: 3, PAWN_PROMOTION :4, KING_MOVE : 5}
