"use client";

import { useEffect, useRef, useState } from 'react';
import { Params } from '~/lib/game';


export function Canvas(params: Params) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const {game, setGame} = params;

    // Draw the players
    const players = [[300,200,12,"Thomas", "red"], [400,200,4,"Yazid", "blue"], [400,300,20,"Camille", "yellow"]];
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.reset();
                players.forEach(player => {
                    ctx.beginPath();
                    ctx.arc(player[0]! as number, player[1]! as number, player[2]! as number, 0, 2 * Math.PI, false);
                    ctx.fillStyle = player[4]! as string;
                    ctx.fill();
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = '#003300';
                    ctx.stroke();
                });
            }
        }
    }, []);

    return (
        <div className='pt-3'>
            <div className="pb-3">
                <canvas className="bg-gray-50" ref={canvasRef} width="1000" height="500"></canvas>
            </div>
            <button className="text-2xl font-bold bg-white p-3 shadow rounded-xl" onClick={() => setGame(false)}>Stop Game</button>
        </div>
    );
    
}