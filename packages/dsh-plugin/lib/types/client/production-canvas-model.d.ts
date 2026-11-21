import type { DramaDocumentTarget, DramaEpisodeProduction } from "./drama-production.js";
import type { CanvasPoint } from "./production-runtime.js";
export type ProductionCanvasNodeKind = "story" | "asset" | "shot";
export type ProductionCanvasEdgeKind = "story" | "reference" | "sequence";
export interface ProductionCanvasNode {
    readonly id: string;
    readonly title: string;
    readonly kind: ProductionCanvasNodeKind;
    readonly eyebrow: string;
    readonly description?: string | undefined;
    readonly prompt?: string | undefined;
    readonly videoPrompt?: string | undefined;
    readonly initial: CanvasPoint;
    readonly width: number;
    readonly height: number;
    readonly target?: DramaDocumentTarget | undefined;
}
export interface ProductionCanvasEdge {
    readonly from: string;
    readonly to: string;
    readonly kind: ProductionCanvasEdgeKind;
    readonly label: string;
}
export declare function productionCanvasNodes(production: DramaEpisodeProduction, documents?: Readonly<Record<string, string>>): ProductionCanvasNode[];
export declare function productionCanvasEdges(production: DramaEpisodeProduction, knownNodeIds?: ReadonlySet<string>): ProductionCanvasEdge[];
export declare function layoutGrid(count: number, origin: CanvasPoint, size: {
    readonly width: number;
    readonly height: number;
}, columns: number): CanvasPoint[];
//# sourceMappingURL=production-canvas-model.d.ts.map