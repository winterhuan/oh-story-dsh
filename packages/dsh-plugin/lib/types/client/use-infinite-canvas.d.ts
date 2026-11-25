import { type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import { type CanvasRect, type CanvasSize, type CanvasViewport } from "./canvas-viewport.js";
import type { CanvasPoint } from "./production-runtime.js";
export interface InfiniteCanvasNode {
    readonly id: string;
    readonly initial: CanvasPoint;
    readonly width: number;
    readonly height: number;
}
export interface InfiniteCanvasPatch {
    readonly positions?: Record<string, CanvasPoint> | undefined;
    readonly viewport?: CanvasViewport | undefined;
    readonly selectedId?: string | null | undefined;
}
export interface UseInfiniteCanvasOptions<Node extends InfiniteCanvasNode> {
    readonly nodes: readonly Node[];
    readonly positions: Readonly<Record<string, CanvasPoint>>;
    readonly viewport: CanvasViewport | undefined;
    readonly selectedId: string | undefined;
    readonly defaultViewport?: ((rects: readonly CanvasRect[], size: CanvasSize, positions: Readonly<Record<string, CanvasPoint>>) => CanvasViewport) | undefined;
    readonly onCommit: (patch: InfiniteCanvasPatch) => void;
    readonly onActivate: (node: Node) => void;
    readonly activateOnSpace?: boolean | undefined;
    readonly clearSelectionOnEscape?: boolean | undefined;
}
export declare function nodeRects(nodes: readonly InfiniteCanvasNode[], positions: Readonly<Record<string, CanvasPoint>>): CanvasRect[];
export declare function arrowDelta(key: string, step: number): CanvasPoint | undefined;
export declare function useInfiniteCanvas<Node extends InfiniteCanvasNode>(options: UseInfiniteCanvasOptions<Node>): {
    viewportRef: import("react").RefObject<HTMLDivElement>;
    positions: Record<string, CanvasPoint>;
    viewport: CanvasViewport;
    panning: boolean;
    draggingId: string | undefined;
    zoomIn: () => void;
    zoomOut: () => void;
    resetZoom: () => void;
    fitAll: () => void;
    resetLayout: () => void;
    startPan: (event: ReactPointerEvent<HTMLDivElement>) => void;
    startDrag: (event: ReactPointerEvent<HTMLElement>, id: string) => void;
    onNodeKeyDown: (event: ReactKeyboardEvent<HTMLElement>, node: Node) => void;
    onViewportKeyDown: (event: ReactKeyboardEvent<HTMLDivElement>) => void;
};
//# sourceMappingURL=use-infinite-canvas.d.ts.map