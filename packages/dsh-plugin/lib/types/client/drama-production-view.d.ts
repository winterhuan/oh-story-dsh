import type { DramaAdapterStatus } from "../drama-adapters.js";
import { targetDisplayName, type DramaDocumentTarget, type DramaEpisodeProduction, type DramaProductionSection, type DramaShot } from "./drama-production.js";
export { targetDisplayName };
import type { CanvasViewport } from "./canvas-viewport.js";
import { type DramaMediaVersion } from "./production-canvas.js";
import { type CanvasPoint, type ProductionJob, type ProductionQueueEntry, type ProductionSequenceItem } from "./production-runtime.js";
export type { DramaMediaVersion };
export interface DramaAdapterOptionalEnvStatus {
    readonly name: string;
    readonly label: string;
    readonly configured: boolean;
    readonly note: string;
}
export type DramaAdapterPreflightStatus = DramaAdapterStatus & {
    readonly optionalEnv?: readonly DramaAdapterOptionalEnvStatus[] | undefined;
};
/** Mirror of the host `/oh-story/drama-preflight` summary: presence only, never values. */
export interface DramaPreflight {
    readonly python: {
        readonly ok: boolean;
        readonly version?: string;
        readonly minimum: string;
    };
    readonly adapterConfig: {
        readonly path: string;
        readonly generated: boolean;
        readonly ok: boolean;
    };
    readonly adapters: readonly DramaAdapterPreflightStatus[];
}
interface Props {
    readonly sessionId: string;
    readonly production: DramaEpisodeProduction;
    readonly documents?: Readonly<Record<string, string>> | undefined;
    readonly sessionRunning: boolean;
    readonly queue: readonly ProductionQueueEntry[];
    readonly section: DramaProductionSection;
    readonly selectedId: string | undefined;
    readonly jobs: readonly ProductionJob[];
    readonly versions: readonly DramaMediaVersion[];
    readonly libraryVersions: readonly DramaMediaVersion[];
    readonly selections: Readonly<Record<string, string>>;
    readonly manualReferences: Readonly<Record<string, readonly string[]>>;
    readonly sequence: readonly ProductionSequenceItem[];
    readonly canvas: Readonly<Record<string, CanvasPoint>>;
    readonly viewport: CanvasViewport | undefined;
    readonly onSectionChange: (section: DramaProductionSection) => void;
    readonly onSelect: (id: string | undefined) => void;
    readonly onNavigate: (target: DramaDocumentTarget) => void;
    readonly onJobsChange: (jobs: ProductionJob[]) => void;
    readonly onSelectionsChange: (selections: Record<string, string>) => void;
    readonly onManualReferencesChange: (references: Record<string, string[]>) => void;
    readonly onOpenMedia: (path: string) => void;
    readonly onSequenceChange: (sequence: ProductionSequenceItem[]) => void;
    readonly onCanvasChange: (canvas: Record<string, CanvasPoint>) => void;
    readonly onViewportChange: (viewport: CanvasViewport) => void;
    readonly onContinueInChat?: ((targetId: string) => void) | undefined;
    readonly onDispatchPrompt: (prompt: string) => Promise<void>;
    readonly onCancelTurn: () => Promise<void>;
    readonly onRemoveQueued: (itemId: string) => Promise<void>;
    readonly onRefresh: () => void;
}
export declare function versionsForShot(shot: DramaShot, versions: readonly DramaMediaVersion[]): DramaMediaVersion[];
export declare function findAssembledCut(versions: readonly DramaMediaVersion[], libraryVersions: readonly DramaMediaVersion[] | undefined, episodeDirectory: string | undefined): DramaMediaVersion | undefined;
export declare function compositionSources(production: DramaEpisodeProduction, sequence: readonly ProductionSequenceItem[], versions: readonly DramaMediaVersion[]): {
    shotId: string;
    sourceId: string;
    kind: "image" | "video" | "audio";
    path: string;
    durationSeconds: number | undefined;
}[];
export interface DramaPipelineStep {
    readonly id: "screenplay" | "assets" | "keyframes" | "videos" | "cut";
    readonly label: string;
    readonly done: boolean;
    readonly ready?: number | undefined;
    readonly total?: number | undefined;
    readonly screenplayPath?: string | undefined;
    readonly section?: DramaProductionSection | undefined;
}
/** Glanceable non-blocking episode progress pills computed from real documents and outputs. */
export declare function dramaPipelineProgress(production: DramaEpisodeProduction, documents: Readonly<Record<string, string>> | undefined, versions: readonly DramaMediaVersion[], libraryVersions: readonly DramaMediaVersion[] | undefined): readonly DramaPipelineStep[];
export declare function productionCanvasAvailable(production: DramaEpisodeProduction, documents: Readonly<Record<string, string>> | undefined): boolean;
/**
 * DeepSeek writes the prompts; the pictures, videos, speech and music come from
 * provider APIs that the produce Skill calls. Nothing in the conversation says so,
 * and the keys live in the host environment, so the 生产 view states it up front —
 * as one compact status pill per concern, with the detail one click away.
 */
export declare function ProductionStatus({ sessionId, diagnostics, onNavigate, onSectionChange, pipeline, initialPreflight, initialOpen }: {
    readonly sessionId: string;
    readonly diagnostics: DramaEpisodeProduction["diagnostics"];
    readonly onNavigate: (target: DramaDocumentTarget) => void;
    readonly onSectionChange?: ((section: DramaProductionSection) => void) | undefined;
    readonly pipeline?: readonly DramaPipelineStep[] | undefined;
    readonly initialPreflight?: DramaPreflight | "failed" | undefined;
    readonly initialOpen?: boolean | undefined;
}): import("react/jsx-runtime").JSX.Element;
export declare function batchProductionCandidates(production: DramaEpisodeProduction, kind: "image" | "video"): Array<{
    readonly id: string;
    readonly prompt: string;
}>;
export declare function DramaProductionView(props: Props): import("react/jsx-runtime").JSX.Element;
export declare function SequenceBoard(props: Pick<Props, "jobs" | "sequence" | "versions" | "onSequenceChange"> & {
    readonly libraryVersions?: readonly DramaMediaVersion[] | undefined;
    readonly onOpenMedia?: ((path: string) => void) | undefined;
    readonly production?: DramaEpisodeProduction;
    readonly episodeDirectory?: string;
    readonly onCompose: () => void;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=drama-production-view.d.ts.map