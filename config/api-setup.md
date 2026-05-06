---
title: AI 接口配置 — AI 批改助手
description: AI批改助手支持5+1 AI、DeepSeek、火山引擎、硅基流动等OpenAI兼容接口。配置端点地址、模型名称和API密钥即可使用。
---

# AI 接口配置

AI 批改助手通过 OpenAI 兼容的 `/v1/chat/completions` 接口与 AI 服务通信，支持文本 + 图片多模态输入。

## 推荐：5+1 AI

**5+1 AI** 是内置的默认服务商，开箱即用。

| 配置项 | 值 |
|-------|---|
| 端点 | `https://api.ai.five-plus-one.com/v1/chat/completions` |
| 模型 | `mimo-v2.5` |
| API KEY | [免费注册获取](https://api.ai.five-plus-one.com/console/token) |

### 获取步骤

1. 访问 [5+1 AI 控制台](https://api.ai.five-plus-one.com/console/token)
2. 注册账号（支持手机号或邮箱）
3. 在控制台中创建 API Token
4. 复制 Token，粘贴到脚本设置面板的「API 密钥」输入框

## 其他兼容服务

脚本支持任何兼容 OpenAI 接口的服务商。在设置面板中切换服务商后，填写对应的配置：

### DeepSeek

| 配置项 | 值 |
|-------|---|
| 端点 | `https://api.deepseek.com/v1/chat/completions` |
| 模型 | `deepseek-chat` |
| API KEY | [DeepSeek 开放平台](https://platform.deepseek.com/) |

### 火山引擎（豆包）

| 配置项 | 值 |
|-------|---|
| 端点 | `https://ark.cn-beijing.volces.com/api/v3/chat/completions` |
| 模型 | 你的推理接入点 ID |
| API KEY | [火山引擎控制台](https://console.volcengine.com/) |

### 硅基流动

| 配置项 | 值 |
|-------|---|
| 端点 | `https://api.siliconflow.cn/v1/chat/completions` |
| 模型 | 如 `Qwen/Qwen2.5-VL-72B-Instruct` |
| API KEY | [硅基流动](https://cloud.siliconflow.cn/) |

::: tip 多模态支持
AI 批改助手需要发送图片给 AI 进行视觉识别，因此所选模型**必须支持多模态输入**（即能处理图片）。纯文本模型（如早期的 ChatGPT-3.5）无法使用。
:::

## 多服务商管理

脚本支持配置多个服务商，并在它们之间快速切换：

1. 打开设置面板
2. 在「AI 服务商」区域，可以看到已配置的服务商列表
3. 点击服务商名称切换当前使用的服务商
4. 点击「+」添加新服务商，填写端点、模型和密钥

每个**预设方案**可以绑定不同的服务商。例如，语文作文使用 5+1 AI，数学大题使用 DeepSeek。

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
| `model` | 你配置的模型名 | 如 `mimo-v2.5` |
| `max_tokens` | 2048 | 最大输出 token 数 |
| `stream` | true | 启用流式输出 |
| `messages` | 多模态消息 | 包含文本提示词 + 答题卡图片 |

## 诊断与调试

如果 API 请求遇到问题，打开浏览器控制台（`F12`）查看带 `[诊断]` 标记的日志：

- `📤 发送请求到: ...` — 请求已发出
- `✅ onprogress 已触发` — 流式输出正常工作
- `✅ onload 触发 — HTTP状态: 200` — 请求成功
- `❌ API返回错误: 4xx/5xx` — 服务端报错
- `❌ 网络请求被拦截` — 跨域权限问题
- `❌ 请求超时` — 网络超时

::: warning 跨域权限
脚本使用 `GM_xmlhttpRequest` 绕过浏览器的跨域限制，这是 Tampermonkey 提供的特殊 API。如果遇到跨域错误，请确认脚本是通过 Tampermonkey 安装的，而非直接在浏览器控制台中运行。
:::
