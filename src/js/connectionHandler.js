class ConnectionHandler {
    constructor() {
        //init or request server connection...
    }
    getCurrentPlayer() {
        //TODO, lets say white for now.
        return Player.WHITE;
    }

    findGame() {
        console.log("Find Game....");
        //For now we just say that we are white.
        //TODO
        return Player.WHITE;
    }

    awaitOpponentMove() {
        console.log("Recivede opponent move.");
        return undefined;
    }

    provideUserColorFromServer(){
        //todo smart get from server

        return Player.WHITE;
    }

}
