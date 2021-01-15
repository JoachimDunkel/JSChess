class UserClickMoveHandler {
    constructor(viewEvents) {
        this.reset();
        this.viewEvents = viewEvents;
    }

    reset(){
        this.fromCellId = null;
        this.toCellId = null;
        this.fromPosition = null;
        this.toPosition = null;
        this.userHasAlreadyClickedCell = false;
    }

    handleUserClickEvent(cellId, position){
        if(!this.userHasAlreadyClickedCell){
            this.fromCellId = cellId;
            this.fromPosition = position;
            this.userHasAlreadyClickedCell = true;
        }
        else{
            this.toCellId = cellId;
            this.toPosition = position;
            this.viewEvents.trigger([this.fromPosition, this.toPosition]);
            this.reset();
        }
    }

    highlightCell(){
        
    }

    undoCellHighlight(){

    }

}
