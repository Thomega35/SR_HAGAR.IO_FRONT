"use client";
import type { Game, Params } from '~/lib/useProcess';
import { useEffect, useRef } from 'react';
import { useMouseOn } from '~/lib/useMouse';

export function Canvas(params: Params) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const cursorScreen = useMouseOn(canvasRef)
    const {gameProcess} = params;

    // gameProcess?.draw(500, 250, 10, "green");
    // gameProcess?.update();

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
    },);

    return (
        <canvas className="bg-gray-50 fixed mt-20 grow" ref={canvasRef} width="1000" height="500"></canvas>
    );
}