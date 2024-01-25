import { useEffect, useState } from "react";
import { Food } from "./useFood";
import { Player } from "./usePlayer";


export function useProcess() {
    const [gameProcess, setGameProcess] = useState<Game | undefined>();

    useEffect(() => {
        const newGameProcess = new Game();
        setGameProcess(newGameProcess);
        return () => {
            newGameProcess.destroy();
        }
    }, []);
    
    return gameProcess;
}

export type Params = {
    game: boolean;
    name: string;
    setGame: (game: boolean) => void;
    setName: (name: string) => void;
};

type Position = {
    x: number;
    y: number;
};

export class Game {
    private players: Player[];
    private foods: Food[];

    constructor() {
        this.players = [];
        this.foods = [];
    }

    public destroy() {
        this.players.forEach(player => {
            player.destroy();
        });
        this.foods.forEach(food => {
            food.destroy();
        });
    }
}
