import { type WorkbenchMode } from "./file-activity.js";
export declare function WorkbenchSettingsButton({ onClick }: {
    readonly onClick: () => void;
}): import("react/jsx-runtime").JSX.Element;
interface SettingsProps {
    readonly modes: readonly WorkbenchMode[];
    readonly onChange: (modes: readonly WorkbenchMode[]) => void;
}
export declare function WorkbenchSettingsForm({ modes, onChange }: SettingsProps): import("react/jsx-runtime").JSX.Element;
export interface DialogBackdropEvent {
    readonly target: unknown;
    readonly detail?: number;
    readonly clientX: number;
    readonly clientY: number;
}
export declare function isDialogBackdropClick(dialog: Pick<HTMLDialogElement, "getBoundingClientRect">, event: DialogBackdropEvent): boolean;
export interface DialogBackdropGuard {
    onPointerDown(dialog: Pick<HTMLDialogElement, "getBoundingClientRect"> | null, event: DialogBackdropEvent): void;
    shouldCloseOnClick(dialog: Pick<HTMLDialogElement, "getBoundingClientRect"> | null, event: DialogBackdropEvent): boolean;
}
/**
 * Require both `pointerdown` and `click` outside the dialog box before closing,
 * so dragging a text selection from inside the modal onto the backdrop never dismisses it.
 */
export declare function createDialogBackdropGuard(): DialogBackdropGuard;
export declare function WorkbenchSettingsPanel({ modes, onChange, onClose }: SettingsProps & {
    readonly onClose: () => void;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=workbench-settings-panel.d.ts.map