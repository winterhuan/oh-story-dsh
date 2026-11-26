import type { Context } from "@deepseek-ai/cordis";
import { type DramaAdapterStatus } from "./drama-adapters.js";
import { type PythonProbe } from "./host-python.js";
import { type VideoProjectSummary } from "./video-project.js";
/** Canonical DSH 0.2.2-rc.5 `connection.fetch.register` path for the combined workbench CSS asset. */
export declare const WORKBENCH_CSS_API_PATH = "/api/oh-story/workbench.css";
/** Fallback `webServer.register` path for the combined workbench CSS asset. */
export declare const WORKBENCH_CSS_FALLBACK_PATH = "/oh-story/workbench.css";
export interface WorkbenchStylesheetAsset {
    readonly css: string;
    readonly bytes: Buffer;
    readonly version: string;
    readonly etag: string;
}
export interface WorkspaceRouteOptions {
    readonly maxBytes: number;
    readonly trustedHosts?: readonly string[];
    readonly welcomeGuide?: () => boolean;
    /** Optional override for signed game-preview tokens (defaults to a per-mount random 32-byte key). */
    readonly previewTokenSecret?: Uint8Array;
}
/** Host-process capability probe for Video Recap 0.8.0 (local-first; zero MiMo dependencies). */
export interface VideoPreflightStatus {
    readonly python: PythonProbe;
    readonly ffmpeg: {
        readonly ok: boolean;
        readonly subtitles: boolean;
    };
    readonly ffprobe: {
        readonly ok: boolean;
    };
    readonly tts: {
        readonly local: {
            readonly ok: boolean;
            readonly engine?: "say" | "espeak-ng" | "espeak" | undefined;
        };
        readonly fish: boolean;
        /** Matches upstream `tts.py --engine auto`: true when both `OPENAI_API_KEY` and `TTS_API_URL` are set. */
        readonly openai: boolean;
        /** True when `OPENAI_API_KEY` is set (usable via explicit `--engine openai`). */
        readonly openaiApiKey?: boolean | undefined;
        /** Matches upstream `tts.py`: true when `INDEX_TTS_ENDPOINT` is a valid `http(s)` URL without `@`. */
        readonly indexTts: boolean;
        /** True when `INDEX_TTS_VOICE` is also configured in host env (optional when passed via `--voice`). */
        readonly indexTtsVoice?: boolean | undefined;
    };
    readonly asr: {
        readonly localWhisper: {
            readonly ok: boolean;
            readonly cli?: "whisper" | "faster-whisper" | "mlx_whisper" | "whisper-cli" | undefined;
        };
        readonly remote: boolean;
    };
}
/**
 * Host-process view of short-drama production: which bundled media adapters
 * have their environment set, and where the adapter config the Agent passes to
 * `production_tool.py run` lives. Values never leave the process.
 */
export interface DramaPreflightSummary {
    readonly python: PythonProbe;
    readonly adapterConfig: {
        readonly path: string;
        readonly generated: boolean;
        readonly ok: boolean;
    };
    readonly adapters: readonly DramaAdapterStatus[];
}
export interface WorkspaceFile {
    readonly path: string;
    readonly bytes: number;
    readonly version: string;
    readonly kind: "text" | "media";
    readonly mimeType?: string | undefined;
}
export interface GameProjectSummary {
    readonly id: string;
    readonly root: string;
    readonly title: string;
    readonly previewReady: boolean;
    readonly previewUrl?: string | undefined;
    readonly previewVersion: string;
}
export interface WorkspacePayload {
    readonly cwd: string;
    readonly files: readonly WorkspaceFile[];
    readonly truncated: boolean;
    readonly games: readonly GameProjectSummary[];
    readonly videos: readonly VideoProjectSummary[];
    readonly metadataErrors: readonly string[];
    readonly welcomeGuide: boolean;
}
export interface PreviewTokenPayload {
    readonly sessionId: string;
    readonly root: string;
    /** Normalized minting Host authority (`host[:port]`) bound into the HMAC payload. */
    readonly host?: string | undefined;
    /** Expiry unix timestamp in seconds. */
    readonly exp: number;
}
/** Shape posted by the injected game preview HTML bridge via `window.parent.postMessage`. */
export interface GamePreviewErrorMessage {
    readonly type: "oh-story:game-preview-error";
    readonly message: string;
    readonly filename?: string | undefined;
    readonly lineno?: number | undefined;
    readonly colno?: number | undefined;
}
export declare function createPreviewTokenSecret(): Buffer;
/** Reset the cached workbench stylesheet (for recovery and unit tests). */
export declare function resetWorkbenchStylesheetCache(): void;
/**
 * Load and cache the combined workbench stylesheet (`lib/workbench.css` in built packages,
 * falling back to concatenating `src/client/*.css` during direct source/test runs).
 * Empty reads are never cached so transient startup/rebuild failures recover automatically.
 */
export declare function loadWorkbenchStylesheet(readText?: (file: string) => Promise<string>): Promise<WorkbenchStylesheetAsset>;
/**
 * Mint an HMAC-SHA256 signed capability token bound to `{ sessionId, root, host?, exp }`.
 * By default `exp` is quantized to 12-hour buckets (yielding 12–24 hour validity) so periodic
 * workspace polls keep a stable `previewUrl` and active game iframes never rotate or 401 mid-play.
 */
export declare function mintPreviewToken(secret: Uint8Array, input: {
    readonly sessionId: string;
    readonly root: string;
    readonly host?: string | undefined;
    readonly exp?: number | undefined;
}, nowMs?: number): string;
/** Verify a signed preview capability token with constant-time HMAC comparison and expiry check. */
export declare function verifyPreviewToken(tokenValue: string, secret: Uint8Array, nowMs?: number): PreviewTokenPayload;
/**
 * Pure, testable Video Recap 0.8.0 host capability probe.
 * Probes local必需 tools (Python 3.10+, ffmpeg+libass, ffprobe) plus optional
 * offline/cloud TTS and local Whisper / remote ASR backends.
 */
export declare function probeVideoPreflight(options?: {
    readonly env?: NodeJS.ProcessEnv;
    readonly platform?: NodeJS.Platform;
    readonly probeCommand?: (command: string, args: readonly string[]) => Promise<string | undefined>;
    readonly isFile?: (path: string) => Promise<boolean>;
}): Promise<VideoPreflightStatus>;
export interface ByteRange {
    readonly start: number;
    readonly end: number;
}
/**
 * RFC 9110 14.2: a Range this server cannot parse or does not support is ignored (`undefined`, full
 * 200 response); only a well-formed but unsatisfiable range earns a 416 (`null`).
 */
export declare function parseByteRange(value: string | undefined, size: number): ByteRange | undefined | null;
export declare function assertCreativePath(path: string, kind: "text" | "media"): void;
export declare function mediaMimeTypeForPath(path: string): string | undefined;
export declare function gameRoot(path: string): boolean;
/**
 * The game's name from its brief's first heading, e.g. `# PRODUCT_BRIEF — 《雪夜渡》` → `雪夜渡`.
 * The Studio adds its own 书名号 and separators, so neither the file label nor the work's
 * 书名号 belong in the name.
 */
export declare function gameProjectTitle(content: string | undefined, fallback: string): string;
export declare function previewContentType(path: string): string;
/**
 * Inject a tiny read-only runtime error bridge immediately after the opening `<head>`
 * tag (falling back to after `<!doctype ...>` or start of HTML) so even synchronous
 * `<head>` module script and stylesheet failures are captured by the parent Game Studio.
 */
export declare function injectGamePreviewErrorBridge(html: string): string;
/**
 * Emitted for EVERY preview response, not just HTML. previewContentType serves .svg as
 * image/svg+xml — an active document type — so a game that self-navigates its frame to a scripted
 * SVG would otherwise land in a document with no policy at all, while the iframe sandbox flags
 * (which do persist across that navigation) still grant it script execution. The `sandbox`
 * directive makes each response self-confining regardless of the iframe attribute.
 */
export declare function previewContentSecurityPolicy(assets: string): string;
/**
 * Mount the Oh Story editor API:
 * - Non-game JSON/media/CSS endpoints register on DSH 0.2.2-rc.5 `connection.fetch.register`
 *   under `/api/oh-story/*` when `connection` is present (so prefix-stripping proxies,
 *   Electron IPC, Web Workers, and DSH's official `client-connection.trustedHosts` work natively).
 * - `/oh-story/game-preview/<token>/<path>` and `/oh-story/*` fallback routes stay on
 *   `webServer.register` (opaque-origin sandboxed game iframes cannot send auth cookies, and
 *   isolated unit tests / older callers without `connection` remain fully supported).
 */
export declare function registerWorkspaceRoute(context: Context, options: WorkspaceRouteOptions): void;
//# sourceMappingURL=workspace-route.d.ts.map