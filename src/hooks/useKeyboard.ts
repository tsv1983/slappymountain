import { useEffect, useRef } from "react";

export interface KeyState {
  forward: boolean;
  back: boolean;
  left: boolean;
  right: boolean;
  interact: boolean;
  /** true the first frame E is pressed — reset by consumer */
  interactEdge: boolean;
  sprint: boolean;
  shop: boolean;
  resetPos: boolean;
  space: boolean;
}

const defaultKeys: KeyState = {
  forward: false,
  back: false,
  left: false,
  right: false,
  interact: false,
  interactEdge: false,
  sprint: false,
  shop: false,
  resetPos: false,
  space: false,
};

export function useKeyboard() {
  const keys = useRef<KeyState>({ ...defaultKeys });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const k = keys.current;
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          k.forward = true;
          break;
        case "KeyS":
        case "ArrowDown":
          k.back = true;
          break;
        case "KeyA":
        case "ArrowLeft":
          k.left = true;
          break;
        case "KeyD":
        case "ArrowRight":
          k.right = true;
          break;
        case "KeyE":
          k.interact = true;
          k.interactEdge = true;
          break;
        case "ShiftLeft":
        case "ShiftRight":
          k.sprint = true;
          break;
        case "Space":
          k.space = true;
          break;
        case "KeyB":
          k.shop = true;
          break;
        case "KeyR":
          k.resetPos = true;
          break;
        default:
          break;
      }
    };
    const up = (e: KeyboardEvent) => {
      const k = keys.current;
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          k.forward = false;
          break;
        case "KeyS":
        case "ArrowDown":
          k.back = false;
          break;
        case "KeyA":
        case "ArrowLeft":
          k.left = false;
          break;
        case "KeyD":
        case "ArrowRight":
          k.right = false;
          break;
        case "KeyE":
          k.interact = false;
          break;
        case "ShiftLeft":
        case "ShiftRight":
          k.sprint = false;
          break;
        case "Space":
          k.space = false;
          break;
        case "KeyB":
          k.shop = false;
          break;
        case "KeyR":
          k.resetPos = false;
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  return keys;
}
