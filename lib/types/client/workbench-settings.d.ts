import type { WorkbenchMode } from "./file-activity.js";
import type { WorkbenchPreferenceStorage } from "./workbench-presence.js";
export declare const WORKBENCH_MODES: readonly ["story", "drama", "game", "video"];
/** Keep canonical order and a reachable navigation even after invalid site data. */
export declare function visibleWorkbenchModes(value: unknown): readonly WorkbenchMode[];
export declare function resolveVisibleWorkbench(current: WorkbenchMode, modes: readonly WorkbenchMode[]): WorkbenchMode;
export declare function workbenchModesKey(cwd: string): string;
export declare function readWorkbenchModes(storage: WorkbenchPreferenceStorage | undefined, cwd: string | undefined): readonly WorkbenchMode[];
export declare function writeWorkbenchModes(storage: WorkbenchPreferenceStorage | undefined, cwd: string | undefined, modes: readonly WorkbenchMode[]): void;
/** One page-lifetime snapshot per workspace, not one restored preference per Session. */
export declare function createWorkbenchModesStore(storage: WorkbenchPreferenceStorage | undefined): {
    get(cwd: string | undefined): readonly WorkbenchMode[];
    set(cwd: string | undefined, modes: readonly WorkbenchMode[]): void;
    subscribe(cwd: string | undefined, notify: () => void): () => void;
};
//# sourceMappingURL=workbench-settings.d.ts.map