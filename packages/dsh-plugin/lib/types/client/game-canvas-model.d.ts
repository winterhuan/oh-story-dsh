import type { CanvasPoint } from "./production-runtime.js";
import type { GameProject, GameWorkspaceFile } from "./game-workspace-types.js";
export type GameCreativeDocumentKind = "brief" | "source" | "concept" | "design" | "art" | "build";
export type GameCanvasNodeKind = GameCreativeDocumentKind | "character" | "world" | "preview";
export interface GameCreativeDocument {
    readonly id: string;
    readonly title: string;
    readonly path: string;
    readonly kind: GameCreativeDocumentKind;
    readonly eyebrow: string;
}
export interface GameCanvasNode {
    readonly id: string;
    readonly kind: GameCanvasNodeKind;
    readonly title: string;
    readonly eyebrow: string;
    readonly path?: string | undefined;
    readonly excerpt?: string | undefined;
    readonly initial: CanvasPoint;
    readonly width: number;
    readonly height: number;
}
export interface GameCanvasEdge {
    readonly from: string;
    readonly to: string;
    readonly label: string;
}
export interface KnownCreativeDocument {
    readonly relativePath: string;
    readonly title: string;
    readonly kind: GameCreativeDocumentKind;
    readonly eyebrow: string;
    readonly initial: CanvasPoint;
}
export declare const KNOWN_CREATIVE_DOCUMENTS: readonly KnownCreativeDocument[];
/** Returns only known creative Markdown files that actually exist inside this project. */
export declare function gameCreativeDocuments(project: GameProject, files: readonly GameWorkspaceFile[]): readonly GameCreativeDocument[];
export declare function gameCanvasNodes(project: GameProject, files: readonly GameWorkspaceFile[], documents: Readonly<Record<string, string>>): GameCanvasNode[];
/** Relations are emitted only when both real artifacts exist. */
export declare function gameCanvasEdges(nodes: readonly GameCanvasNode[]): GameCanvasEdge[];
//# sourceMappingURL=game-canvas-model.d.ts.map