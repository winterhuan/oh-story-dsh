import type { VideoNarrativeProjection, VideoNarrativeSegment, VideoTimeRange } from "../video-narrative.js";
import type { VideoPreviewAsset, VideoProjectSummary, VideoArtifactSummary } from "../video-project.js";
import type { CreativeCanvasNode, CreativeCanvasEdge } from "./creative-canvas.js";
import type { GameWorkspaceFile } from "./game-workspace-types.js";
export type VideoWorkspaceTab = "preview" | "canvas" | "docs";
export type VideoProject = VideoProjectSummary;
export declare function videoTime(value: number): string;
export declare function videoRange(range: {
    readonly start: number;
    readonly end: number;
}): string;
/** Human-facing role label distinguishing v0.8.0 `preview.mp4` from legacy `edited_source.mp4`. */
export declare function videoPreviewLabel(asset: Pick<VideoPreviewAsset, "role" | "label" | "path" | "editedKind">): string;
export declare function videoDocumentTitle(artifact: VideoArtifactSummary): string;
export declare function videoCreativeDocuments(project: VideoProject): readonly VideoArtifactSummary[];
/** Non-primary artifacts (e.g. v0.8.0 `timeline.json`, `check.json`, `REFERENCE_NOTES.md`, `reference_metrics.json`, custom `*.srt`). */
export declare function videoProductionRecords(project: VideoProject): readonly VideoArtifactSummary[];
/** Preferred exportable `.srt` subtitle artifact (`subtitles.srt` first, then any project `.srt`). */
export declare function videoSubtitleArtifact(project: VideoProject): VideoArtifactSummary | undefined;
/** Changes one authored sentence and keeps timing, unknown metadata and array order intact. */
export declare function editVideoNarration(content: string, index: number, text: string): string | undefined;
/** Overlay wording only when the authored row still describes the same interval. Media stays intact. */
export declare function videoDraftText(segment: VideoNarrativeSegment, content: string | undefined): string | undefined;
export declare function videoSourceRange(project: Pick<VideoProject, "root" | "previews" | "narrative">, segment: VideoNarrativeSegment, files: readonly GameWorkspaceFile[]): VideoTimeRange | undefined;
export interface VideoCanvasNode extends CreativeCanvasNode {
    readonly segment?: VideoNarrativeSegment | undefined;
}
export declare function videoCanvasModel(project: VideoProject, narrative: VideoNarrativeProjection | undefined, files?: readonly GameWorkspaceFile[]): {
    readonly nodes: VideoCanvasNode[];
    readonly edges: CreativeCanvasEdge[];
};
//# sourceMappingURL=video-workspace-model.d.ts.map