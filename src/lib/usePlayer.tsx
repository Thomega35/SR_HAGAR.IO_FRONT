import { scoreToSize } from "./Game";
import { v4 } from "uuid";

export class Player {
    position : Position;
    private score : number
    size : number;
    name : string;
    color : string;
    id : string;

    constructor(x: number, y: number, score: number, name: string, color: string, id: string=v4()) {
        this.position = {x: x, y: y};
        this.score = score;
        // sqrt score / pi
        this.size = scoreToSize(score); 
        this.name = name;
        this.color = color;
        this.id = id;
    }

    public setScore(score: number) {
        this.score = score;
        this.size = scoreToSize(score);
        console.log(score, this.size);
    }
    
    public getScore() {
        return this.score;
    }
}


type Position = {
    x: number;
    y: number;
};