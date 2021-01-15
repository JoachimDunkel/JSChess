class UserClickMoveHandler {
    constructor(playEvent, askPossibleMovesEvent) {
        this.reset();
        this.playEvent = playEvent;
        this.askPossibleMovesEvent = askPossibleMovesEvent;
    }

    reset(){
        this.fromCellId = null;
        this.possibleMovesCellIds = [];

        this.fromPosition = null;
        this.toPosition = null;
        this.userHasAlreadyClickedCell = false;
    }

    handleUserClickEvent(cellId, position){
        if(!this.userHasAlreadyClickedCell){
            this.fromCellId = cellId;
            this.fromPosition = position;
            this.userHasAlreadyClickedCell = true;
            this.highlightCell();
            this.highlightPossibleMoves(this.fromPosition);
        }
        else{
            this.toPosition = position;

            //nur triggern wenn das feld in den gehighlighteten möglichen zügen ist.
            let isInPossibleMoves = false;
            let cellIdUserClickedAt = Util.TwoToOneDimension(this.toPosition);
            for (const thisCellId of this.possibleMovesCellIds) {
                if(thisCellId === cellIdUserClickedAt){
                    isInPossibleMoves = true;
                    break;
                }
            }

            if(isInPossibleMoves){
                this.playEvent.trigger([this.fromPosition, this.toPosition]);
            }
            this.undoCellHighlight();
            this.undoHighlightPossibleMoves();
            this.reset();
        }
    }

    highlightCell(){
        let cell = document.getElementById(this.fromCellId);
        cell.style.backgroundColor = 'Goldenrod';
    }

    undoCellHighlight(){
        let cell = document.getElementById(this.fromCellId);
        cell.style.backgroundColor = "";
    }

    highlightPossibleMoves(fromMove){
        this.askPossibleMovesEvent.trigger(fromMove);
        let possibleMoves = this.askPossibleMovesEvent.result;
        for (const move of possibleMoves) {
            let cellId = Util.TwoToOneDimension(move.newPosition);
            let cell = document.getElementById(cellId);

            this.possibleMovesCellIds.push(cellId);

            let isBlackCell = cell.className === "gray";
            if(isBlackCell){
                cell.style.backgroundColor = "MediumSeaGreen";
            }
            else{
                cell.style.backgroundColor = "LightGreen";
            }
        }
    }

    undoHighlightPossibleMoves(){
        for (const cellId of this.possibleMovesCellIds) {
            let cell = document.getElementById(cellId);
            cell.style.backgroundColor = "";
        }
    }
}
