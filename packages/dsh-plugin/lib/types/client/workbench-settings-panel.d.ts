import { type WorkbenchMode } from "./file-activity.js";
export declare function WorkbenchSettingsButton({ onClick }: {
    readonly onClick: () => void;
}): import("react/jsx-runtime").JSX.Element;
interface SettingsProps {
    readonly modes: readonly WorkbenchMode[];
    readonly onChange: (modes: readonly WorkbenchMode[]) => void;
}
export declare function WorkbenchSettingsForm({ modes, onChange }: SettingsProps): import("react/jsx-runtime").JSX.Element;
export declare function WorkbenchSettingsPanel({ modes, onChange, onClose }: SettingsProps & {
    readonly onClose: () => void;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=workbench-settings-panel.d.ts.map