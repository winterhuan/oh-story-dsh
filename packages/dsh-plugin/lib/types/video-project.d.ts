import { VIDEO_DIRECTORY } from "./creative-paths.js";
import { type VideoNarrativeProjection, type VideoTimelineClip } from "./video-narrative.js";
export { VIDEO_DIRECTORY };
export type { VideoCreativeSummary, VideoNarrativeKind, VideoNarrativeProjection, VideoNarrativeSegment, VideoTimelineClip, VideoTimeRange } from "./video-narrative.js";
export interface VideoWorkspaceFile {
    readonly path: string;
    readonly bytes: number;
    readonly version: string;
    readonly kind: "text" | "media";
    readonly mimeType?: string | undefined;
}
export interface VideoPreviewAsset {
    readonly role: "source" | "edited" | "final";
    readonly label: string;
    readonly path: string;
    readonly bytes: number;
    readonly version: string;
    readonly mimeType: string;
    /** Distinguishes Video Recap 0.8.0 `preview.mp4` ("preview") from legacy `edited_source.mp4` ("edited"). */
    readonly editedKind?: "preview" | "edited" | undefined;
}
export interface VideoArtifactSummary {
    readonly label: string;
    readonly path: string;
    readonly version: string;
    readonly kind: "plan" | "script" | "subtitle" | "quality" | "manifest";
}
export type VideoCheckItemStatus = "pass" | "warn" | "fail" | "skip";
export interface VideoQualityCheckItem {
    readonly key: string;
    readonly label: string;
    readonly status: VideoCheckItemStatus;
    readonly detail: string;
}
export interface VideoQualityReviewHint {
    readonly check: string;
    readonly code: string;
    readonly label: string;
    readonly message: string;
    readonly severity: "warn" | "fail";
    readonly timestamp?: number | undefined;
    readonly endTimestamp?: number | undefined;
}
export interface VideoQualityCheckSummary {
    readonly ok: boolean;
    readonly status: "pass" | "warn" | "fail";
    readonly summary: string;
    readonly checks: readonly VideoQualityCheckItem[];
    readonly reviewHints: readonly VideoQualityReviewHint[];
    readonly media?: string | undefined;
    readonly mediaRole?: "final" | "edited" | undefined;
    readonly path?: string | undefined;
    readonly version?: string | undefined;
}
export interface VideoProjectSummary {
    readonly id: string;
    readonly root: string;
    readonly title: string;
    readonly state: "not-started" | "working" | "waiting" | "ready";
    readonly stage: string;
    readonly stageLabel: string;
    readonly nextArtifact?: string | undefined;
    readonly editedKind?: "preview" | "edited" | undefined;
    readonly previews: readonly VideoPreviewAsset[];
    readonly artifacts: readonly VideoArtifactSummary[];
    readonly narrative?: VideoNarrativeProjection | undefined;
    readonly qualityCheck?: VideoQualityCheckSummary | undefined;
    readonly narrationPath?: string | undefined;
    readonly narrationVersion?: string | undefined;
    readonly timelinePath?: string | undefined;
    readonly timelineVersion?: string | undefined;
}
export declare function videoProjectRoot(path: string): string | undefined;
export declare function skipVideoDirectory(path: string): boolean;
export declare function visibleVideoPath(path: string): boolean;
/** Parse Video Recap 0.8.0 `check.json` v1 into a structured summary for the studio UI. */
export declare function parseVideoQualityCheck(value: unknown, options?: {
    readonly clips?: readonly VideoTimelineClip[] | undefined;
    readonly path?: string | undefined;
    readonly version?: string | undefined;
    readonly resolveMedia?: ((raw: string) => {
        readonly path?: string | undefined;
        readonly role?: "final" | "edited" | undefined;
    } | undefined) | undefined;
}): VideoQualityCheckSummary | undefined;
export declare function summarizeVideoProject(root: string, files: readonly VideoWorkspaceFile[], metadata?: {
    readonly project?: unknown;
    readonly runManifest?: unknown;
    readonly assembly?: unknown;
    readonly narration?: unknown;
    readonly validatedClips?: unknown;
    readonly visualAudioBoard?: unknown;
    readonly storyPlan?: unknown;
    readonly timeline?: unknown;
    readonly qualityCheck?: unknown;
    readonly storyboard?: string | undefined;
    readonly script?: string | undefined;
    readonly brief?: string | undefined;
    readonly editPlan?: string | undefined;
}): VideoProjectSummary;
//# sourceMappingURL=video-project.d.ts.map