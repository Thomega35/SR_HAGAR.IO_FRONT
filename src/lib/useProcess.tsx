import { useEffect, useState } from "react";
import type { Food } from "./useFood";
import type { Player } from "./usePlayer";


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
    name: string;
    setGame: (game: boolean) => void;
    setName: (name: string) => void;
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
