---
title: AI 接口配置 — AI 批改助手
description: 配置支持图片识别的 AI 接口，了解 5plus1API 主端点、上海备用端点、密钥获取、充值与连接排查。
---

# AI 接口配置

AI 批改助手通过 OpenAI 兼容的 `/v1/chat/completions` 接口与 AI 服务通信，需要发送**答题卡图片**给 AI 进行视觉识别。

::: danger 必须使用支持图片识别的模型
AI 批改助手的核心功能是**识别手写答案图片**，因此所选模型**必须支持图片输入（多模态）**。

仅支持文本的端点不适用于答题卡图片阅卷。使用自定义供应商时，请检查端点与所选模型的图片处理能力；5+1 AI 内置模型按其服务配置使用。
:::

## 推荐：5+1 AI

**5plus1API** 是内置的默认服务商。两个端点共用账号、API 密钥和余额。

| 配置项 | 值 |
|-------|---|
| 主端点 | `https://api.ai.five-plus-one.com/v1/chat/completions` |
| 上海备用端点 | `https://api-sh.ai.five-plus-one.com/v1/chat/completions` |
| 模型 | 默认 `aimarker-fast`；另有 `aimarker-pro` 与 DeepSeek Flash 可在工作流中选择 |
| API 密钥 | [主站密钥页](https://api.ai.five-plus-one.com/keys) · [上海备用密钥页](https://api-sh.ai.five-plus-one.com/keys) |

### 获取步骤

1. 打开表中的任一密钥页
2. 注册账号（支持手机号或邮箱）
3. 新注册用户会获得**少量试用额度**
4. 在控制台中创建 API Token
5. 复制 Token，粘贴到脚本设置面板的「API 密钥」输入框

### 连接与切换端点

主端点带宽较大。国内部分地区访问受限时，可使用上海备用端点。首次配置时，主端点连接失败会自动验证备用端点，验证通过后保存为当前端点。批改遇到连接故障时也会尝试切换线路。

脚本会获取最新的官方线路配置。暂时无法连接配置服务时，仍可使用已知的官方线路。

之后也可以在「批改配置 → 供应商与模型」中选择「5plus1官方」，通过「5plus1API 端点」切换，继续使用已有的密钥和模型。

### 余额与充值

脚本免费使用，费用来自 AI 服务调用。试用额度用完或收到余额不足提醒时，请登录同一个 5plus1API 账号充值，到账后再继续批改。

通常可打开[主站充值页](https://api.ai.five-plus-one.com/wallet)。主站打不开时，可打开[上海备用充值页](https://api-sh.ai.five-plus-one.com/wallet)。两个入口共用余额，一笔充值到账后两个端点都可使用。

<span id="deepseek" class="fp-anchor-alias" aria-hidden="true"></span>

## 其他兼容服务

脚本支持任何兼容 OpenAI 接口且**支持图片输入**的服务商。在设置面板中切换服务商后，填写对应的配置：

### 火山引擎（豆包）

| 配置项 | 值 |
|-------|---|
| 端点 | `https://ark.cn-beijing.volces.com/api/v3/chat/completions` |
| 模型 | 你的推理接入点 ID（需选择支持视觉的模型） |
| API KEY | [火山引擎控制台](https://console.volcengine.com/) |

### 硅基流动

| 配置项 | 值 |
|-------|---|
| 端点 | `https://api.siliconflow.cn/v1/chat/completions` |
| 模型 | 如 `Qwen/Qwen2.5-VL-72B-Instruct`（VL 系列支持图片） |
| API KEY | [硅基流动](https://cloud.siliconflow.cn/) |

::: tip 如何确认模型是否支持图片？
选择模型时，注意名称中是否包含 **VL**（Vision-Language）、**Vision**、**多模态** 等关键词。例如：
- `Qwen2.5-VL-72B-Instruct` — 支持图片
- `Qwen2.5-72B-Instruct` — 纯文本，**不支持**

如果不确定，可以在服务商的文档中确认该模型是否支持"图片输入"或"多模态"。
:::

## 多服务商管理

脚本支持配置多个服务商，并在它们之间快速切换：

1. 打开设置面板
2. 在「AI 服务商」区域，可以看到已配置的服务商列表
3. 点击服务商名称切换当前使用的服务商
4. 点击「+」添加新服务商，填写端点、模型和密钥

每个**预设方案**可以绑定不同的服务商。

## 流式输出

脚本默认启用 **SSE 流式输出**，实时显示 AI 的思考过程。你可以在流式输出面板中：

- 观察 AI 识别手写答案的过程
- 查看 AI 的评分推理逻辑
- 在识别完成后复制结果

如果遇到流式输出不工作的情况，可能是服务商不支持 SSE 或浏览器兼容性问题，脚本会自动降级为普通请求模式。

## 请求参数

脚本发送给 AI 的请求参数：

| 参数 | 值 | 说明 |
|------|---|------|
| `model` | 你配置的模型名 | 如 `aimarker-fast` |
| `max_tokens` | 2048 | 最大输出 token 数 |
| `stream` | true | 启用流式输出 |
| `messages` | 多模态消息 | 包含文本提示词 + 答题卡图片 |

## 诊断与调试

如果 API 请求遇到问题，打开浏览器控制台（`F12`）查看带 `[诊断]` 标记的日志：

- `发送请求到: ...` — 请求已发出
- `onprogress 已触发` — 流式输出正常工作
- `onload 触发 — HTTP状态: 200` — 请求成功
- `API返回错误: 4xx/5xx` — 服务端报错
- `网络请求被拦截` — 跨域权限问题
- `请求超时` — 网络超时

::: warning 跨域权限
脚本使用 `GM_xmlhttpRequest` 绕过浏览器的跨域限制，这是 Tampermonkey 提供的特殊 API。如果遇到跨域错误，请确认脚本是通过 Tampermonkey 安装的，而非直接在浏览器控制台中运行。
:::
