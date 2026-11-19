/**
 * DSH is a general Harness: one installed plugin must not turn every Session
 * into a writing surface. The workbench claims the conversation layout only for
 * a workspace that actually holds creative work, and the creator can always
 * take the layout back.
 */
export type WorkbenchPreference = "open" | "closed";
export interface WorkbenchWorkspace {
    readonly files: readonly unknown[];
    readonly games: readonly unknown[];
    readonly videos: readonly unknown[];
}
export interface WorkbenchPreferenceStorage {
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
}
export declare function hasCreativeProject(workspace: WorkbenchWorkspace | undefined): boolean;
/** An explicit creator choice always wins over what the workspace happens to contain. */
export declare function resolveWorkbenchOpen(preference: WorkbenchPreference | undefined, creativeProject: boolean): boolean;
export declare function workbenchPreferenceKey(cwd: string): string;
/** The DSH Session Store is not persisted, so the choice is kept per workspace instead. */
export declare function readWorkbenchPreference(storage: WorkbenchPreferenceStorage | undefined, cwd: string | undefined): WorkbenchPreference | undefined;
export declare function writeWorkbenchPreference(storage: WorkbenchPreferenceStorage | undefined, cwd: string | undefined, preference: WorkbenchPreference): void;
/** Reading the property itself throws when the browser blocks site data. */
export declare function workbenchPreferenceStorage(): WorkbenchPreferenceStorage | undefined;
export declare const WELCOME_GUIDE_STORAGE_KEY = "oh-story.welcome-guide";
export type WelcomeConfigFormStatus = "absent" | "loading" | "ready" | "unavailable";
export interface WelcomeGuideResolutionInput {
    readonly formStatus: WelcomeConfigFormStatus;
    readonly hostValue: boolean | undefined;
    readonly writable: boolean;
    readonly optimisticValue: boolean | undefined;
    readonly localPreference: WorkbenchPreference | undefined;
    readonly workspaceWelcomeGuide?: boolean | undefined;
}
export declare function readWelcomeGuidePreference(storage: WorkbenchPreferenceStorage | undefined): WorkbenchPreference | undefined;
export declare function writeWelcomeGuidePreference(storage: WorkbenchPreferenceStorage | undefined, enabled: boolean): void;
/**
 * Resolve whether the blank-session welcome guide may appear:
 * - Wait while the Host settings form is still loading so `welcomeGuide: false` never flashes.
 * - When DSH's profile settings form is ready and writable, its `welcomeGuide` value is authoritative.
 * - On read-only or profileless hosts, honor static Host `welcomeGuide: false`, then browser storage.
 */
export declare function resolveWelcomeGuideEnabled(input: WelcomeGuideResolutionInput): boolean;
//# sourceMappingURL=workbench-presence.d.ts.map