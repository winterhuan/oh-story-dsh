# Agent Note: 浏览器任务直接使用官方 ego-browser

Status: implemented

## Problem

上游 browser-cdp 的发现描述要求本机 Chrome 和 agent-browser，DSH 正文却只描述可见网页工具，资料研究员也保留旧 CDP 流程。用户只使用官方 Ego，不需要插件再包装一个兼容入口或维护浏览器会话实现。

## Decision

插件提供 13 个小说技能与七个角色；provider 不注册 browser-cdp，构建排除其目录及引用旧启动流程的站点采集说明。固定知识副本和 manifest 保留 14 个上游技能并继续做逐文件校验。运行时的 story 路由、长短篇扫榜和资料研究员直接使用官方 ego-browser Skill，执行 ego-browser skill 并完整遵循当前版本指南。

研究员保留来源评估与参考文件输出，使用既有 bash 权限，无需增加角色工具或参考路径。Ego 安装、Space 复用、页面操作、人工接管与任务完成由官方运行时负责。网页数据的来源、时间与实际读取范围仍由写作任务记录。

## Alternatives considered

- 保留 browser-cdp 兼容入口：模型多加载一份重复说明，调用处直接指向官方技能即可。
- 自维护 Ego 传输、状态目录和恢复协议：重复官方能力且容易落后于当前版本的 helper API。
- 手改固定知识资产：破坏逐文件哈希，且下一次同步会覆盖本地接入。

## Consequences

插件无需安装或封装 Ego，自身的发现目录中也不包含 ego-browser；官方技能和运行时由宿主环境提供。缺少环境时报告原因，公开静态来源可用本会话已有网页工具。旧项目中独立安装的同名技能仍由项目和 DSH 的发现规则负责，插件不删除用户文件。

## Verification

provider 测试覆盖旧入口不注册且不能直接读取，路由与扫榜使用官方命令。构建和打包检查排除旧技能与采集器，固定资产检查继续验证原始知识。实际 Ego 网站操作需要可用的官方运行环境。
