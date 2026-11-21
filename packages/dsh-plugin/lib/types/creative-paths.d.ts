export declare const STORY_DIRECTORIES: readonly ["正文", "大纲", "设定", "追踪", "对标", "参考资料"];
export declare const DRAMA_DIRECTORIES: readonly ["输入", "项目开发", "设定集", "剧集", "交付", "创作者决策", "审查"];
export declare const GAME_DIRECTORY = "game-adaptations";
export declare const VIDEO_DIRECTORY = "video-recaps";
export declare const CREATIVE_DIRECTORIES: readonly ["video-recaps", "game-adaptations", "正文", "大纲", "设定", "追踪", "对标", "参考资料", "输入", "项目开发", "设定集", "剧集", "交付", "创作者决策", "审查"];
/** Oh Story short fiction keeps one book as three files at the book root (DSH: the workspace root). */
export declare const SHORT_STORY_FILES: readonly ["正文.md", "设定.md", "小节大纲.md"];
export declare const SHORT_STORY_FILE_SET: ReadonlySet<string>;
export declare const ROOT_FILES: ReadonlySet<string>;
export declare function pathExtension(path: string): string;
export declare function safeRelativePath(path: string): boolean;
export declare function isCreativeRootPath(path: string): boolean;
export declare function editableCreativePath(path: string): boolean;
export declare function isStoryDirectory(directory: string): boolean;
export declare function isDramaDirectory(directory: string): boolean;
//# sourceMappingURL=creative-paths.d.ts.map