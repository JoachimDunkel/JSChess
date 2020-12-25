class CheckHandler {
    constructor(myColor) {
        this.myColor = myColor
        this.whiteIsInCheck = false;
        this.blackIsInCheck = false;
        this.checkingPieces = [];
    }

    setupKings(whiteKing, blackKing){
        this.whiteKing = whiteKing;
        this.blackKing = blackKing;
    }

    iAmInCheck(){
        if(this.myColor === Player.WHITE && this.whiteIsInCheck){
            return true;
        }
        else if(this.myColor === Player.BLACK && this.blackIsInCheck){
            return true;
        }
        return false;
    }

    opponentInCheck(){
        if(this.myColor === Player.WHITE && this.blackIsInCheck){
            return true;
        }
        else if(this.myColor === Player.BLACK && this.whiteIsInCheck){
            return true;
        }
        return false;
    }

    getMyKing(){
        if(this.myColor === Player.WHITE){
            return this.whiteKing;
        }
        else{
            return this.blackKing;
        }
    }

    //TODO...
    getOpponentKing(){

    }

    setOpponentInCheck(){
        if(this.myColor === Player.WHITE){
            this.blackIsInCheck = true;
        }
        else{
            this.whiteIsInCheck = true;
        }
    }

    setIamInCheck(){
        if(this.myColor === Player.WHITE){
            this.whiteIsInCheck = true;
        }
        else{
            this.blackIsInCheck = true;
        }
    }

    //TODO
    setIamOutOfCheck(){

    }

}
