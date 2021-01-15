class BoardUi {

    constructor(userClickMoveHandler) {
        this.userClickedMoveHandler = userClickMoveHandler;
    }

    initEmptyBoard() {
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

                    this.userClickedMoveHandler.handleUserClickEvent(cell.id, new Position(i,j))
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

    placePieces(pieces, rotate){
        let num_pieces = pieces.length;

        for(let i = 0; i < num_pieces; i++)
        {
            let position = pieces[i].getPosition();
            let piece_name = pieces[i].getImageSource();
            let piece = new Image();
            piece.src = "images/"+piece_name;
            console.log("Board Visual piece_name_b ",piece.src);

            let uiPosition = position;
            if(rotate){
                uiPosition = this.TransformPosition180(position);
            }
            let location = this.TwoToOneDimension(uiPosition);
            console.log("Piece_name_b position",location);

            console.log("position " + uiPosition);

            //probably not the best idea.. (but it should be distinguishable from the cells right ?
            piece.id = 1000 + location;

            //this.registerPieceDragAndDropEvent(viewEvents, piece, cell)


            let cell = document.getElementById(location.toString());
            cell.attributes
            cell.appendChild(piece);
        }
    }


    //TODO register specific events that react to drag and drop...
    //atm we use the same events as when clicking ether decide for one method or add another event to the view..
    registerPieceDragAndDropEvent(viewEvents, piece, cell) {
        piece.draggable();
        // $('img').draggable();
        // $('div').droppable({
        //     drop: function(ev, ui) {
        //         let dropped = ui.draggable;
        //         let droppedOn = $(this);
        //
        //         //Position of the img
        //         console.log("Start pos.: " + dropped.attr("id"));
        //         let old_pos = dropped.attr("id")
        //         //Destination aka where it was dropped.
        //         console.log("Moved pos.: " + droppedOn.attr("id"));
        //         let new_pos = droppedOn.attr("id")
        //         //TODO Check if move is valid
        //
        //
        //         var old_x =  old_pos % 8;
        //         var old_y = (old_pos - old_x) / 8;
        //         var new_x =  new_pos % 8;
        //         var new_y = (new_pos - new_x) / 8;
        //         let moveUserWantsToMake = {
        //             oldPosition : new Position(old_x,old_y),
        //             newPosition : new Position(new_x,new_y)
        //         };
        //
        //         console.log(moveUserWantsToMake.oldPosition.y + "," + moveUserWantsToMake.oldPosition.x + " -> "
        //             + moveUserWantsToMake.newPosition.y + "," + moveUserWantsToMake.newPosition.x);
        //
        //         console.log("My Color: " + _thisRef._gameState.getMyColor());
        //
        //         //look up if we can make this move in our datastructure..
        //         // use function _lookupMove() to see if valid
        //         let move;
        //         move = _thisRef._lookupMove(moveUserWantsToMake);
        //
        //         if(move === null){
        //             // not valid move
        //             // return to original position
        //             $(dropped).css({top: 12, left: -2}).appendTo(dropped);
        //             return null;
        //         }
        //
        //         console.log("move  ", move);
        //
        //         //If valid, only then move it.
        //         $(dropped).detach().css({top: 12, left: -2}).appendTo(droppedOn);
        //
        //
        //         _thisRef._gameState.update(move);
        //
        //         _thisRef.allPossiblesMovesForPlayer =
        //             _thisRef._generateAllPossibleMovesForPlayer(_thisRef._gameState.myColor);
        //
        //         // connectionHandler... send update over server..
        //         // send connectionHandler get move from opponent
        //         //$(dropped).detach().css({top: 12, left: -2}).appendTo(droppedOn);
        //         //let moveOpponent = _thisRef.connectionHandler.awaitOpponentMove();
        //         //this.gameState.update(moveOpponent);
        //         //_thisRef._gameState.update(move);
        //     }
        // });
        // $(' div').not(' div:empty').droppable();
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
