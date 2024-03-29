const PieceType = {NONE: 0, PAWN: 1, KNIGHT: 2, BISHOP: 3, ROOK: 4, QUEEN: 5, KING: 6};

const CastlePermissions = {WHITE_KING_SIDE : 1, WHITE_QUEEN_SIDE : 2, BLACK_KING_SIDE : 4, BLACK_QUEEN_SIDE : 8};

const Player = {WHITE :0, BLACK: 1};

const BoardSize = 8;

const MoveType = {DEFAULT : 0, EN_PASSANT : 1, CASTLE : 2, PAWN_PROMOTION : 3}

const GameStatus = {RUNNING: 1, WON : 2, LOST : 3, DRAW : 4}

const FILE = {A : 0, B : 1, C : 2, D : 3, E : 4 , F: 5 , G : 6, H : 7}


const gameStateFileStorageId = "42666";

const CellColor = {WHITE : 'white', GRAY : 'gray'}
