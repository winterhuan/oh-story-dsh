import type { CanvasPoint } from "./production-runtime.js";
/**
 * Screen = world * zoom + pan. The canvas has no edges: nodes and the pan offset take any
 * finite coordinate, so nothing can be pushed out of reach.
 */
export interface CanvasViewport {
    readonly x: number;
    readonly y: number;
    readonly zoom: number;
}
export interface CanvasSize {
    readonly width: number;
    readonly height: number;
}
export interface CanvasRect extends CanvasPoint {
    readonly width: number;
    readonly height: number;
}
export declare const MIN_CANVAS_ZOOM = 0.01;
export declare const MAX_CANVAS_ZOOM = 3;
export declare const DEFAULT_CANVAS_VIEWPORT: CanvasViewport;
export declare function clampZoom(zoom: number): number;
/** Scales by `factor` while the world point under `anchor` (viewport pixels) stays put. */
export declare function zoomAt(viewport: CanvasViewport, factor: number, anchor: CanvasPoint): CanvasViewport;
/** Wheel deltas arrive in pixels, lines or pages depending on device; one notch is ~10%. */
export declare function wheelZoomFactor(deltaY: number, deltaMode: number): number;
export declare function screenToWorld(viewport: CanvasViewport, point: CanvasPoint): CanvasPoint;
/** Pans so the rectangle's centre sits in the middle of the viewport, keeping the zoom. */
export declare function centerOnRect(viewport: CanvasViewport, node: CanvasRect, size: CanvasSize): CanvasViewport;
export declare function rectVisible(viewport: CanvasViewport, node: CanvasRect, size: CanvasSize): boolean;
/** Frames the complete bounds of every variable-sized canvas object. */
export declare function fitRects(nodes: readonly CanvasRect[], size: CanvasSize, fallback?: CanvasViewport): CanvasViewport;
/** Starts close enough to read a representative cluster; "fit" remains the explicit all-content view. */
export declare function initialReadableViewport(nodes: readonly CanvasRect[], size: CanvasSize, fallback?: CanvasViewport): CanvasViewport;
//# sourceMappingURL=canvas-viewport.d.ts.map