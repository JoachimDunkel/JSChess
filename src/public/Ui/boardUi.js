class BoardUi {

    constructor(userClickMoveHandler) {
        this.userClickedMoveHandler = userClickMoveHandler;
    }

    initEmptyBoard() {
        let count = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const cell = document.createElement('div');
                let shiftColor = (i % 2 !== 0);
                let even = j % 2 === 0;

                let colorToUse = "";
                if(even && !shiftColor){
                    colorToUse = CellColor.GRAY;
                }
                if(!even && !shiftColor){
                    colorToUse = CellColor.WHITE;
                }
                if(even && shiftColor){
                    colorToUse = CellColor.WHITE;
                }
                if(!even && shiftColor){
                    colorToUse = CellColor.GRAY;
                }

                cell.id = count.toString();
                cell.className = colorToUse;

                cell.addEventListener('click', () =>{

                    this.userClickedMoveHandler.handleUserClickEvent(cell.id, new Position(j,i))
                });
                $("#board_game").append(cell);

                count += 1;
            }
        }
    }

    fillBoardUi(gameBoard, rotate){
        let blackPieces = gameBoard.getAllPiecesOfPlayer(Player.BLACK);

        this.placePieces(blackPieces, rotate);

        let whitePieces = gameBoard.getAllPiecesOfPlayer(Player.WHITE);
        this.placePieces(whitePieces, rotate);
    }

    clearBoardUi(){
        for (let i = 0; i < 64; i++) {
            let cell = document.getElementById(i.toString());
            while ( cell.firstChild ) cell.removeChild( cell.firstChild );
        }
    }

    invertBoardUiCellColoring(){
        for (let i = 0; i < 64; i++) {
            let cell = document.getElementById(i.toString());
            if(cell.className === CellColor.WHITE){
                cell.className = CellColor.GRAY;
            }
            else{
                cell.className = CellColor.WHITE;
            }
        }
    }

    placePieces(pieces, rotate){
        let num_pieces = pieces.length;

        for(let i = 0; i < num_pieces; i++)
        {
            let position = pieces[i].getPosition();
            let piece_name = pieces[i].getImageSource();
            let piece = new Image();
            piece.src = "images/"+piece_name;

            let uiPosition = position;
            if(rotate){
                uiPosition = Util.RotatePositionY180(position);
            }
            else{
                uiPosition = Util.RotatePositionX180(position);
            }

            let location = Util.TwoToOneDimension(uiPosition);

            piece.id = 1000 + location;

            let cell = document.getElementById(location.toString());
            cell.attributes
            cell.appendChild(piece);
        }
    }
}
