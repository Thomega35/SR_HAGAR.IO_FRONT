export class Player {
    position : Position;
    size : number;
    name : string;
    color : string;

    constructor(x: number, y: number, size: number, name: string, color: string) {
        this.position = {x: x, y: y};
        this.size = size;
        this.name = name;
        this.color = color;
    }

    destroy() {
        console.log("Player destroyed");
    }
}


type Position = {
    x: number;
    y: number;
};