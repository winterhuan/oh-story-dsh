// src/index.ts
import z from "@deepseek-ai/schemastery";

// src/skill-provider.ts
import { readdir, readFile } from "node:fs/promises";
import { isAbsolute, join as join2, relative, resolve as resolve3 } from "node:path";
import { pathToFileURL } from "node:url";

// src/bundled-paths.ts
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
function bundledKnowledgePath(metaUrl, knowledgeSubpath) {
  const current = dirname(fileURLToPath(metaUrl));
  return basename(current) === "src" ? resolve(current, "../../knowledge", knowledgeSubpath) : resolve(current, knowledgeSubpath);
}

// src/drama-adapters.ts
import { createHash } from "node:crypto";
import { access, lstat, mkdir, rename, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname as dirname2, join, resolve as resolve2 } from "node:path";
var ADAPTER_OPTIONAL_ENV_NOTES = {
  "openai-image": [
    {
      name: "OPENAI_IMAGE_MODEL",
      label: "\u9ED8\u8BA4\u56FE\u7247\u6A21\u578B",
      note: "Drama 0.13.0 \u4E0D\u518D\u786C\u7F16\u7801\u6A21\u578B\u7248\u672C\uFF1B\u672A\u8BBE\u7F6E\u65F6\u987B\u5728\u4EFB\u52A1 parameters.model \u4E2D\u663E\u5F0F\u6307\u5B9A\u6A21\u578B ID\u3002"
    },
    {
      name: "OPENAI_BASE_URL",
      label: "\u63A5\u53E3\u5730\u5740\u8986\u76D6",
      note: "\u53EF\u9009 HTTPS \u5730\u5740\u8986\u76D6\uFF0C\u9ED8\u8BA4 https://api.openai.com/v1\u3002"
    }
  ],
  seedance: [
    {
      name: "SEEDANCE_BASE_URL",
      label: "\u63A5\u53E3\u5730\u5740\u8986\u76D6",
      note: "\u53EF\u9009\uFF0C\u9ED8\u8BA4 https://ark.cn-beijing.volces.com/api/v3\u3002"
    }
  ],
  "minimax-h3": [
    {
      name: "MINIMAX_VIDEO_BASE_URL",
      label: "\u56FD\u5185/\u6D77\u5916\u7AD9\u5730\u5740",
      note: "\u9ED8\u8BA4\u6D77\u5916\u7AD9 https://api.minimax.io/v2\uFF1B\u56FD\u5185\u7AD9\u8D26\u53F7\u8BF7\u8BBE\u4E3A https://api.minimaxi.com/v2\u3002"
    }
  ],
  "minimax-music": [
    {
      name: "MINIMAX_MUSIC_MODEL",
      label: "\u9ED8\u8BA4\u97F3\u4E50\u6A21\u578B",
      note: "Drama 0.13.0 \u4E0D\u518D\u786C\u7F16\u7801\u6A21\u578B\u7248\u672C\uFF1B\u672A\u8BBE\u7F6E\u65F6\u987B\u5728\u4EFB\u52A1 parameters.model \u4E2D\u663E\u5F0F\u6307\u5B9A\u6A21\u578B ID\u3002"
    },
    {
      name: "MINIMAX_BASE_URL",
      label: "\u56FD\u5185/\u6D77\u5916\u7AD9\u5730\u5740",
      note: "\u9ED8\u8BA4\u6D77\u5916\u7AD9 https://api.minimax.io/v1\uFF1B\u56FD\u5185\u7AD9\u8D26\u53F7\u8BF7\u8BBE\u4E3A https://api.minimaxi.com/v1\u3002"
    }
  ],
  "minimax-speech": [
    {
      name: "MINIMAX_BASE_URL",
      label: "\u56FD\u5185/\u6D77\u5916\u7AD9\u5730\u5740",
      note: "\u9ED8\u8BA4\u6D77\u5916\u7AD9 https://api.minimax.io/v1\uFF1B\u56FD\u5185\u7AD9\u8D26\u53F7\u8BF7\u8BBE\u4E3A https://api.minimaxi.com/v1\u3002"
    }
  ]
};
var DRAMA_ADAPTER_CONFIG_ENV = "OH_STORY_DRAMA_ADAPTER_CONFIG";
var PROVIDER_SCRIPT = "short-drama-produce/scripts/provider_adapters.py";
var BUILTIN_PROVIDERS_REFERENCE = "short-drama-produce/references/builtin-providers.md";
var DRAMA_ADAPTERS = [
  {
    name: "openai-image",
    label: "OpenAI Image",
    modality: "image",
    requiredEnv: ["OPENAI_API_KEY"],
    optionalEnv: ["OPENAI_IMAGE_MODEL", "OPENAI_BASE_URL"],
    timeoutSeconds: 600,
    reference: BUILTIN_PROVIDERS_REFERENCE,
    referenceHeading: "OpenAI \u56FE\u7247\uFF08GPT Image\uFF09"
  },
  {
    name: "seedance",
    label: "Seedance",
    modality: "video",
    requiredEnv: ["ARK_API_KEY", "SEEDANCE_MODEL"],
    optionalEnv: [
      "SEEDANCE_BASE_URL",
      "SEEDANCE_POLL_INTERVAL",
      "SEEDANCE_TIMEOUT_SECONDS",
      "SEEDANCE_ALLOWED_RATIOS",
      "SEEDANCE_MIN_DURATION",
      "SEEDANCE_MAX_DURATION"
    ],
    timeoutSeconds: 3600,
    reference: BUILTIN_PROVIDERS_REFERENCE,
    referenceHeading: "Seedance"
  },
  {
    name: "minimax-h3",
    label: "MiniMax H3",
    modality: "video",
    requiredEnv: ["MINIMAX_API_KEY", "MINIMAX_VIDEO_MODEL"],
    optionalEnv: [
      "MINIMAX_VIDEO_BASE_URL",
      "MINIMAX_VIDEO_POLL_INTERVAL",
      "MINIMAX_VIDEO_TIMEOUT_SECONDS",
      "MINIMAX_VIDEO_ALLOWED_RESOLUTIONS",
      "MINIMAX_VIDEO_RESOLUTIONS",
      "MINIMAX_VIDEO_ALLOWED_RATIOS",
      "MINIMAX_VIDEO_RATIOS",
      "MINIMAX_VIDEO_MIN_DURATION",
      "MINIMAX_VIDEO_MAX_DURATION"
    ],
    timeoutSeconds: 3600,
    reference: BUILTIN_PROVIDERS_REFERENCE,
    referenceHeading: "MiniMax H3 \u89C6\u9891"
  },
  {
    name: "minimax-music",
    label: "MiniMax Music",
    modality: "music",
    requiredEnv: ["MINIMAX_API_KEY"],
    optionalEnv: ["MINIMAX_MUSIC_MODEL", "MINIMAX_BASE_URL"],
    timeoutSeconds: 600,
    reference: BUILTIN_PROVIDERS_REFERENCE,
    referenceHeading: "MiniMax \u97F3\u4E50"
  },
  {
    name: "minimax-speech",
    label: "MiniMax Speech",
    modality: "tts",
    requiredEnv: ["MINIMAX_API_KEY"],
    optionalEnv: ["MINIMAX_BASE_URL"],
    timeoutSeconds: 600,
    reference: BUILTIN_PROVIDERS_REFERENCE,
    referenceHeading: "MiniMax \u8BED\u97F3"
  }
];
var DRAMA_ADAPTER_ALIASES = {
  "gpt-image-2": "openai-image"
};
function generatedDirectory(temporaryRoot) {
  const uid = process.getuid?.();
  return join(temporaryRoot, uid === void 0 ? "oh-story-dsh" : `oh-story-dsh-${String(uid)}`);
}
function dramaAdapterConfigPath(skillRoot, env = process.env, temporaryRoot = tmpdir()) {
  const custom = env[DRAMA_ADAPTER_CONFIG_ENV] ?? "";
  if (custom !== "") return { path: resolve2(custom), generated: false };
  const key = createHash("sha256").update(resolve2(skillRoot)).digest("hex").slice(0, 12);
  return { path: join(generatedDirectory(temporaryRoot), `drama-adapters-${key}.json`), generated: true };
}
async function privateDirectory(path) {
  await mkdir(path, { recursive: true, mode: 448 });
  const info = await lstat(path);
  if (!info.isDirectory()) return false;
  const uid = process.getuid?.();
  return uid === void 0 || info.uid === uid;
}
function dramaAdapterConfigDocument(skillRoot, python = "python3") {
  const script = resolve2(skillRoot, PROVIDER_SCRIPT);
  const adapters = {};
  for (const adapter of DRAMA_ADAPTERS) {
    adapters[adapter.name] = { command: [python, script, adapter.name], timeout_seconds: adapter.timeoutSeconds };
  }
  for (const [alias, canonical] of Object.entries(DRAMA_ADAPTER_ALIASES)) {
    const target2 = DRAMA_ADAPTERS.find((adapter) => adapter.name === canonical);
    if (target2 !== void 0) {
      adapters[alias] = { command: [python, script, alias], timeout_seconds: target2.timeoutSeconds };
    }
  }
  return { adapters };
}
async function ensureDramaAdapterConfig(skillRoot, options = {}) {
  const location = dramaAdapterConfigPath(skillRoot, options.env ?? process.env, options.temporaryRoot ?? tmpdir());
  if (!location.generated) {
    return { ...location, ok: await access(location.path).then(() => true, () => false) };
  }
  try {
    if (!await privateDirectory(dirname2(location.path))) return { ...location, ok: false };
    const existing = await lstat(location.path).catch(() => void 0);
    if (existing !== void 0 && !existing.isFile()) return { ...location, ok: false };
    const staging = `${location.path}.${String(process.pid)}.tmp`;
    await writeFile(staging, `${JSON.stringify(dramaAdapterConfigDocument(skillRoot, options.python ?? "python3"), null, 2)}
`, { encoding: "utf8", mode: 384 });
    await rename(staging, location.path);
    return { ...location, ok: true };
  } catch {
    return { ...location, ok: false };
  }
}
function dramaAdapterStatuses(env = process.env) {
  return DRAMA_ADAPTERS.map((adapter) => {
    const missing = adapter.requiredEnv.filter((name2) => (env[name2] ?? "") === "");
    const descriptors = ADAPTER_OPTIONAL_ENV_NOTES[adapter.name];
    const optionalEnv = descriptors?.map((item) => ({
      name: item.name,
      label: item.label,
      configured: (env[item.name] ?? "") !== "",
      note: item.note
    }));
    return {
      name: adapter.name,
      label: adapter.label,
      modality: adapter.modality,
      configured: missing.length === 0,
      missing,
      ...optionalEnv === void 0 ? {} : { optionalEnv }
    };
  });
}
function dramaAdapterSummary() {
  return DRAMA_ADAPTERS.map((adapter) => `${adapter.name} (${adapter.modality}: ${adapter.requiredEnv.join(" + ")})`).join(", ");
}

// src/skill-provider.ts
import {
  BUNDLED_SKILL_RANK
} from "@deepseek-ai/dsh-skill";
var STORY_PROVIDER_NAME = "oh-story";
var DRAMA_PROVIDER_NAME = "short-drama";
var GAME_PROVIDER_NAME = "novel-to-game";
var VIDEO_PROVIDER_NAME = "video-recap";
var DSH_SKILL_BRIDGE = [
  "<oh-story-dsh-integration>",
  "This Skill is a native contribution to the current DeepSeek Harness session.",
  "DSH owns the workspace, model, preset, permissions, Session Log, tools, subagents, cancellation, resume, and Agent UI.",
  "Never start another Agent runtime, session transport, Dashboard, SSE stream, polling loop, or model configuration.",
  "All seven upstream Oh Story specialist Roles are bundled. Invoke one with oh_story_role and a self-contained prompt.",
  "Never inspect .claude/agents, .codex/agents, .opencode/agents, .agents/agents, .zcode, or .story-deployed to decide whether a Role is available.",
  "Oh Story Roles are reached only through oh_story_role. Never start one through a generic subagent or Task tool \u2014 not DSH's subagent or subagent_fork tools, not invoke_subagent, and not an Agent tool \u2014 and never pass a Role name as subagent_type, agent_type, agent, or TypeName, even where the upstream text below describes that for another host.",
  "Use only DSH-visible tools. DSH sandbox and permission policy remain authoritative.",
  // Upstream deploys these 「与作者协作」 rules only in its CLAUDE.md/AGENTS.md
  // templates, which DSH does not install.
  "Working with the author: reply in the language the author writes in, and keep progress updates in that language while you wait for oh_story_role or any other background helper to return; reply and report in the author's writing terms (book, chapter, outline, settings), never in script, field, or state names; attach a raw error only when something failed. A template block marked <!-- author-report --> is only a format reference: output its text directly, without that marker and without a code fence.",
  "Manage a writing habit or preference only through story-long-write or story-short-write and that writing Skill's references/author-memory.md and scripts/author_memory_commit.js; never keep it in a host or DSH memory. The story entry only routes memory requests. story-deslop and story-review consume only preferences already supplied by their caller and never query or record author memory themselves. Simply follow a one-off request without recording it.",
  "Never edit the bundled Skill files (SKILL.md, references/, scripts/). When a Skill script fails, stop and show the author the command you ran and its error instead of patching or working around it.",
  "</oh-story-dsh-integration>"
].join("\n");
var DSH_ANALYSIS_BATCHES = [
  "Stage 2 batches in DSH: dispatch each planned batch with oh_story_role, role chapter-extractor, and a self-contained prompt that copies this batch's plan fields verbatim, prefixing paths with {\u62C6\u6587\u76EE\u5F55}/: batch_id, input_kind, source_files (per-chapter source_locator for a raw batch), chapter_chars, min_plot_points, the output file {\u62C6\u6587\u76EE\u5F55}/_analysis_cache/\u8F93\u5165-{\u6279\u6B21ID}.md, and the plan's handoff_cache when it is not empty.",
  "The extractor reads the source itself, writes or edits only that batch input file (DSH denies any other write or edit by a chapter-extractor child), and replies with one receipt line; do not read the file yourself.",
  "Commit it with manage_analysis_run.js commit, one commit at a time in this session. When a commit is rejected, dispatch the same batch to a chapter-extractor again with every field above plus the error code, and have it fix only the broken spots with edit (rewriting the whole file only when its structure is broken), then commit again.",
  "Run manage_analysis_run.js and the other bundled Node.js scripts through the current DSH execution world with Node.js 18+ (Python 3 is only needed for the optional render_relation_chart.py). If node is unavailable, stop and tell the author in plain words that this step needs Node.js 18+ on the machine running DSH; never simulate a script's output or hand-write the files it owns.",
  "Keep concurrent oh_story_role calls modest. The default is upstream's \u6709\u9650\u5E76\u884C tier: three batches per round, issued together, the next round only after all three are committed; an unasked, full, multi-book, or import run uses it. DSH runs calls from one step in parallel only up to the host's own limit and may run them one after another, so never promise more. Use \u4E32\u884C or \u4E0D\u9650\u6279\u6B21\u987A\u5E8F only when the author chooses it, and under \u4E0D\u9650\u6279\u6B21\u987A\u5E8F halve the count on any rate limit, timeout, or child error."
].join(" ");
var DSH_AUTHOR_MEMORY_WORKSPACE = "For author memory in DSH's usual single-book layout, where \u6B63\u6587/ and \u8BBE\u5B9A/ sit directly in the workspace root, pass that same root as both --workspace and --book-root; the book store lives at .story/\u4F5C\u8005\u8BB0\u5FC6/\u4E66\u7EA7/. For a book in a subdirectory, --book-root names that book's directory. Keep --workspace explicit, pass --book-root on every command for a book, and include --kind on queries. This writing Skill's references/author-memory.md also covers organizing memories and migrating old \u672C\u4E66\uFF1A entries.";
var DSH_SKILL_OVERRIDES = {
  story: "The \u5C0F\u8BF4 workspace is an official DSH conversation view. Never start or open a second web application.",
  "story-setup": "Initialize or validate novel project data only. DSH already supplies Skills, Roles, hooks, tools, permissions, sessions, and UI; never deploy Claude/OpenCode/Codex/Antigravity/ZCode/OpenClaw/Reasonix files or a .story-deployed marker.",
  "story-long-analyze": `Use oh_story_role for chapter extraction or specialist analysis. Never inspect platform agent directories or require a deployed external Agent definition. ${DSH_ANALYSIS_BATCHES}`,
  "story-long-write": `All named Roles are provided through oh_story_role. Do not check platform agent files. Keep the upstream writing, Tracking, lint, outline, revision, and quality workflows. Create and assemble \u6B63\u6587/ chapter files only with the write and edit tools, never through shell redirection, cp, mv, tee, or a script, so that DSH's outline guard, its Tracking reminder, and the \u5C0F\u8BF4 view observe the write; upstream's own in-place chapter fixes such as storyctl.js chapter check --fix-punctuation stay as upstream describes. ${DSH_AUTHOR_MEMORY_WORKSPACE}`,
  "story-review": "All named reviewer Roles are provided through oh_story_role. Do not check platform agent files; full/lean review may use the bundled Roles directly. When a review falls back to solo in DSH, the reason is that oh_story_role or DSH's spawn runtime is unavailable in this Session (Fallback agent tool unavailable -> solo) or a Role run failed (Fallback spawn failed -> solo); say that in one plain sentence. Never tell the author that the reviewers are not installed, missing, or outdated, and never tell them to run /story-setup.",
  "story-import": `All named Roles are provided through oh_story_role. Do not require story-setup to deploy them, never inspect platform agent directories or .story-deployed, and never offer the author Step 4's choice to install a writing environment with /story-setup: in DSH record \u5199\u4F5C\u73AF\u5883 in .story/work/\u5BFC\u5165\u8BB0\u5F55.md as installed, with the analysis helper and story-architect both available. Phase 2 runs the story-long-analyze pipeline the DSH way below; an import counts as automatic continuation, so it uses the limited-parallel tier without asking. ${DSH_ANALYSIS_BATCHES} Run the scripts this Skill needs (build_outline_brief.js, outline_view.js --check --strict, tracking_commit.js init and check, check-outline-contract.js with Node) the same way. Keep upstream's order: in the long-form structure migration (references/structure-mapping-long.md) Step 2 copies the manuscript into \u6B63\u6587/, Step 10 reverse-builds the \u7EC6\u7EB2 in batches, and Phase 4 initialises Tracking. After the import, tell the author to continue a long book with /story-long-write \u5199\u7B2CN\u7AE0 (N is the next chapter after the imported ones) and a short story with /story-short-write by asking it to \u8865\u5B8C\u6784\u601D. DSH's prose guard mirrors the outline gate of upstream proseBlockReason for books with \u5927\u7EB2/ or \u8FFD\u8E2A/, so open an import window before Step 2 copies any chapter: create .story/work/\u5BFC\u5165\u4E2D.md in the book directory (the workspace root in DSH's usual single-book layout) with one line naming the book being imported, and delete it right after Phase 4's tracking_commit.js init and check both succeed. The window only holds while \u8FFD\u8E2A/_tracking-state.json is absent. \u5BFC\u5165\u4E2D.md is DSH's own marker; keep upstream's \u5BFC\u5165\u8BB0\u5F55.md exactly as the Skill describes.`,
  "story-deslop": "Use the bundled narrative-writer Role through oh_story_role when specialist review is useful. Never inspect platform agent directories.",
  "story-short-analyze": "Use oh_story_role for specialist analysis. Never inspect platform agent directories or require external Agent deployment.",
  "story-short-write": `All named Roles are provided through oh_story_role. Do not inspect platform agent files; preserve the upstream short-fiction workflow and quality gates. ${DSH_AUTHOR_MEMORY_WORKSPACE}`,
  "story-cover": "Use only image-generation or HTTP capabilities visible in the current DSH preset. Never assume a separate Codex or Claude runtime. When no such capability is visible, offer the upstream prompt-only mode instead of a paid API.",
  "story-publish": "Prepare the listing file only. Never sign in to, fill in, or submit anything on a platform's author backend, even when a browser tool is visible in the current DSH preset; hand the author the saved \u53D1\u5E03\u8D44\u6599 file instead."
};
var DSH_DRAMA_BRIDGE = [
  "<short-drama-dsh-integration>",
  "This Skill is a native contribution to the current DeepSeek Harness session.",
  "DSH owns the workspace, model, preset, permissions, Session Log, tools, approvals, cancellation, resume, and Agent UI.",
  "The \u77ED\u5267 tab is the creator workspace. Never start dashboard_server.py, another web server, Dashboard, Agent runtime, session transport, or model configuration.",
  "Drama Skills uses a creator-first contract: each episode keeps only the requested documents, up to five creator-facing sources at \u5267\u96C6/<EP>/\u5267\u672C.md, \u89C6\u89C9\u8BBE\u5B9A.md, \u5206\u955C.md, \u56FE\u7247\u63D0\u793A\u8BCD.md, and \u89C6\u9891\u63D0\u793A\u8BCD.md. Never precreate empty documents, backfill nominal stages, or start work the creator did not request. Persisted reviews use creator-readable Markdown under \u5BA1\u67E5/; an oral review writes nothing.",
  "\u5267\u96C6/<EP>/\u526A\u8F91\u5355.md is the v0.7 assembly record, not a sixth creative truth: the five creator documents stay the creative truth. It is written after readable media exists and records what reaches the cut \u2014 which footage or accepted static keyframes are kept or left unused and why, each cut's in/out timing, its subtitles, \u753B\u9762\u6587\u5B57 overlays, \u97F3\u6548 cues, \u914D\u97F3 and \u73AF\u5883\u58F0, post-processing such as shot-match correction or an external mix, and the delivery spec including optional \u9897\u7C92 grain and \u63A5\u955C\u5339\u914D. It never changes a line, a shot's job, or a declared duration; changing any of those means returning to the document that owns it.",
  "For a v0.6 project, never create a parallel JSON/JSONL lifecycle truth, indexes, fingerprints, coverage tables, or QA records; Drama 0.9.1 no longer bundles the legacy JSON checkers, and creator_markdown_check.py is the structural check.",
  "Never upgrade a v0.5 structured project in place or mix both contracts in one project root. Keep legacy production/audit artifacts read-only and pinned to v0.5; migrate only into a new creator-first root with manual per-episode creator confirmation.",
  "Use only tools visible in the current DSH preset and preserve the upstream project ownership, freshness, review, and explicit production-confirmation contracts.",
  "Use oh_story_production only for semantic production-view intents (open/focus, explicit shot order, or tracking a job that this Agent is actually executing). Cosmetic canvas layout remains creator-controlled. The tool changes only the Session projection: it does not edit creator documents, generate media, or authorize production.",
  "Production credentials remain outside project files. Never treat a prior acceptance, preview, continuation request, or budget discussion as confirmation for a paid production run.",
  "</short-drama-dsh-integration>"
].join("\n");
var DSH_DRAMA_OVERRIDES = {
  "short-drama": "A dashboard request means focus or use the native \u77ED\u5267 tab in this DSH Session: upstream's dashboard_server.py and its assets are not bundled, so never try to run them, even where the Skill says to. New projects follow only the v0.6 creator-first contract and create only documents required by the current request.",
  "short-drama-produce": (skillRoot) => `Use an upstream adapter only after the creator explicitly confirms the exact current job. Its source must be the current creator-first Markdown and its output belongs under \u5267\u96C6/<EP>/\u5236\u4F5C\u6210\u679C/. DSH permissions and approval UI remain authoritative. When oh_story_production is visible, register a previewed image or video job with track_job after the confirmation is valid and before run \u2014 never at prepare time \u2014 passing the same job ID, target, modality and count the creator just approved. track_job's jobKind is image, video or composition (the assembled cut), so from this Skill it registers image and video jobs only: speech (tts) and music jobs pass through the same prepare \u2192 explicit creator confirmation \u2192 run gate but are never registered with track_job or relabelled as another kind, and their audio results stay under \u5267\u96C6/<EP>/\u5236\u4F5C\u6210\u679C/. Optional voice references belong on the MOTION entry's separate \u53C2\u8003\u97F3\u9891 line, never in \u8F93\u5165\u53C2\u8003\u56FE or the workbench image picker. Compile them as reference_audio bindings, preserve character exactly from \u89D2\u8272, and match the project-local audio path to that character's single \u58F0\u97F3\u53C2\u8003 in \u89C6\u89C9\u8BBE\u5B9A.md. \u63A7\u5236 and \u4E0D\u5F97\u63A7\u5236 must both be non-empty and non-overlapping (keep sample emotion, line delivery, and room reverb in \u4E0D\u5F97\u63A7\u5236). The bundled seedance and minimax-h3 profiles accept reference_audio by default when the configured model supports it; a custom external adapter in ${DRAMA_ADAPTER_CONFIG_ENV} must explicitly declare reference_audio in reference_roles, and any unsupported role must reject before paid submission, never drop or substitute the binding. DeepSeek generates no media: every image, video, speech, or music result comes from a provider adapter. The bundled adapters are ${dramaAdapterSummary()}; they are registered for this DSH host in ${dramaAdapterConfigPath(skillRoot).path} \u2014 pass that file as --adapter-config unless the creator names another config (${DRAMA_ADAPTER_CONFIG_ENV}). Credentials are read only from the DSH host process environment. Before preparing a paid job, name the adapter that will run it; if its variables are missing, tell the creator exactly which ones to export before starting DSH instead of failing inside run. Never read, print, or write credential values. A submitted video job is already billed, so an interrupted run is recovered, not resubmitted: when audit reports orphaned_provider_job, recover it with collect, passing --job-id \u2014 the drama job the finding names, not its provider_job_id, which collect reads from the run handle itself. collect spends nothing and does not need the confirmation gate \u2014 the gate exists to stop unintended spending \u2014 but re-running the same job does, and would charge the creator twice.`,
  "short-drama-edit": [
    "Assembly runs inside this DSH Session. Write \u5267\u96C6/<EP>/\u526A\u8F91\u5355.md first, then run edit_tool.py check and render through the current DSH execution world; the rendered cut belongs under \u5267\u96C6/<EP>/\u5236\u4F5C\u6210\u679C/\u6210\u7247/ and the \u77ED\u5267 tab shows it there. ffmpeg and ffprobe come from the DSH host \u2014 when one is missing, say so instead of approximating or reporting an untested measurement as a pass.",
    // edit_tool.py 0.12.0 `_parse_excused_item`: `- 未采用镜头：` is read before the first `## CUT-`, split on `；`, and each item matches `(MOTION|GROUP|SHOT|IMG)-…（理由：<non-empty>）`.
    "Video cuts use existing MOTION or GROUP IDs; static-frame cuts use SHOT IDs from \u5206\u955C.md or IMG IDs from \u56FE\u7247\u63D0\u793A\u8BCD.md and accepted png/jpg/jpeg/webp files. On full-episode delivery (without --partial), every unused MOTION/GROUP and, when static cuts exist, every storyboard SHOT must be accounted for before the first `## CUT-` on one line: `- \u672A\u91C7\u7528\u955C\u5934\uFF1AMOTION-\u2026\uFF08\u7406\u7531\uFF1A\u2026\uFF09\uFF1BGROUP-\u2026\uFF08\u7406\u7531\uFF1A\u2026\uFF09\uFF1BSHOT-\u2026\uFF08\u7406\u7531\uFF1A\u2026\uFF09`. Join items with a full-width `\uFF1B`; reasons name \u6587\u4EF6\u7F3A\u5931, \u8D28\u91CF\u4E0D\u53EF\u7528 or \u53D9\u4E8B\u53D6\u820D. A static CUT starts at 0.00, has a two-frame floor (0.08s at 24fps; shorter than 0.50s raises a check reminder), requires the delivery width/height/frame rate, and may use \u8FD0\u955C. Reusing overlapping source video ranges requires an explicit `- \u91CD\u653E\uFF1A<\u53D9\u4E8B\u7406\u7531>` line in that CUT. The native production sequence accepts video and accepted keyframe images, keeps storyboard order and source identity, and dispatches /short-drama-edit in Chat; never relabel images as video or generate paid video unnecessarily.",
    "Same-aspect-ratio video clips whose resolution or frame rate differs from the delivery spec raise a check reminder and are automatically scaled and frame-rate-converted by render. Static cuts are rendered to the delivery specification with the declared crop/motion. When check blocks on a mismatched aspect ratio (such as landscape mixed into vertical), normalise the odd clips to the delivery spec with ffmpeg in the DSH execution world, under approval, preserving the composition. Write them under \u5267\u96C6/<EP>/\u5236\u4F5C\u6210\u679C/\u6210\u7247/\u89C4\u683C\u7EDF\u4E00/, an edit-owned intermediate, never beside the produce-stage originals and never over produced footage, and name them without the original's job-id token (the MOTION or GROUP ID will do). Record the crop or pad in that CUT's block (not in its \u753B\u9762 line, which accepts only \u4EAE\u5EA6/\u9971\u548C/\u8272\u6E29), point \u6765\u6E90 at the new file, update \u5165\u70B9/\u51FA\u70B9 if the conversion moved them, and rerun check.",
    "The default burned-subtitle route and the ffmpeg fallback for plain \u5B57\u5361 overlays need an ffmpeg built with libass; when the host's ffmpeg lacks it, say so instead of silently dropping subtitles. Remotion renders every frame through a headless browser from a Node workspace outside the project, ~/.cache/short-drama-edit/remotion, which edit_tool.py rewrites on each run: the optional Remotion subtitle route and complex \u753B\u9762\u6587\u5B57 panels (\u5361\u7247/\u7CFB\u7EDF\u9762\u677F/\u4EFB\u52A1\u9762\u677F/\u89D2\u6807) use it unless skipped with --screen-text-mode off or routed to --overlay-renderer; plain \u5B57\u5361 falls back to ffmpeg ASS under --screen-text-mode auto when Node/Remotion is unavailable. Install Remotion (npm install in that workspace; an install from before Drama Skills 0.8 must run npm install again) only after the creator approves, through DSH approval. Without that approval, stick to plain \u5B57\u5361 (with libass), use --screen-text-mode off, or leave complex panels unwritten and tell the creator. Never treat Remotion as a second Agent runtime, dashboard, or session transport.",
    "The \u58F0\u97F3 line in \u526A\u8F91\u5355.md is a record, not an instruction the built-in render executes. render trims, scales/converts same-aspect-ratio clips to the delivery spec, auto-matches adjacent cuts within one scene (a CUT's \u753B\u9762 correction replaces it, `- \u753B\u9762\uFF1A\u4E0D\u6821` skips it, and `- \u63A5\u955C\u5339\u914D\uFF1A\u65E0` in the delivery spec turns it off), hard-joins, mixes in the `\u97F3\u6548` lines, cross-cut `\u914D\u97F3` and looping `\u73AF\u5883\u58F0`, burns subtitles and \u753B\u9762\u6587\u5B57, applies optional \u9897\u7C92, and normalises loudness. A mix beyond the declared \u97F3\u6548/\u914D\u97F3/\u73AF\u5883\u58F0 lines, crossfade, transition or format conversion is an external ffmpeg step, run under approval, that writes a temporary file, ends as render does with whole-film two-pass loudnorm to the declared \u4EA4\u4ED8\u54CD\u5EA6 (I=<\u4EA4\u4ED8\u54CD\u5EA6>:TP=<\u771F\u5CF0\u503C\u4E0A\u9650\uFF0C\u9ED8\u8BA4 -1.5>:LRA=11, the second pass fed the first pass's measurements with linear=true, audio re-encoded as AAC 192k at 48 kHz), and only then replaces \u5267\u96C6/<EP>/\u5236\u4F5C\u6210\u679C/\u6210\u7247/\u6210\u7247.mp4; record its command in \u526A\u8F91\u5355.md and repeat it after any re-render, which overwrites that file. Run edit_tool.py verify last, on that delivered file, and report every \u672A\u6D4B item as untested, never as passed.",
    "This stage never generates footage and never edits \u5267\u672C.md, \u5206\u955C.md, or \u89C6\u9891\u63D0\u793A\u8BCD.md \u2014 route those back to their owning Skill."
  ].join(" "),
  "short-drama-breakdown": [
    "Measure only videos, subtitles or transcripts the creator placed in this project or named in this Session; never search for or download a benchmark through a browser or web tool unless the creator asks for it and confirms the source.",
    "Run breakdown_tool.py through the current DSH execution world. ffmpeg and ffprobe come from the DSH host \u2014 when one is missing, say so instead of estimating cuts or durations by eye.",
    "Register the permitted use and external model upload permission before measurement. Without recorded upload permission, use local measurement only. For reconstruction, use a tool visible in the current DSH preset that can read both video and audio. If no such tool is available, deliver only the local measurements you can verify.",
    "Keep reconstruction under \u8F93\u5165/\u5BF9\u6807/<REF-ID>/\u8FD8\u539F/. It can be copied out as a separate project only when registered as owned or licensed with a recorded basis. To use the \u77ED\u5267 canvas or production view for an owned or licensed reconstruction, open its project root as a separate DSH workspace. Keep it separate from the active project's episodes."
  ].join(" "),
  "short-drama-assets": "Keep one stable `- ID\uFF1AVISUAL-*` line on every \u4EBA\u7269/\u9020\u578B/\u5730\u70B9/\u9053\u5177/\u72B6\u6001 entry in \u89C6\u89C9\u8BBE\u5B9A.md, and never change an existing ID when editing its heading or text. The \u751F\u4EA7 view identifies canvas nodes by that ID; entries without one still render, but the workbench reports their node identity as unstable."
};
var DSH_GAME_BRIDGE = [
  "<novel-to-game-dsh-integration>",
  "This Skill is a native contribution to the current DeepSeek Harness session.",
  "DSH owns the workspace, model, preset, permissions, Session Log, tools, approvals, cancellation, resume, Todo, and Chat UI.",
  "The \u6E38\u620F tab is the playable Game Studio. Never start a second Agent runtime, dashboard, session transport, or model configuration.",
  "Keep the complete upstream five-Skill pipeline (novel-to-game, novel-game-analyze, game-design, game-build, game-qa) and write adaptation artifacts under game-adaptations/<project>/ exactly as the upstream contracts specify.",
  "For a web target, keep the authoritative playable entry at build/app/index.html so Game Studio can preview it. Do not silently replace a requested non-web runtime with a web build.",
  "The first time build/app/index.html becomes playable, tell the user in one sentence that they can already play it in the \u6E38\u620F tab and what work remains, then continue; keep the Todo list in step with the pipeline stage.",
  "Use only DSH-visible tools and approvals. qa/verification.json remains the sole machine QA truth and must cover launch, render, input, coreLoop, outcome, and restart with real execution evidence.",
  // NovelToGame 0.9.0: game-build starts with a graybox playable slice and game-qa Round 1 runs a cold-start blind playtest in a fresh session.
  "When game-build's graybox playtest or game-qa's first-round blind playtest calls for a fresh agent or session that has not read the design documents or source, run it as a DSH subagent visible in this preset, giving it only the playable entry, the run instructions game-qa allows, and normal player input; in director mode, ask the user in this Session first whether a real target player can try it.",
  "</novel-to-game-dsh-integration>"
].join("\n");
var DSH_VIDEO_BRIDGE = [
  "<video-recap-dsh-integration>",
  "This Skill is a native contribution to the current DeepSeek Harness session.",
  "DSH owns the workspace, model, preset, permissions, Session Log, tools, approvals, cancellation, resume, Todo, Chat, and the \u89C6\u9891 preview Studio.",
  "Never start a second Agent runtime, dashboard, session transport, web server, polling loop, or model configuration.",
  "A dashboard request means the native \u89C6\u9891 tab in this DSH Session: upstream's dashboard.py and assets/dashboard.html are not bundled, so never try to run them, even where the Skill says to. To inspect a resource library, use the read-only scripts/library.py commands.",
  "Keep upstream's single self-contained video-recap Skill (six stateless atomic CLIs: probe.py, frames.py, transcribe.py, tts.py, render.py, check.py plus on-demand packaging.py, export_jianying.py, and library.py) and the on-demand video-reference Skill (analyze_reference.py); video-reference extracts reusable production references only when requested and never enters the default production path. Put each project under video-recaps/<project>/, keep source media under sources/, and use work/ as the upstream work_dir (holding BRIEF.md, MEDIA_NOTES.md, EDIT_PLAN.md, PROMO.md, timeline.json, check.json, media/, and out/) so the Studio can discover authoritative creative docs, manifests, and outputs.",
  "Video Recap 0.8.0 is local-first and centers on timeline.json v3 and check.json v1: only 100% deterministic physical damage fails check.py (ok: false); black/freeze/silence/audio-edge/overlap findings are soft warnings aggregated in review_hints[] for Agent review, and render.py warns on timing overlaps unless --strict is passed. Never fabricate measurements, speed up TTS audio to fit a window, or silently drop subtitles; confirm target aspect ratio and framing (fit: contain|cover) with the user before planning or rendering. Delivery targets -14 LUFS / -1.5 dBTP with two-pass linear loudnorm.",
  "The Video Studio is a preview and artifact surface, not a nonlinear editor. Do not invent a second project-state format, timeline truth, or render queue; BRIEF.md, MEDIA_NOTES.md, EDIT_PLAN.md, PROMO.md, timeline.json, check.json, and the upstream artifacts remain authoritative.",
  "Core tools (probe.py, frames.py, render.py, check.py, export_jianying.py, library.py) never access the network. Remote ASR (ASR_API_URL / ASR_API_KEY) and cloud TTS (FISH_API_KEY / FISH_AUDIO_API_KEY, OPENAI_API_KEY, INDEX_TTS_ENDPOINT) run only when explicitly configured or selected; pass --engine local or --provider srt/embedded/whisper to stay strictly offline. Ask the user for explicit voice-owner consent before cloning a voice and record it in timeline.json meta.voice.consent.",
  "ASR_API_KEY, FISH_API_KEY, FISH_AUDIO_API_KEY, OPENAI_API_KEY, and voice credentials stay in the host environment. Never write secrets into project files, tool arguments shown to the browser, or chat output.",
  "Use only DSH-visible tools and approvals. Run Python 3.10+ and ffmpeg/ffprobe through the current DSH execution world, preserve cancellation, and do not install or upgrade system dependencies without explicit user approval.",
  "When a new edited or final video is ready, tell the user that Video Studio can load it; never interrupt playback by replacing the currently loaded video silently.",
  "</video-recap-dsh-integration>"
].join("\n");
var DSH_NATIVE_SKILLS = {
  story: `# story \u2014 DSH \u5C0F\u8BF4\u6D41\u7A0B\u5165\u53E3

\u5728\u5F53\u524D DSH Session \u5185\u5224\u65AD\u7528\u6237\u610F\u56FE\uFF0C\u5E76\u52A0\u8F7D\u6700\u5339\u914D\u7684 Oh Story Skill\uFF1A

- \u65B0\u5EFA\u6216\u4FEE\u590D\u5C0F\u8BF4\u5DE5\u7A0B\uFF1Astory-setup
- \u957F\u7BC7\u89C4\u5212\u4E0E\u5199\u4F5C\uFF08\u8BA8\u8BBA\u957F\u7BC7\u7ED3\u6784\u3001\u89C4\u5212\u5267\u60C5\u3001\u5F00\u4E66\u3001\u5199\u5927\u7EB2\u3001\u8865\u7EC6\u7EB2\u3001\u5199\u6B63\u6587\u3001\u65E5\u66F4\uFF09\uFF1A
  story-long-write\u3002\u53EA\u8981\u7ED3\u6784\u3001\u5927\u7EB2\u3001\u5377\u7EB2\u6216\u7EC6\u7EB2\u65F6\u53EA\u4EA4\u4ED8\u6240\u8BF7\u6C42\u7684\u89C4\u5212\uFF0C\u4E0D\u5199\u6B63\u6587\uFF1B
  \u7528\u6237\u660E\u786E\u8981\u6C42\u5199\u6B63\u6587\u624D\u8FDB\u5165\u6B63\u6587\u6D41\u7A0B
- \u957F\u7BC7\u9009\u9898/\u626B\u699C\uFF1Astory-long-scan\uFF1B\u957F\u7BC7\u62C6\u6587\uFF1Astory-long-analyze\u3002\u53EA\u8BF4\u300C\u9009\u9898\u300D\u300C\u770B\u770B\u5199\u4EC0\u4E48\u300D
  \u53C8\u6CA1\u8BF4\u7BC7\u5E45\u65F6\uFF0C\u5148\u95EE\u4E00\u53E5\u957F\u7BC7\u8FD8\u662F\u77ED\u7BC7
- \u77ED\u7BC7\u9009\u9898/\u62C6\u6587/\u5199\u4F5C\uFF1Astory-short-scan\u3001story-short-analyze\u3001story-short-write
- \u5BFC\u5165\u5DF2\u6709\u4F5C\u54C1\uFF1Astory-import\u3002\u5BFC\u5B8C\u957F\u7BC7\u8BF4 /story-long-write \u5199\u7B2CN\u7AE0\uFF08N \u662F\u5BFC\u5165\u540E\u7684\u4E0B\u4E00\u7AE0\uFF09
  \u7EED\u5199\uFF1B\u5BFC\u5B8C\u77ED\u7BC7\u7528 /story-short-write \u8865\u5B8C\u6784\u601D
- \u5BA1\u7A3F\u4E0E\u53BB AI \u5473\uFF1Astory-review\u3001story-deslop
- \u5C01\u9762\uFF1Astory-cover\uFF08\u53EA\u8981\u5C01\u9762\u63D0\u793A\u8BCD\u3001\u4E0D\u751F\u56FE\u65F6\u4E5F\u8D70\u5B83\uFF09
- \u6D4F\u89C8\u5668\u64CD\u4F5C\uFF1A\u76F4\u63A5\u4F7F\u7528\u5B98\u65B9 ego-browser Skill\uFF0C\u6267\u884C ego-browser skill \u5E76\u6309\u5F53\u524D\u6307\u5357\u64CD\u4F5C
- \u6574\u7406\u5E73\u53F0\u5EFA\u4E66\u8D44\u6599\uFF08\u53D1\u5E03\u8D44\u6599\u3001\u5EFA\u4E66\u8868\u5355\u3001\u5E73\u53F0\u4E66\u540D/\u7B80\u4ECB/\u6807\u7B7E\uFF09\uFF1Astory-publish\uFF1B\u53EA\u8BF4\u300C\u5F00\u4E66\u300D
  \u7167\u5E38\u8FDB story-long-write
- \u67E5\u672C\u4E66\u7684\u89D2\u8272\u3001\u4F0F\u7B14\u3001\u8FDB\u5EA6\u6216\u8BBE\u5B9A\uFF1A\u7528 oh_story_role \u8C03\u7528 story-explorer\uFF1B\u67E5\u5916\u90E8\u8D44\u6599\uFF1A
  story-researcher\u3002\u52A9\u624B\u8FD4\u56DE\u7684\u82F1\u6587\u5B57\u6BB5\u548C\u7F3A\u53E3\u8BF4\u660E\u7531\u4F60\u7FFB\u6210\u767D\u8BDD\u518D\u8BF4\uFF1B\u56DE\u7B54\u8BB2\u6545\u4E8B\u91CC\u7684\u4E8B\uFF0C
  \u7F16\u53F7\u53EA\u8DDF\u7740\u6545\u4E8B\u63CF\u8FF0\u51FA\u73B0
- \u7BA1\u7406\u4F5C\u8005\u4E60\u60EF\uFF08\u8BB0\u4F4F/\u67E5\u770B/\u786E\u8BA4/\u66FF\u6362/\u5FD8\u6389\u5199\u4F5C\u504F\u597D\uFF09\uFF1A\u6309\u4F5C\u8005\u6307\u5B9A\u7684\u957F\u7BC7/\u77ED\u7BC7\u7C7B\u578B\uFF0C
  \u52A0\u8F7D story-long-write \u6216 story-short-write\uFF0C\u7531\u5BF9\u5E94\u5199\u4F5C skill \u7BA1\u7406\uFF1B\u672A\u6307\u5B9A\u65F6\u6309\u4E0B\u65B9
  \u300C\u5F53\u524D\u4E66\u300D\u7684\u7BC7\u5E45\u9009\u62E9\u3002\u65E0\u5F53\u524D\u4E66\u7684
  \u901A\u7528\u4E60\u60EF\u9ED8\u8BA4\u4EA4 story-long-write\uFF1B\u53EA\u9650\u5B9A\u672C\u4E66\u5374\u65E0\u6CD5\u5B9A\u4F4D\u65F6\u95EE\u54EA\u672C\u4E66\uFF0C\u4E0D\u8981\u6C42\u5148\u5EFA\u4E66\u3002
  \u8DEF\u7531\u5C42\u4E0D\u8BFB\u5199\u4F5C\u8005\u8BB0\u5FC6\u6587\u4EF6\u3002\u4EC5\u7BA1\u7406\u4E60\u60EF\u65F6\u5B8C\u6210\u5373\u505C\uFF0C\u4E0D\u5EFA\u4E66\u3001\u4E0D\u5199\u6B63\u6587\u3002

\u5F53\u524D\u4E66\uFF1A\u9879\u76EE\u6839\u6709 .active-book \u4E14\u6307\u5411\u9879\u76EE\u5185\u5B58\u5728\u7684\u76EE\u5F55\u5C31\u662F\u5B83\uFF08DSH \u5E38\u89C1\u7684\u5355\u4E66\u5E03\u5C40\u91CC\uFF0C
\u5DE5\u4F5C\u533A\u6839\u672C\u8EAB\u5C31\u662F\u4E66\u76EE\u5F55\uFF09\uFF1B\u5426\u5219\u4ECE\u5DE5\u4F5C\u533A\u6839\u5F80\u4E0B\u6700\u591A 4 \u5C42\u627E\uFF0C\u8DF3\u8FC7\u4EE5 . \u5F00\u5934\u7684\u76EE\u5F55\u3001
node_modules\u3001\u62C6\u6587\u5E93/\u3001\u5BF9\u6807/\uFF0C\u542B \u8FFD\u8E2A/\u3001\u6B63\u6587/ \u5B50\u76EE\u5F55\u6216 \u6B63\u6587.md \u6587\u4EF6\u3001\u542B
\u8BBE\u5B9A/\u9898\u6750\u5B9A\u4F4D.md\u3001\u6216\u540C\u65F6\u6709 \u8BBE\u5B9A.md \u4E0E \u5C0F\u8282\u5927\u7EB2.md \u7684\u76EE\u5F55\u90FD\u7B97\u4E66\u3002\u627E\u5230\u591A\u672C\u53C8\u6CA1\u6709
.active-book \u65F6\u95EE\u4F5C\u8005\u662F\u54EA\u672C\uFF0C\u9009\u5B9A\u540E\u628A\u76F8\u5BF9\u8DEF\u5F84\u5199\u8FDB\u9879\u76EE\u6839 .active-book\u3002\u7BC7\u5E45\uFF1A\u6709 \u6B63\u6587/
\u6216 \u8BBE\u5B9A/ \u5B50\u76EE\u5F55\u7684\u662F\u957F\u7BC7\uFF0C\u6709 \u6B63\u6587.md \u6216 \u8BBE\u5B9A.md \u6587\u4EF6\u7684\u662F\u77ED\u7BC7\u3002\u5BA1\u7A3F\u548C\u5C01\u9762\u6309\u540C\u4E00\u89C4\u5219\u627E\u4E66\u3002

\u53EA\u8BF4 /story\u3001\u770B\u4E0D\u51FA\u610F\u56FE\u65F6\uFF0C\u4E0D\u8D34\u8DEF\u7531\u8868\uFF0C\u7ED9\u56DB\u4E2A\u767D\u8BDD\u9009\u9879\uFF1A\u300C\u5F00\u4E00\u672C\u957F\u7BC7\u6216\u63A5\u7740\u5199\u300D\u2192
story-long-write\uFF1B\u300C\u5199\u4E00\u7BC7\u77ED\u7BC7\u300D\u2192 story-short-write\uFF1B\u300C\u628A\u4E00\u7AE0\u6539\u5F97\u4E0D\u90A3\u4E48 AI\u300D\u2192
story-deslop\uFF1B\u300C\u66F4\u591A\uFF08\u62C6\u4E66\u3001\u626B\u699C\u3001\u5BFC\u5165\u65E7\u7A3F\u3001\u5BA1\u7A3F\u3001\u5C01\u9762\u3001\u53D1\u5E03\u8D44\u6599\uFF09\u300D\u2192 \u518D\u5217\u8FDB\u9636\u9879\u3002\u610F\u56FE\u660E\u786E\u65F6
\u76F4\u63A5\u8FDB\u5165\u5BF9\u5E94 Skill\uFF1B\u53EA\u5DEE\u4E00\u4E2A\u4F1A\u6539\u53D8\u6D41\u7A0B\u7684\u9009\u62E9\u65F6\u53EA\u95EE\u8FD9\u4E00\u4E2A\u95EE\u9898\u3002\u9879\u76EE\u6587\u4EF6\u3001Agent\u3001
\u6A21\u578B\u3001\u6743\u9650\u3001Session Log \u548C UI \u5747\u7531\u5F53\u524D DSH \u4F1A\u8BDD\u7BA1\u7406\u3002\u5C0F\u8BF4\u6587\u4EF6\u901A\u8FC7\u201C\u5C0F\u8BF4\u201D\u89C6\u56FE\u67E5\u770B\uFF0C
Agent \u8FC7\u7A0B\u901A\u8FC7\u53F3\u4FA7\u52A8\u6001\u680F\u6216\u5B98\u65B9 Chat \u67E5\u770B\u3002\u7981\u6B62\u542F\u52A8\u72EC\u7ACB Dashboard\u3002`,
  "story-setup": `# story-setup \u2014 DSH \u539F\u751F\u5C0F\u8BF4\u5DE5\u7A0B\u521D\u59CB\u5316

\u53EA\u521D\u59CB\u5316\u6216\u6821\u9A8C\u5F53\u524D DSH workspace \u4E2D\u7684\u5C0F\u8BF4\u6570\u636E\uFF0C\u4E0D\u90E8\u7F72\u4EFB\u4F55 Agent \u5E73\u53F0\u6587\u4EF6\u3002

1. \u68C0\u67E5\u73B0\u6709\u6B63\u6587\u3001\u8BBE\u5B9A\u3001\u5927\u7EB2\u548C\u8FFD\u8E2A\u6587\u4EF6\uFF0C\u5DF2\u6709\u5185\u5BB9\u7EDD\u4E0D\u8986\u76D6\u3002
2. \u6839\u636E\u7528\u6237\u58F0\u660E\u4E0E\u73B0\u6709\u7ED3\u6784\u5224\u65AD\u957F\u7BC7/\u77ED\u7BC7\uFF1A\u6709 \u6B63\u6587/ \u6216 \u8BBE\u5B9A/ \u5B50\u76EE\u5F55\u7684\u662F\u957F\u7BC7\uFF0C\u6709 \u6B63\u6587.md
   \u6216 \u8BBE\u5B9A.md \u6587\u4EF6\u7684\u662F\u77ED\u7BC7\uFF1B\u65E0\u6CD5\u53EF\u9760\u5224\u65AD\u65F6\u8BF7\u6C42\u786E\u8BA4\u3002
3. \u957F\u7BC7\u6309\u9700\u5EFA\u7ACB \u6B63\u6587/\u3001\u8BBE\u5B9A/\u3001\u5927\u7EB2/\u3002\u521D\u59CB\u5316\u3001\u5F00\u4E66\u3001\u5927\u7EB2\u548C\u7EC6\u7EB2\u9636\u6BB5\u90FD\u4E0D\u5EFA \u8FFD\u8E2A/\uFF0C
   \u4E5F\u4E0D\u5199 \u8FFD\u8E2A/_tracking-state.json\uFF1A\u8FFD\u8E2A\u5728\u7B2C\u4E00\u7AE0\u6B63\u6587\u52A8\u7B14\u524D\uFF0C\u7531 story-long-write
   \u5355\u7AE0\u6D41\u7A0B\u7528\u5B83\u7684 scripts/tracking_commit.js init \u521D\u59CB\u5316\uFF08\u4E8B\u52A1 JSON \u653E\u4E66\u76EE\u5F55
   .story/work/\uFF0Ccheck \u901A\u8FC7\u540E\u5220\u6389\uFF09\uFF0C\u4E4B\u540E\u6BCF\u7AE0\u7531\u811A\u672C\u63D0\u4EA4\u3002_tracking-state.json \u4E0E
   \u4E0A\u4E0B\u6587.md \u7B49\u8FFD\u8E2A\u89C6\u56FE\u6587\u4EF6\u53EA\u7531\u811A\u672C\u81EA\u52A8\u751F\u6210\uFF0C\u7EDD\u4E0D\u624B\u6539\u3002
   \u7B2C\u4E00\u7AE0\u6B63\u6587\u843D\u76D8\u524D\u5FC5\u987B\u6709\u5BF9\u5E94\u7EC6\u7EB2\u3002\u77ED\u7BC7\u4FDD\u6301\u8F7B\u91CF\u7ED3\u6784\uFF0C\u4E0D\u5F3A\u52A0\u957F\u7BC7 Tracking\u3002
4. \u5DF2\u6709\u6B63\u6587\u5374\u6CA1\u6709 \u8FFD\u8E2A/_tracking-state.json \u65F6\uFF0C\u4E0D\u81EA\u884C\u8865\u5EFA\u8FFD\u8E2A\u6587\u4EF6\uFF1A\u5DF2\u6709\u65E7 \u8FFD\u8E2A/
   \u7684\u662F\u65E7\u8FFD\u8E2A\u7ED3\u6784\uFF0C\u5EFA\u8BAE\u8D70 story-import \u7684\u300C\u65E7\u8FFD\u8E2A\u9879\u76EE\u8FC1\u79FB\u300D\uFF1B\u6CA1\u6709 \u8FFD\u8E2A/ \u7684\u65E2\u6709\u4E66\u7A3F
   \u5EFA\u8BAE\u7528 story-import \u5BFC\u5165\u3002
5. \u9700\u8981\u67B6\u6784\u3001\u89D2\u8272\u6216\u7814\u7A76\u5DE5\u4F5C\u65F6\uFF0C\u901A\u8FC7 oh_story_role \u8C03\u7528\u5DF2\u6253\u5305 Role\uFF1B\u4E0D\u8981\u68C0\u67E5\u6216
   \u751F\u6210 .claude\u3001.codex\u3001.opencode\u3001.agents\u3001.zcode\u3001AGENTS.md \u6216 .story-deployed\u3002
6. \u7ED9\u4F5C\u8005\u7684\u62A5\u544A\u6309\u8FD9\u4E2A\u987A\u5E8F\u5199\uFF1A\u5148\u5199\u300C\u73B0\u5728\u53EF\u4EE5\u505A\u4EC0\u4E48\u300D\uFF0C\u7528\u5199\u4E66\u7684\u8BDD\u5217\u771F\u6B63\u53EF\u7528\u7684\u4E8B
   \uFF08\u5982\u300C\u53EF\u4EE5\u5F00\u65B0\u4E66\u3001\u7EED\u5199\uFF1A\u8BF4 /story-long-write\u300D\uFF09\uFF1B\u518D\u5199\u300C\u4F60\u8FD8\u9700\u8981\u505A\u7684\u4E8B\u300D\uFF0C\u9010\u6761
   \u53EF\u7167\u505A\uFF08\u542B\u9700\u8981\u4F5C\u8005\u786E\u8BA4\u7684\u957F\u7BC7/\u77ED\u7BC7\u5224\u65AD\uFF09\uFF0C\u6CA1\u6709\u5C31\u5199\u300C\u65E0\u9700\u5176\u4ED6\u64CD\u4F5C\u300D\u3002\u8FD9\u4E24\u6BB5\u4E0D\u51FA\u73B0
   \u811A\u672C\u540D\u3001\u5B57\u6BB5\u540D\u3001\u72B6\u6001\u540D\u6216\u6587\u4EF6\u8DEF\u5F84\uFF1B\u6700\u540E\u624D\u7B80\u77ED\u5217\u51FA\u521B\u5EFA\u548C\u4FDD\u7559\u4E86\u54EA\u4E9B\u6587\u4EF6\u3002
   \u4E0D\u8981\u914D\u7F6E\u6A21\u578B\u3001\u6743\u9650\u3001Hooks \u6216 Session\u3002

\u9898\u6750\u3001\u89D2\u8272\u3001\u8282\u594F\u3001\u51B2\u7A81\u3001\u5F00\u7BC7\u548C\u5199\u4F5C\u65B9\u6CD5\u8D44\u6599\u4F4D\u4E8E references/agent-references/\uFF1B
\u53EA\u52A0\u8F7D\u5F53\u524D\u4EFB\u52A1\u9700\u8981\u7684\u6587\u4EF6\u3002`,
  "story-long-scan": `# story-long-scan \u2014 DSH \u539F\u751F\u957F\u7BC7\u626B\u699C

\u57FA\u4E8E\u53EF\u6838\u9A8C\u6837\u672C\u8BC6\u522B\u957F\u7BC7\u7F51\u6587\u8D8B\u52BF\uFF0C\u4E0D\u8FD0\u884C\u6253\u5305\u811A\u672C\u3001\u4E0D\u63D0\u53D6\u767B\u5F55\u51ED\u636E\uFF0C\u4E5F\u4E0D\u7ED5\u8FC7\u9A8C\u8BC1\u7801\u3001
\u8BBF\u95EE\u63A7\u5236\u6216\u7AD9\u70B9\u9650\u5236\u3002

1. \u6CBF\u7528\u4F5C\u8005\u5DF2\u7ED9\u7684\u6761\u4EF6\uFF1B\u7F3A\u7684\u4E00\u6B21\u95EE\u9F50\u5E76\u7ED9\u9009\u9879\uFF1A\u5E73\u53F0\uFF08\u8D77\u70B9/\u756A\u8304/\u664B\u6C5F/\u4E03\u732B/\u523A\u732C\u732B/
   \u591A\u4E2A\u5E73\u53F0\u5BF9\u6BD4\uFF09\u3001\u9891\u9053\uFF08\u53EA\u6709\u756A\u8304\u3001\u4E03\u732B\u5206\u7537\u9891/\u5973\u9891/\u90FD\u770B\uFF09\u3001\u770B\u65B0\u4E66\u91CC\u5728\u5192\u5934\u7684\u8FD8\u662F\u6210\u719F
   \u5927\u76D8\u3001\u6709\u6CA1\u6709\u5173\u6CE8\u7684\u9898\u6750\u65B9\u5411\uFF08\u6CA1\u6709\u5C31\u505A\u5168\u699C\u6982\u89C8\uFF09\u3002
2. \u6570\u636E\u6765\u6E90\u4F9D\u6B21\u4E3A\uFF1A\u7528\u6237\u63D0\u4F9B\u7684\u6570\u636E\u6216\u94FE\u63A5\u3001\u5F53\u524D DSH Preset \u53EF\u89C1\u7684\u7F51\u9875\u5DE5\u5177\u3001
   references/genre-trends.md \u4E2D\u7684\u5386\u53F2\u8D8B\u52BF\u3002\u65E0\u6CD5\u83B7\u53D6\u5B9E\u65F6\u6570\u636E\u65F6\u5FC5\u987B\u660E\u786E\u6807\u4E3A\u5386\u53F2\u5047\u8BBE\u3002
3. \u6BCF\u4E2A\u6837\u672C\u8BB0\u5F55\u6765\u6E90 URL\u3001\u91C7\u96C6\u65E5\u671F\u3001\u699C\u5355\u53E3\u5F84\u3001\u6709\u6548\u6761\u76EE\u6570\u3001\u7F3A\u5931\u5B57\u6BB5\u548C\u5F02\u5E38\u9879\uFF1B
   \u4E0D\u628A\u641C\u7D22\u6458\u8981\u3001\u63A8\u65AD\u6216\u8FC7\u671F\u7F13\u5B58\u5199\u6210\u9875\u9762\u4E8B\u5B9E\u3002
4. \u6309\u9898\u6750\u5206\u5E03\u3001\u65B0\u9898\u6750\u4FE1\u53F7\u3001\u7ECF\u5178\u9898\u6750\u53D8\u5316\u3001\u7BC7\u5E45\u4E0E\u66F4\u65B0\u3001\u4E66\u540D\u6A21\u5F0F\u3001\u5F00\u5934\u5356\u70B9\u548C
   \u5DEE\u5F02\u5316\u5143\u7D20\u5206\u6790\u3002\u9898\u6750\u70ED\u5EA6\u6309\u70ED\u5EA6\u4E2D\u4F4D\u4ECE\u9AD8\u5230\u4F4E\u6392\uFF0C\u4E0E\u5168\u5E73\u53F0\u6BD4\u8F83\u7528\u767D\u8BDD\uFF08\u5982\u300C\u6BD4\u5168\u5E73\u53F0
   \u56DB\u5206\u4E4B\u4E09\u7684\u4E66\u90FD\u70ED\u300D\uFF09\uFF1B\u5934\u90E8\u8001\u4E66\u53EA\u4EE3\u8868\u5B58\u91CF\u8BFB\u8005\uFF1B\u6CA1\u6709\u53EF\u6BD4\u7684\u4E0A\u671F\u6837\u672C\u65F6\u8D8B\u52BF\u5199\u300C\u672A\u6BD4\u8F83\u300D\u3002\u9700\u8981\u51B3\u7B56\u95E8\u7981\u65F6\u4F7F\u7528 references/topic-decision.md\u3002
5. \u8F93\u51FA\u5E02\u573A\u6982\u51B5\u3001\u9898\u6750\u70ED\u5EA6\u3001\u8BC1\u636E\u4E0E\u53EF\u4FE1\u5EA6\u3001\u98CE\u9669\u3001\u4E09\u9879\u53EF\u6267\u884C\u65B9\u5411\u548C\u4E0B\u6B21\u590D\u626B\u65F6\u95F4\u3002
6. \u62A5\u544A\u5199\u7ED9\u4F5C\u8005\uFF1A\u8BB2\u5E02\u573A\u7ED3\u8BBA\u548C\u80FD\u5199\u7684\u65B9\u5411\uFF1B\u811A\u672C\u540D\u3001\u547D\u4EE4\u548C\u91C7\u96C6\u72B6\u6001\u7801\u4E0D\u8FDB\u62A5\u544A\u3002
   \u67D0\u4E2A\u699C\u6CA1\u91C7\u5230\uFF0C\u5C31\u7528\u4E00\u53E5\u8BDD\u8BF4\u660E\u300CXX \u699C\u8FD9\u6B21\u6CA1\u62FF\u5230\uFF08\u539F\u56E0\uFF09\uFF0C\u7ED3\u8BBA\u4E0D\u542B\u5B83\u300D\u3002
7. \u6BCF\u6B21\u626B\u699C\u65B0\u5EFA \u626B\u699C/{YYYYMMDD}/\uFF08\u540C\u65E5\u518D\u626B\u52A0 -2\uFF09\uFF0C\u6837\u672C\u8BB0\u5F55\u5B58\u5728\u8FD9\u91CC\uFF1B\u62A5\u544A\u540C\u65F6\u6309
   references/topic-decision.md \u7684\u6A21\u677F\u5199\u8FDB\u8BE5\u76EE\u5F55\u7684 \u9009\u9898\u51B3\u7B56.md\uFF08\u5E26\u300C\u626B\u699C\u65E5\u671F\u300D\uFF09\uFF0C
   \u4F5C\u4E3A\u300C\u626B\u699C\u7ED3\u8BBA\u300D\u4E00\u8282\uFF0C\u4F5C\u8005\u8981\u9009\u9898\u65F6\u518D\u5199\u300C\u63A8\u8350\u9009\u9898\u300D\u4E00\u8282\u3002story-long-write \u5F00\u4E66\u65F6
   \u4ECE\u8FD9\u4EFD\u6587\u4EF6\u63A5\u4E0A\uFF0C\u6240\u4EE5\u7ED3\u8BBA\u8981\u843D\u76D8\uFF0C\u4E0D\u53EA\u7559\u5728\u5BF9\u8BDD\u91CC\u3002\u300C\u63A8\u8350\u9009\u9898\u300D\u6BCF\u4E2A\u9009\u9898\u6309\u6A21\u677F\u5217
   1-2 \u672C\u5EFA\u8BAE\u62C6\u7684\u5BF9\u6807\u4E66\uFF08\u4F18\u5148\u65B0\u4E66\u699C\u3001\u4E66\u5E93\u65B0\u4E66\u4E2D\u5B57\u6570\u4E0D\u591A\u7684\u540C\u65B9\u5411\u4E66\uFF0C\u5934\u90E8\u8001\u4E66\u53EA\u4F5C
   \u53C2\u7167\uFF09\uFF0C\u5E76\u544A\u8BC9\u4F5C\u8005\u53EF\u7528 story-long-analyze \u62C6\u5B83\u4EEC\u6765\u9A8C\u8BC1\u300C\u80FD\u7206\u7684\u539F\u56E0\u300D\u3002

\u5F53\u524D Preset \u6CA1\u6709\u7F51\u9875\u80FD\u529B\u4E14\u7528\u6237\u4E5F\u672A\u63D0\u4F9B\u6837\u672C\u65F6\uFF0C\u4F7F\u7528\u5185\u7F6E\u53C2\u8003\u5B8C\u6210\u65B9\u6CD5\u8BBA\u5206\u6790\uFF0C
\u5E76\u5217\u51FA\u4ECD\u9700\u6838\u9A8C\u7684\u699C\u5355\u3002\u9700\u8981\u771F\u5B9E\u9875\u9762\u6216\u767B\u5F55\u6001\u65F6\uFF0C\u76F4\u63A5\u4F7F\u7528\u5B98\u65B9 ego-browser Skill\uFF0C\u6267\u884C ego-browser skill \u5E76\u6309\u5F53\u524D\u6307\u5357\u64CD\u4F5C\uFF1B
\u4E0D\u53EF\u7528\u65F6\u8BF4\u660E\u7F3A\u9879\uFF0C\u5931\u8D25\u6837\u672C\u6392\u9664\u5E76\u8BF4\u660E\u3002`,
  "story-short-scan": `# story-short-scan \u2014 DSH \u539F\u751F\u77ED\u7BC7\u626B\u699C

\u57FA\u4E8E\u53EF\u6838\u9A8C\u6837\u672C\u8BC6\u522B\u77ED\u7BC7\u5E02\u573A\u7684\u60C5\u7EEA\u3001\u9898\u6750\u4E0E\u4F20\u64AD\u4FE1\u53F7\uFF0C\u4E0D\u8FD0\u884C\u6253\u5305\u811A\u672C\u3001\u4E0D\u8BFB\u53D6 Cookie
\u6216 token\uFF0C\u4E5F\u4E0D\u7ED5\u8FC7\u9A8C\u8BC1\u7801\u3001\u767B\u5F55\u6216\u8BBF\u95EE\u63A7\u5236\u3002

1. \u6CBF\u7528\u4F5C\u8005\u5DF2\u7ED9\u7684\u5E73\u53F0\u6216\u65B9\u5411\uFF0C\u7F3A\u9879\u4E00\u6B21\u95EE\u9F50\uFF1A\u60F3\u770B\u54EA\u4E2A\u5E73\u53F0\u3001\u7537\u9891\u8FD8\u662F\u5973\u9891\u3001\u54EA\u7C7B\u77ED\u7BC7\uFF1B
   \u77E5\u4E4E\u76D0\u8A00\u3001\u756A\u8304\u548C\u4E03\u732B\u77ED\u7BC7\u8BF7\u4F5C\u8005\u53D1\u699C\u5355\u622A\u56FE\u3001\u6587\u5B57\u6216\u94FE\u63A5\uFF1B\u624B\u91CC\u6709\u7F16\u8F91\u7684\u5F81\u7A3F\u8981\u6C42\u4E5F\u4E00\u8D77
   \u53D1\u6765\u3002\u5F81\u7A3F\u8981\u6C42\u539F\u6587\u5B58\u8FDB\u672C\u6B21\u626B\u699C\u76EE\u5F55\u7684 \u5F81\u7A3F\u8981\u6C42.md\uFF0C\u9898\u6750\u3001\u5B57\u6570\u3001\u622A\u6B62\u65E5\u671F\u5F53\u786C\u6761\u4EF6\u3002
2. \u6570\u636E\u6765\u6E90\u4F9D\u6B21\u4E3A\uFF1A\u7528\u6237\u63D0\u4F9B\u7684\u6570\u636E\u6216\u94FE\u63A5\u3001\u5F53\u524D DSH Preset \u53EF\u89C1\u7684\u7F51\u9875\u5DE5\u5177\u3001
   references/real-market-data.md \u4E2D\u7684\u5386\u53F2\u8D44\u6599\u3002\u65E0\u6CD5\u8054\u7F51\u65F6\u5FC5\u987B\u628A\u7ED3\u8BBA\u6807\u4E3A\u5019\u9009\u5047\u8BBE\u3002
3. \u8BB0\u5F55\u6765\u6E90 URL\u3001\u91C7\u96C6\u65E5\u671F\u3001\u699C\u5355\u53E3\u5F84\u3001\u6709\u6548\u6837\u672C\u6570\u3001\u7F3A\u5931\u5B57\u6BB5\u548C\u5F02\u5E38\u9879\u3002
4. \u5206\u6790\u60C5\u7EEA\u7C7B\u578B\uFF08\u610F\u96BE\u5E73/\u53CD\u8F6C\u9707\u64BC/\u723D\u611F\u91CA\u653E/\u6CBB\u6108\u6E29\u6696/\u7EC6\u601D\u6781\u6050/\u5171\u9E23\u611F\u52A8\uFF1B\u4F18\u5148\u6839\u636E\u7B80\u4ECB\u5224\u65AD
   \u8BFB\u8005\u8BFB\u5B8C\u7684\u611F\u53D7\uFF0C\u53EA\u5F52\u4E00\u7C7B\uFF0C\u65E0\u7B80\u4ECB\u6216\u7B80\u4ECB\u6781\u77ED\u65F6\u7ED3\u5408\u4E66\u540D\u51B2\u7A81\u53E5\u5F0F\u4E0E\u6807\u7B7E\u5F52\u7C7B\uFF0C\u4ECD\u65E0\u6CD5\u5224\u65AD\u7684\u8BA1\u300C\u5F85\u5B9A\u300D\uFF09\u3001\u9898\u6750\u70ED\u70B9\u3001
   \u7BC7\u5E45\u3001\u5F00\u5934\u3001\u7ED3\u5C3E\u3001\u6807\u9898\u3001\u4EBA\u8BBE\u4E0E\u4F20\u64AD\u89E6\u53D1\u70B9\uFF1B\u7ED9\u6BCF\u4E2A\u8D8B\u52BF\u6807\u6CE8\u8BC1\u636E\u5F3A\u5EA6\u3001\u9971\u548C\u98CE\u9669\u548C\u6709\u6548\u671F\u3002
   \u70B9\u4F17\u3001\u9ED1\u5CA9\u662F\u5728\u67B6\u4E66\u76EE\u800C\u975E\u70ED\u5EA6\u699C\uFF1A\u53EA\u6709\u5B83\u4EEC\u7684\u6570\u636E\u65F6\u5199\u300C\u5728\u67B6\u6570\u91CF\u300D\uFF0C\u4E0D\u8BF4\u54EA\u7BC7\u706B\u3002
   \u53EA\u6709\u4E00\u671F\u6837\u672C\u65F6\u4E0D\u5199\u300C\u53D8\u5316\u300D\u3002
5. \u8F93\u51FA\u5E02\u573A\u6982\u51B5\uFF08\u626B\u699C\u65F6\u95F4\u3001\u6838\u5FC3\u53D1\u73B0\u548C\u53EF\u4FE1\u5EA6\uFF1A\u6837\u672C\u591A\u5C11\u7BC7\u3001\u6765\u81EA\u54EA\u51E0\u4E2A\u699C\uFF0C\u5E76\u5EFA\u8BAE
   \u54EA\u5929\u524D\u540E\u518D\u626B\u4E00\u6B21\uFF09\u3001\u60C5\u7EEA\u70ED\u5EA6\u3001\u9898\u6750\u70ED\u70B9\u3001\u5173\u952E\u6570\u636E\u3001\u98CE\u53E3\u9884\u8B66\u3001\u4E09\u9879\u53EF\u5199\u65B9\u5411\u3002
6. \u62A5\u544A\u5199\u7ED9\u4F5C\u8005\uFF1A\u8BB2\u5E02\u573A\u7ED3\u8BBA\u548C\u80FD\u5199\u7684\u65B9\u5411\uFF1B\u811A\u672C\u540D\u3001\u547D\u4EE4\u548C SKIP \u8FD9\u7C7B\u91C7\u96C6\u72B6\u6001\u4E0D\u8FDB\u62A5\u544A\u3002
   \u67D0\u4E2A\u5E73\u53F0\u6CA1\u91C7\u5230\uFF0C\u5C31\u7528\u4E00\u53E5\u8BDD\u8BF4\u660E\u300CXX \u8FD9\u6B21\u6CA1\u62FF\u5230\uFF08\u539F\u56E0\uFF09\uFF0C\u7ED3\u8BBA\u4E0D\u542B\u5B83\u300D\u3002
7. \u6BCF\u6B21\u626B\u699C\u65B0\u5EFA \u626B\u699C/{YYYYMMDD}/\uFF08\u540C\u65E5\u518D\u626B\u52A0 -2\uFF09\uFF0C\u6837\u672C\u8BB0\u5F55\u5B58\u5728\u8FD9\u91CC\uFF1B\u62A5\u544A\u540C\u65F6\u6309
   references/topic-match.md \u7684\u6A21\u677F\u5199\u8FDB\u8BE5\u76EE\u5F55\u7684 \u77ED\u7BC7\u626B\u699C\u7ED3\u8BBA.md\uFF0C\u4F5C\u4E3A\u300C\u626B\u699C\u7ED3\u8BBA\u300D
   \u4E00\u8282\uFF0C\u7ED3\u5408\u9879\u76EE\u6761\u4EF6\u518D\u5199\u300C\u9009\u9898\u5339\u914D\u300D\u4E00\u8282\uFF0C\u76EE\u6807\u5E73\u53F0\u6309 topic-match.md \u7684\u5E73\u53F0\u5BF9\u7167\u5199\u3002
   \u4F5C\u8005\u4E0D\u7B54\u6295\u7A3F\u5E73\u53F0\u3001\u7D20\u6750\u548C\u5B57\u6570\u65F6\u6309\u6837\u672C\u7ED9\u65B9\u5411\uFF0C\u53EF\u884C\u6027\u6700\u9AD8\u5199\u300C\u4E2D\u300D\u3002
   story-short-write \u4ECE\u8FD9\u4EFD\u6587\u4EF6\u63A5\u4E0A\u9009\u9898\u3002
   \u4F5C\u8005\u81EA\u5DF1\u7ED9\u699C\u5355\u65F6\uFF0C\u6309 references/manual-rank-input.md \u7684\u683C\u5F0F\u6574\u7406\u3002

\u5F53\u524D Preset \u6CA1\u6709\u7F51\u9875\u80FD\u529B\u4E14\u7528\u6237\u4E5F\u672A\u63D0\u4F9B\u6837\u672C\u65F6\uFF0C\u53EA\u505A\u5386\u53F2\u8D44\u6599\u5206\u6790\u5E76\u5217\u51FA\u9A8C\u8BC1\u52A8\u4F5C\uFF1B
\u9700\u8981\u771F\u5B9E\u9875\u9762\u65F6\u76F4\u63A5\u4F7F\u7528\u5B98\u65B9 ego-browser Skill\uFF0C\u6267\u884C ego-browser skill \u5E76\u6309\u5F53\u524D\u6307\u5357\u64CD\u4F5C\u3002
\u6D4F\u89C8\u5668\u4E0D\u53EF\u7528\u65F6\u62A5\u544A\u7F3A\u53E3\u3002\u9ED1\u5CA9\u53EA\u8BFB\u516C\u5F00\u4E66\u5E93\uFF0C\u4E0D\u7D22\u8981\u6216\u63D0\u53D6\u4F5C\u8005\u540E\u53F0\u51ED\u636E\u3002`
};
function frontmatterValue(frontmatter, key) {
  const lines = frontmatter.split(/\r?\n/u);
  const index = lines.findIndex((line) => new RegExp(`^${key}:\\s*`, "u").test(line));
  if (index < 0) return void 0;
  const raw = lines[index]?.replace(new RegExp(`^${key}:\\s*`, "u"), "").trim();
  if (raw === void 0) return void 0;
  if (raw === ">" || raw === "|" || raw === ">-" || raw === "|-") {
    const values = [];
    for (const line of lines.slice(index + 1)) {
      if (/^\S/u.test(line)) break;
      values.push(line.trim());
    }
    return (raw.startsWith(">") ? values.join(" ") : values.join("\n")).trim();
  }
  if (raw.startsWith('"') && raw.endsWith('"')) {
    try {
      return JSON.parse(raw);
    } catch {
      return raw.slice(1, -1);
    }
  }
  return raw.replace(/^['"]|['"]$/gu, "");
}
function parseBundledSkill(source) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/u.exec(source);
  if (match?.[1] === void 0) throw new Error("Bundled skill is missing YAML frontmatter.");
  const name2 = frontmatterValue(match[1], "name");
  const description = frontmatterValue(match[1], "description");
  if (!name2 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(name2)) throw new Error("Bundled skill has an invalid name.");
  if (!description) throw new Error(`Bundled skill "${name2}" has no description.`);
  return {
    name: name2,
    description,
    content: source.slice(match[0].length),
    userInvocable: frontmatterValue(match[1], "user-invocable") !== "false"
  };
}
function dshSkillContent(name2, content) {
  const override = DSH_SKILL_OVERRIDES[name2];
  const native = DSH_NATIVE_SKILLS[name2];
  return `${DSH_SKILL_BRIDGE}${override === void 0 ? "" : `
<skill-specific-dsh-override>${override}</skill-specific-dsh-override>`}

${native ?? content}`;
}
function defaultBundledSkillRoot() {
  return bundledKnowledgePath(import.meta.url, "oh-story/skills");
}
function defaultDramaSkillRoot() {
  return bundledKnowledgePath(import.meta.url, "drama/skills");
}
function defaultNovelToGameSkillRoot() {
  return bundledKnowledgePath(import.meta.url, "novel-to-game/skills");
}
function createBundledSkillProvider(providerName, skillRoot, content, excludedSkills = []) {
  const root = resolve3(skillRoot);
  return {
    name: providerName,
    async list() {
      const directories = (await readdir(root, { withFileTypes: true })).filter((entry) => entry.isDirectory() && !excludedSkills.includes(entry.name)).map((entry) => entry.name).sort();
      return Promise.all(directories.map(async (directory) => {
        const directoryRoot = join2(root, directory);
        const path = join2(directoryRoot, "SKILL.md");
        const parsed = parseBundledSkill(await readFile(path, "utf8"));
        if (parsed.name !== directory) throw new Error(`Bundled skill directory "${directory}" does not match name "${parsed.name}".`);
        return {
          name: parsed.name,
          description: parsed.description,
          invocation: { modelInvocable: true, userInvocable: parsed.userInvocable },
          provider: providerName,
          source: "bundled",
          resourceBase: { kind: "directory", path: directoryRoot },
          rank: BUNDLED_SKILL_RANK,
          locator: pathToFileURL(path),
          path
        };
      }));
    },
    async get(candidate) {
      if (candidate.provider !== providerName || typeof candidate.path !== "string" || excludedSkills.includes(candidate.name)) return void 0;
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(candidate.name)) return void 0;
      const path = resolve3(candidate.path);
      const directoryRoot = join2(root, candidate.name);
      const relativePath = relative(directoryRoot, path);
      if (relativePath === "" || relativePath.startsWith("..") || isAbsolute(relativePath)) {
        throw new Error("Bundled skill locator escaped the packaged skill root.");
      }
      if (path !== join2(directoryRoot, "SKILL.md")) throw new Error("Bundled skill locator is not its registered entrypoint.");
      const parsed = parseBundledSkill(await readFile(path, "utf8"));
      if (parsed.name !== candidate.name) return void 0;
      return {
        name: parsed.name,
        description: parsed.description,
        invocation: { modelInvocable: true, userInvocable: parsed.userInvocable },
        provider: providerName,
        source: "bundled",
        resourceBase: { kind: "directory", path: directoryRoot },
        path,
        content: content(parsed.name, parsed.content)
      };
    }
  };
}
function createOhStorySkillProvider(skillRoot = defaultBundledSkillRoot()) {
  return createBundledSkillProvider(STORY_PROVIDER_NAME, skillRoot, dshSkillContent, ["browser-cdp"]);
}
function dshDramaSkillContent(name2, content, skillRoot = defaultDramaSkillRoot()) {
  const entry = DSH_DRAMA_OVERRIDES[name2];
  const override = typeof entry === "function" ? entry(skillRoot) : entry;
  return `${DSH_DRAMA_BRIDGE}${override === void 0 ? "" : `
<skill-specific-dsh-override>${override}</skill-specific-dsh-override>`}

${content}`;
}
function createDramaSkillProvider(skillRoot = defaultDramaSkillRoot()) {
  return createBundledSkillProvider(DRAMA_PROVIDER_NAME, skillRoot, (name2, content) => dshDramaSkillContent(name2, content, skillRoot));
}
function dshNovelToGameSkillContent(_name, content) {
  return `${DSH_GAME_BRIDGE}

${content}`;
}
function createNovelToGameSkillProvider(skillRoot = defaultNovelToGameSkillRoot()) {
  return createBundledSkillProvider(GAME_PROVIDER_NAME, skillRoot, dshNovelToGameSkillContent);
}
function defaultVideoRecapSkillRoot() {
  return bundledKnowledgePath(import.meta.url, "video-recap/skills");
}
function dshVideoRecapSkillContent(_name, content) {
  return `${DSH_VIDEO_BRIDGE}

${content}`;
}
function createVideoRecapSkillProvider(skillRoot = defaultVideoRecapSkillRoot()) {
  return createBundledSkillProvider(VIDEO_PROVIDER_NAME, skillRoot, dshVideoRecapSkillContent);
}

// src/host-python.ts
import { execFile } from "node:child_process";
import { promisify } from "node:util";
var execFileAsync = promisify(execFile);
var DRAMA_PYTHON = [3, 9];
var VIDEO_PYTHON = [3, 10];
async function commandOutput(command, args) {
  try {
    const { stdout, stderr } = await execFileAsync(command, [...args], { encoding: "utf8", timeout: 5e3, maxBuffer: 4 * 1024 * 1024 });
    return `${stdout}${stderr}`.trim();
  } catch {
    return void 0;
  }
}
function pythonVersion(value, floor) {
  const minimum = `${String(floor[0])}.${String(floor[1])}`;
  const match = /Python\s+(\d+)\.(\d+)(?:\.(\d+))?/u.exec(value ?? "");
  if (match === null) return { ok: false, minimum };
  const major = Number(match[1]);
  const minor = Number(match[2]);
  return { ok: major > floor[0] || major === floor[0] && minor >= floor[1], version: match[0].replace(/^Python\s+/u, ""), minimum };
}
async function hostPython(floor, probe = commandOutput, platform = process.platform) {
  const candidates = platform === "win32" ? [
    { command: "python3", args: [] },
    { command: "python", args: [] },
    { command: "py", args: ["-3"] }
  ] : [
    { command: "python3", args: [] },
    { command: "python", args: [] }
  ];
  let fallback;
  for (const candidate of candidates) {
    const parsed = pythonVersion(await probe(candidate.command, [...candidate.args, "--version"]), floor);
    if (parsed.ok) return { command: candidate.command, probe: parsed };
    if (parsed.version !== void 0) fallback ??= { command: candidate.command, probe: parsed };
  }
  return fallback ?? { command: "python3", probe: { ok: false, minimum: pythonVersion(void 0, floor).minimum } };
}

// src/native-hooks.ts
import { boundContextSummary, createUserMessage } from "@deepseek-ai/dsh-llm";

// src/role-provider.ts
import { readFile as readFile2 } from "node:fs/promises";
import { join as join3, resolve as resolve4 } from "node:path";
var OH_STORY_ROLE_NAMES = [
  "chapter-extractor",
  "character-designer",
  "consistency-checker",
  "narrative-writer",
  "story-architect",
  "story-explorer",
  "story-researcher"
];
function roleBody(source) {
  const frontmatter = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/u.exec(source);
  return source.slice(frontmatter?.[0].length ?? 0).trim();
}
function defaultBundledRoleRoot() {
  return bundledKnowledgePath(import.meta.url, "oh-story/roles");
}
function researchRoleBody(body) {
  const begin = body.indexOf("## \u5DE5\u5177\u4F18\u5148\u7EA7");
  const end = body.indexOf("## \u6765\u6E90\u53EF\u9760\u6027\u8BC4\u4F30", begin);
  if (begin < 0 || end < 0) throw new Error("Bundled researcher workflow headings changed; update the DSH browser adaptation.");
  const workflow = `## \u7814\u7A76\u5DE5\u5177\u4E0E\u6D41\u7A0B

\u9700\u8981\u6D4F\u89C8\u5668\u65F6\u6267\u884C ego-browser skill\uFF0C\u5B8C\u6574\u8BFB\u53D6\u5E76\u9075\u5FAA\u5B98\u65B9\u5F53\u524D\u7248\u672C\u6307\u5357\uFF0C\u76F4\u63A5\u4F7F\u7528 ego-browser \u5B8C\u6210\u68C0\u7D22\u548C\u9875\u9762\u8BFB\u53D6\u3002Space\u3001\u9875\u9762\u64CD\u4F5C\u3001\u4EBA\u5DE5\u63A5\u7BA1\u548C\u4EFB\u52A1\u5B8C\u6210\u90FD\u4EA4\u7ED9\u5B98\u65B9\u8FD0\u884C\u65F6\u3002\u4E0D\u53EF\u7528\u65F6\u628A\u7F3A\u9879\u4EA4\u56DE\u4E3B\u4F1A\u8BDD\u3002

\u516C\u5F00\u9759\u6001\u6765\u6E90\u53EF\u7528\u5F53\u524D\u5B50\u4F1A\u8BDD\u5B9E\u9645\u63D0\u4F9B\u7684 web_search / web_fetch\u3002\u641C\u7D22\u6458\u8981\u53EA\u5B9A\u4F4D\u6765\u6E90\uFF1B\u4ECE\u771F\u5B9E\u7ED3\u679C\u63D0\u53D6\u76EE\u6807\u94FE\u63A5\uFF0C\u8BFB\u53D6\u6B63\u6587\u5E76\u8BB0\u5F55 URL\u3001\u65F6\u95F4\u4E0E\u8986\u76D6\u8303\u56F4\uFF0C\u518D\u6309\u4E0B\u65B9\u6807\u51C6\u8BC4\u4F30\u6765\u6E90\u548C\u8F93\u51FA\u53C2\u8003\u6587\u4EF6\u3002

---

`;
  return (body.slice(0, begin) + workflow + body.slice(end)).replace('Agent(subagent_type: "story-researcher")', 'oh_story_role(role: "story-researcher")').replace("- `cdp_port`\uFF1ACDP \u7AEF\u53E3\u53F7\uFF08\u53EF\u9009\uFF0C\u9ED8\u8BA4 9222\uFF09", "- `browser_context`\uFF1A\u8C03\u7528\u8005\u63D0\u4F9B\u7684 Ego Space \u6216\u9875\u9762\u80CC\u666F\uFF08\u53EF\u9009\uFF0C\u6309\u5B98\u65B9\u6307\u5357\u7EED\u63A5\uFF09").replaceAll("google | bing | websearch", "google | bing | web_search").replace("- CDP \u4F7F\u7528\uFF1A{\u662F | \u5426}", "- \u6D4F\u89C8\u5668\uFF1A{ego | \u672A\u4F7F\u7528}").replace('"cdp_used": true,', '"browser_used": true,\n  "browser": "ego | none",');
}
async function loadBundledRole(name2, roleRoot = defaultBundledRoleRoot()) {
  const source = roleBody(await readFile2(join3(resolve4(roleRoot), `${name2}.md`), "utf8"));
  const body = name2 === "story-researcher" ? researchRoleBody(source) : source;
  if (body.length === 0) throw new Error(`Bundled role "${name2}" is empty.`);
  return [
    `OH_STORY_DSH_ROLE:${name2}`,
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
async function loadBundledRolePersonas(roleRoot = defaultBundledRoleRoot()) {
  return new Map(await Promise.all(OH_STORY_ROLE_NAMES.map(async (role) => [role, await loadBundledRole(role, roleRoot)])));
}

// src/role-identity.ts
var ROLE_LABEL_PREFIX = "oh-story:";
function ohStoryRoleLabel(role) {
  return `${ROLE_LABEL_PREFIX}${role}`;
}
function roleFromLabel(label) {
  if (typeof label !== "string" || !label.startsWith(ROLE_LABEL_PREFIX)) return void 0;
  const name2 = label.slice(ROLE_LABEL_PREFIX.length);
  return OH_STORY_ROLE_NAMES.find((role) => role === name2);
}
var roleSessions = /* @__PURE__ */ new WeakMap();
function observeOhStoryRoleDescriptor(session, event) {
  if (event.type !== "subagent/descriptor" || roleSessions.has(session)) return;
  const role = roleFromLabel(event.data.label);
  if (role !== void 0) roleSessions.set(session, role);
}
function markOhStoryRoleSession(session, role) {
  if (!roleSessions.has(session)) roleSessions.set(session, role);
}
function ohStoryRoleOfSession(session) {
  return session === void 0 ? void 0 : roleSessions.get(session);
}

// src/native-hooks.ts
var MUTATION_TOOLS = /* @__PURE__ */ new Set(["write", "edit", "str_replace_editor"]);
function argumentRecord(args) {
  return typeof args === "object" && args !== null && !Array.isArray(args) ? args : void 0;
}
function mutationPath(name2, args) {
  const record3 = argumentRecord(args);
  if (!MUTATION_TOOLS.has(name2) || record3 === void 0) return void 0;
  if (name2 === "str_replace_editor") {
    if (!(/* @__PURE__ */ new Set(["create", "str_replace", "insert"])).has(String(record3.command))) return void 0;
    return typeof record3.path === "string" && record3.path.trim() !== "" ? record3.path : void 0;
  }
  return typeof record3.file_path === "string" && record3.file_path.trim() !== "" ? record3.file_path : void 0;
}
function normalizedRelativePath(path) {
  const segments = [];
  for (const part of path.split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") {
      if (segments.length === 0) return void 0;
      segments.pop();
    } else segments.push(part);
  }
  return segments.join("/");
}
function proseLocation(path) {
  const segments = path.split("/");
  const name2 = segments.at(-1) ?? "";
  if (name2 === "\u6B63\u6587.md") {
    return { book: segments.slice(0, -1).join("/"), name: name2, kind: "short" };
  }
  if (segments.length < 2 || name2.startsWith(".") || !/\.md$/iu.test(name2)) return void 0;
  const index = segments.lastIndexOf("\u6B63\u6587", segments.length - 2);
  if (index < 0) return void 0;
  return { book: segments.slice(0, index).join("/"), name: name2, kind: "long" };
}
function inBook(book, path) {
  return book === "" ? path : `${book}/${path}`;
}
function lastSegment(path) {
  return path.replaceAll("\\", "/").split("/").filter((part) => part !== "").at(-1) ?? "";
}
function storyMutationAt(root, relativePath) {
  const normalized = normalizedRelativePath(relativePath);
  if (normalized === void 0) return void 0;
  const location = proseLocation(normalized);
  if (location === void 0) return void 0;
  const chapterText = location.kind === "long" ? /^第0*(\d+)章/u.exec(location.name)?.[1] : void 0;
  return {
    mutation: { root, path: normalized, ...chapterText === void 0 ? {} : { chapter: Number(chapterText) } },
    book: location.book,
    kind: location.kind
  };
}
function insideRootDisplay(root, candidate) {
  return /^[a-z]:\//iu.test(root) ? candidate.toLowerCase().startsWith(`${root.toLowerCase()}/`) : candidate.startsWith(`${root}/`);
}
function detectStoryMutation(name2, args, cwd) {
  const rawPath = mutationPath(name2, args);
  if (cwd === void 0 || rawPath === void 0) return void 0;
  const root = cwd.replaceAll("\\", "/").replace(/\/$/u, "");
  const candidate = rawPath.replaceAll("\\", "/");
  const absolute = candidate.startsWith("/") || /^[a-z]:\//iu.test(candidate) || /^[a-z][a-z\d+.-]*:\/\//iu.test(candidate);
  if (absolute && !insideRootDisplay(root, candidate)) return void 0;
  return storyMutationAt(root, absolute ? candidate.slice(root.length + 1) : candidate)?.mutation;
}
async function storyMutation(exec, fs) {
  const cwd = exec.agent?.session.header.cwd;
  const path = mutationPath(exec.name, exec.arguments);
  if (cwd === void 0 || path === void 0) return void 0;
  let rootTarget;
  let mutationTarget;
  try {
    [rootTarget, mutationTarget] = await Promise.all([
      fs.resolve(cwd, { signal: exec.signal }),
      fs.resolve(path, { cwd, signal: exec.signal })
    ]);
    if (!fs.contains(rootTarget, mutationTarget)) return void 0;
  } catch {
    return void 0;
  }
  const rootDisplay = rootTarget.displayPath.replaceAll("\\", "/").replace(/\/$/u, "");
  const mutationDisplay = mutationTarget.displayPath.replaceAll("\\", "/");
  if (insideRootDisplay(rootDisplay, mutationDisplay)) {
    return storyMutationAt(rootDisplay, mutationDisplay.slice(rootDisplay.length + 1));
  }
  const fallback = detectStoryMutation(exec.name, exec.arguments, cwd);
  const location = fallback === void 0 ? void 0 : proseLocation(fallback.path);
  return fallback === void 0 || location === void 0 ? void 0 : { mutation: fallback, book: location.book, kind: location.kind };
}
async function target(fs, root, path, signal) {
  return fs.resolve(path, { cwd: root, ...signal === void 0 ? {} : { signal } });
}
async function exists(fs, root, path, signal) {
  return target(fs, root, path, signal).then((value) => fs.stat(value, signal)).then((info) => info !== void 0, () => false);
}
async function existsDirectory(fs, root, path, signal) {
  return target(fs, root, path, signal).then((value) => fs.stat(value, signal)).then((info) => info?.type === "directory", () => false);
}
async function isLongFormBook(fs, root, book, signal) {
  return await exists(fs, root, inBook(book, "\u5927\u7EB2"), signal) || await exists(fs, root, inBook(book, "\u8FFD\u8E2A"), signal);
}
async function isPostWriteProseBook(fs, root, book, kind, signal) {
  if (kind === "short") {
    return exists(fs, root, inBook(book, "\u8BBE\u5B9A.md"), signal);
  }
  return await isLongFormBook(fs, root, book, signal) || await existsDirectory(fs, root, inBook(book, "\u8BBE\u5B9A"), signal) || await exists(fs, root, inBook(book, "\u8BBE\u5B9A.md"), signal);
}
var OUTLINE_MIN_CHARS = 30;
var OUTLINE_READ_LIMIT = 64 * 1024;
async function outlineIsEmpty(fs, outline, signal) {
  if (fs.readBytes === void 0) return false;
  let text2;
  try {
    text2 = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(await fs.readBytes(outline, signal, OUTLINE_READ_LIMIT));
  } catch {
    return false;
  }
  if (text2.startsWith("\uFEFF")) text2 = text2.slice(1);
  const body = text2.split("\n").map((line) => line.replace(/^[ \t]*#+/u, "")).join("");
  return Array.from(body.replace(/[ \t\r\n\f\v\u3000]/gu, "")).length < OUTLINE_MIN_CHARS;
}
async function chapterOutlines(fs, root, book, chapter, signal) {
  const entries = await target(fs, root, inBook(book, "\u5927\u7EB2"), signal).then((directory) => fs.listDir(directory, signal)).catch(() => []);
  return entries.filter((entry) => entry.type === "file" && Number(/^细纲_第0*(\d+)章.*\.md$/u.exec(entry.name)?.[1]) === chapter).sort((left, right) => left.name < right.name ? -1 : left.name > right.name ? 1 : 0);
}
var TRACKING_STATE = "\u8FFD\u8E2A/_tracking-state.json";
var TRACKING_STATE_READ_LIMIT = 2 * 1024 * 1024;
var IMPORT_MARKER = ".story/work/\u5BFC\u5165\u4E2D.md";
async function hasTrackingState(fs, root, book, signal) {
  return exists(fs, root, inBook(book, TRACKING_STATE), signal);
}
async function trackingCheckpointHardIssue(fs, root, book, signal) {
  const statePath = inBook(book, TRACKING_STATE);
  if (!await exists(fs, root, statePath, signal)) return void 0;
  if (fs.readBytes === void 0) return void 0;
  let parsed;
  try {
    const file = await target(fs, root, statePath, signal);
    const bytes = await fs.readBytes(file, signal, TRACKING_STATE_READ_LIMIT);
    parsed = JSON.parse(new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes));
  } catch {
    return `${statePath} \u65E0\u6CD5\u89E3\u6790\uFF1B\u505C\u6B62\u5199\u6B63\u6587\u5E76\u91CD\u65B0 /story-import\uFF0C\u4E0D\u80FD\u731C\u6D4B\u6216\u624B\u8865\u72B6\u6001`;
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return `${statePath} \u4E0D\u662F\u5F53\u524D schema_version=4\uFF1B\u505C\u6B62\u5199\u6B63\u6587\u5E76\u91CD\u65B0 /story-import\uFF0C\u4E0D\u4FDD\u7559\u65E7\u7ED3\u6784\u517C\u5BB9\u8DEF\u5F84`;
  }
  const document = parsed;
  if (document.schema_version !== 4) {
    return `${statePath} \u4E0D\u662F\u5F53\u524D schema_version=4\uFF1B\u505C\u6B62\u5199\u6B63\u6587\u5E76\u91CD\u65B0 /story-import\uFF0C\u4E0D\u4FDD\u7559\u65E7\u7ED3\u6784\u517C\u5BB9\u8DEF\u5F84`;
  }
  if (!Number.isInteger(document.state_revision)) {
    return `${statePath} \u7F3A\u5C11\u6574\u6570 state_revision\uFF1B\u505C\u6B62\u5199\u6B63\u6587\u5E76\u91CD\u65B0 /story-import`;
  }
  if (!Number.isInteger(document.last_committed_chapter)) {
    return `${statePath} \u7F3A\u5C11\u6574\u6570 last_committed_chapter\uFF1B\u505C\u6B62\u5199\u6B63\u6587\u5E76\u91CD\u65B0 /story-import`;
  }
  return void 0;
}
async function hasImportSignal(fs, root, book, signal) {
  if (await exists(fs, root, inBook(book, IMPORT_MARKER), signal)) return true;
  const bookName = book === "" ? lastSegment(root) : lastSegment(book);
  return bookName !== "" && await exists(fs, root, `\u62C6\u6587\u5E93/${bookName}`, signal);
}
async function validateStoryMutation(fs, mutation, signal) {
  const location = proseLocation(mutation.path);
  if (location === void 0) return void 0;
  const { book, kind } = location;
  if (kind === "short") {
    if (await exists(fs, mutation.root, mutation.path, signal)) return void 0;
    if (await hasImportSignal(fs, mutation.root, book, signal)) return void 0;
    if (!await exists(fs, mutation.root, inBook(book, "\u8BBE\u5B9A.md"), signal)) return void 0;
    if (!await exists(fs, mutation.root, inBook(book, "\u5C0F\u8282\u5927\u7EB2.md"), signal)) {
      return `Oh Story \u963B\u6B62\u5199\u5165\u77ED\u7BC7\u6B63\u6587 ${mutation.path}\uFF1A\u7F3A\u5C11\u540C\u76EE\u5F55 ${inBook(book, "\u5C0F\u8282\u5927\u7EB2.md")}\u3002\u5148\u6309 story-short-write \u5B8C\u6210\u300C\u5C0F\u8282\u5927\u7EB2.md\u300D\u518D\u5199\u6B63\u6587\u3002`;
    }
    return void 0;
  }
  if (mutation.chapter === void 0) return void 0;
  if (!await isLongFormBook(fs, mutation.root, book, signal)) return void 0;
  const trackingPresent = await hasTrackingState(fs, mutation.root, book, signal);
  if (!trackingPresent && await hasImportSignal(fs, mutation.root, book, signal)) {
    return void 0;
  }
  const existingChapter = await exists(fs, mutation.root, mutation.path, signal);
  if (!existingChapter) {
    const outlines = await chapterOutlines(fs, mutation.root, book, mutation.chapter, signal);
    const [first] = outlines;
    if (first !== void 0) {
      let hasContent = false;
      for (const outline of outlines) {
        if (!await outlineIsEmpty(fs, outline.target, signal)) {
          hasContent = true;
          break;
        }
      }
      if (!hasContent) {
        return `Oh Story \u963B\u6B62\u5199\u5165\u7B2C ${String(mutation.chapter)} \u7AE0\uFF1A\u7EC6\u7EB2 ${inBook(book, "\u5927\u7EB2")}/${first.name} \u662F\u7A7A\u7684\uFF08\u4E0D\u8BA1 # \u53F7\u548C\u7A7A\u767D\u4E0D\u5230 ${String(OUTLINE_MIN_CHARS)} \u5B57\uFF09\u3002\u5148\u6309 story-long-write \u5355\u7AE0\u6D41\u7A0B\u628A\u7EC6\u7EB2\u5199\u5B8C\u6574\uFF08\u8FD9\u7AE0\u53D1\u751F\u4EC0\u4E48\u3001\u4E3B\u89D2\u505A\u4EC0\u4E48\u9009\u62E9\uFF09\uFF0C\u518D\u5199\u6B63\u6587\u3002`;
      }
    } else {
      const padded = String(mutation.chapter).padStart(3, "0");
      return `Oh Story \u963B\u6B62\u5199\u5165\u7B2C ${String(mutation.chapter)} \u7AE0\uFF1A\u672A\u627E\u5230\u5BF9\u5E94\u7684 ${inBook(book, "\u5927\u7EB2")}/\u7EC6\u7EB2_\u7B2C${padded}\u7AE0*.md\u3002\u5148\u6309 story-long-write \u5355\u7AE0\u6D41\u7A0B\u8865\u5EFA\u7EC6\u7EB2\u518D\u5199\u6B63\u6587\u3002`;
    }
  }
  if (trackingPresent) {
    const checkpointIssue = await trackingCheckpointHardIssue(fs, mutation.root, book, signal);
    if (checkpointIssue !== void 0) {
      return `Oh Story \u963B\u6B62\u5199\u5165\u7B2C ${String(mutation.chapter)} \u7AE0\uFF1A${checkpointIssue}\u3002`;
    }
  }
  return void 0;
}
async function decideStoryMutation(exec, next) {
  const fs = exec.agent?.ctx.get("fs");
  if (fs === void 0) return next();
  const resolved = await storyMutation(exec, fs);
  if (resolved === void 0) return next();
  const reason = await validateStoryMutation(fs, resolved.mutation, exec.signal);
  if (reason !== void 0) return { kind: "deny", reason };
  return next();
}
var ANALYSIS_INPUT = /^输入-(RAW|REUSE)-(\d+)-(\d+)\.md$/u;
var ANALYSIS_INPUT_RULE = "\u53EA\u5141\u8BB8\u5199\u8C03\u7528\u65B9\u7ED9\u7684 {\u62C6\u6587\u76EE\u5F55}/_analysis_cache/\u8F93\u5165-{\u6279\u6B21ID}.md\uFF08\u6279\u6B21 ID \u5982 RAW-4-6\uFF09\uFF0C\u4E0D\u5199\u5176\u4ED6\u6587\u4EF6\u3002";
function isFileMutationCall(name2, args) {
  if (name2 === "write" || name2 === "edit") return true;
  return name2 === "str_replace_editor" && argumentRecord(args)?.command !== "view";
}
function displayParent(path) {
  const index = Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\"));
  return index <= 0 ? path.slice(0, index + 1) : path.slice(0, index);
}
function displayName(path) {
  return path.slice(Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\")) + 1);
}
async function isAnalysisDirectory(fs, directory, signal) {
  return await exists(fs, directory, "chapter_index.csv", signal) || await exists(fs, directory, "_progress.md", signal);
}
async function validateAnalysisInputWrite(fs, cwd, path, signal) {
  const deny = (shown, reasons2) => `Oh Story \u963B\u6B62 chapter-extractor \u5199\u5165 ${shown}\uFF1A${reasons2.join("\uFF1B")}\u3002${ANALYSIS_INPUT_RULE}`;
  if (path === void 0) return deny("\uFF08\u672A\u7ED9\u51FA\u8DEF\u5F84\uFF09", ["\u5199\u5165\u6CA1\u6709\u7ED9\u51FA\u6587\u4EF6\u8DEF\u5F84"]);
  let rootTarget;
  let fileTarget;
  try {
    [rootTarget, fileTarget] = await Promise.all([
      fs.resolve(cwd, signal === void 0 ? {} : { signal }),
      fs.resolve(path, { cwd, ...signal === void 0 ? {} : { signal } })
    ]);
  } catch {
    return deny(path, ["\u8DEF\u5F84\u65E0\u6CD5\u89E3\u6790"]);
  }
  const reasons = [];
  const match = ANALYSIS_INPUT.exec(displayName(fileTarget.displayPath));
  if (match === null) reasons.push("\u6587\u4EF6\u540D\u5FC5\u987B\u662F \u8F93\u5165-{RAW|REUSE}-{\u8D77\u7AE0}-{\u6B62\u7AE0}.md");
  else if (Number(match[2]) < 1 || Number(match[3]) < Number(match[2])) reasons.push("\u6279\u6B21\u7AE0\u53F7\u8303\u56F4\u65E0\u6548");
  const insideWorkspace = fs.contains(rootTarget, fileTarget);
  const cacheDirectory = displayParent(fileTarget.displayPath);
  if (displayName(cacheDirectory) !== "_analysis_cache") reasons.push("\u53EA\u80FD\u5199\u5728\u62C6\u6587\u76EE\u5F55\u7684 _analysis_cache/ \u4E0B");
  else if (insideWorkspace && !await isAnalysisDirectory(fs, displayParent(cacheDirectory), signal)) {
    reasons.push("\u4E0A\u7EA7\u76EE\u5F55\u4E0D\u662F\u62C6\u6587\u76EE\u5F55\uFF08\u7F3A chapter_index.csv \u4E0E _progress.md\uFF09");
  }
  if (!insideWorkspace) reasons.push("\u8DEF\u5F84\u5728\u9879\u76EE\u76EE\u5F55\u4E4B\u5916");
  return reasons.length === 0 ? void 0 : deny(path, reasons);
}
async function decideChapterExtractorWrite(exec, next) {
  if (ohStoryRoleOfSession(exec.agent?.session) !== "chapter-extractor" || !isFileMutationCall(exec.name, exec.arguments)) {
    return next();
  }
  const fs = exec.agent?.ctx.get("fs");
  const cwd = exec.agent?.session.header.cwd;
  const reason = fs === void 0 || cwd === void 0 ? `Oh Story \u963B\u6B62 chapter-extractor \u5199\u5165\uFF1A\u65E0\u6CD5\u786E\u8BA4\u9879\u76EE\u76EE\u5F55\u3002${ANALYSIS_INPUT_RULE}` : await validateAnalysisInputWrite(fs, cwd, mutationPath(exec.name, exec.arguments), exec.signal);
  return reason === void 0 ? next() : { kind: "deny", reason };
}
var PROSE_INSPECT_LIMIT = 128 * 1024;
var PROSE_SHORT_WRITE_BYTES = 200;
var QUOTED_DIALOGUE_LINE = /「[^」]*」|『[^』]*』|【[^】]*】|“[^”]*”|"[^"]*"/gu;
var TERMINAL_PUNCTUATION = new Set(Array.from('\u3002\uFF01\uFF1F\u2026\u201D\u300F\u300D\uFF09)!?.~\u2014\u3011"'));
var END_SIGNOFF_LINE = /^[-—~～＜<【[（(《\s]*(?:全文完|正文完|全书完|本卷完|完结|完|END|End|end|THE\s+END|The\s+End|the\s+end)[-—~～＞>】\]）)》.。！!\s]*$/u;
function isSkippableProseLine(line) {
  return line === "" || line.startsWith("#") || line === "---" || /^[-—=*·•\s]+$/u.test(line) || END_SIGNOFF_LINE.test(line);
}
var HARD_DEFECT_PATTERNS = [
  { pattern: /\uFFFD/u, label: "\u51FA\u73B0\u4E71\u7801\u66FF\u6362\u5B57\u7B26\uFF08\uFFFD\uFF09" },
  { pattern: /^(?:Sure|Certainly|Here'?s|As an AI|I (?:cannot|can't|am unable|apologize))\b/u, label: "\u51FA\u73B0\u82F1\u6587 AI \u5143\u4FE1\u606F\u524D\u7F00", stripDialogue: true },
  {
    pattern: /我(?:无法|不能)(?:继续(?:写|创作|生成|下去|输出)?|生成(?:内容|文本|正文)?|创作|续写|写作|完成(?:这个|本)?(?:章|篇|创作|请求)?)/u,
    label: "\u53D9\u8FF0\u4E2D\u51FA\u73B0\u751F\u6210\u62D2\u7EDD\u8BED",
    stripDialogue: true
  },
  { pattern: /[（(](?:此处|以下|这里|下文|后续)?[^）)]{0,10}(?:省略|略去|略过)[^）)]{0,10}[）)]/u, label: "\u51FA\u73B0\u62EC\u53F7\u7701\u7565\u5360\u4F4D\u7B26" },
  { pattern: /(?:未完待续|TODO|占位符|placeholder|待补充|此处待填|此处待补)/u, label: "\u51FA\u73B0\u672A\u5B8C\u6210\u5360\u4F4D\u8BCD" },
  {
    pattern: /作为(?:一个)?(?:AI|人工智能|大?语言模型|智能助手|聊天助手)(?:语言模型|大?模型|助手|机器人)?(?=[，,。、；;：:！!？?\s）)」』"】]|我|无法|不能|没法|$)/u,
    label: "\u53D9\u8FF0\u4E2D\u51FA\u73B0 AI \u81EA\u6307\u5143\u4FE1\u606F",
    stripDialogue: true
  },
  {
    pattern: /细纲|(?<!剧)情节点|卷纲|功能标签|目标情绪|字数目标|字数口径|章首钩子|章尾钩子|这章不能说破|本章禁止提前释放|排纲笔记|排纲底稿|任务描述/u,
    label: "\u53D9\u8FF0\u4E2D\u6CC4\u6F0F\u5199\u4F5C\u5DE5\u7A0B\u8BCD",
    stripDialogue: true
  }
];
function detectProseHardDefects(content) {
  const warnings = /* @__PURE__ */ new Set();
  const proseLines = [];
  for (const raw of content.split(/\r?\n/u)) {
    const line = raw.trim();
    if (isSkippableProseLine(line)) continue;
    proseLines.push(line);
    const outsideQuotes = line.replace(QUOTED_DIALOGUE_LINE, "\uFF1F");
    for (const rule of HARD_DEFECT_PATTERNS) {
      const sample = rule.stripDialogue === true ? outsideQuotes : line;
      if (rule.pattern.test(sample)) warnings.add(rule.label);
    }
  }
  for (let index = 1; index < proseLines.length; index += 1) {
    const current = proseLines[index];
    if (current === proseLines[index - 1] && Array.from(current).length >= 8) {
      warnings.add("\u51FA\u73B0\u7D27\u90BB\u884C\u91CD\u590D");
      break;
    }
  }
  if (proseLines.length > 0) {
    const last = proseLines[proseLines.length - 1];
    const lastChar = Array.from(last).at(-1);
    if (lastChar !== void 0 && !TERMINAL_PUNCTUATION.has(lastChar)) {
      warnings.add("\u7ED3\u5C3E\u7591\u4F3C\u622A\u65AD\uFF08\u672A\u4EE5\u6807\u70B9\u6536\u675F\uFF09");
    }
  }
  return [...warnings];
}
async function duplicateChapterTitleDefects(fs, root, book, signal) {
  const entries = await target(fs, root, inBook(book, "\u6B63\u6587"), signal).then((directory) => fs.listDir(directory, signal)).catch(() => []);
  const titles = /* @__PURE__ */ new Map();
  for (const entry of entries) {
    if (entry.type !== "file" || !entry.name.endsWith(".md")) continue;
    const match = /^第0*\d+章[_\- \u3000]+(.+)$/u.exec(entry.name.slice(0, -3));
    const title = match?.[1]?.trim();
    if (title === void 0 || title === "") continue;
    titles.set(title, [...titles.get(title) ?? [], entry.name]);
  }
  const findings = [];
  for (const [title, files] of titles.entries()) {
    if (files.length > 1) {
      findings.push(`\u7AE0\u8282\u6807\u9898\u91CD\u590D\u300C${title}\u300D\uFF08${files.sort().join("\u3001").slice(0, 60)}\uFF09`);
    }
  }
  return findings;
}
async function inspectWrittenProse(fs, root, book, path, kind, signal) {
  const findings = [];
  if (fs.readBytes !== void 0) {
    try {
      const file = await target(fs, root, path, signal);
      const bytes = await fs.readBytes(file, signal, PROSE_INSPECT_LIMIT);
      if (bytes.byteLength < PROSE_SHORT_WRITE_BYTES) {
        findings.push(`\u6B63\u6587\u4EC5 ${String(bytes.byteLength)} \u5B57\u8282\uFF0C\u7591\u4F3C\u672A\u5199\u5B8C\u6216\u843D\u76D8\u4E0D\u5B8C\u6574`);
      }
      const content = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes);
      findings.push(...detectProseHardDefects(content));
    } catch {
    }
  }
  if (kind === "long") {
    findings.push(...await duplicateChapterTitleDefects(fs, root, book, signal));
  }
  return findings;
}
function postWriteReminderText(path, options = {}) {
  if (options.hardDefectsOnly === true) {
    return [
      `<oh-story-post-write>\u6B63\u6587 ${path} \u5DF2\u53D8\u66F4\u3002`,
      ...options.hardDefects !== void 0 && options.hardDefects.length > 0 ? [`\u68C0\u6D4B\u5230\u7591\u4F3C\u786C\u4F24\uFF08${options.hardDefects.join("\uFF1B")}\uFF09\uFF0C\u8BF7\u5728\u6536\u5C3E\u6216\u7EE7\u7EED\u524D\u6838\u67E5\u5E76\u4FEE\u6B63\u6B63\u6587\uFF0C\u52FF\u5C06\u5360\u4F4D\u8BCD\u6216\u5DE5\u7A0B\u8BCD\u7559\u5230\u6210\u7A3F\u3002`] : [],
      "</oh-story-post-write>"
    ].join("");
  }
  return [
    `<oh-story-post-write>\u6B63\u6587 ${path} \u5DF2\u53D8\u66F4\u3002`,
    ...options.hardDefects !== void 0 && options.hardDefects.length > 0 ? [`\u68C0\u6D4B\u5230\u7591\u4F3C\u786C\u4F24\uFF08${options.hardDefects.join("\uFF1B")}\uFF09\uFF0C\u8BF7\u5728\u6536\u5C3E\u6216\u7EE7\u7EED\u524D\u6838\u67E5\u5E76\u4FEE\u6B63\u6B63\u6587\uFF0C\u52FF\u5C06\u5360\u4F4D\u8BCD\u6216\u5DE5\u7A0B\u8BCD\u7559\u5230\u6210\u7A3F\u3002`] : [],
    "\u6BCF\u6B21\u5199\u5165\u6B63\u6587\u90FD\u4F1A\u51FA\u73B0\u8FD9\u6761\u63D0\u9192\uFF0C\u4E00\u7AE0\u5199\u5230\u4E00\u534A\u65F6\u4E5F\u4F1A\uFF1B\u5B83\u4E0D\u8868\u793A\u672C\u7AE0\u5DF2\u7ECF\u5B8C\u6210\uFF0C\u4E5F\u4E0D\u662F\u4F5C\u8005\u7684\u65B0\u5199\u4F5C\u8981\u6C42\uFF0C\u7EE7\u7EED\u5F53\u524D\u6B65\u9AA4\u5373\u53EF\u3002",
    ...options.trackingUninitialized === true ? [
      "\u672C\u4E66\u8FD8\u6CA1\u6709 \u8FFD\u8E2A/_tracking-state.json\u3002\u65B0\u4E66\u5199\u7B2C\u4E00\u7AE0\u65F6\uFF0Cdraft \u4E4B\u524D\u5148\u6309 story-long-write workflow-chapter \u5F00\u5934\u7684\u521D\u59CB\u5316\u6B65\u9AA4\u5B8C\u6574\u8BFB\u53D6 references/tracking-initialization.md\uFF0C\u6784\u9020 last_chapter=0 \u7684\u521D\u59CB\u5316\u4E8B\u52A1\u5B58\u4E66\u76EE\u5F55 .story/work/init.json\uFF0C\u8FD0\u884C scripts/tracking_commit.js init\uFF0C\u518D\u8FD0\u884C tracking_commit.js check\uFF0C\u901A\u8FC7\u540E\u5220\u6389 init.json\uFF1B",
      "\u4E66\u91CC\u5728\u672C\u7AE0\u4E4B\u524D\u5DF2\u6709\u6B63\u6587\u65F6\u4E0D\u8981\u521D\u59CB\u5316\uFF0C\u505C\u4E0B\u6765\u6539\u8D70 story-import \u7684\u300C\u65E7\u8FFD\u8E2A\u9879\u76EE\u8FC1\u79FB\u300D\u3002"
    ] : [],
    "\u7B49\u672C\u7AE0\u5199\u5B8C\u6536\u5C3E\u65F6\u518D\u63D0\u4EA4\u8FFD\u8E2A\uFF1A\u65B0\u7AE0\u5148\u7528 story-long-write \u7684 scripts/tracking_commit.js draft \u751F\u6210\u672C\u7AE0\u8349\u7A3F\uFF0C\u586B\u597D\u540E\u6267\u884C scripts/storyctl.js chapter commit\uFF08\u4F5C\u8005\u63A5\u53D7\u5F53\u524D\u957F\u5EA6\u65F6\u7528 chapter accept-current-length\uFF09\uFF1B",
    "\u82E5 commit \u8FD4\u56DE review_required\uFF08\u8F6F\u95E8\u7981\u91CD\u70B9\u590D\u6838\uFF09\uFF0C\u4F18\u5148\u4FEE\u6539\u5BF9\u5E94\u5904\uFF1B\u5982\u786E\u8BA4\u5267\u60C5\u9700\u8981\u4FDD\u7559\uFF0C\u91CD\u65B0\u6267\u884C commit \u5E76\u9644 `--ack <rule-id>:<\u7406\u7531>`\uFF08\u6216 `--ack-all <\u7406\u7531>`\uFF09\u3002",
    "\u4FEE\u6539\u5DF2\u63D0\u4EA4\u7684\u7AE0\u8282\u6309 workflow-revision \u63D0\u4EA4\u4E00\u6B21 mode=revision \u4E8B\u52A1\uFF1B\u5BFC\u5165\u65E2\u6709\u6B63\u6587\u65F6\u7531 story-import \u5728\u8FC1\u79FB\u540E\u7528 tracking_commit.js init \u7EDF\u4E00\u521D\u59CB\u5316\u3002",
    "\u8FFD\u8E2A/_tracking-state.json \u4EE5\u53CA \u4E0A\u4E0B\u6587.md\u3001\u89D2\u8272\u72B6\u6001/\u3001\u4F0F\u7B14.md\u3001\u65F6\u95F4\u7EBF/\u3001\u9010\u7AE0\u8BB0\u5F55/ \u7B49\u6D3E\u751F Tracking \u89C6\u56FE\u53EA\u7531\u8FD9\u4E9B\u811A\u672C\u5199\u5165\uFF0C\u7EDD\u4E0D\u624B\u6539\u3002</oh-story-post-write>"
  ].join("");
}
function registerOhStoryHooks(context) {
  context.on("session/event", (session, event) => {
    observeOhStoryRoleDescriptor(session, event);
  });
  context.on("tools/pre-execute", decideChapterExtractorWrite);
  context.on("tools/pre-execute", decideStoryMutation);
  context.on("tools/post-execute", async (exec, result, next) => {
    const downstream = await next();
    if (result.isError || downstream.kind !== "accept") return downstream;
    if (ohStoryRoleOfSession(exec.agent?.session) !== void 0) return downstream;
    const fs = exec.agent?.ctx.get("fs");
    const resolved = fs === void 0 ? void 0 : await storyMutation(exec, fs);
    if (fs === void 0 || resolved === void 0) return downstream;
    const { mutation, book, kind } = resolved;
    const { root } = mutation;
    if (!await isPostWriteProseBook(fs, root, book, kind, exec.signal)) return downstream;
    const longFormTrackingBook = kind === "long" && await isLongFormBook(fs, root, book, exec.signal);
    const [trackingPresent, importing, hardDefects] = await Promise.all([
      longFormTrackingBook ? hasTrackingState(fs, root, book, exec.signal) : Promise.resolve(false),
      longFormTrackingBook ? hasImportSignal(fs, root, book, exec.signal) : Promise.resolve(false),
      inspectWrittenProse(fs, root, book, mutation.path, kind, exec.signal)
    ]);
    if (!longFormTrackingBook && hardDefects.length === 0) return downstream;
    const trackingUninitialized = longFormTrackingBook && !trackingPresent && !importing;
    const reminder = createUserMessage({
      source: {
        kind: "oh-story-post-write",
        form: "notice",
        summary: boundContextSummary(hardDefects.length > 0 ? `\u6B63\u6587 ${mutation.path} \u5DF2\u53D8\u66F4\uFF08\u542B\u786C\u4F24\u63D0\u9192\uFF09` : `\u6B63\u6587 ${mutation.path} \u5DF2\u53D8\u66F4`)
      },
      content: [{
        type: "text",
        text: postWriteReminderText(mutation.path, {
          trackingUninitialized,
          hardDefects,
          hardDefectsOnly: !longFormTrackingBook
        })
      }]
    });
    return {
      ...downstream,
      additionalContexts: [...downstream.additionalContexts ?? [], reminder]
    };
  });
}

// src/role-tool.ts
import { randomUUID } from "node:crypto";
import { defineTool as defineTool2 } from "@deepseek-ai/dsh-tools";

// src/reference-tool.ts
import { readdir as readdir2, readFile as readFile3, realpath } from "node:fs/promises";
import { isAbsolute as isAbsolute2, join as join4, relative as relative2, resolve as resolve5 } from "node:path";
import { defineTool } from "@deepseek-ai/dsh-tools";
var OH_STORY_REFERENCE_TOOL_NAME = "oh_story_bundled_reference";
async function collectMarkdown(root, directory = root) {
  const entries = await readdir2(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join4(directory, entry.name);
    if (entry.isDirectory()) return collectMarkdown(root, path);
    return entry.isFile() && entry.name.endsWith(".md") ? [path] : [];
  }));
  return nested.flat();
}
async function bundledReferences(storySetupRoot) {
  const root = await realpath(resolve5(storySetupRoot));
  const referenceRoot = await realpath(join4(root, "references", "agent-references"));
  const referenceDirectory = relative2(root, referenceRoot);
  if (referenceDirectory === "" || referenceDirectory.startsWith("..") || isAbsolute2(referenceDirectory)) {
    throw new Error("Bundled Oh Story reference directory escaped its package root.");
  }
  const values = await Promise.all((await collectMarkdown(referenceRoot)).map(async (path) => {
    const canonicalPath = await realpath(path);
    const inside = relative2(referenceRoot, canonicalPath);
    if (inside === "" || inside.startsWith("..") || isAbsolute2(inside)) {
      throw new Error(`Bundled Oh Story reference escaped its package root: ${path}`);
    }
    return {
      canonicalPath,
      name: `story-setup/references/agent-references/${inside.replaceAll("\\", "/")}`
    };
  }));
  return values.sort((left, right) => left.name.localeCompare(right.name));
}
async function createOhStoryReferenceTool(storySetupRoot = join4(defaultBundledSkillRoot(), "story-setup")) {
  const references = await bundledReferences(storySetupRoot);
  if (references.length === 0) throw new Error("No bundled Oh Story references were found.");
  const paths = references.map((reference) => reference.name);
  const byName = new Map(references.map((reference) => [reference.name, reference.canonicalPath]));
  return defineTool({
    name: OH_STORY_REFERENCE_TOOL_NAME,
    description: "Read one exact, pinned Oh Story story-setup reference bundled with this plugin. This does not resolve project Skills or workspace files.",
    parameters: {
      reference: {
        type: "string",
        required: true,
        enum: paths,
        description: "The exact story-setup reference path named by the active bundled Role."
      }
    },
    output: {
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          reference: { type: "string", required: true },
          content: { type: "string", required: true }
        }
      },
      render: (_args, value) => [{
        type: "text",
        text: `Bundled Oh Story reference: ${value.reference}

${value.content}`
      }]
    },
    isConcurrencySafe: () => true,
    async execute(args) {
      const path = byName.get(args.reference);
      if (path === void 0) throw new Error(`Oh Story reference is not bundled: ${args.reference}`);
      return { reference: args.reference, content: await readFile3(path, "utf8") };
    }
  });
}
function bundledReferenceGuard(definition, tools) {
  return (execution) => execution.name === OH_STORY_REFERENCE_TOOL_NAME && tools.get(OH_STORY_REFERENCE_TOOL_NAME, execution.agent) !== definition ? "The pinned Oh Story reference tool was shadowed in this Agent scope." : void 0;
}

// src/role-tool.ts
var OH_STORY_ROLE_TOOL_NAME = "oh_story_role";
var configuredRoleAgents = /* @__PURE__ */ new WeakSet();
function restrictableRoleTools(tools, agent, requested) {
  if (typeof tools?.get !== "function") return requested;
  return requested.filter((name2) => tools.get(name2) !== void 0 && tools.get(name2, agent) !== void 0);
}
function configureRoleAgent(agent, role, persona, allow) {
  if (configuredRoleAgents.has(agent)) return;
  const systemPrompt = agent.ctx.get("systemPrompt");
  const tools = agent.ctx.get("tools");
  if (systemPrompt === void 0 || tools === void 0) throw new Error("Oh Story Role requires the DSH prompt and tool services.");
  systemPrompt.section({
    name: "deployment:persona-prefix",
    order: systemPrompt.getSectionOrder("DEPLOYMENT_PERSONA_PREFIX"),
    text: persona
  });
  tools.restrict({ allow: restrictableRoleTools(tools, agent, allow) });
  markOhStoryRoleSession(agent.session, role);
  configuredRoleAgents.add(agent);
}
async function startRole(runtime, role, request) {
  if (!("startActivation" in runtime)) return runtime.start("spawn", request);
  const childId = randomUUID();
  let configured2 = false;
  const unobserve = request.parent.ctx.on("agent/created", ({ agent }) => {
    if (agent.id !== childId) return;
    configureRoleAgent(agent, role, request.persona, request.toolFilter.allow);
    configured2 = true;
  }, { global: true });
  try {
    const task = { parent: request.parent, prompt: request.prompt, maxDepth: request.maxDepth };
    const activation = await runtime.startActivation({
      provider: "spawn",
      label: request.label,
      childId,
      ...task,
      request: task,
      signal: request.signal,
      delivery: "caller"
    });
    if (!configured2) {
      await activation.dispose();
      throw new Error("DSH did not initialize the Oh Story Role child before publication.");
    }
    let disposal;
    const dispose = () => {
      request.signal.removeEventListener("abort", cancel);
      return disposal ??= activation.dispose();
    };
    const cancel = () => {
      void dispose().catch(() => {
      });
    };
    request.signal.addEventListener("abort", cancel, { once: true });
    if (request.signal.aborted) cancel();
    return { id: activation.childId, result: activation.result, dispose };
  } finally {
    unobserve();
  }
}
var roleTools = {
  // Oh Story 0.8.0 lets the extractor write its own batch input file (never
  // bash). native-hooks fences write/edit to {拆文目录}/_analysis_cache/输入-*.md.
  "chapter-extractor": ["read", "glob", "grep", "write", "edit"],
  "character-designer": [OH_STORY_REFERENCE_TOOL_NAME, "read", "glob", "grep", "write", "edit"],
  "consistency-checker": [OH_STORY_REFERENCE_TOOL_NAME, "read", "glob", "grep"],
  "narrative-writer": [OH_STORY_REFERENCE_TOOL_NAME, "read", "glob", "grep", "write", "edit", "bash"],
  "story-architect": [OH_STORY_REFERENCE_TOOL_NAME, "read", "glob", "grep", "write", "edit"],
  // Oh Story 0.8.2 moved benchmark_style_load's procedure into agent-references/benchmark-style-load.md.
  "story-explorer": [OH_STORY_REFERENCE_TOOL_NAME, "read", "glob", "grep"],
  "story-researcher": ["read", "glob", "grep", "bash", "write", "web_search", "web_fetch"]
};
function roleToolFilter(role) {
  return { allow: roleTools[role] };
}
function resultText(output) {
  return output.map((block) => block.type === "text" ? block.text : JSON.stringify(block)).join("\n");
}
async function createOhStoryRoleTool(subagents, loadedPersonas) {
  const personas = loadedPersonas ?? await loadBundledRolePersonas();
  return defineTool2({
    name: OH_STORY_ROLE_TOOL_NAME,
    description: "Run one focused Oh Story specialist as a child of the current DSH Agent. The child inherits DSH model, workspace, permissions, lifecycle, and UI.",
    parameters: {
      role: {
        type: "string",
        required: true,
        enum: OH_STORY_ROLE_NAMES,
        description: "The exact Oh Story Role to run."
      },
      prompt: {
        type: "string",
        required: true,
        description: "A self-contained task. The child inherits the current DSH workspace but not the current in-flight turn."
      }
    },
    output: {
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          role: { type: "string", required: true, enum: OH_STORY_ROLE_NAMES },
          runId: { type: "string", required: true },
          content: { type: "array", required: true, items: { type: "json" } }
        }
      },
      render: (_args, value) => [{ type: "text", text: resultText(value.content) }]
    },
    isConcurrencySafe: () => true,
    async execute(args, exec) {
      if (exec.agent === void 0) throw new Error("oh_story_role requires a calling DSH Agent.");
      const persona = personas.get(args.role);
      if (persona === void 0) throw new Error(`Oh Story Role ${args.role} is not bundled.`);
      const allowed = restrictableRoleTools(exec.agent.ctx.tools, exec.agent, roleToolFilter(args.role).allow);
      const runtime = subagents ?? exec.agent.ctx.get("subagents");
      if (runtime === void 0) throw new Error("oh_story_role requires the DSH subagent runtime.");
      const run = await startRole(runtime, args.role, {
        // DSH persists this label in the child's subagent/descriptor; the
        // native hooks read the Role back from it before the child's first tool call.
        label: ohStoryRoleLabel(args.role),
        prompt: [{ type: "text", text: args.prompt }],
        parent: exec.agent,
        persona,
        toolFilter: { allow: allowed },
        maxDepth: 1,
        signal: exec.signal
      });
      if (run.localAgent !== void 0) markOhStoryRoleSession(run.localAgent.session, args.role);
      try {
        const result = await run.result;
        if (result.stopReason !== "completed") {
          throw new Error(`Oh Story Role ${args.role} ended with ${result.stopReason}${result.diagnostic === void 0 ? "" : `: ${result.diagnostic}`}`);
        }
        return {
          role: args.role,
          runId: run.id,
          content: result.output
        };
      } finally {
        await run.dispose();
      }
    }
  });
}
async function registerOhStoryRoleTool(context) {
  const [personas, referenceDefinition] = await Promise.all([
    loadBundledRolePersonas(),
    createOhStoryReferenceTool()
  ]);
  const definition = await createOhStoryRoleTool(context.subagents, personas);
  if (context.fiber?.uid === null) return;
  context.tools.register(referenceDefinition);
  context.tools.guard(bundledReferenceGuard(referenceDefinition, context.tools));
  if ("startActivation" in context.subagents) {
    context.on("agent/created", ({ agent }) => {
      const events = agent.session.ownEvents();
      for (const event of events) observeOhStoryRoleDescriptor(agent.session, event);
      const role = ohStoryRoleOfSession(agent.session);
      if (role === void 0) return;
      const descriptor = events.find((event) => event.type === "subagent/descriptor")?.data;
      if (typeof descriptor?.persona === "string" && descriptor.toolFilter !== void 0) return;
      const persona = personas.get(role);
      if (persona === void 0) return;
      const tools = agent.ctx.get("tools");
      const allow = restrictableRoleTools(tools, agent, roleToolFilter(role).allow);
      configureRoleAgent(agent, role, persona, allow);
    });
  }
  let dispose;
  const mount = () => {
    dispose ??= context.tools.register(definition);
  };
  const unmount = () => {
    dispose?.();
    dispose = void 0;
  };
  context.on("subagent/provider-added", (provider) => {
    if (provider.name === "spawn") mount();
  });
  context.on("subagent/provider-removed", (name2) => {
    if (name2 === "spawn") unmount();
  });
  if (context.subagents.getProvider("spawn") !== void 0) mount();
}

// src/production-tool.ts
import { defineTool as defineTool3 } from "@deepseek-ai/dsh-tools";

// src/production-intent.ts
var OH_STORY_PRODUCTION_TOOL_NAME = "oh_story_production";
var PRODUCTION_INTENT_ACTIONS = [
  "open_section",
  "focus_target",
  "set_sequence",
  "track_job"
];
var PRODUCTION_INTENT_SECTIONS = ["shots", "assets", "tasks", "sequence", "canvas"];
var PRODUCTION_INTENT_JOB_KINDS = ["image", "video", "composition"];
function requiredText(value, field) {
  const normalized = value?.trim();
  if (!normalized) throw new Error(`oh_story_production ${field} is required for this action.`);
  if (normalized.length > 512) throw new Error(`oh_story_production ${field} is too long.`);
  return normalized;
}
function validateProductionIntent(args) {
  const episode = args.episode.trim().replaceAll("\\", "/").replace(/\/$/u, "");
  if (!/^剧集\/EP\d{3,}$/u.test(episode)) {
    throw new Error("oh_story_production episode must use the creator path form \u5267\u96C6/EP001.");
  }
  if (args.action === "open_section") {
    if (args.section === void 0) throw new Error("oh_story_production section is required for open_section.");
    return { action: args.action, episode, section: args.section };
  }
  if (args.action === "focus_target") {
    return { action: args.action, episode, targetId: requiredText(args.targetId, "targetId"), section: args.section };
  }
  if (args.action === "set_sequence") {
    const shotIds = args.shotIds?.map((value) => value.trim()).filter((value) => value !== "") ?? [];
    if (shotIds.length === 0) throw new Error("oh_story_production shotIds must contain at least one shot for set_sequence.");
    if (shotIds.length > 500 || new Set(shotIds).size !== shotIds.length || shotIds.some((value) => !/^SHOT-[A-Z0-9-]+$/u.test(value))) {
      throw new Error("oh_story_production shotIds must be unique canonical SHOT-* identifiers.");
    }
    return { action: args.action, episode, shotIds };
  }
  const expectedOutputs = args.expectedOutputs;
  if (expectedOutputs !== void 0 && (!Number.isInteger(expectedOutputs) || expectedOutputs < 1 || expectedOutputs > 500)) {
    throw new Error("oh_story_production expectedOutputs must be an integer between 1 and 500.");
  }
  if (args.jobKind === void 0) throw new Error("oh_story_production jobKind is required for track_job.");
  const prompt = args.prompt?.trim();
  return {
    action: args.action,
    episode,
    jobId: requiredText(args.jobId, "jobId"),
    targetId: requiredText(args.targetId, "targetId"),
    jobKind: args.jobKind,
    expectedOutputs,
    prompt: prompt === "" ? void 0 : prompt
  };
}

// src/production-tool.ts
function intentMessage(intent) {
  if (intent.action === "track_job") return `\u5DF2\u628A ${intent.targetId} \u7684 ${intent.jobKind} \u4EFB\u52A1\u540C\u6B65\u5230 ${intent.episode} \u7684\u4EFB\u52A1\u677F\u3002`;
  if (intent.action === "set_sequence") return `\u5DF2\u628A ${String(intent.shotIds.length)} \u4E2A\u955C\u5934\u7684\u987A\u5E8F\u53D1\u9001\u5230 ${intent.episode} \u6210\u7247\u89C6\u56FE\u3002`;
  if (intent.action === "focus_target") return `\u5DF2\u8BF7\u6C42 ${intent.episode} \u751F\u4EA7\u89C6\u56FE\u805A\u7126 ${intent.targetId}\u3002`;
  return `\u5DF2\u628A ${intent.action} \u754C\u9762\u610F\u56FE\u53D1\u9001\u5230 ${intent.episode} \u751F\u4EA7\u5DE5\u4F5C\u53F0\u3002`;
}
function createOhStoryProductionTool() {
  return defineTool3({
    name: OH_STORY_PRODUCTION_TOOL_NAME,
    description: "Operate the native oh-story short-drama production projection in the current DSH Session. It can open or focus semantic production targets, set an explicit shot order, or track a job the Agent is actually executing. It never controls cosmetic canvas layout, generates media, changes creator documents, or counts as creator confirmation for paid production.",
    parameters: {
      action: { type: "string", required: true, enum: PRODUCTION_INTENT_ACTIONS, description: "The exact production UI/task projection operation." },
      episode: { type: "string", required: true, description: "Creator-first episode directory, for example \u5267\u96C6/EP001." },
      section: { type: "string", enum: PRODUCTION_INTENT_SECTIONS },
      targetId: { type: "string" },
      shotIds: { type: "array", items: { type: "string" } },
      jobId: { type: "string", description: "Stable ID that must also appear in produced output filenames." },
      jobKind: { type: "string", enum: PRODUCTION_INTENT_JOB_KINDS },
      expectedOutputs: { type: "integer", description: "Number of media files this job will produce. Repeat the count the creator approved when re-registering a batch; omit it to keep the count the workbench already recorded." },
      prompt: { type: "string", description: "Exact prompt/specification for a tracked job; not a production authorization." }
    },
    output: {
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          action: { type: "string", required: true, enum: PRODUCTION_INTENT_ACTIONS },
          episode: { type: "string", required: true },
          message: { type: "string", required: true }
        }
      },
      render: (_args, value) => [{ type: "text", text: value.message }]
    },
    isConcurrencySafe: () => true,
    execute(args) {
      const intent = validateProductionIntent(args);
      return Promise.resolve({ action: intent.action, episode: intent.episode, message: intentMessage(intent) });
    }
  });
}
function registerOhStoryProductionTool(context) {
  context.tools.register(createOhStoryProductionTool());
}

// src/workspace-route.ts
import { createHash as createHash2, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { createReadStream } from "node:fs";
import { readFile as readFile4, realpath as nodeRealpath, stat as nodeStat } from "node:fs/promises";
import { dirname as dirname3, extname as extname2, isAbsolute as isAbsolute3, relative as relative3, resolve as resolve6 } from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath as fileURLToPath2 } from "node:url";
import { FsError } from "@deepseek-ai/dsh-fs";
import { SessionId } from "@deepseek-ai/dsh-session";

// src/creative-paths.ts
var STORY_DIRECTORIES = ["\u6B63\u6587", "\u5927\u7EB2", "\u8BBE\u5B9A", "\u8FFD\u8E2A", "\u5BF9\u6807", "\u53C2\u8003\u8D44\u6599", "\u62C6\u6587\u5E93", "\u626B\u699C", "\u5C01\u9762"];
var DRAMA_DIRECTORIES = ["\u8F93\u5165", "\u9879\u76EE\u5F00\u53D1", "\u8BBE\u5B9A\u96C6", "\u5267\u96C6", "\u4EA4\u4ED8", "\u521B\u4F5C\u8005\u51B3\u7B56", "\u5BA1\u67E5"];
var GAME_DIRECTORY = "game-adaptations";
var VIDEO_DIRECTORY = "video-recaps";
var CREATIVE_DIRECTORIES = [VIDEO_DIRECTORY, GAME_DIRECTORY, ...STORY_DIRECTORIES, ...DRAMA_DIRECTORIES];
var SHORT_STORY_FILES = ["\u6B63\u6587.md", "\u8BBE\u5B9A.md", "\u5C0F\u8282\u5927\u7EB2.md"];
var SHORT_STORY_FILE_SET = new Set(SHORT_STORY_FILES);
var ROOT_FILES = /* @__PURE__ */ new Set(["short-drama.json", ...SHORT_STORY_FILES]);
var SKIPPED_SCAN_DIRECTORIES = /* @__PURE__ */ new Set([
  "node_modules",
  ".git",
  "dist",
  ".next",
  ".vite",
  "__pycache__"
]);
var STORY_DIRECTORY_SET = new Set(STORY_DIRECTORIES);
var DRAMA_DIRECTORY_SET = new Set(DRAMA_DIRECTORIES);
var CREATIVE_DIRECTORY_SET = new Set(CREATIVE_DIRECTORIES);
var EDITABLE_EXTENSIONS = /* @__PURE__ */ new Set([".md", ".txt", ".json", ".jsonl"]);
var GAME_EDITABLE_EXTENSIONS = /* @__PURE__ */ new Set([...EDITABLE_EXTENSIONS, ".html", ".css", ".js", ".mjs", ".cjs", ".ts", ".tsx", ".jsx"]);
var VIDEO_EDITABLE_EXTENSIONS = /* @__PURE__ */ new Set([...EDITABLE_EXTENSIONS, ".srt", ".ass"]);
var PUBLISH_ROOT_FILE_PATTERN = /^发布资料(?:-[^/]+)?\.md$/u;
var MAX_BOOK_PREFIX_DEPTH = 4;
function pathExtension(path) {
  const slash = path.lastIndexOf("/");
  const name2 = slash < 0 ? path : path.slice(slash + 1);
  const dot = name2.lastIndexOf(".");
  return dot <= 0 ? "" : name2.slice(dot).toLowerCase();
}
function isPublishRootFile(name2) {
  return !name2.includes("/") && PUBLISH_ROOT_FILE_PATTERN.test(name2);
}
function safeRelativePath(path) {
  return path !== "" && !path.startsWith("/") && !path.includes("\\") && !path.split("/").some((segment) => segment === "" || segment.startsWith("."));
}
function multiBookCreativeRoot(path) {
  const parts = path.split("/");
  if (parts.length < 2) return void 0;
  const maxPrefix = Math.min(MAX_BOOK_PREFIX_DEPTH, parts.length - 1);
  for (let bookDepth = 1; bookDepth <= maxPrefix; bookDepth += 1) {
    const prefix = parts.slice(0, bookDepth);
    if (prefix.some((segment) => segment === "" || SKIPPED_SCAN_DIRECTORIES.has(segment) || CREATIVE_DIRECTORY_SET.has(segment))) {
      return void 0;
    }
    const child = parts[bookDepth];
    if (parts.length >= bookDepth + 2 && STORY_DIRECTORY_SET.has(child)) {
      return `${prefix.join("/")}/${child}`;
    }
    if (parts.length === bookDepth + 1 && (SHORT_STORY_FILE_SET.has(child) || isPublishRootFile(child))) {
      return prefix.join("/");
    }
  }
  return void 0;
}
function isMultiBookStoryPath(path) {
  return multiBookCreativeRoot(path) !== void 0;
}
function isCreativeRootPath(path) {
  const root = path.split("/", 1)[0];
  return root !== void 0 && CREATIVE_DIRECTORY_SET.has(root) || ROOT_FILES.has(path) || isPublishRootFile(path) || isMultiBookStoryPath(path);
}
function creativeRootDirectory(path) {
  if (!safeRelativePath(path)) return void 0;
  if (ROOT_FILES.has(path) || isPublishRootFile(path)) return "";
  const parts = path.split("/");
  const first = parts[0];
  if (first !== void 0 && CREATIVE_DIRECTORY_SET.has(first)) return first;
  return multiBookCreativeRoot(path);
}
function editableCreativePath(path) {
  const extensions = path.startsWith(`${GAME_DIRECTORY}/`) ? GAME_EDITABLE_EXTENSIONS : path.startsWith(`${VIDEO_DIRECTORY}/`) ? VIDEO_EDITABLE_EXTENSIONS : EDITABLE_EXTENSIONS;
  return extensions.has(pathExtension(path));
}

// src/video-project.ts
import { basename as basename2, extname } from "node:path";

// src/video-narrative.ts
var MAX_SEGMENTS = 1e3;
var MAX_SOURCE_RANGES = 32;
var MAX_SECONDS = 24 * 60 * 60;
var MAX_TEXT = 2e4;
var EPSILON = 1e-3;
var ORIGINAL_AUDIO_OWNERS = /* @__PURE__ */ new Set(["original_dialogue", "action_sound", "ambience", "music"]);
function record(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : void 0;
}
function list(value) {
  return Array.isArray(value) ? value : void 0;
}
function finiteTime(value) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= MAX_SECONDS ? value : void 0;
}
function roundTime(value) {
  return Math.round(value * 1e4) / 1e4;
}
function shortText(value) {
  if (typeof value !== "string") return void 0;
  const valueTrimmed = value.trim();
  return valueTrimmed === "" ? void 0 : valueTrimmed.slice(0, MAX_TEXT);
}
function optionalId(value) {
  return shortText(value)?.slice(0, 256);
}
function range(startValue, endValue) {
  const start = finiteTime(startValue);
  const end = finiteTime(endValue);
  return start !== void 0 && end !== void 0 && end - start > EPSILON ? { start, end } : void 0;
}
function outputRange(value, allowSourceFallback) {
  return range(value.output_start, value.output_end) ?? (allowSourceFallback ? range(value.source_start, value.source_end) : void 0);
}
function validatedClipMap(value) {
  const clips = list(record(value)?.clips);
  if (clips === void 0 || clips.length === 0 || clips.length > MAX_SEGMENTS) return void 0;
  const normalized = [];
  for (const candidate of clips) {
    const item = record(candidate);
    const source = item === void 0 ? void 0 : range(item.source_start, item.source_end);
    const output = item === void 0 ? void 0 : range(item.output_start, item.output_end);
    if (item === void 0 || source === void 0 || output === void 0) return void 0;
    normalized.push({
      start: source.start,
      end: source.end,
      outputStart: output.start,
      outputEnd: output.end,
      sourceId: optionalId(item.source_id),
      sourcePath: shortText(item.source_path)
    });
  }
  normalized.sort((left, right) => left.outputStart - right.outputStart || left.outputEnd - right.outputEnd);
  if (normalized.some((clip, index) => index > 0 && clip.outputStart < normalized[index - 1].outputEnd - EPSILON)) return void 0;
  return normalized;
}
function mappedSourceRanges(output, clips) {
  const overlapping = clips.filter((clip) => clip.outputEnd > output.start + EPSILON && clip.outputStart < output.end - EPSILON);
  if (overlapping.length === 0 || overlapping.length > MAX_SOURCE_RANGES) return void 0;
  const mapped = [];
  let coveredUntil = output.start;
  for (const clip of overlapping) {
    const overlapStart = Math.max(output.start, clip.outputStart);
    const overlapEnd = Math.min(output.end, clip.outputEnd);
    if (overlapStart > coveredUntil + EPSILON) return void 0;
    const outputDuration = clip.outputEnd - clip.outputStart;
    const sourceDuration = clip.end - clip.start;
    const scale = sourceDuration / outputDuration;
    mapped.push({
      start: roundTime(clip.start + (overlapStart - clip.outputStart) * scale),
      end: roundTime(clip.start + (overlapEnd - clip.outputStart) * scale),
      sourceId: clip.sourceId,
      sourcePath: clip.sourcePath
    });
    coveredUntil = Math.max(coveredUntil, overlapEnd);
  }
  return coveredUntil >= output.end - EPSILON ? mapped : void 0;
}
function identityMode(value) {
  return value === "full" || value === "preserve";
}
function narrationSegments(value, clips, identity) {
  const raw = list(value);
  if (raw === void 0) return { segments: [], invalid: value !== void 0 };
  const segments = [];
  let invalid = raw.length > MAX_SEGMENTS;
  for (const [index, candidate] of raw.slice(0, MAX_SEGMENTS).entries()) {
    const item = record(candidate);
    const output = item === void 0 ? void 0 : range(item.start, item.end);
    const text2 = item === void 0 ? void 0 : shortText(item.narration);
    if (output === void 0 || text2 === void 0) {
      invalid = true;
      continue;
    }
    const mapped = identity ? [output] : clips === void 0 ? void 0 : mappedSourceRanges(output, clips);
    segments.push({
      id: `narration-${String(index + 1)}`,
      index,
      kind: "narration",
      text: text2,
      output,
      sourceRanges: mapped ?? [],
      sourceMapping: identity ? "identity" : mapped === void 0 ? "unavailable" : "validated-clips"
    });
  }
  return { segments, invalid };
}
function originalSegments(value, clips, identity) {
  const items = list(record(value)?.items);
  if (items === void 0) return { segments: [], invalid: value !== void 0 };
  const segments = [];
  let invalid = items.length > MAX_SEGMENTS;
  for (const [index, candidate] of items.slice(0, MAX_SEGMENTS).entries()) {
    const item = record(candidate);
    if (item === void 0) {
      invalid = true;
      continue;
    }
    const owner = shortText(item.audio_owner);
    if (owner === void 0 || !ORIGINAL_AUDIO_OWNERS.has(owner)) continue;
    const output = outputRange(item, identity);
    if (output === void 0) {
      invalid = true;
      continue;
    }
    const explicitSource = range(item.source_start, item.source_end);
    const mapped = explicitSource === void 0 ? identity ? [output] : clips === void 0 ? void 0 : mappedSourceRanges(output, clips) : [{ ...explicitSource, sourceId: optionalId(item.source_id), sourcePath: shortText(item.source_path) }];
    segments.push({
      id: `original-${String(index + 1)}`,
      kind: "original",
      text: shortText(item.original_audio_anchor),
      output,
      sourceRanges: mapped ?? [],
      sourceMapping: explicitSource !== void 0 ? "explicit-board" : identity ? "identity" : mapped === void 0 ? "unavailable" : "validated-clips",
      beatId: optionalId(item.beat_id),
      audioOwner: owner
    });
  }
  return { segments, invalid };
}
function creativeSummary(value) {
  const plan = record(value);
  const intent = record(plan?.director_intent);
  const chosen = optionalId(plan?.chosen_hypothesis);
  const hypotheses = list(plan?.hypotheses) ?? [];
  const hypothesis = hypotheses.map(record).find((item) => optionalId(item?.id) === chosen);
  return {
    viewerPromise: shortText(intent?.viewer_promise),
    pov: shortText(intent?.pov),
    dramaticQuestion: shortText(intent?.dramatic_question),
    emotionalStart: shortText(intent?.emotional_start),
    emotionalEnd: shortText(intent?.emotional_end),
    endingAftertaste: shortText(intent?.ending_aftertaste),
    spine: shortText(hypothesis?.spine)
  };
}
function isTimelineV3(value) {
  if (value === void 0) return false;
  if (value.schema_version === 3) return true;
  const video = list(value.video);
  if (video === void 0 || video.length === 0) return false;
  const first = record(video[0]);
  return first !== void 0 && typeof first.in === "number" && typeof first.out === "number";
}
function projectTimelineV3(timeline, resolveSourcePath, storyPlan) {
  const sources = record(timeline.sources);
  const rawVideo = list(timeline.video);
  const clips = [];
  const timelineClips = [];
  const originals = [];
  let timelineInvalid = rawVideo === void 0 || rawVideo.length > MAX_SEGMENTS;
  let cursor = 0;
  if (rawVideo !== void 0) {
    for (const [index, candidate] of rawVideo.slice(0, MAX_SEGMENTS).entries()) {
      const item = record(candidate);
      const sourceSpan = item === void 0 ? void 0 : range(item.in, item.out);
      if (item === void 0 || sourceSpan === void 0) {
        timelineInvalid = true;
        continue;
      }
      const clipId = optionalId(item.id) ?? `v${String(index + 1)}`;
      const sourceId = optionalId(item.source);
      const mappedRawPath = sourceId !== void 0 ? shortText(sources?.[sourceId]) ?? sourceId : void 0;
      const sourcePath = mappedRawPath !== void 0 ? resolveSourcePath?.(mappedRawPath) ?? mappedRawPath : void 0;
      const duration = sourceSpan.end - sourceSpan.start;
      const outputStart = roundTime(cursor);
      const outputEnd = roundTime(cursor + duration);
      cursor += duration;
      clips.push({
        id: clipId,
        start: sourceSpan.start,
        end: sourceSpan.end,
        outputStart,
        outputEnd,
        sourceId,
        sourcePath
      });
      timelineClips.push({
        id: clipId,
        sourceId,
        sourcePath,
        source: { start: sourceSpan.start, end: sourceSpan.end, sourceId, sourcePath },
        output: { start: outputStart, end: outputEnd }
      });
      const keepWindows = list(item.keep_windows);
      if (keepWindows !== void 0) {
        for (const windowCandidate of keepWindows) {
          const pair = list(windowCandidate);
          const rawStart = pair === void 0 ? void 0 : finiteTime(pair[0]);
          const rawEnd = pair === void 0 ? void 0 : finiteTime(pair[1]);
          if (rawStart === void 0 || rawEnd === void 0 || rawEnd - rawStart <= EPSILON) {
            timelineInvalid = true;
            continue;
          }
          const clampedStart = Math.max(sourceSpan.start, rawStart);
          const clampedEnd = Math.min(sourceSpan.end, rawEnd);
          if (clampedEnd - clampedStart <= EPSILON) continue;
          const outStart = roundTime(outputStart + (clampedStart - sourceSpan.start));
          const outEnd = roundTime(outputStart + (clampedEnd - sourceSpan.start));
          originals.push({
            id: `original-${String(originals.length + 1)}`,
            kind: "original",
            text: shortText(item.original_audio_anchor) ?? shortText(item.note),
            output: { start: outStart, end: outEnd },
            sourceRanges: [{ start: roundTime(clampedStart), end: roundTime(clampedEnd), sourceId, sourcePath }],
            sourceMapping: "timeline-v3",
            beatId: clipId,
            audioOwner: "original_dialogue"
          });
        }
      }
    }
  }
  const rawSubtitles = list(timeline.subtitles) ?? [];
  const parsedSubtitles = [];
  for (const candidate of rawSubtitles.slice(0, MAX_SEGMENTS)) {
    const item = record(candidate);
    const span = item === void 0 ? void 0 : range(item.start, item.end);
    const subtitleText = item === void 0 ? void 0 : shortText(item.text);
    if (span !== void 0 && subtitleText !== void 0) {
      parsedSubtitles.push({ start: span.start, end: span.end, text: subtitleText, style: shortText(item?.style) });
    }
  }
  const audio = record(timeline.audio);
  const rawNarration = list(audio?.narration);
  const narrations = [];
  let narrationInvalid = rawNarration !== void 0 && rawNarration.length > MAX_SEGMENTS;
  if (rawNarration !== void 0 && rawNarration.length > 0) {
    const slicedNarration = rawNarration.slice(0, MAX_SEGMENTS);
    for (const [index, candidate] of slicedNarration.entries()) {
      const item = record(candidate);
      const at = item === void 0 ? void 0 : finiteTime(item.at);
      const duration = item === void 0 ? void 0 : finiteTime(item.duration);
      const endExplicit = item === void 0 ? void 0 : finiteTime(item.end);
      const slotS = item === void 0 ? void 0 : finiteTime(item.slot_s);
      const text2 = item === void 0 ? void 0 : shortText(item.text) ?? shortText(item.spoken_text);
      let end;
      if (at !== void 0 && duration !== void 0 && duration > EPSILON) {
        end = roundTime(at + duration);
      } else if (at !== void 0 && endExplicit !== void 0 && endExplicit - at > EPSILON) {
        end = endExplicit;
      } else if (at !== void 0 && slotS !== void 0 && slotS > EPSILON) {
        end = roundTime(at + slotS);
      } else if (at !== void 0) {
        const matched = parsedSubtitles.find((sub) => Math.abs(sub.start - at) <= 0.05) ?? (text2 === void 0 ? void 0 : parsedSubtitles.find((sub) => sub.text === text2 && sub.start >= at - 0.1));
        if (matched !== void 0 && matched.end - at > EPSILON) {
          end = matched.end;
        } else if (text2 !== void 0 && item?.duration == null && item?.end == null) {
          const estimatedEnd = roundTime(at + Math.max(1, Math.min(12, Math.round(text2.length / 4.5 * 10) / 10)));
          const nextItem = record(slicedNarration[index + 1]);
          const nextAt = nextItem === void 0 ? void 0 : finiteTime(nextItem.at);
          if (nextAt !== void 0 && nextAt - at > EPSILON) {
            const slotEnd = nextAt - at > 0.2 ? roundTime(nextAt - 0.1) : nextAt;
            end = Math.min(slotEnd, estimatedEnd);
          } else if (cursor - at > EPSILON) {
            end = Math.min(roundTime(cursor), estimatedEnd);
          } else {
            end = estimatedEnd;
          }
        }
      }
      if (at === void 0 || end === void 0 || end - at <= EPSILON || text2 === void 0) {
        narrationInvalid = true;
        continue;
      }
      const output = { start: at, end };
      const mapped = clips.length > 0 ? mappedSourceRanges(output, clips) : void 0;
      narrations.push({
        id: optionalId(item?.id) ?? `narration-${String(index + 1)}`,
        index,
        kind: "narration",
        text: text2,
        output,
        sourceRanges: mapped ?? [],
        sourceMapping: mapped === void 0 ? "unavailable" : "timeline-v3"
      });
    }
  } else if (parsedSubtitles.length > 0) {
    const narrationSubs = parsedSubtitles.filter((sub) => sub.style === void 0 || sub.style === "narration");
    for (const [index, sub] of narrationSubs.entries()) {
      const output = { start: sub.start, end: sub.end };
      const mapped = clips.length > 0 ? mappedSourceRanges(output, clips) : void 0;
      narrations.push({
        id: `subtitle-${String(index + 1)}`,
        kind: "narration",
        text: sub.text,
        output,
        sourceRanges: mapped ?? [],
        sourceMapping: mapped === void 0 ? "unavailable" : "timeline-v3"
      });
    }
  }
  const segments = [...narrations, ...originals].sort((left, right) => left.output.start - right.output.start || left.output.end - right.output.end || left.kind.localeCompare(right.kind));
  const warnings = [];
  if (timelineInvalid) warnings.push("invalid-timeline");
  if (narrationInvalid) warnings.push("invalid-narration");
  const extentStarts = [
    ...segments.map((segment) => segment.output.start),
    ...timelineClips.map((clip) => clip.output.start)
  ];
  const extentEnds = [
    ...segments.map((segment) => segment.output.end),
    ...timelineClips.map((clip) => clip.output.end)
  ];
  const outputExtent = extentStarts.length === 0 ? void 0 : {
    start: Math.min(...extentStarts),
    end: Math.max(...extentEnds)
  };
  return {
    authoredClock: "output",
    segments,
    clips: timelineClips,
    creative: creativeSummary(storyPlan),
    facts: {
      narrationCount: narrations.length,
      originalCount: originals.length,
      mappedNarrationCount: narrations.filter((segment) => segment.sourceRanges.length > 0).length,
      outputExtent
    },
    warnings
  };
}
function projectVideoNarrative(input) {
  const timelineRecord = record(input.timeline);
  if (isTimelineV3(timelineRecord)) {
    return projectTimelineV3(timelineRecord, input.resolveSourcePath, input.storyPlan);
  }
  const validatedClips = validatedClipMap(input.validatedClips);
  const clips = input.editMode === "cut" ? validatedClips : void 0;
  const identity = identityMode(input.editMode);
  const narration = narrationSegments(input.narration, clips, identity);
  const original = originalSegments(input.visualAudioBoard, clips, identity);
  const segments = [...narration.segments, ...original.segments].sort((left, right) => left.output.start - right.output.start || left.output.end - right.output.end || left.kind.localeCompare(right.kind));
  const warnings = [];
  if (narration.invalid) warnings.push("invalid-narration");
  if (input.validatedClips !== void 0 && validatedClips === void 0) warnings.push("invalid-clip-map");
  if (original.invalid) warnings.push("invalid-original-audio-beat");
  const outputExtent = segments.length === 0 ? void 0 : {
    start: Math.min(...segments.map((segment) => segment.output.start)),
    end: Math.max(...segments.map((segment) => segment.output.end))
  };
  return {
    authoredClock: identity ? "source" : input.editMode === "cut" ? "output" : "unknown",
    segments,
    creative: creativeSummary(input.storyPlan),
    facts: {
      narrationCount: narration.segments.length,
      originalCount: original.segments.length,
      mappedNarrationCount: narration.segments.filter((segment) => segment.sourceRanges.length > 0).length,
      outputExtent
    },
    warnings
  };
}

// src/video-project.ts
var VIDEO_EXTENSIONS = /* @__PURE__ */ new Set([".mp4", ".mov", ".mkv", ".webm"]);
var SUBTITLE_EXTENSIONS = /* @__PURE__ */ new Set([".srt", ".ass"]);
var SKIPPED_DIRECTORIES = /* @__PURE__ */ new Set(["frames", "tts_segments", "asr_chunks", "chunks", "cache", "tmp", ".subtitle_measure"]);
var VISIBLE_TEXT_FILES = /* @__PURE__ */ new Set([
  "project.json",
  // Video Recap 0.8.0 creative Markdown workspace + timeline v3 + check.json v1 + video-reference
  "BRIEF.md",
  "MEDIA_NOTES.md",
  "EDIT_PLAN.md",
  "PROMO.md",
  "STORYBOARD.md",
  "SCRIPT.md",
  "REFERENCE_NOTES.md",
  "reference_metrics.json",
  "check.json",
  "probe.json",
  "transcript.json",
  "measure.json",
  // Legacy pre-0.8.0 artifacts (kept read-compatible for existing projects)
  "recap_run_manifest.json",
  "recap_phase.json",
  "agent_narration_brief.md",
  "recap_story_plan.json",
  "production_reference.json",
  "reference_measurements.json",
  "reference_breakdown.json",
  "visual_audio_board.json",
  "clip_plan.json",
  "clip_plan_validated.json",
  "narration.json",
  "narration_lint.json",
  "packaging_plan.json",
  "promo_copy.json",
  "sfx_plan.json",
  "original_subtitles.json",
  "tts_meta.json",
  "timeline.json",
  "assembly_manifest.json",
  "assembly_qc.json",
  "final_qc.json",
  "final_qc.md",
  "shot_review.json",
  "delivery_qc.json",
  "cut_delivery_qc.json",
  "recap_project.json",
  "resource_lock.json",
  "subtitles.srt",
  "subtitles.ass"
]);
var ARTIFACT_META = {
  "BRIEF.md": { label: "\u9700\u6C42\u4E0E\u753B\u5E45", kind: "plan" },
  "MEDIA_NOTES.md": { label: "\u7D20\u6750\u7B14\u8BB0", kind: "plan" },
  "EDIT_PLAN.md": { label: "\u526A\u8F91\u4E0E\u65C1\u767D\u65B9\u6848", kind: "script" },
  "PROMO.md": { label: "\u5BA3\u53D1\u6587\u6848", kind: "plan" },
  "STORYBOARD.md": { label: "\u5206\u955C\u811A\u672C", kind: "plan" },
  "SCRIPT.md": { label: "\u89E3\u8BF4\u811A\u672C", kind: "script" },
  "REFERENCE_NOTES.md": { label: "\u53C2\u8003\u7B14\u8BB0", kind: "plan" },
  "reference_metrics.json": { label: "\u53C2\u8003\u6307\u6807", kind: "quality" },
  "check.json": { label: "\u6210\u7247\u4F53\u68C0", kind: "quality" },
  "probe.json": { label: "\u5A92\u4F53\u63A2\u6D4B", kind: "manifest" },
  "transcript.json": { label: "\u539F\u58F0\u8F6C\u5199", kind: "subtitle" },
  "measure.json": { label: "\u914D\u97F3\u5B9E\u6D4B", kind: "quality" },
  "recap_run_manifest.json": { label: "\u8FD0\u884C\u6E05\u5355", kind: "manifest" },
  "recap_phase.json": { label: "\u9636\u6BB5\u8D26\u672C", kind: "manifest" },
  "agent_narration_brief.md": { label: "\u89E3\u8BF4 Brief", kind: "plan" },
  "recap_story_plan.json": { label: "\u6545\u4E8B\u65B9\u6848", kind: "plan" },
  "production_reference.json": { label: "\u5236\u4F5C\u53C2\u8003", kind: "plan" },
  "reference_measurements.json": { label: "\u53C2\u8003\u6D4B\u91CF", kind: "quality" },
  "reference_breakdown.json": { label: "\u53C2\u8003\u62C6\u89E3", kind: "plan" },
  "visual_audio_board.json": { label: "\u97F3\u753B\u65B9\u6848", kind: "plan" },
  "clip_plan.json": { label: "\u526A\u8F91\u8BA1\u5212", kind: "plan" },
  "clip_plan_validated.json": { label: "\u5DF2\u6821\u9A8C\u526A\u8F91\u8BA1\u5212", kind: "plan" },
  "narration.json": { label: "\u89E3\u8BF4\u8BCD", kind: "script" },
  "narration_lint.json": { label: "\u89E3\u8BF4\u8BCD\u6821\u9A8C", kind: "quality" },
  "packaging_plan.json": { label: "\u5305\u88C5\u65B9\u6848", kind: "plan" },
  "promo_copy.json": { label: "\u5BA3\u53D1\u6587\u6848", kind: "plan" },
  "sfx_plan.json": { label: "\u97F3\u6548\u65B9\u6848", kind: "plan" },
  "original_subtitles.json": { label: "\u539F\u58F0\u5B57\u5E55", kind: "subtitle" },
  "timeline.json": { label: "\u6210\u7247\u65F6\u95F4\u7EBF", kind: "plan" },
  "assembly_manifest.json": { label: "\u5408\u6210\u6E05\u5355", kind: "manifest" },
  "assembly_qc.json": { label: "\u5408\u6210\u8D28\u68C0", kind: "quality" },
  "final_qc.json": { label: "\u6700\u7EC8\u8D28\u68C0", kind: "quality" },
  "final_qc.md": { label: "\u6700\u7EC8\u8D28\u68C0\u62A5\u544A", kind: "quality" },
  "shot_review.json": { label: "\u955C\u5934\u590D\u6838", kind: "quality" },
  "delivery_qc.json": { label: "\u4EA4\u4ED8\u8D28\u68C0", kind: "quality" },
  "cut_delivery_qc.json": { label: "\u526A\u540E\u7247\u8D28\u68C0", kind: "quality" },
  "recap_project.json": { label: "\u9879\u76EE\u7ED1\u5B9A", kind: "manifest" },
  "resource_lock.json": { label: "\u8D44\u6E90\u9501\u5B9A", kind: "manifest" },
  "subtitles.srt": { label: "SRT \u5B57\u5E55", kind: "subtitle" },
  "subtitles.ass": { label: "ASS \u5B57\u5E55", kind: "subtitle" }
};
var CHECK_LABELS = {
  container_valid: "\u5BB9\u5668\u683C\u5F0F",
  decode_integrity: "\u89E3\u7801\u5B8C\u6574\u6027",
  geometry_and_cfr: "\u753B\u5E45\u4E0E\u5E27\u7387",
  av_sync: "\u97F3\u753B\u540C\u6B65",
  audio_health: "\u97F3\u9891\u54CD\u5EA6\u4E0E\u8FB9\u7F18",
  visual_health: "\u753B\u9762\u9ED1\u5C4F\u4E0E\u5B9A\u683C",
  subtitle_and_timing: "\u5B57\u5E55\u4E0E\u65C1\u767D\u65F6\u5E8F"
};
var REVIEW_HINT_LABELS = {
  black_span: "\u9ED1\u5C4F\u7247\u6BB5",
  freeze_span: "\u753B\u9762\u5B9A\u683C",
  dead_air: "\u957F\u65F6\u95F4\u9759\u97F3",
  near_silent_audio: "\u6574\u4F53\u97F3\u91CF\u8FC7\u4F4E",
  edge_speech_truncation: "\u5207\u70B9\u4EBA\u58F0\u622A\u65AD",
  narration_bed_audio_leak: "\u65C1\u767D\u5E95\u566A\u6B8B\u7559",
  flash_sliver: "\u6781\u77ED\u95EA\u5E27",
  subtitle_overlap: "\u5B57\u5E55\u91CD\u53E0",
  narration_overlap: "\u65C1\u767D\u91CD\u53E0",
  subtitle_past_video_end: "\u5B57\u5E55\u8D85\u51FA\u7247\u5C3E"
};
function videoProjectRoot(path) {
  const parts = path.split("/");
  const name2 = parts[1];
  if (parts[0] !== VIDEO_DIRECTORY || name2 === void 0 || name2 === "" || name2 === "." || name2 === ".." || name2.startsWith(".") || name2.includes("\\") || name2.length > 128) return void 0;
  return `${VIDEO_DIRECTORY}/${name2}`;
}
function skipVideoDirectory(path) {
  const parts = path.split("/");
  return parts[0] === VIDEO_DIRECTORY && parts.length >= 3 && SKIPPED_DIRECTORIES.has(parts.at(-1) ?? "");
}
function visibleVideoPath(path) {
  const root = videoProjectRoot(path);
  if (root === void 0 || path === root) return false;
  const name2 = basename2(path);
  const extension = extname(name2).toLocaleLowerCase();
  if (VISIBLE_TEXT_FILES.has(name2) || SUBTITLE_EXTENSIONS.has(extension)) return true;
  if (!VIDEO_EXTENSIONS.has(extension)) return false;
  return path.startsWith(`${root}/sources/`) || path.startsWith(`${root}/outputs/`) || path.startsWith(`${root}/work/out/`) || path.startsWith(`${root}/out/`) || name2 === "edited_source.mp4" || name2 === "preview.mp4" || name2 === "final.mp4" || /^recap_.+\.(?:mp4|mov|webm)$/iu.test(name2);
}
function record2(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : void 0;
}
function text(value) {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : void 0;
}
function finiteNumber(value) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : void 0;
}
function markdownHeading(content) {
  if (content === void 0) return void 0;
  const line = content.split(/\r?\n/u).find((row) => /^#\s+/u.test(row));
  const cleaned = line?.replace(/^#\s+/u, "").trim();
  return cleaned === void 0 || cleaned === "" ? void 0 : cleaned;
}
function referencedMedia(files, value) {
  const raw = text(value)?.replaceAll("\\", "/");
  if (raw === void 0) return void 0;
  const normalized = raw.replace(/^(?:\.\.\/)+/u, "").replace(/^\.\//u, "");
  const direct = files.find(
    (file) => file.path === raw || file.path === normalized || raw.endsWith(`/${file.path}`) || file.path.endsWith(`/${normalized}`)
  );
  if (direct !== void 0) return direct;
  const name2 = raw.split("/").at(-1);
  const matching = files.filter((file) => file.path.split("/").at(-1) === name2);
  return matching.length === 1 ? matching[0] : void 0;
}
function previewAsset(file, role, label, editedKind) {
  return file.kind === "media" && file.mimeType?.startsWith("video/") === true ? {
    role,
    label,
    path: file.path,
    bytes: file.bytes,
    version: file.version,
    mimeType: file.mimeType,
    ...editedKind === void 0 ? {} : { editedKind }
  } : void 0;
}
function formatSec(value) {
  const rounded = Math.round(value * 10) / 10;
  return `${String(rounded)}s`;
}
function normalizeCheckStatus(value) {
  return value === "pass" || value === "warn" || value === "fail" || value === "skip" ? value : "skip";
}
function reviewHintMessage(code, hint, timestamp, endTimestamp) {
  const explicit = text(hint.detail);
  if (explicit !== void 0) return explicit;
  switch (code) {
    case "black_span":
      return timestamp !== void 0 && endTimestamp !== void 0 ? `${formatSec(timestamp)}\u2013${formatSec(endTimestamp)} \u68C0\u6D4B\u5230\u9ED1\u5C4F\uFF08${formatSec(finiteNumber(hint.duration) ?? endTimestamp - timestamp)}\uFF09` : "\u68C0\u6D4B\u5230\u9ED1\u5C4F\u7247\u6BB5";
    case "freeze_span":
      return timestamp !== void 0 && endTimestamp !== void 0 ? `${formatSec(timestamp)}\u2013${formatSec(endTimestamp)} \u68C0\u6D4B\u5230\u753B\u9762\u5B9A\u683C\uFF08${formatSec(finiteNumber(hint.duration) ?? endTimestamp - timestamp)}\uFF09` : "\u68C0\u6D4B\u5230\u753B\u9762\u5B9A\u683C";
    case "edge_speech_truncation": {
      const clipId = text(hint.clip_id);
      const edge = hint.edge === "out" ? "\u51FA\u70B9" : "\u5165\u70B9";
      return `${clipId ?? "\u955C\u5934"}${edge}\u7591\u4F3C\u5207\u5230\u4EBA\u58F0`;
    }
    case "narration_bed_audio_leak": {
      const clipId = text(hint.clip_id);
      const tail = finiteNumber(hint.tail_s);
      return `${clipId ?? "\u955C\u5934"}\u5728\u65C1\u767D\u7ED3\u675F\u540E\u4ECD\u6709\u539F\u58F0\u6B8B\u7559${tail === void 0 ? "" : `\uFF08${formatSec(tail)}\uFF09`}`;
    }
    case "flash_sliver": {
      const clipId = text(hint.id) ?? text(hint.clip_id);
      const dur = finiteNumber(hint.duration_s);
      return `${clipId ?? "\u955C\u5934"}\u65F6\u957F\u8FC7\u77ED${dur === void 0 ? "" : `\uFF08${formatSec(dur)}\uFF09`}`;
    }
    default:
      return REVIEW_HINT_LABELS[code] ?? code;
  }
}
function parseVideoQualityCheck(value, options = {}) {
  const doc = record2(value);
  const rawChecks = record2(doc?.checks);
  if (doc === void 0 || rawChecks === void 0) return void 0;
  const clipMap = /* @__PURE__ */ new Map();
  for (const clip of options.clips ?? []) clipMap.set(clip.id, clip);
  const checks = [];
  for (const [key, entry] of Object.entries(rawChecks)) {
    const item = record2(entry);
    if (item === void 0) continue;
    checks.push({
      key,
      label: CHECK_LABELS[key] ?? key,
      status: normalizeCheckStatus(item.status),
      detail: text(item.detail) ?? ""
    });
  }
  if (checks.length === 0) return void 0;
  const checkStatusMap = new Map(checks.map((item) => [item.key, item.status]));
  const rawHints = Array.isArray(doc.review_hints) ? doc.review_hints : [];
  const reviewHints = [];
  for (const candidate of rawHints) {
    const hint = record2(candidate);
    if (hint === void 0) continue;
    const check = text(hint.check) ?? "general";
    const code = text(hint.code) ?? "warning";
    const clipId = text(hint.clip_id) ?? text(hint.id);
    const clip = clipId === void 0 ? void 0 : clipMap.get(clipId);
    let timestamp = finiteNumber(hint.start) ?? finiteNumber(hint.at) ?? finiteNumber(hint.video_end) ?? finiteNumber(hint.end);
    let endTimestamp = finiteNumber(hint.end);
    if (timestamp === void 0 && clip !== void 0) {
      timestamp = hint.edge === "out" ? clip.output.end : clip.output.start;
      endTimestamp ??= clip.output.end;
    }
    const severity = checkStatusMap.get(check) === "fail" ? "fail" : "warn";
    reviewHints.push({
      check,
      code,
      label: REVIEW_HINT_LABELS[code] ?? code,
      message: reviewHintMessage(code, hint, timestamp, endTimestamp),
      severity,
      timestamp,
      endTimestamp: endTimestamp !== void 0 && timestamp !== void 0 && endTimestamp > timestamp ? endTimestamp : void 0
    });
  }
  const failedCount = checks.filter((item) => item.status === "fail").length;
  const ok = doc.ok === false ? false : failedCount === 0;
  const hasWarn = reviewHints.length > 0 || checks.some((item) => item.status === "warn");
  const status = !ok ? "fail" : hasWarn ? "warn" : "pass";
  const summary = status === "fail" ? `\u7269\u7406\u4F53\u68C0\u672A\u901A\u8FC7\uFF08${String(Math.max(1, failedCount))} \u9879\u5931\u8D25\uFF09` : status === "warn" ? `\u7269\u7406\u4F53\u68C0\u901A\u8FC7\uFF0C${String(reviewHints.length > 0 ? reviewHints.length : checks.filter((item) => item.status === "warn").length)} \u6761\u5F85\u590D\u6838` : `${String(checks.filter((item) => item.status === "pass").length)} \u9879\u4F53\u68C0\u901A\u8FC7`;
  const rawMedia = text(doc.media);
  const resolvedMedia = rawMedia === void 0 ? void 0 : options.resolveMedia?.(rawMedia);
  const media = resolvedMedia?.path ?? rawMedia;
  const mediaRole = resolvedMedia?.role;
  return {
    ok,
    status,
    summary,
    checks,
    reviewHints,
    ...media === void 0 ? {} : { media },
    ...mediaRole === void 0 ? {} : { mediaRole },
    path: options.path,
    version: options.version
  };
}
function summarizeVideoProject(root, files, metadata = {}) {
  const id = root.slice(`${VIDEO_DIRECTORY}/`.length);
  const projectFiles = files.filter((file) => file.path.startsWith(`${root}/`));
  const project = record2(metadata.project);
  const manifest = record2(metadata.runManifest);
  const settings = record2(manifest?.settings);
  const assembly = record2(metadata.assembly);
  const timeline = record2(metadata.timeline);
  const timelineMeta = record2(timeline?.meta);
  const timelineSources = record2(timeline?.sources);
  const timelineVideo = Array.isArray(timeline?.video) ? timeline.video : void 0;
  const timelineOverlays = Array.isArray(timeline?.overlays) ? timeline.overlays : void 0;
  const isVideoMedia = (file) => file !== void 0 && file.kind === "media" && file.mimeType?.startsWith("video/") === true;
  const overlayPaths = /* @__PURE__ */ new Set();
  if (timelineOverlays !== void 0) {
    for (const candidate of timelineOverlays) {
      const overlay = record2(candidate);
      if (overlay === void 0) continue;
      for (const field of [overlay.source, overlay.file, overlay.path]) {
        const key = text(field);
        if (key === void 0) continue;
        const mapped = timelineSources !== void 0 && key in timelineSources ? timelineSources[key] : key;
        const resolved = referencedMedia(projectFiles, mapped) ?? referencedMedia(projectFiles, key);
        if (resolved !== void 0) overlayPaths.add(resolved.path);
      }
    }
  }
  let timelineFirstSource;
  if (timelineSources !== void 0 && timelineVideo !== void 0 && timelineVideo.length > 0) {
    const firstClip = record2(timelineVideo[0]);
    const firstKey = text(firstClip?.source);
    if (firstKey !== void 0) {
      const candidate = referencedMedia(projectFiles, timelineSources[firstKey]);
      if (isVideoMedia(candidate) && !overlayPaths.has(candidate.path)) {
        timelineFirstSource = candidate;
      }
    }
  }
  const manifestSource = referencedMedia(projectFiles, manifest?.source_video);
  const source = (isVideoMedia(manifestSource) && !overlayPaths.has(manifestSource.path) ? manifestSource : void 0) ?? timelineFirstSource ?? projectFiles.find((file) => isVideoMedia(file) && file.path.startsWith(`${root}/sources/`) && !overlayPaths.has(file.path));
  const previewFile = projectFiles.find((file) => isVideoMedia(file) && file.path.split("/").at(-1) === "preview.mp4");
  const legacyEditedFile = projectFiles.find((file) => isVideoMedia(file) && file.path.split("/").at(-1) === "edited_source.mp4");
  const edited = previewFile ?? legacyEditedFile;
  const editedKind = previewFile !== void 0 ? "preview" : legacyEditedFile !== void 0 ? "edited" : void 0;
  const finalCandidates = projectFiles.filter((file) => {
    const name2 = file.path.split("/").at(-1) ?? "";
    if (!isVideoMedia(file) || overlayPaths.has(file.path)) return false;
    if (name2 === "preview.mp4" || name2 === "edited_source.mp4") return false;
    return file.path.startsWith(`${root}/outputs/`) || file.path.startsWith(`${root}/work/out/`) || file.path.startsWith(`${root}/out/`) || name2 === "final.mp4" || /^recap_.+\.(?:mp4|mov|webm)$/iu.test(name2);
  });
  const assemblyFinal = referencedMedia(projectFiles, assembly?.final_output);
  const final = (isVideoMedia(assemblyFinal) && !overlayPaths.has(assemblyFinal.path) ? assemblyFinal : void 0) ?? finalCandidates.find((file) => file.path.split("/").at(-1) === "final.mp4") ?? finalCandidates.at(-1);
  const previews = [
    source === void 0 ? void 0 : previewAsset(source, "source", "\u539F\u7247"),
    edited === void 0 ? void 0 : previewAsset(edited, "edited", editedKind === "preview" ? "\u7C97\u526A\u9884\u89C8" : "\u526A\u540E\u7247", editedKind),
    final === void 0 ? void 0 : previewAsset(final, "final", "\u6700\u7EC8\u6210\u7247")
  ].filter((value) => value !== void 0);
  const names = new Set(projectFiles.map((file) => file.path.split("/").at(-1)));
  const cutMode = settings?.edit_mode === "cut" || names.has("clip_plan.json") || edited !== void 0;
  const narrated = (text(record2(manifest?.audio)?.mode) ?? "narration") === "narration";
  let state = "not-started";
  let stage = "source";
  let stageLabel = source === void 0 ? "\u7B49\u5F85\u5BFC\u5165\u89C6\u9891" : "\u53EF\u4EE5\u5F00\u59CB";
  let nextArtifact;
  if (final !== void 0) {
    state = "ready";
    stage = "complete";
    stageLabel = "\u6210\u7247\u5DF2\u5C31\u7EEA";
  } else if (names.has("tts_meta.json") || names.has("measure.json")) {
    state = "working";
    stage = "assemble";
    stageLabel = "\u6B63\u5728\u5408\u6210";
  } else if (names.has("timeline.json")) {
    state = "working";
    stage = "assemble";
    stageLabel = "\u5DF2\u5EFA\u65F6\u95F4\u7EBF";
  } else if (names.has("narration.json") || names.has("EDIT_PLAN.md")) {
    state = "working";
    stage = "voiceover";
    stageLabel = "\u914D\u97F3\u4E0E\u5408\u6210";
  } else if (names.has("BRIEF.md") || names.has("MEDIA_NOTES.md")) {
    state = "working";
    stage = "plan";
    stageLabel = "\u65B9\u6848\u4E0E\u9009\u955C";
  } else if (cutMode && edited !== void 0) {
    if (narrated) {
      state = "waiting";
      stage = "narration";
      stageLabel = "\u7B49\u5F85\u89E3\u8BF4\u8BCD";
      nextArtifact = "narration.json";
    } else {
      state = "working";
      stage = "assemble";
      stageLabel = "\u6B63\u5728\u5408\u6210";
    }
  } else if (cutMode && names.has("clip_plan.json")) {
    state = "working";
    stage = "cut";
    stageLabel = "\u6B63\u5728\u526A\u8F91";
  } else if (manifest !== void 0 && !cutMode && !narrated) {
    state = "working";
    stage = "assemble";
    stageLabel = "\u6B63\u5728\u5408\u6210";
  } else if (manifest !== void 0) {
    state = "waiting";
    stage = cutMode ? "clip-plan" : "narration";
    stageLabel = cutMode ? "\u7B49\u5F85\u526A\u8F91\u8BA1\u5212" : "\u7B49\u5F85\u89E3\u8BF4\u8BCD";
    nextArtifact = cutMode ? "clip_plan.json" : "narration.json";
  }
  const artifacts = projectFiles.flatMap((file) => {
    const name2 = file.path.split("/").at(-1) ?? "";
    const meta = ARTIFACT_META[name2];
    if (meta !== void 0) return [{ ...meta, path: file.path, version: file.version }];
    const extension = extname(name2).toLocaleLowerCase();
    if (extension === ".srt") return [{ label: `SRT \u5B57\u5E55\uFF08${name2}\uFF09`, kind: "subtitle", path: file.path, version: file.version }];
    if (extension === ".ass") return [{ label: `ASS \u5B57\u5E55\uFF08${name2}\uFF09`, kind: "subtitle", path: file.path, version: file.version }];
    return [];
  }).sort((left, right) => left.path.localeCompare(right.path, "zh-Hans-CN"));
  const narrationFiles = projectFiles.filter((file) => file.path.split("/").at(-1) === "narration.json");
  const narrationFile = narrationFiles.length === 1 ? narrationFiles[0] : void 0;
  const timelineFiles = projectFiles.filter((file) => file.path.split("/").at(-1) === "timeline.json");
  const timelineFile = timelineFiles.length === 1 ? timelineFiles[0] : void 0;
  const checkFiles = projectFiles.filter((file) => file.path.split("/").at(-1) === "check.json");
  const checkFile = checkFiles.length === 1 ? checkFiles[0] : void 0;
  const narrative = metadata.timeline === void 0 && metadata.narration === void 0 && metadata.validatedClips === void 0 && metadata.visualAudioBoard === void 0 && metadata.storyPlan === void 0 ? void 0 : projectVideoNarrative({
    timeline: metadata.timeline,
    resolveSourcePath: (raw) => referencedMedia(projectFiles, raw)?.path ?? raw,
    narration: metadata.narration,
    validatedClips: metadata.validatedClips,
    visualAudioBoard: metadata.visualAudioBoard,
    storyPlan: metadata.storyPlan,
    editMode: cutMode ? "cut" : settings?.edit_mode
  });
  const qualityCheck = parseVideoQualityCheck(metadata.qualityCheck, {
    clips: narrative?.clips,
    path: checkFile?.path,
    version: checkFile?.version,
    resolveMedia: (raw) => {
      const matched = referencedMedia(projectFiles, raw);
      if (matched !== void 0) {
        if (final !== void 0 && matched.path === final.path) return { path: matched.path, role: "final" };
        if (edited !== void 0 && matched.path === edited.path) return { path: matched.path, role: "edited" };
        return { path: matched.path };
      }
      const normalized = raw.replaceAll("\\", "/");
      const name2 = normalized.split("/").at(-1);
      if (name2 === "preview.mp4" || name2 === "edited_source.mp4") return { path: raw, role: "edited" };
      if (name2 === "final.mp4") return { path: raw, role: "final" };
      return { path: raw };
    }
  });
  const title = text(project?.title) ?? markdownHeading(metadata.storyboard) ?? markdownHeading(metadata.script) ?? text(timelineMeta?.title) ?? markdownHeading(metadata.brief) ?? markdownHeading(metadata.editPlan) ?? id;
  return {
    id,
    root,
    title,
    state,
    stage,
    stageLabel,
    nextArtifact,
    editedKind,
    previews,
    artifacts,
    narrative,
    qualityCheck,
    narrationPath: narrationFile?.path,
    narrationVersion: narrationFile?.version,
    timelinePath: timelineFile?.path,
    timelineVersion: timelineFile?.version
  };
}

// src/workspace-request-trust.ts
function header(headers, name2) {
  if (headers instanceof Headers) return headers.get(name2) ?? void 0;
  const value = headers[name2];
  return typeof value === "string" ? value : void 0;
}
function hasUnsafeAuthorityChar(authority) {
  if (/[\s;,@'"/\\?#]/u.test(authority)) return true;
  for (let index = 0; index < authority.length; index += 1) {
    const code = authority.charCodeAt(index);
    if (code <= 32 || code === 127) return true;
  }
  return false;
}
function parseAuthority(authority, scheme = "http:") {
  if (authority === "" || hasUnsafeAuthorityChar(authority)) return void 0;
  try {
    const parsed = new URL(`${scheme}//${authority}`);
    if (parsed.username !== "" || parsed.password !== "" || parsed.pathname !== "/" || parsed.search !== "" || parsed.hash !== "" || parsed.hostname === "") {
      return void 0;
    }
    return parsed;
  } catch {
    return void 0;
  }
}
function canonicalAuthority(entry, url) {
  const other = url.protocol === "http:" ? "https:" : "http:";
  const port = url.port !== "" ? url.port : new URL(`${other}//${entry}`).port;
  return port === "" ? url.hostname : `${url.hostname}:${port}`;
}
function isLoopbackHostname(hostname) {
  if (hostname === "localhost" || hostname === "[::1]") return true;
  const parts = hostname.split(".");
  return parts.length === 4 && parts[0] === "127" && parts.every((part) => /^\d{1,3}$/u.test(part) && Number(part) <= 255);
}
function isTrustedAuthority(host, trustedHosts, protocol) {
  return trustedHosts.some((entry) => {
    const candidate = parseAuthority(entry, protocol);
    if (candidate === void 0) return false;
    return canonicalAuthority(entry, candidate) === candidate.hostname ? candidate.hostname === host.hostname : candidate.host === host.host;
  });
}
function isBindAddressAuthority(host, bindHost) {
  if (bindHost === void 0) return false;
  const zoneAt = bindHost.indexOf("%");
  const address = zoneAt === -1 ? bindHost : bindHost.slice(0, zoneAt);
  const bindUrl = parseAuthority(address.includes(":") ? `[${address}]` : address);
  return bindUrl !== void 0 && bindUrl.hostname === host.hostname;
}
function isSameAuthorityOrigin(origin, host) {
  let originUrl;
  try {
    originUrl = new URL(origin);
  } catch {
    return false;
  }
  const scheme = originUrl.protocol === "https:" ? "https:" : originUrl.protocol === "http:" ? "http:" : void 0;
  if (scheme === void 0) return false;
  const hostUrl = parseAuthority(host, scheme);
  return hostUrl !== void 0 && originUrl.host === hostUrl.host;
}
function trustedHostUrl(request, trustedHosts, bindHost, protocol = "http:") {
  const authority = header(request.headers, "host");
  if (authority === void 0) return void 0;
  const host = parseAuthority(authority, protocol);
  if (host === void 0) return void 0;
  if (!isLoopbackHostname(host.hostname) && !isTrustedAuthority(host, trustedHosts, protocol) && !isBindAddressAuthority(host, bindHost)) {
    return void 0;
  }
  return { authority, host };
}
function assertTrustedWorkspaceAuthority(entry) {
  const url = parseAuthority(entry);
  if (url !== void 0 && canonicalAuthority(entry, url) === entry.toLocaleLowerCase()) return;
  throw new Error(`oh-story: trustedHosts entry ${JSON.stringify(entry)} is not a bare host[:port] authority`);
}
function isTrustedWorkspaceRequest(request, trustedHosts, bindHost, protocol = "http:") {
  const resolved = trustedHostUrl(request, trustedHosts, bindHost, protocol);
  if (resolved === void 0) return false;
  if (header(request.headers, "sec-fetch-site") === "cross-site") return false;
  const origin = header(request.headers, "origin");
  if (origin === void 0) return true;
  return isSameAuthorityOrigin(origin, resolved.authority);
}
function isTrustedPreviewNavigation(request, trustedHosts, bindHost, protocol = "http:") {
  if (isTrustedWorkspaceRequest(request, trustedHosts, bindHost, protocol)) return true;
  if (trustedHostUrl(request, trustedHosts, bindHost, protocol) === void 0) return false;
  return header(request.headers, "origin") === void 0 && header(request.headers, "sec-fetch-site") === "cross-site" && header(request.headers, "sec-fetch-mode") === "navigate" && ["document", "iframe"].includes(header(request.headers, "sec-fetch-dest") ?? "");
}
function normalizePreviewAuthority(authority, protocol = "http:") {
  if (authority === void 0) return void 0;
  const trimmed = authority.trim();
  if (trimmed === "") return void 0;
  const parsed = parseAuthority(trimmed, protocol);
  return parsed === void 0 ? void 0 : canonicalAuthority(trimmed, parsed);
}
function matchesBoundPreviewAuthority(incomingAuthority, boundAuthority, protocol = "http:") {
  const incoming = parseAuthority(incomingAuthority, protocol);
  const bound = parseAuthority(boundAuthority, protocol);
  if (incoming === void 0 || bound === void 0) return false;
  if (incoming.host === bound.host) return true;
  return isLoopbackHostname(incoming.hostname) && isLoopbackHostname(bound.hostname) && incoming.port === bound.port;
}
function isBoundPreviewAssetRequest(request, boundHost, protocol = "http:") {
  const authority = header(request.headers, "host");
  if (authority === void 0) return false;
  if (!matchesBoundPreviewAuthority(authority, boundHost, protocol)) return false;
  const origin = header(request.headers, "origin");
  if (origin === void 0 || origin === "null") return true;
  if (isSameAuthorityOrigin(origin, authority)) return true;
  try {
    const originUrl = new URL(origin);
    if (originUrl.protocol !== "http:" && originUrl.protocol !== "https:") return false;
    const hostUrl = parseAuthority(authority, originUrl.protocol);
    return hostUrl !== void 0 && isLoopbackHostname(hostUrl.hostname) && isLoopbackHostname(originUrl.hostname) && originUrl.port === hostUrl.port;
  } catch {
    return false;
  }
}
function isTrustedPreviewAssetRequest(request, trustedHosts, bindHost, protocol = "http:") {
  if (isTrustedPreviewNavigation(request, trustedHosts, bindHost, protocol)) return true;
  const resolved = trustedHostUrl(request, trustedHosts, bindHost, protocol);
  if (resolved === void 0) return false;
  const origin = header(request.headers, "origin");
  if (origin === void 0 || origin === "null") return true;
  if (isSameAuthorityOrigin(origin, resolved.authority)) return true;
  try {
    const originUrl = new URL(origin);
    if (originUrl.protocol !== "http:" && originUrl.protocol !== "https:") return false;
    const hostUrl = parseAuthority(resolved.authority, originUrl.protocol);
    return hostUrl !== void 0 && isLoopbackHostname(hostUrl.hostname) && isLoopbackHostname(originUrl.hostname) && originUrl.port === hostUrl.port;
  } catch {
    return false;
  }
}

// src/workspace-route.ts
var MEDIA_TYPES = /* @__PURE__ */ new Map([
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".gif", "image/gif"],
  [".mp4", "video/mp4"],
  [".webm", "video/webm"],
  [".mov", "video/quicktime"],
  [".mkv", "video/x-matroska"],
  [".mp3", "audio/mpeg"],
  [".wav", "audio/wav"],
  [".m4a", "audio/mp4"],
  [".aac", "audio/aac"],
  [".flac", "audio/flac"]
]);
var MEDIA_MAX_BYTES = 256 * 1024 * 1024;
var FILE_LIMIT = 1e3;
var MAX_WALK_DEPTH = 20;
var PREVIEW_FILE_LIMIT = 32 * 1024 * 1024;
var PREVIEW_TOKEN_TTL_SECONDS = 24 * 3600;
var PREVIEW_TOKEN_BUCKET_SECONDS = 12 * 3600;
var WORKBENCH_CSS_API_PATH = "/api/oh-story/workbench.css";
var WORKBENCH_CSS_FALLBACK_PATH = "/oh-story/workbench.css";
var cachedWorkbenchStylesheet;
var workbenchStylesheetInFlight;
var videoPreflightCache;
var videoPreflightInFlight;
var dramaPreflightCache;
var dramaPreflightInFlight;
var WorkspaceHttpError = class extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
  status;
};
function configured(env, ...names) {
  return names.some((name2) => (env[name2] ?? "").trim() !== "");
}
function resetPreflightCaches() {
  videoPreflightCache = void 0;
  videoPreflightInFlight = void 0;
  dramaPreflightCache = void 0;
  dramaPreflightInFlight = void 0;
}
function createPreviewTokenSecret() {
  return randomBytes(32);
}
async function loadWorkbenchStylesheet(readText = (file) => readFile4(file, "utf8")) {
  if (cachedWorkbenchStylesheet !== void 0) return cachedWorkbenchStylesheet;
  workbenchStylesheetInFlight ??= (async () => {
    try {
      const here = dirname3(fileURLToPath2(import.meta.url));
      const candidates = [
        resolve6(here, "workbench.css"),
        resolve6(here, "../lib/workbench.css")
      ];
      let css;
      for (const candidate of candidates) {
        css = await readText(candidate).catch(() => void 0);
        if (css !== void 0 && css.trim() !== "") break;
      }
      if (css === void 0 || css.trim() === "") {
        const sourceFiles = [
          resolve6(here, "client/plugin.css"),
          resolve6(here, "client/game-canvas.css"),
          resolve6(here, "client/video-studio.css"),
          resolve6(here, "client/tool-card.css")
        ];
        const parts = await Promise.all(sourceFiles.map((file) => readText(file).catch(() => "")));
        css = parts.filter((part) => part.trim() !== "").join("\n");
      }
      const bytes = Buffer.from(css, "utf8");
      const version = createHash2("sha256").update(bytes).digest("hex").slice(0, 16);
      const asset = { css, bytes, version, etag: `"sha256-${version}"` };
      if (css.trim() !== "") {
        cachedWorkbenchStylesheet = asset;
      }
      return asset;
    } finally {
      workbenchStylesheetInFlight = void 0;
    }
  })();
  return workbenchStylesheetInFlight;
}
function mintPreviewToken(secret, input, nowMs = Date.now()) {
  if (input.sessionId === "" || !gameRoot(input.root)) {
    throw new WorkspaceHttpError(400, "\u6E38\u620F\u9884\u89C8\u6807\u8BC6\u65E0\u6548\u3002");
  }
  const nowSec = Math.floor(nowMs / 1e3);
  const exp = input.exp ?? (Math.floor(nowSec / PREVIEW_TOKEN_BUCKET_SECONDS) + 2) * PREVIEW_TOKEN_BUCKET_SECONDS;
  const boundHost = normalizePreviewAuthority(input.host);
  const claims = {
    s: input.sessionId,
    r: input.root,
    ...boundHost === void 0 ? {} : { h: boundHost },
    exp
  };
  const payload = Buffer.from(JSON.stringify(claims), "utf8").toString("base64url");
  const signature = createHmac("sha256", secret).update(payload).digest().toString("base64url");
  return `${payload}.${signature}`;
}
function verifyPreviewToken(tokenValue, secret, nowMs = Date.now()) {
  const parts = tokenValue.split(".");
  if (parts.length !== 2) throw new WorkspaceHttpError(403, "\u6E38\u620F\u9884\u89C8\u4EE4\u724C\u65E0\u6548\u3002");
  const [payloadB64, sigB64] = parts;
  if (payloadB64 === void 0 || sigB64 === void 0 || !/^[A-Za-z0-9_-]+$/u.test(payloadB64) || !/^[A-Za-z0-9_-]+$/u.test(sigB64)) {
    throw new WorkspaceHttpError(403, "\u6E38\u620F\u9884\u89C8\u4EE4\u724C\u65E0\u6548\u3002");
  }
  const expected = createHmac("sha256", secret).update(payloadB64).digest();
  const actual = Buffer.from(sigB64, "base64url");
  if (actual.byteLength !== expected.byteLength || !timingSafeEqual(actual, expected)) {
    throw new WorkspaceHttpError(403, "\u6E38\u620F\u9884\u89C8\u4EE4\u724C\u7B7E\u540D\u65E0\u6548\u3002");
  }
  let parsed;
  try {
    parsed = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));
  } catch {
    throw new WorkspaceHttpError(403, "\u6E38\u620F\u9884\u89C8\u4EE4\u724C\u683C\u5F0F\u65E0\u6548\u3002");
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new WorkspaceHttpError(403, "\u6E38\u620F\u9884\u89C8\u4EE4\u724C\u683C\u5F0F\u65E0\u6548\u3002");
  }
  const record3 = parsed;
  const sessionId = record3.s;
  const root = record3.r;
  const host = record3.h;
  const exp = record3.exp;
  if (typeof sessionId !== "string" || sessionId === "" || typeof root !== "string" || !gameRoot(root) || host !== void 0 && (typeof host !== "string" || normalizePreviewAuthority(host) === void 0) || typeof exp !== "number" || !Number.isSafeInteger(exp)) {
    throw new WorkspaceHttpError(403, "\u6E38\u620F\u9884\u89C8\u4EE4\u724C\u5185\u5BB9\u65E0\u6548\u3002");
  }
  if (exp * 1e3 <= nowMs) {
    throw new WorkspaceHttpError(401, "\u6E38\u620F\u9884\u89C8\u4EE4\u724C\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u5237\u65B0\u5DE5\u4F5C\u533A\u3002");
  }
  if (exp - Math.floor(nowMs / 1e3) > PREVIEW_TOKEN_TTL_SECONDS * 2) {
    throw new WorkspaceHttpError(403, "\u6E38\u620F\u9884\u89C8\u4EE4\u724C\u6709\u6548\u671F\u5F02\u5E38\u3002");
  }
  return { sessionId, root, ...host === void 0 ? {} : { host }, exp };
}
async function dramaPreflight() {
  if (dramaPreflightCache !== void 0 && dramaPreflightCache.expires > Date.now()) return dramaPreflightCache.value;
  dramaPreflightInFlight ??= (async () => {
    try {
      const python = await hostPython(DRAMA_PYTHON);
      const adapterConfig = await ensureDramaAdapterConfig(defaultDramaSkillRoot(), { python: python.command });
      const value = { python: python.probe, adapterConfig, adapters: dramaAdapterStatuses() };
      dramaPreflightCache = { expires: Date.now() + 3e4, value };
      return value;
    } finally {
      dramaPreflightInFlight = void 0;
    }
  })();
  return dramaPreflightInFlight;
}
async function commandExistsOnPath(name2, probeCommand, platform) {
  const locator = platform === "win32" ? "where" : "which";
  const output = await probeCommand(locator, [name2]);
  return output !== void 0 && output.trim() !== "";
}
function isValidIndexTtsEndpoint(raw) {
  const value = (raw ?? "").trim();
  if (value === "") return false;
  const schemeEnd = value.indexOf("://");
  if (schemeEnd < 0) return false;
  const rest = value.slice(schemeEnd + 3);
  const authorityEnd = rest.search(/[/?#]/u);
  const netloc = authorityEnd < 0 ? rest : rest.slice(0, authorityEnd);
  if (netloc.includes("@")) return false;
  try {
    const parsed = new URL(value);
    return (parsed.protocol === "http:" || parsed.protocol === "https:") && parsed.hostname !== "";
  } catch {
    return false;
  }
}
async function isRegularFile(path) {
  return nodeStat(path).then((info) => info.isFile(), () => false);
}
async function probeVideoPreflight(options = {}) {
  const env = options.env ?? process.env;
  const platform = options.platform ?? process.platform;
  const probeCommand = options.probeCommand ?? commandOutput;
  const checkFile = options.isFile ?? isRegularFile;
  const has = (name2) => commandExistsOnPath(name2, probeCommand, platform);
  const whisperModelPath = (env.WHISPER_MODEL_PATH ?? "").trim();
  const [
    pythonResult,
    ffmpegOutput,
    ffmpegFilters,
    ffprobeOutput,
    hasSay,
    hasEspeakNg,
    hasEspeak,
    hasWhisper,
    hasFasterWhisper,
    hasMlxWhisper,
    hasWhisperCli,
    whisperModelExists
  ] = await Promise.all([
    hostPython(VIDEO_PYTHON, probeCommand, platform),
    probeCommand("ffmpeg", ["-version"]),
    probeCommand("ffmpeg", ["-hide_banner", "-filters"]),
    probeCommand("ffprobe", ["-version"]),
    platform === "darwin" ? has("say") : Promise.resolve(false),
    has("espeak-ng"),
    has("espeak"),
    has("whisper"),
    has("faster-whisper"),
    has("mlx_whisper"),
    has("whisper-cli"),
    whisperModelPath !== "" ? checkFile(whisperModelPath) : Promise.resolve(false)
  ]);
  const localTtsEngine = hasSay ? "say" : hasEspeakNg ? "espeak-ng" : hasEspeak ? "espeak" : void 0;
  const whisperCliReady = hasWhisperCli && whisperModelExists;
  const localWhisperCli = hasWhisper ? "whisper" : hasFasterWhisper ? "faster-whisper" : hasMlxWhisper ? "mlx_whisper" : whisperCliReady ? "whisper-cli" : void 0;
  const openaiApiKey = configured(env, "OPENAI_API_KEY");
  const openaiAuto = openaiApiKey && configured(env, "TTS_API_URL");
  return {
    python: pythonResult.probe,
    ffmpeg: { ok: ffmpegOutput !== void 0, subtitles: /\bsubtitles\b/u.test(ffmpegFilters ?? "") },
    ffprobe: { ok: ffprobeOutput !== void 0 },
    tts: {
      local: { ok: localTtsEngine !== void 0, engine: localTtsEngine },
      fish: configured(env, "FISH_API_KEY", "FISH_AUDIO_API_KEY"),
      openai: openaiAuto,
      openaiApiKey,
      indexTts: isValidIndexTtsEndpoint(env.INDEX_TTS_ENDPOINT),
      indexTtsVoice: configured(env, "INDEX_TTS_VOICE")
    },
    asr: {
      localWhisper: { ok: localWhisperCli !== void 0, cli: localWhisperCli },
      remote: configured(env, "ASR_API_URL") && configured(env, "ASR_API_KEY")
    }
  };
}
async function videoPreflight() {
  if (videoPreflightCache !== void 0 && videoPreflightCache.expires > Date.now()) return videoPreflightCache.value;
  videoPreflightInFlight ??= (async () => {
    try {
      const value = await probeVideoPreflight();
      videoPreflightCache = { expires: Date.now() + 3e4, value };
      return value;
    } finally {
      videoPreflightInFlight = void 0;
    }
  })();
  return videoPreflightInFlight;
}
function send(response, status, value) {
  const body = `${JSON.stringify(value)}
`;
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
    "cache-control": "no-store",
    "x-content-type-options": "nosniff"
  });
  response.end(body);
}
function parseByteRange(value, size) {
  const match = value === void 0 ? null : /^bytes=(\d*)-(\d*)$/u.exec(value.trim());
  if (match === null) return void 0;
  const left = match[1] ?? "";
  const right = match[2] ?? "";
  if (left === "") {
    const suffix = Number(right);
    if (right === "" || !Number.isSafeInteger(suffix)) return void 0;
    return suffix === 0 || size <= 0 ? null : { start: Math.max(0, size - suffix), end: size - 1 };
  }
  const start = Number(left);
  const requestedEnd = right === "" ? Number.MAX_SAFE_INTEGER : Number(right);
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(requestedEnd) || requestedEnd < start) return void 0;
  return start >= size ? null : { start, end: Math.min(requestedEnd, size - 1) };
}
function mediaHeaders(mimeType, size, range2, extraHeaders = {}) {
  const start = range2?.start ?? 0;
  const end = range2?.end ?? size - 1;
  return {
    "content-type": mimeType,
    "content-length": Math.max(0, end - start + 1),
    "cache-control": "private, max-age=60",
    "accept-ranges": "bytes",
    ...range2 === void 0 ? {} : { "content-range": `bytes ${String(start)}-${String(end)}/${String(size)}` },
    "x-content-type-options": "nosniff",
    ...extraHeaders
  };
}
function stringifyHeaders(headers) {
  const out = {};
  for (const [key, value] of Object.entries(headers)) out[key] = String(value);
  return out;
}
function jsonResponse(status, value) {
  const body = `${JSON.stringify(value)}
`;
  return new Response(body, {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "content-length": String(Buffer.byteLength(body)),
      "cache-control": "no-store",
      "x-content-type-options": "nosniff"
    }
  });
}
function mediaBytesResponse(method, rangeHeader, bytes, mimeType, extraHeaders = {}) {
  const range2 = parseByteRange(rangeHeader, bytes.byteLength);
  if (range2 === null) {
    return new Response(null, {
      status: 416,
      headers: stringifyHeaders({ "content-range": `bytes */${String(bytes.byteLength)}`, "cache-control": "no-store", ...extraHeaders })
    });
  }
  const start = range2?.start ?? 0;
  const end = range2?.end ?? bytes.byteLength - 1;
  const body = bytes.subarray(start, end + 1);
  return new Response(method === "HEAD" ? null : new Uint8Array(body), {
    status: range2 === void 0 ? 200 : 206,
    headers: stringifyHeaders(mediaHeaders(mimeType, bytes.byteLength, range2, extraHeaders))
  });
}
async function hostWorkspaceFile(realm, target2, expectedSize) {
  const [root, path] = await Promise.all([
    nodeRealpath(realm.fs.processPath(realm.root)),
    nodeRealpath(realm.fs.processPath(target2))
  ]);
  const inside = relative3(root, path);
  if (inside === "" || inside.startsWith("..") || isAbsolute3(inside)) return void 0;
  const local = await nodeStat(path);
  return local.isFile() && local.size === expectedSize ? path : void 0;
}
async function workspaceMediaResponse(method, rangeHeader, realm, target2, info, mimeType, signal, extraHeaders = {}, maxBytes = MEDIA_MAX_BYTES) {
  const expectedSize = info.size;
  if (expectedSize !== void 0) {
    const range2 = parseByteRange(rangeHeader, expectedSize);
    if (range2 === null) {
      return new Response(null, {
        status: 416,
        headers: stringifyHeaders({ "content-range": `bytes */${String(expectedSize)}`, "cache-control": "no-store", ...extraHeaders })
      });
    }
    const processPath = await hostWorkspaceFile(realm, target2, expectedSize).catch(() => void 0);
    if (processPath !== void 0) {
      const headers = stringifyHeaders(mediaHeaders(mimeType, expectedSize, range2, extraHeaders));
      if (method === "HEAD") {
        return new Response(null, { status: range2 === void 0 ? 200 : 206, headers });
      }
      const stream = createReadStream(processPath, range2 === void 0 ? void 0 : { start: range2.start, end: range2.end });
      const onAbort = () => {
        stream.destroy();
      };
      if (signal.aborted) onAbort();
      else signal.addEventListener("abort", onAbort, { once: true });
      stream.once("close", () => {
        signal.removeEventListener("abort", onAbort);
      });
      return new Response(Readable.toWeb(stream), {
        status: range2 === void 0 ? 200 : 206,
        headers
      });
    }
    if (method === "HEAD") {
      return new Response(null, {
        status: range2 === void 0 ? 200 : 206,
        headers: stringifyHeaders(mediaHeaders(mimeType, expectedSize, range2, extraHeaders))
      });
    }
    if (range2 !== void 0 && typeof realm.fs.readByteRange === "function") {
      const length = range2.end - range2.start + 1;
      if (length > maxBytes) throw new WorkspaceHttpError(413, "\u8FDC\u7A0B\u5A92\u4F53\u5206\u6BB5\u8D85\u8FC7\u5DE5\u4F5C\u53F0\u9884\u89C8\u5927\u5C0F\u9650\u5236\u3002");
      const rawChunk = await realm.fs.readByteRange(target2, { offset: range2.start, length }, signal);
      const chunk = rawChunk.byteLength > length ? rawChunk.subarray(0, length) : rawChunk;
      if (chunk.byteLength === 0) {
        return new Response(null, {
          status: 416,
          headers: stringifyHeaders({ "content-range": "bytes */*", "cache-control": "no-store", ...extraHeaders })
        });
      }
      const actualRange = { start: range2.start, end: range2.start + chunk.byteLength - 1 };
      const totalSize = chunk.byteLength < length ? actualRange.end + 1 : expectedSize;
      return new Response(new Uint8Array(chunk), {
        status: 206,
        headers: stringifyHeaders(mediaHeaders(mimeType, totalSize, actualRange, extraHeaders))
      });
    }
    if (expectedSize > maxBytes) throw new WorkspaceHttpError(413, "\u8FDC\u7A0B\u5A92\u4F53\u8D85\u8FC7\u5DE5\u4F5C\u53F0\u56DE\u9000\u9884\u89C8\u5927\u5C0F\u9650\u5236\u3002");
  }
  return mediaBytesResponse(method, rangeHeader, await realm.fs.readBytes(target2, signal, maxBytes), mimeType, extraHeaders);
}
async function fetchJsonBody(request, maxBytes) {
  const declared = request.headers.get("content-length");
  if (declared !== null && Number(declared) > maxBytes) {
    throw new WorkspaceHttpError(413, "\u8BF7\u6C42\u5185\u5BB9\u8FC7\u5927\u3002");
  }
  const chunks = [];
  let size = 0;
  if (request.body !== null) {
    const reader = request.body.getReader();
    try {
      for (let item = await reader.read(); !item.done; item = await reader.read()) {
        const value = Buffer.from(item.value);
        size += value.byteLength;
        if (size > maxBytes) {
          await reader.cancel().catch(() => void 0);
          throw new WorkspaceHttpError(413, "\u8BF7\u6C42\u5185\u5BB9\u8FC7\u5927\u3002");
        }
        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }
  }
  try {
    const value = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (typeof value !== "object" || value === null || Array.isArray(value)) throw new Error();
    return value;
  } catch {
    throw new WorkspaceHttpError(400, "\u8BF7\u6C42\u5FC5\u987B\u662F JSON \u5BF9\u8C61\u3002");
  }
}
async function writeFetchResponseToNode(request, response, fetchResponse, signal) {
  const headers = {};
  fetchResponse.headers.forEach((value, key) => {
    headers[key] = value;
  });
  response.writeHead(fetchResponse.status, headers);
  if (request.method === "HEAD" || fetchResponse.body === null) {
    await fetchResponse.body?.cancel().catch(() => void 0);
    response.end();
    return;
  }
  const reader = fetchResponse.body.getReader();
  const cancel = () => {
    void reader.cancel().catch(() => void 0);
  };
  if (signal.aborted) cancel();
  else signal.addEventListener("abort", cancel, { once: true });
  let cancelled = false;
  try {
    for (let item = await reader.read(); !item.done; item = await reader.read()) {
      if (signal.aborted || response.destroyed) {
        cancelled = true;
        break;
      }
      if (!response.write(Buffer.from(item.value)) && !response.destroyed && !signal.aborted) {
        await new Promise((accept) => {
          const done = () => {
            response.off("drain", done);
            response.off("close", done);
            accept();
          };
          response.once("drain", done);
          response.once("close", done);
        });
        if (signal.aborted || response.destroyed) {
          cancelled = true;
          break;
        }
      }
    }
  } finally {
    signal.removeEventListener("abort", cancel);
    if (cancelled || response.destroyed || signal.aborted) {
      await reader.cancel().catch(() => void 0);
    }
    reader.releaseLock();
  }
  if (!response.writableEnded && !response.destroyed) response.end();
}
function assertCreativePath(path, kind) {
  if (kind === "text" ? !editableCreativePath(path) : !MEDIA_TYPES.has(pathExtension(path))) {
    throw new WorkspaceHttpError(415, kind === "text" ? "\u5DE5\u4F5C\u53F0\u4E0D\u652F\u6301\u7F16\u8F91\u8BE5\u6587\u4EF6\u7C7B\u578B\u3002" : "\u76EE\u6807\u4E0D\u662F\u53D7\u652F\u6301\u7684\u77ED\u5267\u5A92\u4F53\u6587\u4EF6\u3002");
  }
  if (!safeRelativePath(path) || !isCreativeRootPath(path)) {
    throw new WorkspaceHttpError(403, "\u6587\u4EF6\u8DEF\u5F84\u4E0D\u5728\u521B\u4F5C\u5DE5\u4F5C\u53F0\u4E2D\u3002");
  }
}
function mediaMimeTypeForPath(path) {
  return MEDIA_TYPES.get(pathExtension(path));
}
async function workspaceRealmForSession(context, rawId, signal) {
  if (rawId === "") throw new WorkspaceHttpError(400, "\u7F3A\u5C11 DSH sessionId\u3002");
  const lookup = context.typert.lookups.get("agent");
  if (lookup === void 0) throw new WorkspaceHttpError(503, "DSH Agent lookup \u5F53\u524D\u4E0D\u53EF\u7528\u3002");
  let agent;
  try {
    agent = await lookup.resolve(SessionId(rawId));
  } catch {
    throw new WorkspaceHttpError(404, "DSH \u4F1A\u8BDD\u4E0D\u53EF\u7528\u3002");
  }
  if (agent === void 0) throw new WorkspaceHttpError(404, "DSH \u4F1A\u8BDD\u4E0D\u53EF\u7528\u3002");
  if (agent.session.header.parentSession !== void 0 || agent.session.header.origin === "subagent") {
    throw new WorkspaceHttpError(403, "\u5B50 Agent \u4F1A\u8BDD\u4E0D\u5F00\u653E\u521B\u4F5C\u7F16\u8F91\u5668\u3002");
  }
  const cwd = agent.session.header.cwd;
  if (cwd === void 0) throw new WorkspaceHttpError(409, "\u5F53\u524D DSH \u4F1A\u8BDD\u6CA1\u6709\u5DE5\u4F5C\u76EE\u5F55\u3002");
  const fs = agent.ctx.get("fs");
  const sandboxPolicy = agent.ctx.get("sandboxPolicy");
  if (fs === void 0 || sandboxPolicy === void 0) throw new WorkspaceHttpError(503, "DSH \u6587\u4EF6\u7CFB\u7EDF\u5F53\u524D\u4E0D\u53EF\u7528\u3002");
  return { sessionId: rawId, agent, fs, sandboxPolicy, cwd, root: await fs.resolve(cwd, signal === void 0 ? void 0 : { signal }) };
}
async function workspaceRealm(context, url, signal) {
  const rawId = url.searchParams.get("sessionId");
  if (rawId === null) throw new WorkspaceHttpError(400, "\u7F3A\u5C11 DSH sessionId\u3002");
  return workspaceRealmForSession(context, rawId, signal);
}
async function assertNoSymlinkSegments(realm, relativePath, signal) {
  if (typeof realm.fs.lstat !== "function") return;
  const parts = relativePath.split("/");
  const prefixes = [];
  for (let index = 0; index < parts.length; index += 1) {
    prefixes.push(parts.slice(0, index + 1).join("/"));
  }
  const results = await Promise.all(prefixes.map((prefix) => realm.fs.lstat(prefix, { cwd: realm.cwd }, signal)));
  if (results.some((info) => info?.type === "symlink")) {
    throw new WorkspaceHttpError(403, "\u5DE5\u4F5C\u53F0\u4E0D\u5141\u8BB8\u8BBF\u95EE\u7B26\u53F7\u94FE\u63A5\u8DEF\u5F84\u3002");
  }
}
async function creativeTarget(realm, path, kind = "text", signal) {
  assertCreativePath(path, kind);
  await assertNoSymlinkSegments(realm, path, signal);
  const creativeRootPath = creativeRootDirectory(path);
  if (creativeRootPath === void 0) throw new WorkspaceHttpError(403, "\u6587\u4EF6\u8DEF\u5F84\u4E0D\u5728\u521B\u4F5C\u5DE5\u4F5C\u53F0\u4E2D\u3002");
  const resolveOpts = signal === void 0 ? { cwd: realm.cwd } : { cwd: realm.cwd, signal };
  const [creativeRoot, target2] = await Promise.all([
    creativeRootPath === "" ? Promise.resolve(realm.root) : realm.fs.resolve(creativeRootPath, resolveOpts),
    realm.fs.resolve(path, resolveOpts)
  ]);
  if (!realm.fs.contains(realm.root, creativeRoot) || !realm.fs.contains(creativeRoot, target2)) {
    throw new WorkspaceHttpError(403, "\u6587\u4EF6\u8DEF\u5F84\u79BB\u5F00\u4E86\u521B\u4F5C\u5DE5\u4F5C\u53F0\u76EE\u5F55\u3002");
  }
  return target2;
}
function requireRegularFile(info) {
  if (info === void 0) throw new WorkspaceHttpError(404, "\u6587\u4EF6\u4E0D\u5B58\u5728\u3002");
  if (info.type !== "file") throw new WorkspaceHttpError(415, "\u76EE\u6807\u4E0D\u662F\u53EF\u7F16\u8F91\u7684\u666E\u901A\u6587\u4EF6\u3002");
  return info;
}
async function readVersionedFile(fs, target2, maxBytes, signal) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const before = requireRegularFile(await fs.stat(target2, signal));
    if (before.size !== void 0 && before.size > maxBytes) throw new WorkspaceHttpError(413, "\u6587\u4EF6\u8D85\u8FC7\u5DE5\u4F5C\u53F0\u5927\u5C0F\u9650\u5236\u3002");
    const bytes = await fs.readBytes(target2, signal, maxBytes);
    const after = requireRegularFile(await fs.stat(target2, signal));
    if (before.version !== after.version) continue;
    let content;
    try {
      content = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    } catch {
      throw new WorkspaceHttpError(415, "\u6587\u4EF6\u4E0D\u662F\u6709\u6548\u7684 UTF-8 \u6587\u672C\u3002");
    }
    return { content, bytes: bytes.byteLength, version: after.version };
  }
  throw new WorkspaceHttpError(409, "\u6587\u4EF6\u6B63\u5728\u88AB\u4FEE\u6539\uFF0C\u8BF7\u91CD\u8BD5\u3002");
}
async function isNovelBookDirectory(realm, bookTarget, signal) {
  const entries = await realm.fs.listDir(bookTarget, signal).catch(() => []);
  const dirs = new Set(entries.filter((entry) => entry.type === "directory").map((entry) => entry.name));
  const files = new Set(entries.filter((entry) => entry.type === "file").map((entry) => entry.name));
  if (dirs.has("\u6B63\u6587") || dirs.has("\u8FFD\u8E2A") || dirs.has("\u5927\u7EB2") || files.has("\u6B63\u6587.md")) return true;
  if (files.has("\u8BBE\u5B9A.md") && files.has("\u5C0F\u8282\u5927\u7EB2.md")) return true;
  if (dirs.has("\u8BBE\u5B9A")) {
    const settingTarget = entries.find((entry) => entry.type === "directory" && entry.name === "\u8BBE\u5B9A")?.target;
    if (settingTarget !== void 0) {
      const settingEntries = await realm.fs.listDir(settingTarget, signal).catch(() => []);
      if (settingEntries.some((entry) => entry.type === "file" && entry.name === "\u9898\u6750\u5B9A\u4F4D.md")) return true;
    }
  }
  return false;
}
async function listFiles(realm, signal) {
  const files = [];
  const seenFiles = /* @__PURE__ */ new Set();
  const visitedDirs = /* @__PURE__ */ new Set([realm.root.targetKey]);
  let truncated = false;
  const pushFile = (entry) => {
    if (seenFiles.has(entry.path)) return true;
    if (files.length >= FILE_LIMIT) {
      truncated = true;
      return false;
    }
    seenFiles.add(entry.path);
    files.push(entry);
    return true;
  };
  const walk = async (path, directory, depth) => {
    if (truncated || depth > MAX_WALK_DEPTH || visitedDirs.has(directory.targetKey)) return;
    visitedDirs.add(directory.targetKey);
    const entries = await realm.fs.listDir(directory, signal);
    for (const entry of entries) {
      if (truncated) return;
      if (entry.name.startsWith(".") || SKIPPED_SCAN_DIRECTORIES.has(entry.name) || !realm.fs.contains(realm.root, entry.target)) continue;
      const childPath = `${path}/${entry.name}`;
      if (entry.type === "directory") {
        if (!skipVideoDirectory(childPath)) await walk(childPath, entry.target, depth + 1);
      } else if (entry.type === "file" && (editableCreativePath(childPath) || MEDIA_TYPES.has(pathExtension(entry.name)))) {
        const info = entry.version === void 0 || entry.size === void 0 ? await realm.fs.stat(entry.target, signal) : void 0;
        const version = entry.version ?? info?.version;
        const mimeType = MEDIA_TYPES.get(pathExtension(entry.name));
        if (version !== void 0 && (!childPath.startsWith(`${VIDEO_DIRECTORY}/`) || visibleVideoPath(childPath))) {
          if (!pushFile({ path: childPath, bytes: entry.size ?? info?.size ?? 0, version, kind: mimeType === void 0 ? "text" : "media", mimeType })) {
            return;
          }
        }
      }
    }
  };
  const resolveOpts = signal === void 0 ? { cwd: realm.cwd } : { cwd: realm.cwd, signal };
  for (const directory of CREATIVE_DIRECTORIES) {
    if (truncated) break;
    const target2 = await realm.fs.resolve(directory, resolveOpts);
    if (!realm.fs.contains(realm.root, target2)) continue;
    const info = await realm.fs.stat(target2, signal);
    if (info?.type === "directory") await walk(directory, target2, 1);
  }
  const bookRoots = /* @__PURE__ */ new Set();
  const creativeDirSet = new Set(CREATIVE_DIRECTORIES);
  const activeBookRaw = await workspaceText(realm, ".active-book", 4096, signal).catch(() => void 0);
  const activeBookLine = activeBookRaw?.split(/\r?\n/u).map((line) => line.trim()).find((line) => line !== "");
  const activeBook = activeBookLine?.replaceAll("\\", "/").replace(/^(?:\.\/)+/u, "").replace(/\/+$/u, "");
  if (activeBook !== void 0 && activeBook !== "" && safeRelativePath(activeBook)) {
    const parts = activeBook.split("/");
    if (parts.length <= MAX_BOOK_PREFIX_DEPTH && !parts.some((segment) => SKIPPED_SCAN_DIRECTORIES.has(segment) || creativeDirSet.has(segment))) {
      bookRoots.add(activeBook);
    }
  }
  const rootEntries = await realm.fs.listDir(realm.root, signal).catch(() => []);
  for (const entry of rootEntries) {
    if (truncated) break;
    if (entry.name.startsWith(".") || SKIPPED_SCAN_DIRECTORIES.has(entry.name) || !realm.fs.contains(realm.root, entry.target)) continue;
    if (entry.type === "file" && isPublishRootFile(entry.name)) {
      const info = entry.version === void 0 || entry.size === void 0 ? await realm.fs.stat(entry.target, signal) : void 0;
      const version = entry.version ?? info?.version;
      if (version !== void 0) pushFile({ path: entry.name, bytes: entry.size ?? info?.size ?? 0, version, kind: "text" });
    } else if (entry.type === "directory" && !creativeDirSet.has(entry.name)) {
      if (bookRoots.has(entry.name) || await isNovelBookDirectory(realm, entry.target, signal)) {
        bookRoots.add(entry.name);
      }
    }
  }
  for (const book of [...bookRoots].sort((left, right) => left.localeCompare(right, "zh-Hans-CN"))) {
    if (truncated) break;
    const bookTarget = await realm.fs.resolve(book, resolveOpts).catch(() => void 0);
    if (bookTarget === void 0 || !realm.fs.contains(realm.root, bookTarget)) continue;
    const bookEntries = await realm.fs.listDir(bookTarget, signal).catch(() => []);
    const storyDirSet = new Set(STORY_DIRECTORIES);
    const shortFileSet = new Set(SHORT_STORY_FILES);
    for (const entry of bookEntries) {
      if (truncated) break;
      if (entry.name.startsWith(".") || SKIPPED_SCAN_DIRECTORIES.has(entry.name) || !realm.fs.contains(bookTarget, entry.target)) continue;
      const childPath = `${book}/${entry.name}`;
      if (entry.type === "directory" && storyDirSet.has(entry.name)) {
        await walk(childPath, entry.target, 2);
      } else if (entry.type === "file" && (shortFileSet.has(entry.name) || isPublishRootFile(entry.name))) {
        const info = entry.version === void 0 || entry.size === void 0 ? await realm.fs.stat(entry.target, signal) : void 0;
        const version = entry.version ?? info?.version;
        if (version !== void 0) pushFile({ path: childPath, bytes: entry.size ?? info?.size ?? 0, version, kind: "text" });
      }
    }
  }
  for (const path of ROOT_FILES) {
    if (truncated) break;
    const target2 = await creativeTarget(realm, path, "text", signal).catch(() => void 0);
    if (target2 === void 0) continue;
    const info = await realm.fs.stat(target2, signal);
    if (info?.type === "file") pushFile({ path, bytes: info.size ?? 0, version: info.version, kind: "text" });
  }
  return {
    files: files.sort((left, right) => left.path.localeCompare(right.path, "zh-Hans-CN")),
    truncated
  };
}
async function metadataError(realm, files, path, maxBytes, signal) {
  if (!files.some((file) => file.path === path)) return void 0;
  try {
    const target2 = await creativeTarget(realm, path, "text", signal);
    JSON.parse((await readVersionedFile(realm.fs, target2, maxBytes, signal)).content);
    return void 0;
  } catch (error) {
    return error instanceof SyntaxError ? `${path} \u4E0D\u662F\u6709\u6548\u7684 JSON\u3002` : `${path} \u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u3002`;
  }
}
function gameRoot(path) {
  const parts = path.split("/");
  const name2 = parts[1];
  return parts.length === 2 && parts[0] === GAME_DIRECTORY && name2 !== void 0 && name2 !== "" && name2 !== "." && name2 !== ".." && name2.length <= 128 && !name2.startsWith(".") && !name2.includes("\\");
}
async function workspaceText(realm, path, maxBytes, signal) {
  const target2 = await realm.fs.resolve(path, signal === void 0 ? { cwd: realm.cwd } : { cwd: realm.cwd, signal });
  if (!realm.fs.contains(realm.root, target2) || (await realm.fs.stat(target2, signal))?.type !== "file") return void 0;
  return (await readVersionedFile(realm.fs, target2, maxBytes, signal)).content;
}
async function previewDigest(realm, projectRoot, signal) {
  const appPath = `${projectRoot}/build/app`;
  const app = await realm.fs.resolve(appPath, signal === void 0 ? { cwd: realm.cwd } : { cwd: realm.cwd, signal });
  if (!realm.fs.contains(realm.root, app) || (await realm.fs.stat(app, signal))?.type !== "directory") return { ready: false, version: "missing" };
  const entries = [];
  const visited = /* @__PURE__ */ new Set();
  let ready = false;
  const visit = async (directory, path, depth) => {
    if (depth > MAX_WALK_DEPTH || visited.has(directory.targetKey)) return;
    visited.add(directory.targetKey);
    for (const entry of await realm.fs.listDir(directory, signal)) {
      if (entry.name.startsWith(".") || SKIPPED_SCAN_DIRECTORIES.has(entry.name) || !realm.fs.contains(app, entry.target)) continue;
      const childPath = path === "" ? entry.name : `${path}/${entry.name}`;
      if (entry.type === "directory") await visit(entry.target, childPath, depth + 1);
      else if (entry.type === "file") {
        const info = entry.version === void 0 ? await realm.fs.stat(entry.target, signal) : void 0;
        const version = entry.version ?? info?.version;
        if (version !== void 0) entries.push(`${childPath}\0${version}`);
        if (childPath === "index.html") ready = true;
      }
      if (entries.length >= 5e3) return;
    }
  };
  await visit(app, "", 0);
  return { ready, version: createHash2("sha256").update(entries.sort().join("\n")).digest("hex").slice(0, 16) };
}
function gameProjectTitle(content, fallback) {
  const heading = content?.split(/\r?\n/u).find((line) => /^#\s+/u.test(line));
  const title = heading?.replace(/^#\s+/u, "").replace(/^(?:PRODUCT[_ ]BRIEF|产品简报)/iu, "").replace(/^[\s·・:：|—–-]+/u, "").trim().replace(/^《([^《》]+)》$/u, "$1").trim();
  return title || fallback;
}
async function workspaceGameProjects(realm, files, maxBytes, previewSecret, requestHost, signal) {
  const roots = [...new Set(files.flatMap((file) => {
    const parts = file.path.split("/");
    return parts[0] === GAME_DIRECTORY && parts[1] !== void 0 ? [`${GAME_DIRECTORY}/${parts[1]}`] : [];
  }))].filter(gameRoot).sort();
  return Promise.all(roots.map(async (root) => {
    const id = root.slice(`${GAME_DIRECTORY}/`.length);
    const [brief, preview] = await Promise.all([
      workspaceText(realm, `${root}/PRODUCT_BRIEF.md`, maxBytes, signal).catch(() => void 0),
      previewDigest(realm, root, signal).catch(() => ({ ready: false, version: "unavailable" }))
    ]);
    return {
      id,
      root,
      title: gameProjectTitle(brief, id),
      previewReady: preview.ready,
      previewUrl: preview.ready ? `/oh-story/game-preview/${mintPreviewToken(previewSecret, { sessionId: realm.sessionId, root, host: requestHost })}/index.html` : void 0,
      previewVersion: preview.version
    };
  }));
}
async function workspaceVideoProjects(realm, files, maxBytes, signal) {
  const roots = [...new Set(files.flatMap((file) => {
    const root = videoProjectRoot(file.path);
    return root === void 0 ? [] : [root];
  }))].sort((left, right) => left.localeCompare(right, "zh-Hans-CN"));
  return Promise.all(roots.map(async (root) => {
    const findPath = (name2) => {
      const matches = files.filter((file) => file.path.startsWith(`${root}/`) && file.path.split("/").at(-1) === name2);
      return matches.length === 1 ? matches[0]?.path : void 0;
    };
    const readTextFile = async (name2) => {
      const path = findPath(name2);
      if (path === void 0) return void 0;
      return workspaceText(realm, path, maxBytes, signal).catch(() => void 0);
    };
    const readJson = async (name2) => {
      const content = await readTextFile(name2);
      if (content === void 0) return void 0;
      try {
        return JSON.parse(content);
      } catch {
        return void 0;
      }
    };
    const [
      project,
      runManifest,
      assembly,
      narration,
      validatedClips,
      visualAudioBoard,
      storyPlan,
      timeline,
      qualityCheck,
      storyboard,
      script,
      brief,
      editPlan
    ] = await Promise.all([
      readJson("project.json"),
      readJson("recap_run_manifest.json"),
      readJson("assembly_manifest.json"),
      readJson("narration.json"),
      readJson("clip_plan_validated.json"),
      readJson("visual_audio_board.json"),
      readJson("recap_story_plan.json"),
      readJson("timeline.json"),
      readJson("check.json"),
      readTextFile("STORYBOARD.md"),
      readTextFile("SCRIPT.md"),
      readTextFile("BRIEF.md"),
      readTextFile("EDIT_PLAN.md")
    ]);
    return summarizeVideoProject(root, files, {
      project,
      runManifest,
      assembly,
      narration,
      validatedClips,
      visualAudioBoard,
      storyPlan,
      timeline,
      qualityCheck,
      storyboard,
      script,
      brief,
      editPlan
    });
  }));
}
function previewContentType(path) {
  switch (extname2(path).toLocaleLowerCase()) {
    case ".html":
    case ".htm":
      return "text/html; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".js":
    case ".mjs":
      return "text/javascript; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    case ".webmanifest":
      return "application/manifest+json; charset=utf-8";
    case ".txt":
      return "text/plain; charset=utf-8";
    case ".xml":
      return "application/xml; charset=utf-8";
    case ".svg":
      return "image/svg+xml";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    case ".ico":
      return "image/x-icon";
    case ".avif":
      return "image/avif";
    case ".woff":
      return "font/woff";
    case ".woff2":
      return "font/woff2";
    case ".ttf":
      return "font/ttf";
    case ".otf":
      return "font/otf";
    case ".wasm":
      return "application/wasm";
    case ".mp3":
      return "audio/mpeg";
    case ".ogg":
      return "audio/ogg";
    case ".wav":
      return "audio/wav";
    case ".m4a":
      return "audio/mp4";
    case ".aac":
      return "audio/aac";
    case ".flac":
      return "audio/flac";
    case ".mp4":
      return "video/mp4";
    case ".webm":
      return "video/webm";
    case ".mov":
      return "video/quicktime";
    case ".mkv":
      return "video/x-matroska";
    case ".glb":
      return "model/gltf-binary";
    case ".gltf":
      return "model/gltf+json";
    default:
      return "application/octet-stream";
  }
}
var GAME_PREVIEW_ERROR_BRIDGE = `<script>(function(){if(window.__ohStoryErrorBridge)return;window.__ohStoryErrorBridge=true;var post=function(m,f,l,c){try{if(window.parent&&window.parent!==window){window.parent.postMessage({type:"oh-story:game-preview-error",message:String(m||"Unknown error").slice(0,500),filename:typeof f==="string"?f.slice(0,300):undefined,lineno:typeof l==="number"&&isFinite(l)?l:undefined,colno:typeof c==="number"&&isFinite(c)?c:undefined},"*");}}catch(_){}};window.addEventListener("error",function(e){if(!e)return;var t=e.target;if(t&&t!==window&&(t.src||t.href)){post("Resource failed to load: "+(t.src||t.href),t.src||t.href);return;}post(e.message||(e.error&&e.error.message)||"Script error",e.filename,e.lineno,e.colno);},true);window.addEventListener("unhandledrejection",function(e){var r=e&&e.reason;post(r&&typeof r==="object"&&"message"in r?r.message:String(r||"Unhandled promise rejection"));});})();</script>`;
function injectGamePreviewErrorBridge(html) {
  if (html.includes("__ohStoryErrorBridge")) return html;
  const openHead = /<head(?:\s[^>]*)?>/iu.exec(html);
  if (openHead !== null) {
    const at = openHead.index + openHead[0].length;
    return `${html.slice(0, at)}${GAME_PREVIEW_ERROR_BRIDGE}${html.slice(at)}`;
  }
  const doctype = /^<!doctype[^>]*>\s*/iu.exec(html);
  if (doctype !== null) {
    return `${doctype[0]}${GAME_PREVIEW_ERROR_BRIDGE}${html.slice(doctype[0].length)}`;
  }
  return `${GAME_PREVIEW_ERROR_BRIDGE}${html}`;
}
function previewAssetSources(request, protocol = "http:") {
  const authority = normalizePreviewAuthority(request.headers.host, protocol);
  if (authority === void 0) return "'none'";
  const prefix = `${authority}/oh-story/game-preview/`;
  return `http://${prefix} https://${prefix}`;
}
function previewContentSecurityPolicy(assets) {
  return [
    "sandbox allow-scripts allow-forms allow-modals allow-downloads allow-same-origin",
    "default-src 'none'",
    `script-src 'unsafe-inline' 'wasm-unsafe-eval' blob: ${assets}`,
    `style-src 'unsafe-inline' ${assets}`,
    `img-src data: blob: ${assets}`,
    `media-src data: blob: ${assets}`,
    `font-src data: ${assets}`,
    `connect-src ${assets}`,
    `worker-src blob: ${assets}`,
    `manifest-src ${assets}`,
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
    "frame-ancestors 'self' http://127.0.0.1:* http://localhost:* https://127.0.0.1:* https://localhost:* http://[::1]:* https://[::1]:*"
  ].join("; ");
}
function previewSecurityHeaders(request, protocol = "http:") {
  const assets = previewAssetSources(request, protocol);
  return {
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    "cross-origin-resource-policy": "cross-origin",
    "access-control-allow-origin": "*",
    "content-security-policy": previewContentSecurityPolicy(assets)
  };
}
function parsePreviewTarget(pathname, previewSecret) {
  let segments;
  try {
    segments = pathname.split("/").slice(3).map((segment) => decodeURIComponent(segment));
  } catch {
    throw new WorkspaceHttpError(400, "\u6E38\u620F\u9884\u89C8\u5730\u5740\u65E0\u6548\u3002");
  }
  const signedToken = segments.shift();
  const path = segments.join("/") || "index.html";
  if (signedToken === void 0 || signedToken === "" || !safeRelativePath(path)) {
    throw new WorkspaceHttpError(400, "\u6E38\u620F\u9884\u89C8\u5730\u5740\u65E0\u6548\u3002");
  }
  const verified = verifyPreviewToken(signedToken, previewSecret);
  return { verified, path };
}
async function resolvePreviewAsset(context, parsed, signal) {
  const { verified, path } = parsed;
  const realm = await workspaceRealmForSession(context, verified.sessionId, signal);
  const root = verified.root;
  const fullRelative = `${root}/build/app/${path}`;
  await assertNoSymlinkSegments(realm, fullRelative, signal);
  const resolveOpts = { cwd: realm.cwd, signal };
  const [appRoot, target2] = await Promise.all([
    realm.fs.resolve(`${root}/build/app`, resolveOpts),
    realm.fs.resolve(fullRelative, resolveOpts)
  ]);
  if (!realm.fs.contains(realm.root, appRoot) || !realm.fs.contains(appRoot, target2)) {
    throw new WorkspaceHttpError(403, "\u9884\u89C8\u8D44\u6E90\u79BB\u5F00\u4E86\u6E38\u620F\u76EE\u5F55\u3002");
  }
  const info = requireRegularFile(await realm.fs.stat(target2, signal));
  const mimeType = previewContentType(path);
  return { realm, target: target2, info, path, mimeType };
}
async function sendPreviewAsset(request, response, asset, signal, protocol = "http:") {
  const security = previewSecurityHeaders(request, protocol);
  if (asset.mimeType.startsWith("audio/") || asset.mimeType.startsWith("video/")) {
    const fetchResponse = await workspaceMediaResponse(
      request.method ?? "GET",
      typeof request.headers.range === "string" ? request.headers.range : void 0,
      asset.realm,
      asset.target,
      asset.info,
      asset.mimeType,
      signal,
      security,
      PREVIEW_FILE_LIMIT
    );
    await writeFetchResponseToNode(request, response, fetchResponse, signal);
    return;
  }
  if (asset.info.size !== void 0 && asset.info.size > PREVIEW_FILE_LIMIT) {
    throw new WorkspaceHttpError(413, "\u9884\u89C8\u8D44\u6E90\u8FC7\u5927\u3002");
  }
  if (request.method === "HEAD" && !asset.mimeType.startsWith("text/html") && asset.info.size !== void 0) {
    response.writeHead(200, {
      "content-type": asset.mimeType,
      "content-length": asset.info.size,
      ...security
    });
    response.end();
    return;
  }
  const rawBytes = await asset.realm.fs.readBytes(asset.target, signal, PREVIEW_FILE_LIMIT);
  let body = rawBytes;
  if (asset.mimeType.startsWith("text/html")) {
    try {
      const decoded = new TextDecoder("utf-8", { fatal: true }).decode(rawBytes);
      body = Buffer.from(injectGamePreviewErrorBridge(decoded), "utf8");
    } catch {
      body = rawBytes;
    }
  }
  response.writeHead(200, {
    "content-type": asset.mimeType,
    "content-length": body.byteLength,
    ...security
  });
  response.end(request.method === "HEAD" ? void 0 : body);
}
function mapFsError(error) {
  if (!(error instanceof FsError)) return void 0;
  switch (error.code) {
    case "FS_NOT_FOUND":
      return new WorkspaceHttpError(404, "\u6587\u4EF6\u4E0D\u5B58\u5728\u3002");
    case "FS_TOO_LARGE":
      return new WorkspaceHttpError(413, "\u6587\u4EF6\u8D85\u8FC7\u5DE5\u4F5C\u53F0\u5927\u5C0F\u9650\u5236\u3002");
    case "FS_NOT_TEXT":
    case "FS_NOT_REGULAR_FILE":
      return new WorkspaceHttpError(415, "\u76EE\u6807\u4E0D\u662F\u53EF\u7F16\u8F91\u7684\u6587\u672C\u6587\u4EF6\u3002");
    case "FS_PERMISSION_DENIED":
    case "FS_SANDBOX_DENIED":
      return new WorkspaceHttpError(403, "\u5F53\u524D DSH \u6743\u9650\u4E0D\u5141\u8BB8\u4FEE\u6539\u8BE5\u6587\u4EF6\u3002");
    case "FS_STALE_VERSION":
    case "FS_NOT_OBSERVED":
      return new WorkspaceHttpError(412, "\u6587\u4EF6\u5DF2\u5728\u78C1\u76D8\u4E0A\u66F4\u65B0\u3002\u8BF7\u5904\u7406\u51B2\u7A81\u540E\u518D\u4FDD\u5B58\u3002");
    case "FS_ABORTED":
      return new WorkspaceHttpError(409, "\u6587\u4EF6\u64CD\u4F5C\u5DF2\u53D6\u6D88\u3002");
    default:
      return new WorkspaceHttpError(500, "DSH \u6587\u4EF6\u7CFB\u7EDF\u64CD\u4F5C\u5931\u8D25\u3002");
  }
}
function errorToFetchResponse(context, error) {
  const mapped = error instanceof WorkspaceHttpError ? error : mapFsError(error);
  if (mapped === void 0) context.logger("oh-story").error("workspace route failed", error);
  return jsonResponse(mapped?.status ?? 500, { error: mapped?.message ?? "Oh Story workspace operation failed." });
}
function assertAdmittedWorkspaceRequest(context, request, options) {
  const connection = context.get("connection");
  if (connection !== void 0) {
    const admission = connection.admit(request);
    if ("rejection" in admission) {
      throw new WorkspaceHttpError(
        admission.rejection,
        admission.rejection === 401 ? "\u9700\u8981\u901A\u8FC7 DSH \u767B\u5F55\u9A8C\u8BC1\u3002" : "\u8BF7\u6C42\u6765\u6E90\u4E0D\u53D7\u4FE1\u4EFB\u3002"
      );
    }
    const peer = admission.peer;
    if (peer?.principal !== void 0 && peer.principal.kind !== "owner") {
      throw new WorkspaceHttpError(403, "\u4EC5\u5DE5\u4F5C\u533A\u6240\u6709\u8005\u53EF\u8BBF\u95EE\u521B\u4F5C\u5DE5\u4F5C\u53F0\u63A5\u53E3\u3002");
    }
    return;
  }
  const webServer = context.get("webServer");
  if (!isTrustedWorkspaceRequest(request, options.trustedHosts ?? [], webServer?.host, webServer?.protocol ?? "http:")) {
    throw new WorkspaceHttpError(403, "\u8BF7\u6C42\u6765\u6E90\u4E0D\u53D7\u4FE1\u4EFB\u3002");
  }
}
async function handleStylesheetFetch(request) {
  const asset = await loadWorkbenchStylesheet();
  if (asset.bytes.byteLength === 0) {
    return new Response("/* workbench stylesheet unavailable */\n", {
      status: 503,
      headers: {
        "content-type": "text/css; charset=utf-8",
        "cache-control": "no-store",
        "x-content-type-options": "nosniff"
      }
    });
  }
  const url = new URL(request.url);
  const versionMatched = url.searchParams.get("v") === asset.version;
  const cacheControl = versionMatched ? "private, max-age=31536000, immutable" : "no-cache";
  const baseHeaders = {
    "content-type": "text/css; charset=utf-8",
    "cache-control": cacheControl,
    etag: asset.etag,
    "x-content-type-options": "nosniff"
  };
  const ifNoneMatch = request.headers.get("if-none-match");
  if (ifNoneMatch !== null && ifNoneMatch.split(",").map((item) => item.trim()).includes(asset.etag)) {
    return new Response(null, { status: 304, headers: baseHeaders });
  }
  return new Response(request.method === "HEAD" ? null : new Uint8Array(asset.bytes), {
    status: 200,
    headers: {
      ...baseHeaders,
      "content-length": String(asset.bytes.byteLength)
    }
  });
}
async function handleApiFetch(context, routeName, request, options, previewSecret) {
  const signal = request.signal;
  const url = new URL(request.url);
  try {
    if (routeName === "workbench.css" && (request.method === "GET" || request.method === "HEAD")) {
      return await handleStylesheetFetch(request);
    }
    if (routeName === "config" && request.method === "GET") {
      return jsonResponse(200, { welcomeGuide: options.welcomeGuide?.() ?? true });
    }
    if (routeName === "workspace" && request.method === "GET") {
      const realm = await workspaceRealm(context, url, signal);
      const { files, truncated } = await listFiles(realm, signal);
      const trackingPaths = files.map((file) => file.path).filter((path) => path === "\u8FFD\u8E2A/_tracking-state.json" || path.endsWith("/\u8FFD\u8E2A/_tracking-state.json"));
      const requestHost = request.headers.get("host") ?? void 0;
      const [trackingErrors, dramaError, games, videos] = await Promise.all([
        Promise.all(trackingPaths.map((path) => metadataError(realm, files, path, options.maxBytes, signal))),
        metadataError(realm, files, "short-drama.json", options.maxBytes, signal),
        workspaceGameProjects(realm, files, options.maxBytes, previewSecret, requestHost, signal),
        workspaceVideoProjects(realm, files, options.maxBytes, signal)
      ]);
      const metadataErrors = [...trackingErrors, dramaError].filter((value) => value !== void 0);
      const payload = {
        cwd: realm.cwd,
        files,
        truncated,
        games,
        videos,
        metadataErrors,
        welcomeGuide: options.welcomeGuide?.() ?? true
      };
      return jsonResponse(200, payload);
    }
    if (routeName === "video-preflight" && request.method === "GET") {
      return jsonResponse(200, await videoPreflight());
    }
    if (routeName === "drama-preflight" && request.method === "GET") {
      return jsonResponse(200, await dramaPreflight());
    }
    if (routeName === "file" && request.method === "GET") {
      const realm = await workspaceRealm(context, url, signal);
      const path = url.searchParams.get("path");
      if (path === null) throw new WorkspaceHttpError(400, "\u7F3A\u5C11\u6587\u4EF6\u8DEF\u5F84\u3002");
      const file = await readVersionedFile(realm.fs, await creativeTarget(realm, path, "text", signal), options.maxBytes, signal);
      return jsonResponse(200, { path, ...file });
    }
    if (routeName === "media" && (request.method === "GET" || request.method === "HEAD")) {
      const realm = await workspaceRealm(context, url, signal);
      const path = url.searchParams.get("path");
      if (path === null) throw new WorkspaceHttpError(400, "\u7F3A\u5C11\u5A92\u4F53\u6587\u4EF6\u8DEF\u5F84\u3002");
      const target2 = await creativeTarget(realm, path, "media", signal);
      const info = requireRegularFile(await realm.fs.stat(target2, signal));
      return await workspaceMediaResponse(
        request.method,
        request.headers.get("range") ?? void 0,
        realm,
        target2,
        info,
        mediaMimeTypeForPath(path),
        signal
      );
    }
    if (routeName === "file" && (request.method === "PUT" || request.method === "POST")) {
      const realm = await workspaceRealm(context, url, signal);
      const path = url.searchParams.get("path");
      if (path === null) throw new WorkspaceHttpError(400, "\u7F3A\u5C11\u6587\u4EF6\u8DEF\u5F84\u3002");
      const input = await fetchJsonBody(request, options.maxBytes * 6 + 1024);
      if (typeof input.content !== "string") throw new WorkspaceHttpError(400, "content \u5FC5\u987B\u662F\u5B57\u7B26\u4E32\u3002");
      if (typeof input.baseVersion !== "string" || input.baseVersion === "") throw new WorkspaceHttpError(400, "baseVersion \u5FC5\u987B\u662F\u6709\u6548\u7248\u672C\u3002");
      if (Buffer.byteLength(input.content) > options.maxBytes) throw new WorkspaceHttpError(413, "\u6587\u4EF6\u8D85\u8FC7\u5DE5\u4F5C\u53F0\u5927\u5C0F\u9650\u5236\u3002");
      const outcome = await realm.fs.writeText(
        await creativeTarget(realm, path, "text", signal),
        input.content,
        { kind: "replaceIfVersion", version: input.baseVersion },
        signal,
        realm.sandboxPolicy.resolve({ session: realm.agent.session })
      );
      return jsonResponse(200, { path, content: outcome.after, bytes: Buffer.byteLength(outcome.after), version: outcome.version });
    }
    return jsonResponse(404, { error: "Oh Story route not found." });
  } catch (error) {
    return errorToFetchResponse(context, error);
  }
}
async function nodeRequestToFetch(request, url, signal, maxBytes) {
  const method = request.method ?? "GET";
  const headers = new Headers();
  for (const [key, value] of Object.entries(request.headers)) {
    if (typeof value === "string") headers.append(key, value);
    else if (Array.isArray(value)) for (const item of value) headers.append(key, item);
  }
  if (method === "GET" || method === "HEAD") {
    return new Request(url, { method, headers, signal });
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    const value = Buffer.from(chunk);
    size += value.byteLength;
    if (size > maxBytes) throw new WorkspaceHttpError(413, "\u8BF7\u6C42\u5185\u5BB9\u8FC7\u5927\u3002");
    chunks.push(value);
  }
  return new Request(url, {
    method,
    headers,
    body: Buffer.concat(chunks),
    signal
  });
}
async function handle(context, request, response, options, previewSecret) {
  const abortController = new AbortController();
  response.once("close", () => {
    if (!response.writableEnded) abortController.abort();
  });
  const { signal } = abortController;
  try {
    const url = new URL(request.url ?? "/", "http://127.0.0.1");
    const gamePreview = url.pathname.startsWith("/oh-story/game-preview/");
    if (gamePreview) {
      if (request.method !== "GET" && request.method !== "HEAD") {
        send(response, 405, { error: "Method not allowed." });
        return;
      }
      const parsed = parsePreviewTarget(url.pathname, previewSecret);
      const webServer = context.get("webServer");
      const protocol = webServer?.protocol ?? "http:";
      const trusted = parsed.verified.host !== void 0 ? isBoundPreviewAssetRequest(request, parsed.verified.host, protocol) : isTrustedPreviewAssetRequest(request, options.trustedHosts ?? [], webServer?.host, protocol);
      if (!trusted) {
        throw new WorkspaceHttpError(403, "\u8BF7\u6C42\u6765\u6E90\u4E0D\u53D7\u4FE1\u4EFB\u3002");
      }
      const asset = await resolvePreviewAsset(context, parsed, signal);
      await sendPreviewAsset(request, response, asset, signal, protocol);
      return;
    }
    assertAdmittedWorkspaceRequest(context, request, options);
    const prefix = "/oh-story/";
    if (!url.pathname.startsWith(prefix)) {
      send(response, 404, { error: "Oh Story route not found." });
      return;
    }
    const routeName = url.pathname.slice(prefix.length);
    const fetchRequest = await nodeRequestToFetch(request, url, signal, options.maxBytes * 6 + 1024);
    const fetchResponse = await handleApiFetch(context, routeName, fetchRequest, options, previewSecret);
    await writeFetchResponseToNode(request, response, fetchResponse, signal);
  } catch (error) {
    if (response.writableEnded || response.destroyed) return;
    const mapped = error instanceof WorkspaceHttpError ? error : mapFsError(error);
    if (mapped === void 0) context.logger("oh-story").error("workspace route failed", error);
    send(response, mapped?.status ?? 500, { error: mapped?.message ?? "Oh Story workspace operation failed." });
  }
}
function buildConnectionFetchRoutes(context, options, previewSecret) {
  return [
    {
      path: "/api/oh-story/config",
      methods: ["GET"],
      requestBody: "buffered",
      fetch: (request) => handleApiFetch(context, "config", request, options, previewSecret)
    },
    {
      path: "/api/oh-story/workspace",
      methods: ["GET"],
      requestBody: "buffered",
      fetch: (request) => handleApiFetch(context, "workspace", request, options, previewSecret)
    },
    {
      path: "/api/oh-story/file",
      methods: ["GET", "POST"],
      requestBody: "buffered",
      fetch: (request) => handleApiFetch(context, "file", request, options, previewSecret)
    },
    {
      path: "/api/oh-story/media",
      methods: ["GET", "HEAD"],
      requestBody: "buffered",
      fetch: (request) => handleApiFetch(context, "media", request, options, previewSecret)
    },
    {
      path: "/api/oh-story/drama-preflight",
      methods: ["GET"],
      requestBody: "buffered",
      fetch: (request) => handleApiFetch(context, "drama-preflight", request, options, previewSecret)
    },
    {
      path: "/api/oh-story/video-preflight",
      methods: ["GET"],
      requestBody: "buffered",
      fetch: (request) => handleApiFetch(context, "video-preflight", request, options, previewSecret)
    },
    {
      path: WORKBENCH_CSS_API_PATH,
      methods: ["GET", "HEAD"],
      requestBody: "buffered",
      fetch: (request) => handleApiFetch(context, "workbench.css", request, options, previewSecret)
    }
  ];
}
function registerWorkspaceRoute(context, options) {
  const previewSecret = options.previewTokenSecret ?? createPreviewTokenSecret();
  const fetchRoutes = buildConnectionFetchRoutes(context, options, previewSecret);
  let mountedOnConnection = false;
  void loadWorkbenchStylesheet().catch(() => void 0);
  const registerFetchRoutesOn = (conn) => {
    const fetchService = conn.fetch;
    if (fetchService === void 0 || typeof fetchService.register !== "function") return void 0;
    const disposers = fetchRoutes.map((route) => fetchService.register(route));
    mountedOnConnection = true;
    return async () => {
      mountedOnConnection = false;
      await Promise.all(disposers.map((dispose) => Promise.resolve(dispose()).catch(() => void 0)));
    };
  };
  if (typeof context.inject === "function") {
    void context.inject(["connection"], (connCtx) => {
      const conn = connCtx.get("connection");
      if (conn?.fetch?.register === void 0) return;
      connCtx.effect(() => registerFetchRoutesOn(conn) ?? (() => {
      }), "oh-story: DSH connection.fetch API");
    });
  }
  if (typeof context.on === "function") {
    context.on("webserver/index-inject", (table) => {
      const apiPrefix = mountedOnConnection ? "api/oh-story" : "oh-story";
      const baseHref = `${apiPrefix}/workbench.css`;
      const href = cachedWorkbenchStylesheet !== void 0 ? `${baseHref}?v=${cachedWorkbenchStylesheet.version}` : baseHref;
      table.push({
        kind: "html",
        placement: "head",
        html: `<link id="oh-story-workbench-css" rel="stylesheet" href="${href}" data-oh-story-api-prefix="${apiPrefix}">`
      });
    });
  }
  context.effect(() => {
    const disposeWeb = context.webServer.register({
      kind: "prefix",
      path: "/oh-story",
      handler: (request, response) => handle(context, request, response, options, previewSecret)
    });
    const directConn = typeof context.inject === "function" ? void 0 : context.get("connection");
    const disposeConn = directConn !== void 0 ? registerFetchRoutesOn(directConn) : void 0;
    return async () => {
      disposeWeb();
      await disposeConn?.();
      resetPreflightCaches();
    };
  }, "oh-story: DSH-session workspace API");
}

// src/index.ts
var name = "oh-story";
var inject = ["skills", "subagents", "tools", "typert", "webServer"];
var Config = z.object({
  editorMaxBytes: z.natural().min(65536).max(8388608).default(2097152),
  trustedHosts: z.array(String).default([]),
  welcomeGuide: z.boolean().default(true).volatile()
});
function readWelcomeGuideConfig(value) {
  const resolved = typeof value === "object" && value !== null ? value.get() : value;
  return resolved ?? true;
}
async function apply(context, config = {}) {
  const trustedHosts = config.trustedHosts ?? [];
  for (const entry of trustedHosts) assertTrustedWorkspaceAuthority(entry);
  void context.inject(["settings"], (child) => {
    const settings = child.get("settings");
    if (settings !== void 0) child.effect(() => settings.configure({ auto: false }, context.fiber));
  });
  context.skills.registerProvider(() => createOhStorySkillProvider());
  context.skills.registerProvider(() => createDramaSkillProvider());
  context.skills.registerProvider(() => createNovelToGameSkillProvider());
  context.skills.registerProvider(() => createVideoRecapSkillProvider());
  registerOhStoryHooks(context);
  registerOhStoryProductionTool(context);
  registerWorkspaceRoute(context, {
    maxBytes: config.editorMaxBytes ?? 2097152,
    trustedHosts,
    welcomeGuide: () => readWelcomeGuideConfig(config.welcomeGuide)
  });
  context.effect(() => {
    let disposed = false;
    void hostPython(DRAMA_PYTHON).then((probe) => {
      if (disposed || context.fiber.uid === null) return;
      return ensureDramaAdapterConfig(defaultDramaSkillRoot(), { python: probe.command });
    }).catch(() => void 0);
    return () => {
      disposed = true;
    };
  }, "oh-story: drama adapter prewarm");
  await registerOhStoryRoleTool(context);
  if (context.fiber.uid === null) return;
}
var index_default = { name, inject, Config, apply };
export {
  Config,
  DRAMA_ADAPTERS,
  DRAMA_ADAPTER_CONFIG_ENV,
  OH_STORY_PRODUCTION_TOOL_NAME,
  OH_STORY_REFERENCE_TOOL_NAME,
  OH_STORY_ROLE_NAMES,
  OH_STORY_ROLE_TOOL_NAME,
  WORKBENCH_CSS_API_PATH,
  WORKBENCH_CSS_FALLBACK_PATH,
  apply,
  bundledReferenceGuard,
  createDramaSkillProvider,
  createNovelToGameSkillProvider,
  createOhStoryProductionTool,
  createOhStoryReferenceTool,
  createOhStoryRoleTool,
  createOhStorySkillProvider,
  createVideoRecapSkillProvider,
  index_default as default,
  dramaAdapterConfigPath,
  dramaAdapterStatuses,
  ensureDramaAdapterConfig,
  inject,
  loadBundledRole,
  loadWorkbenchStylesheet,
  name,
  parseBundledSkill,
  readWelcomeGuideConfig,
  registerOhStoryHooks,
  registerOhStoryProductionTool,
  registerOhStoryRoleTool,
  registerWorkspaceRoute,
  roleToolFilter,
  validateProductionIntent
};
//# sourceMappingURL=index.js.map
