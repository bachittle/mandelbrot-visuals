import { FullWindowSize } from "./types";

// initial canvas setup and global exports
export const canvas = document.querySelector<HTMLCanvasElement>('canvas')!;
export const ctx = canvas.getContext('2d')!;

// initial fullscreen
canvas.width = FullWindowSize.getWidth();
canvas.height = FullWindowSize.getHeight();