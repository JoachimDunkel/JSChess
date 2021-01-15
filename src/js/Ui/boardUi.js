class BoardUi {

    constructor() {
        this.name = "BoardUi";
    }

    initEmptyBoard(viewEvents) {
        let gray ='gray';
        let white = "white";

        let count = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const cell = document.createElement('div');
                let shiftColor = (i % 2 !== 0);
                let even = j % 2 === 0;

                let colorToUse = "";
                if(even && !shiftColor){
                    colorToUse = gray;
                }
                if(!even && !shiftColor){
                    colorToUse = white;
                }
                if(even && shiftColor){
                    colorToUse = white;
                }
                if(!even && shiftColor){
                    colorToUse = gray;
                }

                cell.id = count.toString();
                cell.className = colorToUse;

                cell.addEventListener('click', () =>{
                    let clickedPosition = new Position(i,j);
                    viewEvents.trigger(clickedPosition);
                });
                $("#board_game").append(cell);

                count += 1;
            }
        }
    }


    fillBoardWithPieces(gameBoard){
        let blackPieces = gameBoard.getAllPiecesOfPlayer(Player.BLACK);
        let num_pieces = blackPieces.length;
        for(let i = 0; i < num_pieces; i++)
        {
            let position = blackPieces[i].getPosition();
            let piece_name = blackPieces[i].getImageSource();
            let img = new Image();
            img.src = "images/"+piece_name;
            console.log("Board Visual piece_name_b ",img.src);

            let location = this.TwoToOneDimension(position);
            console.log("Piece_name_b position",location);

            console.log("position " + position);

            // add img of the piece to the correct location(= correct div id)
            $(`#board_game div:eq(${location})`).append(img);
            $(`#board_game div:eq(${location}) img`).attr('id', location.toString());
        }

        let whitePieces = gameBoard.getAllPiecesOfPlayer(Player.WHITE);
        num_pieces = whitePieces.length;


        for(let i = 0; i < num_pieces; i++)
        {
            let position = whitePieces[i].getPosition();
            let piece_name = whitePieces[i].getImageSource();
            let img = new Image();
            img.src = "images/"+piece_name;
            console.log("Board Visual piece_name ",img.src);

            let location = (position.y * 8) + (position.x);
            console.log("Piece_name position",location);

            // add img of the piece to the correct location(= correct div id)
            $(`#board_game div:eq(${location})`).append(img);
            $(`#board_game div:eq(${location}) img`).attr('id', location.toString());

        }
    }

    TwoToOneDimension(position){
        return (position.y * 8) + (position.x);
    }

    OneToTwoDimensions(i){

    }

}
