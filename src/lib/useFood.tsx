
export class Food {
    position: Position;

    constructor(x: number, y: number) {
        this.position = {x: x, y: y};
    }

    public destroy() {
        console.log("Food destroyed");
    }
}

type Position = {
    x: number;
    y: number;
};