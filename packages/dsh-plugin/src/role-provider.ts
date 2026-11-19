import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { bundledKnowledgePath } from "./bundled-paths.js";

export const OH_STORY_ROLE_NAMES = [
  "chapter-extractor",
  "character-designer",
  "consistency-checker",
  "narrative-writer",
  "story-architect",
  "story-explorer",
  "story-researcher"
] as const;

export type OhStoryRoleName = typeof OH_STORY_ROLE_NAMES[number];

function roleBody(source: string): string {
  const frontmatter = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/u.exec(source);
  return source.slice(frontmatter?.[0].length ?? 0).trim();
}

export function defaultBundledRoleRoot(): string {
  return bundledKnowledgePath(import.meta.url, "oh-story/roles");
}

function researchRoleBody(body: string): string {
  const begin = body.indexOf("## 工具优先级");
  const end = body.indexOf("## 来源可靠性评估", begin);
  if (begin < 0 || end < 0) throw new Error("Bundled researcher workflow headings changed; update the DSH browser adaptation.");
  const workflow = `## 研究工具与流程

需要浏览器时执行 ego-browser skill，完整读取并遵循官方当前版本指南，直接使用 ego-browser 完成检索和页面读取。Space、页面操作、人工接管和任务完成都交给官方运行时。不可用时把缺项交回主会话。

公开静态来源可用当前子会话实际提供的 web_search / web_fetch。搜索摘要只定位来源；从真实结果提取目标链接，读取正文并记录 URL、时间与覆盖范围，再按下方标准评估来源和输出参考文件。

---

`;
  return (body.slice(0, begin) + workflow + body.slice(end))
    .replace('Agent(subagent_type: "story-researcher")', 'oh_story_role(role: "story-researcher")')
    .replace("- `cdp_port`：CDP 端口号（可选，默认 9222）", "- `browser_context`：调用者提供的 Ego Space 或页面背景（可选，按官方指南续接）")
    .replaceAll("google | bing | websearch", "google | bing | web_search")
    .replace("- CDP 使用：{是 | 否}", "- 浏览器：{ego | 未使用}")
    .replace('"cdp_used": true,', '"browser_used": true,\n  "browser": "ego | none",');
}

export async function loadBundledRole(
  name: OhStoryRoleName,
  roleRoot = defaultBundledRoleRoot()
): Promise<string> {
  const source = roleBody(await readFile(join(resolve(roleRoot), `${name}.md`), "utf8"));
  const body = name === "story-researcher" ? researchRoleBody(source) : source;
  if (body.length === 0) throw new Error(`Bundled role "${name}" is empty.`);
  return [
    `OH_STORY_DSH_ROLE:${name}`,
    "You are running as a native oh-story-dsh specialist. The current DSH workspace and visible tool set are your complete authority boundary.",
    "Never inspect or require legacy .claude/.opencode/.codex agent deployment files; this exact pinned Role is already active.",
    "Bundled story-setup references are pinned plugin resources, not project files or project Skills. When the upstream Role marks one mandatory, call oh_story_bundled_reference with the exact story-setup/references/agent-references path, then use only the returned content.",
    "When a task brief lists agent-references/<file>.md, call oh_story_bundled_reference with story-setup/references/agent-references/<file>.md.",
    "If oh_story_bundled_reference or a required bundled reference is unavailable, report the missing reference to the caller. Never call the generic skill tool, fall back to a legacy platform path, or claim that an unread reference was used.",
    "Use only the tools actually visible to you. Mutate files only when the caller explicitly requests it and your visible DSH tools permit it; otherwise return findings to the caller.",
    "",
    body
  ].join("\n");
}

export async function loadBundledRolePersonas(
  roleRoot = defaultBundledRoleRoot()
): Promise<ReadonlyMap<OhStoryRoleName, string>> {
  return new Map(await Promise.all(OH_STORY_ROLE_NAMES.map(async (role) =>
    [role, await loadBundledRole(role, roleRoot)] as const)));
}
