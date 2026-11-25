import { type RefObject } from "react";
import type { GameDocumentBuffer, GameProject, GameWorkspaceFile } from "./game-workspace-types.js";
export interface GameDocumentEditor {
    readonly selected: string | undefined;
    readonly buffers: Readonly<Record<string, GameDocumentBuffer>>;
    readonly mode: "preview" | "source" | "production";
    readonly textareaRef: RefObject<HTMLTextAreaElement>;
    readonly errors: Readonly<Record<string, string>>;
    readonly onSelect: (path: string) => void;
    readonly onEdit: (path: string, content: string) => void;
    readonly onSave: (path: string) => Promise<void>;
    readonly onMode: (mode: "preview" | "source") => void;
    readonly onConflict: (keepLocal: boolean) => void;
    readonly onDiscard: (path: string) => void;
    readonly onRememberPosition: () => void;
    readonly onRetry: () => void;
}
export declare function GameDocuments({ project, files, editor, onChat, fileReadError, onRetryRead, resolveImageSrc, justSaved }: {
    readonly project: GameProject;
    readonly files: readonly GameWorkspaceFile[];
    readonly editor: GameDocumentEditor;
    readonly onChat: (prompt: string) => void;
    readonly fileReadError?: string | null | undefined;
    readonly onRetryRead?: (() => void) | undefined;
    readonly resolveImageSrc?: ((src: string, basePath?: string) => string | undefined) | undefined;
    readonly justSaved?: boolean | undefined;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=game-documents.d.ts.map