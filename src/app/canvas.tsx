"use client";
import type { MutableRefObject } from 'react';
import type { Game, Params } from '~/lib/useProcess';
import { useEffect, useRef } from 'react';
import { useMouseOn } from '~/lib/useMouse';
import { useProcess } from '~/lib/useProcess';
import { Player } from '~/lib/usePlayer';
import { Food } from '~/lib/useFood';

export function Canvas(params: Params) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const cursorScreen = useMouseOn(canvasRef)
    const gameProcess = useProcess();
    const {setGame} = params;
    // const {name, setName} = params;
    // const meX = Math.floor(Math.random() *1000);
    // const meY = Math.floor(Math.random() *500);
    // const meValue = 1;
    // const meColor = "green";



    // const players = [[300,200,12,"Thomas", "red"], [400,200,4,"Yazid", "blue"], [400,300,20,"Camille", "yellow"]];
    const players = [new Player(300,200,12,"Thomas", "red"), new Player(400,200,4,"Yazid", "blue"), new Player(400,300,20,"Camille", "yellow")];
    // const foods = [[10, 100], [400, 400], [200, 200], [300, 300], [100, 100], [100, 400], [400, 100], [800, 400], [800, 100], [700, 200], [800, 300], [600, 400], [900, 100], [900, 350]];
    const foods = [new Food(10, 100), new Food(400, 400), new Food(200, 200), new Food(300, 300), new Food(100, 100), new Food(100, 400), new Food(400, 100), new Food(800, 400), new Food(800, 100), new Food(700, 200), new Food(800, 300), new Food(600, 400), new Food(900, 100), new Food(900, 350)];

    Draw(canvasRef, players, foods, 500, 250, 10, "green");
    Update(cursorScreen, gameProcess!, players, foods);


    return (
        <div className='pt-3'>
            <div className="pb-3">
                <canvas className="bg-gray-50" ref={canvasRef} width="1000" height="500"></canvas>
            </div>
            <button className="text-2xl font-bold bg-white p-3 shadow rounded-xl" onClick={() => setGame(false)}>Stop Game</button>
        </div>
    );
    
}

export function Update(cursorScreen : {x: number, y: number}, gameProcess : Game, players : Player[], foods : Food[]) {
    console.log(cursorScreen);
    console.log(gameProcess);
    console.log(players);
    console.log(foods);
}
export function Draw(canvasRef : MutableRefObject<HTMLCanvasElement | null>, players : Player[], foods : Food[], meX : number, meY : number, meValue : number, meColor : string) {
    // Draw the players
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                players.forEach(player => {
                    ctx.beginPath();
                    ctx.arc(player.position.x, player.position.y, player.value, 0, 2 * Math.PI, false);
                    ctx.fillStyle = player.color as string;
                    ctx.fill();
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = '#003300';
                    ctx.stroke();
                });
            }
        }
    });

    // Draw the food
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                foods.forEach(food => {
                    ctx.beginPath();
                    ctx.arc(food.position.x, food.position.y, 4, 0, 2 * Math.PI, false);
                    ctx.fillStyle = 'green';
                    ctx.fill();
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = '#003300';
                    ctx.stroke();
                });
            }
        }
    });

    // Draw me
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.beginPath();
                ctx.arc(meX, meY, meValue, 0, 2 * Math.PI, false);
                ctx.fillStyle = meColor;
                ctx.fill();
                ctx.lineWidth = 3;
                ctx.strokeStyle = '#003300';
                ctx.stroke();
            }
        }
    });

}