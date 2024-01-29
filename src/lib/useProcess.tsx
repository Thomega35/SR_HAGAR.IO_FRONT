"use client"; // This is a client component 👈🏽

import { MutableRefObject, useEffect, useState } from "react";
import { Food } from "./useFood";
import { Player } from "./usePlayer";
import { TimeManager } from "./timeManager";


export function useProcess(playerName: string, color: string) {
    const [gameProcess, setGameProcess] = useState<Game>();

    useEffect(() => {
        const newGameProcess = new Game(playerName, color);
        setGameProcess(newGameProcess);
    }, []);
    
    return gameProcess;
}

export type Params = {
    gameProcess : Game
};

export class Game {
    private otherPlayers: Player[];
    private foods: Food[];
    private canvasRef : HTMLCanvasElement | null = null;
    private mousePosition: { x: number; y: number; } = {x: 0, y: 0};
    private ctx: CanvasRenderingContext2D | undefined;
    private timeManager: TimeManager;
    private me: Player;
    
    constructor(playerName: string, color: string) {
        this.timeManager = new TimeManager();
        this.timeManager.addUpdateMethods(this.update.bind(this));
        this.timeManager.addUpdateMethods(this.draw.bind(this));
        this.timeManager.addUpdateMethods(this.fetch.bind(this));
        this.timeManager.start();
        this.otherPlayers = []
        this.foods = []

        this.me = new Player(Math.floor(Math.random() *1000), Math.floor(Math.random() *500), 1, playerName, color);
        this.init();
        console.log(this.me.color);
    }
    
    public init() {
        this.otherPlayers  = [];
        this.foods = [];
        // const players = [[300,200,12,"Thomas", "red"], [400,200,4,"Yazid", "blue"], [400,300,20,"Camille", "yellow"]];
        this.otherPlayers = [new Player(300,200,12,"Thomas", "red"), new Player(400,200,4,"Yazid", "blue"), new Player(400,300,20,"Camille", "yellow")];
        // const foods = [[10, 100], [400, 400], [200, 200], [300, 300], [100, 100], [100, 400], [400, 100], [800, 400], [800, 100], [700, 200], [800, 300], [600, 400], [900, 100], [900, 350]];
        this.foods = [new Food(10, 100), new Food(400, 400), new Food(200, 200), new Food(300, 300), new Food(100, 100), new Food(100, 400), new Food(400, 100), new Food(800, 400), new Food(800, 100), new Food(700, 200), new Food(800, 300), new Food(600, 400), new Food(900, 100), new Food(900, 350)];
         
    }

    public destroy() {
        this.timeManager.stop();
    }
    
    public draw() {
        // Clear the canvas
        if (!this.canvasRef) return;
        const canvas = this.canvasRef;
        const ctx = canvas.getContext('2d');
        if (!ctx) return; 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw the players
        this.otherPlayers.forEach(player => {
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
        this.foods.forEach(food => {
            ctx.beginPath();
            ctx.arc(food.position.x, food.position.y, 4, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'green';
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#003300';
            ctx.stroke();
        });
    
        // Draw me
        ctx.beginPath();
        ctx.arc(this.me.position.x, this.me.position.y, this.me.size, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.me.color
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
        
    }
    
    public setCursor(mousePosition: { x: number; y: number; }) {
        this.mousePosition = mousePosition;
    }

    public setCanvasRef(canvasRef : HTMLCanvasElement | null) {
        this.canvasRef = canvasRef;
    }

    public setContext(ctx : CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.ctx.imageSmoothingEnabled = false;
    }

    // public setApi(api: Api) {
    //     this.api = api;
    // }

    public fetch(){
        this.otherPlayers = this.otherPlayers
        if (Math.random() < 0.1) {
            this.foods.push(new Food(Math.floor(Math.random() *1000), Math.floor(Math.random() *500)));
        }
    }

    public update(deltaTime: number) {
        const maxSpeed = 4*deltaTime*30;
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
            }
        }

        // Check if the player is eating a food
        this.foods.forEach((food, index) => {
            const distanceToFood = Math.sqrt(Math.pow(this.me.position.x - food.position.x, 2) + Math.pow(this.me.position.y - food.position.y, 2));
            if (distanceToFood < this.me.size + maxEatDistance) {
                this.me.setScore(this.me.getScore() + 1);
                this.foods.splice(index, 1);
            }
        });

        //Check if the player is eating another player
        this.otherPlayers.forEach((player, index) => {
            const distanceToPlayer = Math.sqrt(Math.pow(this.me.position.x - player.position.x, 2) + Math.pow(this.me.position.y - player.position.y, 2));
            if (distanceToPlayer < this.me.size + maxEatDistance && this.me.getScore() > player.getScore() * 1.1) {
                this.me.setScore(this.me.getScore() + player.getScore());
                this.otherPlayers.splice(index, 1);
            }
        });
    }
}

export function scoreToSize(score: number) {
    return Math.sqrt(score*50 / Math.PI) + 3;
}