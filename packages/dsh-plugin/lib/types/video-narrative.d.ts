export type VideoNarrativeKind = "narration" | "original";
export interface VideoTimeRange {
    readonly start: number;
    readonly end: number;
    readonly sourceId?: string | undefined;
    readonly sourcePath?: string | undefined;
}
export interface VideoTimelineClip {
    readonly id: string;
    readonly sourceId?: string | undefined;
    readonly sourcePath?: string | undefined;
    readonly source: VideoTimeRange;
    readonly output: VideoTimeRange;
}
export interface VideoNarrativeSegment {
    readonly id: string;
    /** Narration array position. Save code must clone that item and retain fields not projected here. */
    readonly index?: number | undefined;
    readonly kind: VideoNarrativeKind;
    readonly text?: string | undefined;
    readonly output: VideoTimeRange;
    readonly sourceRanges: readonly VideoTimeRange[];
    readonly sourceMapping: "identity" | "validated-clips" | "explicit-board" | "timeline-v3" | "unavailable";
    readonly beatId?: string | undefined;
    readonly audioOwner?: "original_dialogue" | "action_sound" | "ambience" | "music" | undefined;
}
export interface VideoCreativeSummary {
    readonly viewerPromise?: string | undefined;
    readonly pov?: string | undefined;
    readonly dramaticQuestion?: string | undefined;
    readonly emotionalStart?: string | undefined;
    readonly emotionalEnd?: string | undefined;
    readonly endingAftertaste?: string | undefined;
    readonly spine?: string | undefined;
}
export interface VideoNarrativeProjection {
    /** Clock used by the authored narration file; every segment.output is still the playback clock. */
    readonly authoredClock: "source" | "output" | "unknown";
    readonly segments: readonly VideoNarrativeSegment[];
    /** Ordered output→source clip spans when projected from `timeline.json` v3. */
    readonly clips?: readonly VideoTimelineClip[] | undefined;
    readonly creative: VideoCreativeSummary;
    readonly facts: {
        readonly narrationCount: number;
        readonly originalCount: number;
        readonly mappedNarrationCount: number;
        readonly outputExtent?: VideoTimeRange | undefined;
    };
    readonly warnings: readonly ("invalid-narration" | "invalid-clip-map" | "invalid-original-audio-beat" | "invalid-timeline")[];
}
export interface VideoNarrativeInput {
    /** Video Recap 0.8.0 canonical `timeline.json` v3 document. Takes precedence when valid v3. */
    readonly timeline?: unknown;
    /** Optional resolver normalizing `timeline.sources` entries into workspace-relative paths. */
    readonly resolveSourcePath?: ((raw: string) => string | undefined) | undefined;
    readonly narration?: unknown;
    readonly validatedClips?: unknown;
    readonly visualAudioBoard?: unknown;
    readonly storyPlan?: unknown;
    /** `full` is the upstream identity-picture mode; `preserve` is accepted for compatible manifests. */
    readonly editMode?: unknown;
}
export declare function projectVideoNarrative(input: VideoNarrativeInput): VideoNarrativeProjection;
//# sourceMappingURL=video-narrative.d.ts.map