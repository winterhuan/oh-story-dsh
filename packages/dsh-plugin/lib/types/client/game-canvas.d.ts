import type { GameCanvasState, GameProject, GameWorkspaceFile } from "./game-workspace-types.js";
export interface GameCanvasProps {
    readonly project: GameProject;
    readonly files: readonly GameWorkspaceFile[];
    readonly documents: Readonly<Record<string, string>>;
    readonly state: GameCanvasState;
    readonly onChange: (state: GameCanvasState) => void;
    readonly onOpenDocument: (path: string) => void;
    readonly onContinueInChat: (title: string, path?: string) => void;
    readonly onPlay: () => void;
}
export declare function GameCanvas(props: GameCanvasProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=game-canvas.d.ts.map