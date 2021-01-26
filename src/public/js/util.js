class Util {

    static _inverseBoardCoordinate(coordinate){
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
        return mapping[coordinate];
    }

    static RotatePositionY180(position){
        let y = this._inverseBoardCoordinate(position.y);
        return new Position(position.x, y);
    }

    static RotatePositionX180(position){
        let x =  this._inverseBoardCoordinate(position.x);
        return new Position(x, position.y);
    }

    static TwoToOneDimension(position){
        return (position.y * 8) + (position.x);
    }

    static _uiPositionCoordinateTranslation(position, gameState){
        if(gameState.myColor === Player.WHITE){
            return Util.RotatePositionY180(position);
        }
        return Util.RotatePositionX180(position);
    }
}
