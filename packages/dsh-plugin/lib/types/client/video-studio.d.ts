import type { WorkbenchMode } from "./file-activity.js";
import { type CreativeCanvasState } from "./creative-canvas.js";
import type { GameDocumentEditor } from "./game-documents.js";
import type { GameWorkspaceFile } from "./game-workspace-types.js";
import { type VideoProject, type VideoWorkspaceTab } from "./video-workspace-model.js";
export type { VideoProject, VideoWorkspaceTab } from "./video-workspace-model.js";
export type { VideoPreviewAsset, VideoArtifactSummary } from "../video-project.js";
export { VideoEnvironmentReport, type VideoPreflight } from "./video-environment.js";
interface VideoStudioProps {
    readonly sessionId: string;
    readonly projects: readonly VideoProject[];
    readonly files: readonly GameWorkspaceFile[];
    readonly running: boolean;
    readonly projectId: string | undefined;
    readonly tab: VideoWorkspaceTab;
    readonly hidden: boolean;
    readonly paneId: string;
    readonly labelledBy: string;
    readonly onProject: (id: string) => void;
    readonly onTab: (tab: VideoWorkspaceTab) => void;
    readonly onWorkbench: (mode: WorkbenchMode) => void;
    readonly workbenchModes?: readonly WorkbenchMode[] | undefined;
    readonly onWorkbenchSettings?: (() => void) | undefined;
    readonly onCollapse: () => void;
    readonly chatOpen: boolean;
    readonly onChatOpen: (visible: boolean) => void;
    readonly onContinueInChat: (prompt: string) => void;
    readonly editor: GameDocumentEditor;
    readonly canvasByProject: Readonly<Record<string, CreativeCanvasState>>;
    readonly onCanvasChange: (id: string, value: CreativeCanvasState) => void;
}
export declare function VideoStudio(props: VideoStudioProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=video-studio.d.ts.map