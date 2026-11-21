import { VIDEO_DIRECTORY } from "./creative-paths.js";
import { type VideoNarrativeProjection } from "./video-narrative.js";
export { VIDEO_DIRECTORY };
export type { VideoCreativeSummary, VideoNarrativeKind, VideoNarrativeProjection, VideoNarrativeSegment, VideoTimeRange } from "./video-narrative.js";
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
}
export interface VideoArtifactSummary {
    readonly label: string;
    readonly path: string;
    readonly version: string;
    readonly kind: "plan" | "script" | "subtitle" | "quality" | "manifest";
}
export interface VideoProjectSummary {
    readonly id: string;
    readonly root: string;
    readonly title: string;
    readonly state: "not-started" | "working" | "waiting" | "ready";
    readonly stage: string;
    readonly stageLabel: string;
    readonly nextArtifact?: string | undefined;
    readonly previews: readonly VideoPreviewAsset[];
    readonly artifacts: readonly VideoArtifactSummary[];
    readonly narrative?: VideoNarrativeProjection | undefined;
    readonly narrationPath?: string | undefined;
    readonly narrationVersion?: string | undefined;
}
export declare function videoProjectRoot(path: string): string | undefined;
export declare function skipVideoDirectory(path: string): boolean;
export declare function visibleVideoPath(path: string): boolean;
export declare function summarizeVideoProject(root: string, files: readonly VideoWorkspaceFile[], metadata?: {
    readonly project?: unknown;
    readonly runManifest?: unknown;
    readonly assembly?: unknown;
    readonly narration?: unknown;
    readonly validatedClips?: unknown;
    readonly visualAudioBoard?: unknown;
    readonly storyPlan?: unknown;
}): VideoProjectSummary;
//# sourceMappingURL=video-project.d.ts.map