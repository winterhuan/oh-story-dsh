import type { ChatSnapshot } from "@deepseek-ai/dsh-client-ui-chat/client";
import { type ValidatedProductionIntent } from "../production-intent.js";
export interface SettledProductionIntent {
    readonly callId: string;
    readonly intent: ValidatedProductionIntent;
}
/** Replay durable successful Agent UI intents in official DSH Chat order. */
export declare function settledProductionIntents(chat: ChatSnapshot): SettledProductionIntent[];
//# sourceMappingURL=production-intents.d.ts.map