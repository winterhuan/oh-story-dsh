import { type ReactNode } from "react";
import type { CanvasViewport } from "./canvas-viewport.js";
import type { CanvasPoint } from "./production-runtime.js";
export interface CreativeCanvasNode {
    readonly id: string;
    readonly kind: string;
    readonly title: string;
    readonly eyebrow: string;
    readonly excerpt?: string | undefined;
    readonly path?: string | undefined;
    readonly initial: CanvasPoint;
    readonly width: number;
    readonly height: number;
}
export interface CreativeCanvasEdge {
    readonly from: string;
    readonly to: string;
    readonly label: string;
}
export interface CreativeCanvasState {
    readonly positions: Readonly<Record<string, CanvasPoint>>;
    readonly viewport?: CanvasViewport | undefined;
    readonly selectedId?: string | undefined;
}
export interface CreativeCanvasEmptyState {
    readonly title: string;
    readonly description: string;
    readonly actionLabel: string;
    readonly onAction: () => void;
}
export interface CreativeCanvasProps<Node extends CreativeCanvasNode = CreativeCanvasNode> {
    readonly nodes: readonly Node[];
    readonly edges: readonly CreativeCanvasEdge[];
    readonly state: CreativeCanvasState;
    readonly onChange: (state: CreativeCanvasState) => void;
    readonly onOpen: (node: Node) => void;
    readonly onContinueInChat: (node: Node) => void;
    readonly renderNodeMedia?: ((node: Node) => ReactNode) | undefined;
    readonly renderNodeActions: (node: Node) => ReactNode;
    readonly renderContextActions: (node: Node) => ReactNode;
    readonly ariaLabel: string;
    readonly helpText: string;
    readonly empty: CreativeCanvasEmptyState;
}
/** Shared interaction engine for creator-facing relationship canvases. */
export declare function CreativeCanvas<Node extends CreativeCanvasNode>(props: CreativeCanvasProps<Node>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=creative-canvas.d.ts.map