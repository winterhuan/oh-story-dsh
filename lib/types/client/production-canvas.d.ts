import type { DramaDocumentTarget, DramaEpisodeProduction } from "./drama-production.js";
import { type CanvasPoint, type ProductionJob, type ProductionMediaVersion } from "./production-runtime.js";
import { type CanvasViewport } from "./canvas-viewport.js";
import { type ProductionCanvasNode } from "./production-canvas-model.js";
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
    readonly versions?: readonly ProductionMediaVersion[] | undefined;
    readonly jobs?: readonly ProductionJob[] | undefined;
    readonly selections?: Readonly<Record<string, string>> | undefined;
    readonly documents?: Readonly<Record<string, string>> | undefined;
    readonly onSelectionsChange?: ((value: Record<string, string>) => void) | undefined;
    readonly onPrepare?: ((targetId: string, kind: "image" | "video", prompt: string) => void | Promise<void>) | undefined;
    readonly onOpenMedia?: ((path: string) => void) | undefined;
    readonly onContinueInChat?: ((targetId: string) => void) | undefined;
}
export declare function ProductionCanvas(props: ProductionCanvasProps): import("react/jsx-runtime").JSX.Element;
export declare function canvasNodeStatus(node: ProductionCanvasNode, version: ProductionMediaVersion | undefined, job?: ProductionJob): string;
//# sourceMappingURL=production-canvas.d.ts.map