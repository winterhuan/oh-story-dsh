import { type WelcomeConfigFormStatus, type WorkbenchPreference, type WorkbenchPreferenceStorage } from "./workbench-presence.js";
interface WelcomeConfigFormSnapshot {
    readonly status: "loading" | "ready" | "unavailable";
    readonly value?: {
        readonly welcomeGuide?: boolean | undefined;
    } | undefined;
    readonly writable: boolean;
}
export interface WelcomeConfigForm {
    getSnapshot(): WelcomeConfigFormSnapshot;
    subscribe(listener: () => void): () => void;
    set(field: "welcomeGuide", value: boolean): Promise<boolean>;
}
export interface WelcomeGuideSnapshot {
    readonly formStatus: WelcomeConfigFormStatus;
    readonly hostValue: boolean | undefined;
    readonly writable: boolean;
    readonly fallbackHostValue: boolean | undefined;
    readonly optimisticValue: boolean | undefined;
    readonly localPreference: WorkbenchPreference | undefined;
    readonly saving: boolean;
    readonly error: string | undefined;
}
export declare class WelcomeGuideController {
    private readonly getStorage;
    private readonly listeners;
    private form;
    private fallbackProbe;
    private snapshot;
    constructor(getStorage?: () => WorkbenchPreferenceStorage | undefined);
    readonly getSnapshot: () => WelcomeGuideSnapshot;
    readonly subscribe: (listener: () => void) => (() => void);
    private update;
    connectForm(form: WelcomeConfigForm): () => void;
    ensureFallbackHostConfig(load?: () => Promise<boolean>): void;
    setEnabled(enabled: boolean): Promise<boolean>;
}
export interface WelcomeStarterCard {
    readonly id: "story" | "drama" | "game" | "video";
    readonly title: string;
    readonly subtitle: string;
    readonly prompt: string;
}
export declare const WELCOME_STARTERS: readonly WelcomeStarterCard[];
/** How to reach the workbench from a DSH that has no creative work open yet. */
export declare function WelcomeGuide({ onDismiss, dismissing, onStartPrompt }?: {
    readonly onDismiss?: (() => void) | undefined;
    readonly dismissing?: boolean | undefined;
    readonly onStartPrompt?: ((prompt: string) => boolean) | undefined;
}): import("react/jsx-runtime").JSX.Element;
export declare function OhStoryPluginConfig({ view, controller }: {
    readonly view?: "summary" | "page" | undefined;
    readonly controller: WelcomeGuideController;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=welcome-guide.d.ts.map