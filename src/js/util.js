class Util {

    static TransformPosition180(position){
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

    static TwoToOneDimension(position){
        return (position.y * 8) + (position.x);
    }
}
