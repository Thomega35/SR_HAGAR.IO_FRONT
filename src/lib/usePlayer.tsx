import { scoreToSize } from "./useProcess";

export class Player {
    position : Position;
    private score : number
    size : number;
    name : string;
    color : string;

    constructor(x: number, y: number, score: number, name: string, color: string) {
        this.position = {x: x, y: y};
        this.score = score;
        // sqrt score / pi
        this.size = scoreToSize(score); 
        this.name = name;
        this.color = color;
    }

    public setScore(score: number) {
        this.score = score;
        this.size = scoreToSize(score);
    }

    public getScore() {
        return this.score;
    }

    destroy() {
        console.log("Player destroyed");
    }
}


type Position = {
    x: number;
    y: number;
};