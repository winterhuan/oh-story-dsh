import type { GameDocumentEditor } from "./game-documents.js";
import { type VideoProject } from "./video-workspace-model.js";
export declare function VideoDocuments({ project, editor, onChat, fileReadError, onRetryRead, resolveImageSrc, justSaved }: {
    readonly project: VideoProject;
    readonly editor: GameDocumentEditor;
    readonly onChat: (prompt: string) => void;
    readonly fileReadError?: string | null | undefined;
    readonly onRetryRead?: (() => void) | undefined;
    readonly resolveImageSrc?: ((src: string, basePath?: string) => string | undefined) | undefined;
    readonly justSaved?: boolean | undefined;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=video-documents.d.ts.map