export declare function isSafeImageSrc(src: string): boolean;
export type ImageSrcResolver = (src: string, basePath?: string) => string | undefined;
type Alignment = "left" | "center" | "right" | undefined;
export interface MarkdownListItem {
    readonly text: string;
    readonly checked?: boolean;
    readonly children?: readonly MarkdownListBlock[];
}
export interface MarkdownListBlock {
    readonly kind: "ul" | "ol";
    readonly items: readonly MarkdownListItem[];
    readonly start?: number;
}
export type MarkdownBlock = {
    readonly kind: "code";
    readonly lines: readonly string[];
    readonly language?: string;
} | {
    readonly kind: "heading";
    readonly text: string;
    readonly level: number;
} | {
    readonly kind: "quote";
    readonly lines: readonly string[];
} | MarkdownListBlock | {
    readonly kind: "table";
    readonly headers: readonly string[];
    readonly rows: readonly (readonly string[])[];
    readonly alignments: readonly Alignment[];
} | {
    readonly kind: "rule";
} | {
    readonly kind: "paragraph";
    readonly lines: readonly string[];
};
export declare function parseMarkdownBlocks(markdown: string): MarkdownBlock[];
export declare function MarkdownPreview({ content, label, resolveImageSrc }: {
    readonly content: string;
    readonly label: string;
    readonly resolveImageSrc?: ImageSrcResolver | undefined;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=markdown-preview.d.ts.map