export interface VideoPreflight {
    readonly python: {
        readonly ok: boolean;
        readonly version?: string;
        readonly minimum: string;
    };
    readonly ffmpeg: {
        readonly ok: boolean;
        readonly subtitles: boolean;
    };
    readonly ffprobe: {
        readonly ok: boolean;
    };
    readonly credentials: {
        readonly mimo: boolean;
        readonly fish: boolean;
        readonly indexTts: boolean;
        readonly ttsProvider: string;
    };
}
/** The host-process readiness rows; values never leave the process, only whether each is set. */
export declare function VideoEnvironmentReport({ preflight }: {
    readonly preflight: VideoPreflight;
}): import("react/jsx-runtime").JSX.Element;
/**
 * Runs the check on mount: the Studio itself mounts only once the creator opens 视频, so the
 * probe never runs for a Session that never looks at video. The route caches it for 30 s.
 */
export declare function VideoEnvironment({ sessionId }: {
    readonly sessionId: string;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=video-environment.d.ts.map