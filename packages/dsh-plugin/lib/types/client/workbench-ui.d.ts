import type { KeyboardEvent as ReactKeyboardEvent } from "react";
/** Roving-focus keyboard contract shared by every workbench tablist. */
export declare function handleTabKey<T extends string>(event: ReactKeyboardEvent<HTMLButtonElement>, values: readonly T[], current: T, select: (value: T) => void): void;
export type OhStoryApiPrefix = "api/oh-story" | "oh-story";
/**
 * Detect whether the active DSH host mounts Oh Story endpoints under `api/oh-story` (DSH 0.2.2+
 * `connection.fetch.register`) or legacy `oh-story` (DSH 0.2.0-rc.2 `webServer.register`),
 * reading the injected `#oh-story-workbench-css` link element and defaulting to `api/oh-story`.
 */
export declare function detectOhStoryApiPrefix(): OhStoryApiPrefix;
/**
 * Resolve an Oh Story endpoint relative to `document.baseURI` when running on HTTP(S)
 * so DSH `connection.fetch.register` (`api/oh-story/*`) and legacy `webServer` (`oh-story/*`)
 * routes work across mount-prefix proxies, Electron IPC, and Web Workers, falling back cleanly
 * to a root-relative path in non-HTTP / jsdom environments.
 */
export declare function ohStoryEndpointUrl(path: string): string;
export declare function endpoint(path: string, sessionId: string, file?: string, version?: string): string;
//# sourceMappingURL=workbench-ui.d.ts.map