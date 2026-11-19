import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { OH_STORY_ROLE_NAMES, loadBundledRole, loadBundledRolePersonas } from "../src/role-provider.js";

describe("bundled Oh Story roles", () => {
  it("loads all seven upstream role definitions as native DSH personas", async () => {
    expect(OH_STORY_ROLE_NAMES).toHaveLength(7);
    const root = resolve(import.meta.dirname, "../../knowledge/oh-story/roles");
    const personas = await loadBundledRolePersonas(root);
    expect(personas.size).toBe(7);
    for (const name of OH_STORY_ROLE_NAMES) {
      const source = await readFile(resolve(root, `${name}.md`), "utf8");
      const persona = await loadBundledRole(name, root);
      expect(personas.get(name)).toBe(persona);
      expect(persona).toContain(`OH_STORY_DSH_ROLE:${name}`);
      expect(persona).toContain("current DSH workspace and visible tool set");
      expect(persona).toContain("call oh_story_bundled_reference with the exact story-setup/references/agent-references path");
      expect(persona).toContain("Never call the generic skill tool");
      expect(persona).toContain("fall back to a legacy platform path");
      if (name === "story-researcher") {
        expect(persona).toContain("ego-browser skill");
        expect(persona).toContain("官方当前版本指南");
        expect(persona).not.toContain("Box");
        expect(persona).toContain("## 来源可靠性评估");
        expect(persona).toContain("## 研究场景");
        expect(persona).not.toContain("agent-browser --cdp");
        expect(persona).not.toContain("127.0.0.1:");
        expect(persona).not.toContain("cdp_port");
      } else {
        expect(persona).toContain(source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/u, "").trim());
      }
    }
  });

  it("keeps the updated benchmark-book failure distinction", async () => {
    // Oh Story 0.8.2 moved the procedure out of the persona into a bundled agent reference.
    const persona = await loadBundledRole("story-explorer", resolve(import.meta.dirname, "../../knowledge/oh-story/roles"));
    expect(persona).toContain("story-setup/references/agent-references/benchmark-style-load.md");
    const procedure = await readFile(resolve(import.meta.dirname, "../../knowledge/oh-story/skills/story-setup/references/agent-references/benchmark-style-load.md"), "utf8");
    expect(procedure).toContain("benchmark_book_missing: true");
    expect(procedure).toContain("profile_missing: true");
    expect(procedure).toContain("expected_path");
  });

  it("resolves the architect brief's relative reference paths through the bundled reference tool", async () => {
    const persona = await loadBundledRole("story-architect");
    expect(persona).toContain("When a task brief lists agent-references/<file>.md, call oh_story_bundled_reference with story-setup/references/agent-references/<file>.md.");
  });
});
