import type { VideoQualityReviewHint } from "../video-project.js";
import { type VideoProject } from "./video-workspace-model.js";
/** Safely open a native `<dialog>` without throwing `InvalidStateError` if already open. */
export declare function openDialogSafely(element: {
    readonly open: boolean;
    showModal?: () => void;
} | null): boolean;
/** Resolve the currently selected artifact or fall back to the first available artifact. */
export declare function resolveVideoDetailsArtifact(artifacts: VideoProject["artifacts"], selected: string | undefined): VideoProject["artifacts"][number] | undefined;
/**
 * Resolve the artifact read error for `VideoDetails`.
 * Never lets an unrelated main-editor `fileReadError` hide `VideoDetails`'s own loaded content
 * or leak onto an artifact whose path differs from `fileReadErrorPath`.
 */
export declare function resolveVideoDetailsError(input: {
    readonly fetchError: string | undefined;
    readonly content: string | undefined;
    readonly artifactPath: string | undefined;
    readonly fileReadError?: string | null | undefined;
    readonly fileReadErrorPath?: string | undefined;
}): string | undefined;
export interface VideoDetailsProps {
    readonly project?: VideoProject | undefined;
    readonly sessionId: string;
    readonly onClose: () => void;
    readonly fileReadError?: string | null | undefined;
    readonly fileReadErrorPath?: string | undefined;
    readonly onRetryRead?: (() => void) | undefined;
    readonly onSeekHint?: ((hint: VideoQualityReviewHint) => void) | undefined;
    readonly onDiscussHint?: ((hint: VideoQualityReviewHint) => void) | undefined;
}
export declare function VideoDetails({ project, sessionId, onClose, fileReadError, fileReadErrorPath, onRetryRead, onSeekHint, onDiscussHint }: VideoDetailsProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=video-details.d.ts.map