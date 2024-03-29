class Position {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    add(position){
        let x = this.x + position.x;
        let y = this.y + position.y;
        return new Position(x,y);
    }

    multiply(position){
        let x = this.x * position.x;
        let y = this.y * position.y;
        return new Position(x,y);
    }

    equals(position){
        return (this.x === position.x && this.y === position.y);
    }

    static fromChessNumbering(file, rank){
        return new Position(file, rank -1);
    }

    static fromJsonObject(object){
        let position = new Position();
        position.x = object.x;
        position.y = object.y;
        return position;
    }
}
