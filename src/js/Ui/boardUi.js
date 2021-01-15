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
                    colorToUse = white;
                }
                if(!even && !shiftColor){
                    colorToUse = gray;
                }
                if(even && shiftColor){
                    colorToUse = gray;
                }
                if(!even && shiftColor){
                    colorToUse = white;
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

    fillBoardUi(gameBoard, rotate){
        let blackPieces = gameBoard.getAllPiecesOfPlayer(Player.BLACK);

        this.placePieces(blackPieces, rotate);

        let whitePieces = gameBoard.getAllPiecesOfPlayer(Player.WHITE);
        this.placePieces(whitePieces, rotate);
    }

    placePieces(pieces, rotate){
        let num_pieces = pieces.length;

        for(let i = 0; i < num_pieces; i++)
        {
            let position = pieces[i].getPosition();
            let piece_name = pieces[i].getImageSource();
            let img = new Image();
            img.src = "images/"+piece_name;
            console.log("Board Visual piece_name_b ",img.src);

            let uiPosition = position;
            if(rotate){
                uiPosition = this.TransformPosition180(position);
            }
            let location = this.TwoToOneDimension(uiPosition);
            console.log("Piece_name_b position",location);

            console.log("position " + uiPosition);

            //probably not the best idea.. (but it should be distinguishable from the cells right ?
            img.id = 1000 + location;

            let cell = document.getElementById(location.toString());
            cell.attributes
            cell.appendChild(img);
        }
    }

    TwoToOneDimension(position){
        return (position.y * 8) + (position.x);
    }

    OneToTwoDimensions(i){

    }

    TransformPosition180(position){
        let mapping = {
            0: 7,
            1: 6,
            2: 5,
            3: 4,
            4: 3,
            5: 2,
            6: 1,
            7: 0,
        }
        let x = position.x;
        let y = mapping[position.y];

        return new Position(x, y);
    }

}
