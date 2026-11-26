# Agent Note: 创作行为跟随上游，保留 Ego 与 Git 安装适配

Status: implemented

## Problem

空工作区默认展开与本地工作台补丁增加了 fork 的维护范围。用户要求恢复 `zenstory-ai/oh-story-dsh` 原版创作体验，同时明确保留浏览器技能接入和既有发布方式。

## Decision

工作台、配置与文件跟随采用上游 `v0.1.28`（`eedf5dc9179f5e5a69dffecd19643f890ed5f977`）源码。客户端仅替换 fork 包名；空工作区显示上游欢迎引导，创作项目按上游规则展开。移除 `openEmptyWorkbench` 及工作台写入预览补丁。

保留[官方 Ego 接入](../feature/2026-11-19-ego-browser-skill.md)：运行时提供 13 个小说技能，路由、扫榜和研究员执行 `ego-browser skill`；固定知识与 manifest 不改。保留[固定 Git 发布](2026-11-21-git-market-publication.md)：`@winterhuan/oh-story-dsh` 包与 `lib/` 随源码提交，不运行安装时构建，不发布 npm 或 GitHub Release。DSH 默认依赖与宿主仍为 `0.2.2-rc.5`，测试配置继续独立于父仓库。

本决定取代[空工作区默认展开](../feature/2026-11-20-open-empty-workbench.md)，并取代[上游同步记录](2026-11-25-sync-upstream-0.1.28.md)与[宿主对齐记录](2026-11-25-align-default-host-with-dsh-rc5.md)中的工作台自定义约定。两条过程记录保留版本、宿主兼容与发布来源的独立依据。

## Alternatives considered

- 完全切到上游正式包：不能保留用户要求的 Ego 接入和固定 Git 源码发布。
- 继续维护工作台补丁：扩大与上游的差异，不符合此次收敛要求。

## Consequences

维护差异集中在浏览器与安装适配。旧 profile 需删除 `openEmptyWorkbench` 配置；开发源码先在独立 profile 构建和验收，日常 profile 继续使用远程固定发布包。

## Verification

源码对比确认客户端除包名外与上游一致，Host 配置和工作区接口与上游一致。`pnpm verify`、本地包安装和 Windows 原生 DSH 的 Ego 验收记录由父仓库本轮验证报告保存；未发布版本不记为已更新日常安装。
