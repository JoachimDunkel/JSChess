class Util {

    static RotatePositionY180(position){
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
        let y = mapping[position.y];

        return new Position(position.x, y);
    }

    static RotatePositionX180(position){
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
        let x = mapping[position.x];
        return new Position(x, position.y);
    }

    static TwoToOneDimension(position){
        return (position.y * 8) + (position.x);
    }
}
