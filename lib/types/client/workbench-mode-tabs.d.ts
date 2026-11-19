import { type WorkbenchMode } from "./file-activity.js";
/** The one cross-workbench navigation; each workbench only styles it through `className`. */
export declare function WorkbenchModeTabs({ className, current, onSelect, modes }: {
    readonly className: string;
    readonly current: WorkbenchMode;
    readonly onSelect: (mode: WorkbenchMode) => void;
    readonly modes?: readonly WorkbenchMode[] | undefined;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=workbench-mode-tabs.d.ts.map