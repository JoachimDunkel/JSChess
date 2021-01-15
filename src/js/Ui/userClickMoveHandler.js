class UserClickMoveHandler {
    constructor(viewEvents) {
        this.reset();
        this.viewEvents = viewEvents;
    }

    reset(){
        this.fromCellId = null;
        this.fromCellpreviousBackgroundColor = null;

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
        }
        else{
            this.toPosition = position;
            this.viewEvents.trigger([this.fromPosition, this.toPosition]);
            this.undoCellHighlight();
            this.reset();
        }
    }

    highlightCell(){
        let cell = document.getElementById(this.fromCellId);
        this.fromCellpreviousBackgroundColor = cell.style.backgroundColor;
        cell.style.backgroundColor = 'blue';
    }

    undoCellHighlight(){
        let cell = document.getElementById(this.fromCellId);
        cell.style.backgroundColor = this.fromCellpreviousBackgroundColor;
    }

}
