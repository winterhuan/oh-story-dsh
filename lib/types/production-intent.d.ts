export declare const OH_STORY_PRODUCTION_TOOL_NAME = "oh_story_production";
export declare const PRODUCTION_INTENT_ACTIONS: readonly ["open_section", "focus_target", "set_sequence", "track_job"];
export declare const PRODUCTION_INTENT_SECTIONS: readonly ["shots", "assets", "tasks", "sequence", "canvas"];
export declare const PRODUCTION_INTENT_JOB_KINDS: readonly ["image", "video", "composition"];
export type ProductionIntentAction = typeof PRODUCTION_INTENT_ACTIONS[number];
export type ProductionIntentSection = typeof PRODUCTION_INTENT_SECTIONS[number];
export type ProductionIntentJobKind = typeof PRODUCTION_INTENT_JOB_KINDS[number];
export interface ProductionIntentArgs {
    readonly action: ProductionIntentAction;
    readonly episode: string;
    readonly section?: ProductionIntentSection | undefined;
    readonly targetId?: string | undefined;
    readonly shotIds?: readonly string[] | undefined;
    readonly jobId?: string | undefined;
    readonly jobKind?: ProductionIntentJobKind | undefined;
    readonly expectedOutputs?: number | undefined;
    readonly prompt?: string | undefined;
}
export type ValidatedProductionIntent = {
    readonly action: "open_section";
    readonly episode: string;
    readonly section: ProductionIntentSection;
} | {
    readonly action: "focus_target";
    readonly episode: string;
    readonly targetId: string;
    readonly section?: ProductionIntentSection | undefined;
} | {
    readonly action: "set_sequence";
    readonly episode: string;
    readonly shotIds: readonly string[];
} | {
    readonly action: "track_job";
    readonly episode: string;
    readonly jobId: string;
    readonly targetId: string;
    readonly jobKind: ProductionIntentJobKind;
    readonly expectedOutputs?: number | undefined;
    readonly prompt?: string | undefined;
};
/** Validate the cross-runtime UI intent without reading or mutating workspace state. */
export declare function validateProductionIntent<A extends ProductionIntentAction>(args: ProductionIntentArgs & {
    readonly action: A;
}): Extract<ValidatedProductionIntent, {
    readonly action: A;
}>;
export declare function validateProductionIntent(args: ProductionIntentArgs): ValidatedProductionIntent;
//# sourceMappingURL=production-intent.d.ts.map