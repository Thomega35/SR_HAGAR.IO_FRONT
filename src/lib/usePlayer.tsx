export class Player {
    position : Position;
    value : number;
    name : string;
    color : string;

    constructor(x: number, y: number, value: number, name: string, color: string) {
        this.position = {x: x, y: y};
        this.value = value;
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