import type { VideoNarrativeProjection, VideoTimeRange } from "../video-narrative.js";
import type { VideoPreviewAsset, VideoQualityReviewHint } from "../video-project.js";
import type { WorkbenchMode } from "./file-activity.js";
import { type CreativeCanvasState } from "./creative-canvas.js";
import type { GameDocumentEditor } from "./game-documents.js";
import type { GameWorkspaceFile } from "./game-workspace-types.js";
import { type VideoProject, type VideoWorkspaceTab } from "./video-workspace-model.js";
export type { VideoProject, VideoWorkspaceTab } from "./video-workspace-model.js";
export type { VideoPreviewAsset, VideoArtifactSummary, VideoQualityCheckSummary, VideoQualityReviewHint } from "../video-project.js";
export { VideoEnvironmentReport, type VideoPreflight } from "./video-environment.js";
/** Observe a studio container width via ResizeObserver and emit `narrow` (`<= 800px`). */
export declare function observeStudioNarrow(element: {
    readonly clientWidth: number;
}, onNarrow: (narrow: boolean) => void): () => void;
export interface VideoSeekRequest {
    readonly role: VideoPreviewAsset["role"];
    readonly time: number;
    readonly range?: VideoTimeRange | undefined;
    readonly preserveNotice?: boolean | undefined;
    /** Clamp targets at or past `element.duration` slightly inside the tail (used for `check.json` review hints). */
    readonly clampToDuration?: boolean | undefined;
}
export interface VideoSeekOutcome {
    readonly status: "deferred" | "out-of-range" | "applied";
    readonly clearNotice: boolean;
    readonly notice?: string | undefined;
    readonly range?: VideoTimeRange | undefined;
}
/** Apply a seek to a `<video>` element while preserving switch-mismatch notices when requested. */
export declare function applyLoadedSeek(element: {
    currentTime: number;
    readonly duration: number;
    readonly readyState: number;
} | null, request: VideoSeekRequest): VideoSeekOutcome;
/**
 * Resolve which output preview role and seek target a `check.json` v1 review hint should jump to.
 * Respects `qualityCheck.mediaRole` / `media`, clamps tail timestamps, and NEVER seeks raw `source`
 * with output-clock timestamps.
 */
export declare function resolveReviewHintSeek(project: Pick<VideoProject, "previews" | "qualityCheck">, loadedRole: VideoPreviewAsset["role"] | undefined, hint: VideoQualityReviewHint): {
    readonly request: VideoSeekRequest;
} | {
    readonly notice: string;
} | undefined;
/**
 * Map playback time when switching between `source`, `edited`, and `final`.
 * Prefers `timeline.json` v3 `narrative.clips` (verified against `source.path`) for exact
 * output↔source mapping across pauses, non-narration cuts, and multi-clip spans, falling back
 * to `narrative.segments`.
 */
export declare function mapPreviewSwitchTime(input: {
    readonly project: Pick<VideoProject, "root" | "previews" | "narrative">;
    readonly files: readonly GameWorkspaceFile[];
    readonly narrative: VideoNarrativeProjection | undefined;
    readonly fromRole: VideoPreviewAsset["role"] | undefined;
    readonly toRole: VideoPreviewAsset["role"];
    readonly currentTime: number;
    readonly fallbackTime?: number | undefined;
}): {
    readonly time: number;
    readonly mapped: boolean;
};
export interface VideoQcMarker {
    readonly key: string;
    readonly hint: VideoQualityReviewHint;
    readonly leftPercent: number;
    readonly widthPercent?: number | undefined;
    readonly label: string;
}
/**
 * Compute single-row QC timestamp marker positions for an output preview (`edited` / `final`).
 * Clamps timestamps cleanly to `[0, duration]` and omits hints without valid timestamps.
 */
export declare function qcMarkerPositions(reviewHints: readonly VideoQualityReviewHint[], duration: number): readonly VideoQcMarker[];
export declare function VideoQcMarkerRail({ reviewHints, duration, onSeekHint }: {
    readonly reviewHints: readonly VideoQualityReviewHint[];
    readonly duration: number;
    readonly onSeekHint: (hint: VideoQualityReviewHint) => void;
}): import("react/jsx-runtime").JSX.Element | null;
export declare function VideoQualityCheckPanel({ qualityCheck, initialOpen, onSeekHint, onDiscussHint }: {
    readonly qualityCheck: NonNullable<VideoProject["qualityCheck"]>;
    readonly initialOpen?: boolean | undefined;
    readonly onSeekHint: (hint: VideoQualityReviewHint) => void;
    readonly onDiscussHint: (hint: VideoQualityReviewHint) => void;
}): import("react/jsx-runtime").JSX.Element;
/** Stable version key for a preview asset so regenerations are detected per role. */
export declare function previewAssetVersionKey(asset: Pick<VideoPreviewAsset, "path" | "version">): string;
/** Record `asset` (and current versions of lower-tier roles) so loading `final` never later offers an older `edited`/`preview`. */
export declare function acknowledgePreviewVersion(acknowledged: Map<VideoPreviewAsset["role"], string>, previews: readonly VideoPreviewAsset[], asset: VideoPreviewAsset): void;
/**
 * Find the highest-tier non-source preview with an unacknowledged `path:version` at or above the active role.
 * Never offers to downgrade from `final` (1080p) to `edited` (480p `preview.mp4`).
 */
export declare function discoverNewerPreview(previews: readonly VideoPreviewAsset[], loadedRole: VideoPreviewAsset["role"] | undefined, acknowledged: ReadonlyMap<VideoPreviewAsset["role"], string>): VideoPreviewAsset | undefined;
export interface VideoStudioProps {
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
    readonly onRefresh?: (() => void) | undefined;
    readonly onCreateProject?: (() => void) | undefined;
    readonly fileReadError?: string | null | undefined;
    readonly onRetryRead?: (() => void) | undefined;
    readonly workspaceError?: string | null | undefined;
    readonly truncated?: boolean | undefined;
    readonly resolveImageSrc?: ((src: string, basePath?: string) => string | undefined) | undefined;
    readonly justSaved?: boolean | undefined;
}
export declare function VideoStudio(props: VideoStudioProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=video-studio.d.ts.map