export declare const STORY_DIRECTORIES: readonly ["正文", "大纲", "设定", "追踪", "对标", "参考资料", "拆文库", "扫榜", "封面"];
export declare const DRAMA_DIRECTORIES: readonly ["输入", "项目开发", "设定集", "剧集", "交付", "创作者决策", "审查"];
export declare const GAME_DIRECTORY = "game-adaptations";
export declare const VIDEO_DIRECTORY = "video-recaps";
export declare const CREATIVE_DIRECTORIES: readonly ["video-recaps", "game-adaptations", "正文", "大纲", "设定", "追踪", "对标", "参考资料", "拆文库", "扫榜", "封面", "输入", "项目开发", "设定集", "剧集", "交付", "创作者决策", "审查"];
/** Oh Story short fiction keeps one book as three files at the book root (DSH: the workspace root). */
export declare const SHORT_STORY_FILES: readonly ["正文.md", "设定.md", "小节大纲.md"];
export declare const SHORT_STORY_FILE_SET: ReadonlySet<string>;
export declare const ROOT_FILES: ReadonlySet<string>;
/** High-volume build/dependency/VCS directories never scanned or surfaced by creative routes. */
export declare const SKIPPED_SCAN_DIRECTORIES: ReadonlySet<string>;
export declare const MAX_BOOK_PREFIX_DEPTH = 4;
export declare function pathExtension(path: string): string;
export declare function isPublishRootFile(name: string): boolean;
/** Reject empty paths, absolute/backslash paths, traversal, and any dot-prefixed segment. */
export declare function safeRelativePath(path: string): boolean;
/** Multi-book novel layouts keep books in `{书名}/{正文|大纲|设定|追踪|...}/` or `{书名}/正文.md` (up to depth 4). */
export declare function isMultiBookStoryPath(path: string): boolean;
export declare function isCreativeRootPath(path: string): boolean;
/**
 * The authoritative creative root directory that must contain `path` after resolution.
 * Returns `""` for workspace-root creative files (such as `正文.md`, `short-drama.json`,
 * or `发布资料*.md`), which are confined to the workspace root itself.
 */
export declare function creativeRootDirectory(path: string): string | undefined;
export declare function editableCreativePath(path: string): boolean;
export declare function isStoryDirectory(directory: string): boolean;
export declare function isDramaDirectory(directory: string): boolean;
//# sourceMappingURL=creative-paths.d.ts.map