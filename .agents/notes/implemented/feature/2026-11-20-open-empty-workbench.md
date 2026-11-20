# Agent Note: 空工作区默认展开创作工作台

Status: implemented

## Problem

用户打开空工作区时，只能看到 DSH 会话和入门提示。需要先写出文件才能浏览四种工作台。

## Decision

Oh Story 的 `openEmptyWorkbench` 默认启用，让有工作区的会话即使没有创作文件也展开工作台。普通用途可在 profile 中关闭此项。浏览器按工作区保存用户主动收起或展开的选择。

## Alternatives considered

仅独立创作服务默认开启，需要先专门配置；用户在空目录里仍要等待文件生成。现在插件提供清晰的 profile 开关，让创作入口成为默认行为，其他 profile 可选择关闭。

## Consequences

空工作区可以直接浏览各工作台及其入口。创作技能仍由 DSH 的会话模式管理。

## Verification

打包浏览器测试覆盖空工作区展开、收起后刷新及恢复。未开启配置的宿主仍由原有场景覆盖。
