/** Public input capabilities differ between DSH 0.2.0 and 0.2.1. */
interface ChatInput<Binding extends {
    readonly ctx: unknown;
}> {
    readonly requestDraftInitialization?: ((binding: Binding, initial: {
        readonly prompt: string;
        readonly whenDraftExists: "keep";
    }) => "applied" | "preserved" | "blocked") | undefined;
    for(context: Binding["ctx"]): {
        focus(): void;
    };
}
/** False asks the workbench to retain the context visibly when the host did not apply it. */
export declare function focusChatContext<Binding extends {
    readonly ctx: unknown;
}>(input: ChatInput<Binding>, binding: Binding, prompt?: string): boolean;
export {};
//# sourceMappingURL=chat-context.d.ts.map