import { useEffect, useState } from "react";

export function MouseOn<T extends HTMLElement>(
  ref: React.RefObject<T> | null | undefined,
) {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  useEffect(() => {
    if (!ref) return;
    const element = ref.current;
    if (!element) return;
    const mouseMoveHandler = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    element.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      element.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [ref]);

  return mousePosition;
}

type Position = {
    x: number;
    y: number;
};