export declare const OH_STORY_ROLE_NAMES: readonly ["chapter-extractor", "character-designer", "consistency-checker", "narrative-writer", "story-architect", "story-explorer", "story-researcher"];
export type OhStoryRoleName = typeof OH_STORY_ROLE_NAMES[number];
export declare function defaultBundledRoleRoot(): string;
export declare function loadBundledRole(name: OhStoryRoleName, roleRoot?: string): Promise<string>;
export declare function loadBundledRolePersonas(roleRoot?: string): Promise<ReadonlyMap<OhStoryRoleName, string>>;
//# sourceMappingURL=role-provider.d.ts.map