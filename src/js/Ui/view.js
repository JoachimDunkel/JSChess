class View {
    constructor() {
        this.playEvent = new MvcEvent();
    }

    render(){
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
                    this.playEvent.trigger(clickedPosition);
                });
                $("#board_game").append(cell);

                count += 1;
            }
        }

        this.message = document.createElement('div');
        this.message.className = 'message';

        document.body.appendChild(this.message);
    }

    updateBoard(board){
        console.log("View. Update board was called");
    }


    gameOver(gameStatus){
        //TODO change message based on gameStatus
        this.message.innerHTML = '${gameStatus} wins!';
        console.log("View.game over was triggered");
        // console.log("Game has ended it's a: ")
        // console.log(gameStatus);
    }

}
