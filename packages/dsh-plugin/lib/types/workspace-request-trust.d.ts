import type { IncomingHttpHeaders } from "node:http";
interface WorkspaceTrustRequest {
    readonly headers: IncomingHttpHeaders | Headers;
}
/** Reject malformed declarations at plugin load instead of silently widening access. */
export declare function assertTrustedWorkspaceAuthority(entry: string): void;
/**
 * Same browser trust boundary as DSH's native API: every request must address a
 * loopback, bind-IP, or explicitly trusted Host, and browser markers must be same-origin.
 */
export declare function isTrustedWorkspaceRequest(request: WorkspaceTrustRequest, trustedHosts: readonly string[], bindHost?: string, protocol?: "http:" | "https:"): boolean;
/**
 * Permit a generated-game document to navigate from one loopback alias to
 * another (127.0.0.1 ↔ localhost). Subresources then become same-origin with
 * the isolated preview document and use the stricter path above.
 */
export declare function isTrustedPreviewNavigation(request: WorkspaceTrustRequest, trustedHosts: readonly string[], bindHost?: string, protocol?: "http:" | "https:"): boolean;
/** Normalize a bare `host[:port]` authority for signing into a game preview token. */
export declare function normalizePreviewAuthority(authority: string | undefined, protocol?: "http:" | "https:"): string | undefined;
/**
 * Authorize a `/oh-story/game-preview/<signed-token>/<path...>` request whose
 * verified HMAC token binds the minting request's normalized `Host` (`boundHost`).
 * Accepts the exact bound authority or a loopback alias on the same port
 * (`127.0.0.1` ↔ `localhost` ↔ `[::1]`) while rejecting third-party origins and
 * DNS-rebound hosts without duplicating DSH's `client-connection.trustedHosts`.
 */
export declare function isBoundPreviewAssetRequest(request: WorkspaceTrustRequest, boundHost: string, protocol?: "http:" | "https:"): boolean;
/**
 * Host & Origin fence for `/oh-story/game-preview/<signed-token>/<path...>` GET/HEAD
 * requests. Requires a trusted Host (blocking DNS rebinding) and permits:
 * - same-origin / loopback-alias preview navigations, AND
 * - opaque-origin (`Origin: null` or absent `Origin` with `Sec-Fetch-Site: cross-site`)
 *   static subresources requested by a non-isolated sandboxed iframe whose URL already
 *   carries a server-signed capability token.
 * Rejects third-party non-null origins (`Origin: https://evil.example`).
 */
export declare function isTrustedPreviewAssetRequest(request: WorkspaceTrustRequest, trustedHosts: readonly string[], bindHost?: string, protocol?: "http:" | "https:"): boolean;
export {};
//# sourceMappingURL=workspace-request-trust.d.ts.map