# Agent Note: 默认宿主随整套插件固定到非 alpha 的 DSH rc.5

Status: implemented

工作台自定义约定由[上游行为维护约定](2026-11-26-upstream-behavior-with-ego-and-git.md)取代；本记录继续约束 DSH 默认版本与兼容检查。

## Problem

单独同步上游时，[fork 集成记录](2026-11-25-sync-upstream-0.1.28.md)保留 DSH `0.2.2-rc.1`，以便与其余插件及日常宿主保持一致。整套插件升级需要同时更新开发依赖、宿主与验证入口，否则本地编译和实际运行使用不同的接口。

## Decision

默认开发与打包验证使用 DSH `0.2.2-rc.5`，与父仓库整套插件的固定版本一致。兼容验证保留 `0.2.0-rc.2` 与前一默认版本 `0.2.2-rc.1`。版本选择排除 alpha；源码 Tag 安装、fork 包名、官方 Ego 和空工作区行为沿用原有约定。

## Alternatives considered

- 仅更新日常 CLI：插件仍基于旧类型编译，无法验证新的子 Agent 启动参数。
- 使用 npm 的浮动 dist-tag：不能让安装、编译和验证固定到同一个版本。
- 安装 `0.2.3-alpha.2`：不符合此次升级排除 alpha 的要求。

## Consequences

宿主和插件共享确定的 DSH 接口版本；旧宿主仍有独立打包浏览器检查。发布需要等待受保护 PR 与主线 CI，日常 profile 继续只安装远程固定版本。

## Verification

`pnpm verify` 完成 lint、类型、四套固定资产校验、DSH 归属、更新脚本测试、365 项单元／契约测试和构建。
