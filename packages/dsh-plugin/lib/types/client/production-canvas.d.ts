import type { DramaDocumentTarget, DramaEpisodeProduction } from "./drama-production.js";
import type { CanvasPoint, ProductionJob, ProductionMediaVersion } from "./production-runtime.js";
import { type CanvasViewport } from "./canvas-viewport.js";
import { type ProductionCanvasNode } from "./production-canvas-model.js";
export type DramaMediaVersion = Omit<ProductionMediaVersion, "kind"> & {
    readonly kind: ProductionMediaVersion["kind"] | "audio";
};
export declare function isAudioMediaVersion(version: DramaMediaVersion): boolean;
export type CanvasNodeFilter = "all" | "pending" | "ready";
/** Decide whether a canvas node matches the lightweight status filter (non-matching nodes dim, never unmount). */
export declare function canvasNodeMatchesFilter(node: Pick<ProductionCanvasNode, "kind">, versions: readonly DramaMediaVersion[], filter: CanvasNodeFilter): boolean;
export interface ProductionCanvasProps {
    readonly production: DramaEpisodeProduction;
    readonly selectedId: string | undefined;
    readonly canvas: Readonly<Record<string, CanvasPoint>>;
    /** Undefined until the creator pans or zooms this episode; the first view then frames the nodes. */
    readonly viewport: CanvasViewport | undefined;
    readonly onSelect: (id: string | undefined) => void;
    readonly onNavigate: (target: DramaDocumentTarget) => void;
    readonly onCanvasChange: (canvas: Record<string, CanvasPoint>) => void;
    readonly onViewportChange: (viewport: CanvasViewport) => void;
    /** Existing DSH-owned media only. The canvas never invents generated results. */
    readonly versions?: readonly DramaMediaVersion[] | undefined;
    readonly jobs?: readonly ProductionJob[] | undefined;
    readonly selections?: Readonly<Record<string, string>> | undefined;
    readonly documents?: Readonly<Record<string, string>> | undefined;
    readonly initialFilter?: CanvasNodeFilter | undefined;
    readonly onSelectionsChange?: ((value: Record<string, string>) => void) | undefined;
    readonly onPrepare?: ((targetId: string, kind: "image" | "video", prompt: string) => void | Promise<void>) | undefined;
    readonly onWriteImagePrompts?: ((node: ProductionCanvasNode) => void | Promise<void>) | undefined;
    readonly onOpenMedia?: ((path: string) => void) | undefined;
    readonly onContinueInChat?: ((targetId: string) => void) | undefined;
}
export declare function ProductionCanvas(props: ProductionCanvasProps): import("react/jsx-runtime").JSX.Element;
export declare function canvasNodeStatusTone(node: ProductionCanvasNode, version: DramaMediaVersion | undefined, job?: ProductionJob): "ready" | "working" | "warning" | "error" | "idle";
export declare function canvasNodeStatus(node: ProductionCanvasNode, version: DramaMediaVersion | undefined, job?: ProductionJob): string;
//# sourceMappingURL=production-canvas.d.ts.map