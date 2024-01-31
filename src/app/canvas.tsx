"use client";
import type { Params } from '~/lib/Game';
import { useEffect, useRef } from 'react';
import { useMouseOn } from '~/lib/useMouse';

export function Canvas(params: Params) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const cursorScreen = useMouseOn(canvasRef)
    const {gameProcess} = params;

    useEffect(() => {
        if (!gameProcess) return;
        gameProcess.setCursor(cursorScreen);

        function handle_resize() {
            const c = canvasRef.current;
            if (!c) return;
            c.width = window.innerWidth;
            c.height = window.innerHeight;
        }
        handle_resize();
        window.addEventListener('resize', handle_resize);
        return () => window.removeEventListener('resize', handle_resize);
    },);

    useEffect(() => {
        if (!gameProcess) return;
        gameProcess.setCanvasRef(canvasRef.current);
        const c = canvasRef.current?.getContext('2d');
        if (!c) return;
        gameProcess.setContext(c);
        gameProcess.setSocket("localhost:3003");
    }, [] );

    return (
        <canvas className="bg-gray-50 fixed mt-20 grow" ref={canvasRef} width="1000" height="500"></canvas>
    );
}