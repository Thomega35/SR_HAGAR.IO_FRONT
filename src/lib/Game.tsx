"use client"; // This is a client component 👈🏽

import { Food } from "./useFood";
import { Player } from "./usePlayer";
import { TimeManager } from "./timeManager";
import { io, Socket } from "socket.io-client";

export type Params = {
    gameProcess: Game
};

export class Game {
    private players: Player[];
    private foods: Map<string, Food>;
    private canvasRef: HTMLCanvasElement | null = null;
    private mousePosition: { x: number; y: number; } = { x: 0, y: 0 };
    private ctx: CanvasRenderingContext2D | undefined;
    private timeManager: TimeManager;
    private me: Player;
    private socket: Socket | undefined = undefined;
    private static instanceOfGame: Game | undefined = undefined;

    public static getInstanceOfGame(playerName: string, color: string) {
        if (Game.instanceOfGame !== undefined) {
            Game.instanceOfGame.destroy();
        }
        return new Game(playerName, color);
    }

    private constructor(playerName: string, color: string) {
        this.timeManager = new TimeManager();
        this.timeManager.addUpdateMethods(this.update.bind(this));
        this.timeManager.addUpdateMethods(this.draw.bind(this));
        this.timeManager.addUpdateMethods(this.fetch.bind(this));
        this.timeManager.start();
        
        this.players = []
        this.foods = new Map();
        
        this.me = new Player(Math.floor(Math.random() * 1000), Math.floor(Math.random() * 500), 1, playerName, color);
    }

    public draw() {
        // Clear the canvas
        if (!this.canvasRef) return;
        const canvas = this.canvasRef;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw the players
        this.players.forEach(player => {
            ctx.beginPath();
            ctx.textAlign = "center";
            ctx.fillText(player.name, player.position.x, player.position.y - player.size - 5);
            ctx.arc(player.position.x, player.position.y, player.size, 0, 2 * Math.PI, false);
            ctx.fillStyle = player.color as string;
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#003300';
            ctx.stroke();
        });

        // Draw the food
        for (const [uuid, food] of this.foods) {
            ctx.beginPath();
            ctx.arc(food.x, food.y, 4, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'green';
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#003300';
            ctx.stroke();
        };
    }

    public setCursor(mousePosition: { x: number; y: number; }) {
        this.mousePosition = mousePosition;
    }

    public setCanvasRef(canvasRef: HTMLCanvasElement | null) {
        this.canvasRef = canvasRef;
    }

    public setContext(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.ctx.imageSmoothingEnabled = false;
    }

    public setSocket(serverUrl : string) {
        this.socket = io(serverUrl, { autoConnect: true });
        this.socket.emit("newPlayer", this.me.id, this.me.name, this.me.color );
        this.socket?.on("newPlayerPosition", (x: number, y: number) => {
            this.me.position.x = x;
            this.me.position.y = y;
        });
    }

    public fetch() {

        this.socket?.on("updatePlayers", (players: Map<string, PlayerObj>) => {
            this.players = [];
            console.log(players, this.me.id);
            for (let [key, player] of players) {
                if (key == this.me.id) {
                    console.log(player);
                    this.me.position.x = player.x;
                    this.me.position.y = player.y;
                    this.me.setScore(player.score);
                }else{
                    this.players.push(new Player(player.x, player.y, player.score, player.name, player.color));
                }
            };
        });

        this.socket?.on("updateFood", (foods: Map<string, Food>) => {
            this.foods = foods
        });
    }

    public update(deltaTime: number) {
        const maxSpeed = 4 * deltaTime * 30;
        const maxEatDistance = 4;

        //move the player
        if (this.canvasRef) {
            // Calculate the direction vector
            const directionX = this.mousePosition.x - this.me.position.x;
            const directionY = this.mousePosition.y - this.canvasRef.offsetTop - this.me.position.y;

            // Calculate the distance to the mouse
            const distanceToMouse = Math.sqrt(directionX * directionX + directionY * directionY);

            // Normalize the direction vector to get a unit vector
            const normalizedDirectionX = directionX / distanceToMouse;
            const normalizedDirectionY = directionY / distanceToMouse;

            // Calculate the movement vector with maximum speed
            const movementX = normalizedDirectionX * maxSpeed;
            const movementY = normalizedDirectionY * maxSpeed;

            // Deadzone to prevent the player from shaking
            if (distanceToMouse > 3) {
                // Move the player
                this.me.position.x += movementX;
                this.me.position.y += movementY;
                
                // Send the new position to the server
                if (this.socket) {
                    this.socket?.emit("move", this.me.id, this.me.position.x, this.me.position.y);
                }
            }
        }

        // Check if the player is eating a food
        for (let [key, value] of this.foods) {
            const distanceToFood = Math.sqrt(Math.pow(this.me.position.x - value.x, 2) + Math.pow(this.me.position.y - value.y, 2));
            if (distanceToFood < this.me.size + maxEatDistance) {
                this.socket?.emit("eatFood", this.me.id, key);
                console.log(this.me.getScore(), this.me.size);
            }
        };

        //Check if the player is eating another player
        this.players.forEach((player, index) => {
            const distanceToPlayer = Math.sqrt(Math.pow(this.me.position.x - player.position.x, 2) + Math.pow(this.me.position.y - player.position.y, 2));
            if (distanceToPlayer < this.me.size + maxEatDistance && this.me.getScore() > player.getScore() * 1.1 && this.me.id !== player.id) {
                // this.me.setScore(this.me.getScore() + player.getScore());
            }
        });
    }

    public destroy() {
        this.socket?.emit("Leave", this.me.id);
        this.socket?.disconnect();
        this.timeManager.stop();
    }

}

export function scoreToSize(score: number) {
    return Math.sqrt(score*50 / Math.PI) + 3;
}

interface PlayerObj {
    x: number;
    y: number;
    score: number;
    name: string;
    color: string;
}