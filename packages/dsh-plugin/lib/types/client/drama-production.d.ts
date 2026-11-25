export type DramaProductionSection = "shots" | "assets" | "tasks" | "sequence" | "canvas";
export type DramaAssetKind = "character" | "scene" | "prop" | "state" | "unknown";
export declare const PRODUCTION_PROTOCOL_VERSION = "short-drama/v1";
export interface DramaProductionDiagnostic {
    readonly severity: "error" | "warning";
    readonly code: string;
    readonly path: string;
    readonly offset: number;
    readonly line: number;
    readonly targetId?: string | undefined;
    readonly message: string;
}
export interface DramaDocumentTarget {
    readonly path: string;
    readonly offset: number;
    readonly id: string;
}
export interface DramaMotionGroup {
    readonly id: string;
    readonly title: string;
    readonly path: string;
    readonly offset: number;
    readonly memberMotionIds: readonly string[];
    readonly memberShotIds: readonly string[];
    readonly durationSeconds?: number | undefined;
    readonly reason?: string | undefined;
    readonly prompt?: string | undefined;
}
export interface DramaMusicPrompt {
    readonly id: string;
    readonly title: string;
    readonly path: string;
    readonly offset: number;
    readonly range?: string | undefined;
    readonly purpose?: string | undefined;
    readonly mood?: string | undefined;
    readonly avoid?: string | undefined;
    readonly prompt?: string | undefined;
}
export interface DramaShot {
    readonly id: string;
    readonly title: string;
    readonly path: string;
    readonly offset: number;
    readonly source?: string | undefined;
    /** Screenplay scene IDs named by 来源, in document order; empty when the field names none. */
    readonly sceneIds: readonly string[];
    readonly durationSeconds?: number | undefined;
    readonly purpose?: string | undefined;
    readonly shotSpec?: string | undefined;
    readonly start?: string | undefined;
    readonly end?: string | undefined;
    readonly references: readonly string[];
    readonly keyframePrompt?: string | undefined;
    readonly motion?: DramaMotionPrompt | undefined;
    readonly group?: DramaMotionGroup | undefined;
}
export interface DramaAsset {
    readonly id: string;
    readonly title: string;
    readonly kind: DramaAssetKind;
    readonly path: string;
    readonly offset: number;
    readonly purpose?: string | undefined;
    readonly reference?: string | undefined;
    readonly prompt?: string | undefined;
}
export interface DramaMotionPrompt {
    readonly id: string;
    readonly title: string;
    readonly path: string;
    readonly offset: number;
    readonly shotId?: string | undefined;
    readonly durationSeconds?: number | undefined;
    readonly startFrame?: string | undefined;
    readonly end?: string | undefined;
    readonly prompt?: string | undefined;
}
export interface DramaVisualAsset {
    readonly id: string;
    readonly title: string;
    readonly kind: DramaAssetKind;
    readonly path: string;
    readonly offset: number;
    readonly description: string;
    readonly stableId: boolean;
    readonly declaredId?: string | undefined;
}
export interface DramaEpisodeProduction {
    readonly protocolVersion: typeof PRODUCTION_PROTOCOL_VERSION;
    readonly episodeDirectory: string;
    readonly shots: readonly DramaShot[];
    readonly assets: readonly DramaAsset[];
    readonly visualAssets: readonly DramaVisualAsset[];
    readonly motions: readonly DramaMotionPrompt[];
    readonly groups: readonly DramaMotionGroup[];
    readonly music: readonly DramaMusicPrompt[];
    readonly targets: ReadonlyMap<string, DramaDocumentTarget>;
    readonly documentPaths: readonly string[];
    readonly diagnostics: readonly DramaProductionDiagnostic[];
}
export declare function episodeDirectoryForPath(path: string | undefined): string | undefined;
export declare function isCreatorDocumentPath(path: string): boolean;
export declare function creatorDocumentPaths(files: readonly {
    readonly path: string;
}[], episodeDirectory: string): string[];
export declare function parseEpisodeProduction(documents: Readonly<Record<string, string>>, episodeDirectory: string): DramaEpisodeProduction;
export declare function parseStoryboard(path: string, content: string): DramaShot[];
export declare function parseImagePrompts(path: string, content: string): DramaAsset[];
export declare function parseVideoPrompts(path: string, content: string): DramaMotionPrompt[];
export declare function parseVideoGroups(path: string, content: string): DramaMotionGroup[];
export declare function parseMusicPrompts(path: string, content: string): DramaMusicPrompt[];
export declare function parseVisualAssets(path: string, content: string): DramaVisualAsset[];
/** Known episode production target IDs for matching workspace media paths (longest first). */
export declare function productionKnownTargets(production: DramaEpisodeProduction): string[];
/** Map a matched media target ID (`MOTION-*`, `GROUP-*`, `MUSIC-*`, etc.) to its canonical display target(s). */
export declare function resolveMediaTargetIds(production: DramaEpisodeProduction, matchedId: string): string[];
export declare function productionCompleteness(shot: DramaShot): {
    readonly keyframe: boolean;
    readonly motion: boolean;
    readonly references: boolean;
    readonly complete: boolean;
};
export declare function sourceSceneIds(source: string | undefined): string[];
export declare function targetDisplayName(production: DramaEpisodeProduction | undefined, id: string, documents?: Readonly<Record<string, string>>): string;
//# sourceMappingURL=drama-production.d.ts.map