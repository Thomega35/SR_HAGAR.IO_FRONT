"use client";
import type { MutableRefObject } from 'react';
import type { Game, Params } from '~/lib/useProcess';
import { useEffect, useRef } from 'react';
import { useMouseOn } from '~/lib/useMouse';
import { useProcess } from '~/lib/useProcess';
import { Player } from '~/lib/usePlayer';

export function Canvas(params: Params) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const cursorScreen = useMouseOn(canvasRef)
    const {playerName, setGame} = params;
    const gameProcess = useProcess(playerName, "red");

    // gameProcess?.draw(500, 250, 10, "green");
    // gameProcess?.update();

    useEffect(() => {
        if (!gameProcess) return;
        gameProcess.setCursor(cursorScreen);
    },);

    useEffect(() => {
        if (!gameProcess) return;
        gameProcess.setCanvasRef(canvasRef.current);
        const c = canvasRef.current?.getContext('2d');
        if (!c) return;
        gameProcess.setContext(c);
    },);

    return (
        <div className='pt-3'>
            <div className="pb-3">
                <canvas className="bg-gray-50" ref={canvasRef} width="1000" height="500"></canvas>
            </div>
            <button className="text-2xl font-bold bg-white p-3 shadow rounded-xl" onClick={() => setGame(false)}>Stop Game</button>
        </div>
    );
    
}