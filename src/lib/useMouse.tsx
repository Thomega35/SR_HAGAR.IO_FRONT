import { useEffect, useState } from "react";

export function useMouseOn<T extends HTMLElement>(
  ref: React.RefObject<T> | null | undefined,
) {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  useEffect(() => {
    if (!ref) return;
    const elem = ref.current;
    if (!elem) return;
    const mouseMoveHandler = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    elem.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      elem.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [ref]);

  return mousePosition;
}

type Position = {
    x: number;
    y: number;
};