# Agent Note: Fork 先发布 GitHub 预构建包

Status: implemented

## Problem

本 fork 使用独立的 `@winterhuan/oh-story-dsh` 包名，已有 GitHub 发布权限但没有可用的 npm 发布凭据。首次发布需要可从远程安装的预构建包，并保留上游的源提交和产物校验。

## Decision

GitHub Release 是默认发布渠道；npm 仅在仓库变量 `PUBLISH_NPM=true` 时发布。两者保留独立权限，使用同一个已验证的 tarball。公开验证始终匿名核对 GitHub 文件哈希并安装公开包；启用 npm 时再校验 registry integrity 并从 npm 安装。

发布仍要求受保护的 main、Pull Request、四个 CI Job、精确提交证明和稳定版本标签，不手工上传替代工作流产物，也不移动标签或覆盖已有资产。

## Alternatives considered

- 缺少 npm 凭据也强制发布 npm：首次 GitHub 发布会留下失败状态，无法完成公开渠道验证。
- 手工上传 tarball：绕开现有 CI 证明、产物来源绑定和匿名安装验证。

## Consequences

默认安装文档指向 GitHub Release。市场需要固定 Git 来源时，独立的 dsh-release 分支从公开 tarball 提取运行文件，仅移除 manifest 的源码脚本、开发依赖和源码子目录元数据，再以 dsh-v<version> 标签固定；source v<version> 继续指向通过 CI 的 main 提交。以后配置 npm 凭据并启用仓库变量即可增加 npm 渠道，无需更换包名或安装资产。发布不迁移日常 profile、会话或创作文件。

## Verification

发布脚本单测与完整发布检查覆盖原有校验；GitHub 发布工作流验证默认渠道的匿名下载与安装。
