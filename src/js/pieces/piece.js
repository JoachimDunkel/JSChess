class Piece {

    constructor(playerType, type, position, imageSource) {
        this._playerType = playerType;
        this._type = type;
        this._position = position;
        this._imageSource = imageSource;

    }

    getPlayerType(){
        return this._playerType;
    }

    getType(){
        return this._type;
    }

    getPosition(){
        return this._position;
    }

    setPosition(position){
        this._position = position;
    }

    getImageSource(){
        return this._imageSource;
    }
}
