# CoCube 教程本地化工作流

这份文档记录从中文 CoCube 教程制作英文、西班牙语页面的完整流程，包括
Markdown 翻译、资源放置、MicroBlocks 积木 PNG 本地化、构建检查和提交前检查。

示例中的活动目录写作：

```text
data/activities/<activity>/
```

## 1. 准备中文源教程

活动文件夹要使用英文 slug，因为它会进入生成后的 URL 和资源路径：

```text
data/activities/cocube_external_05_midi_intro/
```

推荐目录结构：

```text
data/activities/<activity>/
  meta.json
  files/
  locales/
    cn/
      index.md
      meta.json
      files/
```

资源放置规则：

- 活动级 `files/`：放所有语言共用、不会本地化的资源，例如 `.ogg` 音频。
- 语言级 `locales/<lang>/files/`：放该语言页面引用的图片、脚本 PNG、含文字的图片等。
- PNG 即使当前内容相同，也要按语言各放一份，后续需要替换成对应语言版本。

例如：

```text
data/activities/<activity>/files/example.ogg
data/activities/<activity>/locales/cn/files/scriptImage123.png
```

## 2. 创建英文和西班牙语目录

先从中文目录复制：

```sh
cp -R data/activities/<activity>/locales/cn data/activities/<activity>/locales/en
cp -R data/activities/<activity>/locales/cn data/activities/<activity>/locales/es
```

然后翻译这些文件：

```text
locales/en/index.md
locales/en/meta.json
locales/es/index.md
locales/es/meta.json
```

尽量保持各语言的资源文件名一致。例如中文是：

```markdown
![Code1](scriptImage123.png)
```

英文和西班牙语也保留：

```markdown
![Code1](scriptImage123.png)
```

文件名一致能让后续脚本 PNG 重渲染、差异检查和构建输出更稳定。

## 3. 翻译文本和 IDE 术语

教程面向青少年编程学习者，语气要清楚、直接、友好。优先使用短句和明确动作，
避免过度正式或直译。

IDE 菜单、积木名称、库名称、带引号的 UI 文案不要凭感觉翻译，要参考官方
MicroBlocks 翻译文件：

```text
/Users/mac/Documents/pjlab/cocube/mb_official/smallvm/translations/zh-chs.po
/Users/mac/Documents/pjlab/cocube/mb_official/smallvm/translations/es.po
```

检查重点：

- 在 `.po` 文件中搜索中文、英文或积木原文。
- 库名称、积木名称、菜单名称保留官方大小写和标点。
- 带引号内容尤其要小心，例如 `"Add Library"`、`"Libraries"`、积木标签、
  变量名、消息名、菜单名。
- 代码式名称一般不要翻译，例如 `key`、`last_key`。
- 西班牙语的 IDE 名词以 `translations/es.po` 为准。

英文页面可以使用当前 MicroBlocks IDE 的英文 UI 名称；西班牙语页面要尽量跟
官方 Spanish 翻译保持一致。

外文文档中的 MicroBlocks 在线编辑器入口不要保留 `https://cocube.fun`。
如果原链接是：

```text
https://cocube.fun#scripts=...
https://cocube.fun/#scripts=...
```

应改为：

```text
https://microblocks.fun/run/microblocks.html#scripts=...
```

已有的 `run-pilot/microblocks.html` 链接是另一套入口，只有确认教程需要切换时才改。

## 4. 更新活动列表

在下面文件中加入活动标题：

```text
data/json/contents.json
```

key 必须和活动文件夹名一致：

```json
"cocube_external_05_midi_intro": {
  "cn": "05 MIDI 演奏入门指南",
  "en": "05 MIDI Performance Intro",
  "es": "05 Introducción a la interpretación MIDI"
}
```

每个语言目录还需要自己的 `meta.json`：

```text
data/activities/<activity>/locales/<lang>/meta.json
```

通常只需要写本语言标题：

```json
{
  "title": "05 MIDI Performance Intro"
}
```

## 5. 本地化 MicroBlocks 积木 PNG

脚本 PNG 不是普通截图。MicroBlocks 导出的脚本图片可能包含 `GP Script`
元数据，用户可以把图片拖进 MicroBlocks 还原代码。所以不要用图片编辑器直接改
积木文字。

使用另一个项目里的工具重新渲染脚本 PNG：

```text
/Users/mac/Documents/pjlab/cocube/mb_official/smallvm/misc/wiki-script-images/
```

详细说明见：

```text
/Users/mac/Documents/pjlab/cocube/mb_official/smallvm/misc/wiki-script-images/README.md
```

从 `gp/` 目录运行：

```sh
cd /Users/mac/Documents/pjlab/cocube/mb_official/smallvm/gp
./gp-mac runtime/lib/* loadIDE.gp ../misc/wiki-script-images/renderLocalizedScriptImages.gp - \
  --activityDir /Users/mac/Documents/pjlab/cocube/wiki/cocube-learn/data/activities/<activity>
```

默认参数：

- 源语言：`cn`
- 目标语言：`en es`
- 单脚本 PNG 导出比例：`200`
- 多脚本 PNG 导出比例：`200`

也可以显式指定：

```sh
./gp-mac runtime/lib/* loadIDE.gp ../misc/wiki-script-images/renderLocalizedScriptImages.gp - \
  --activityDir /Users/mac/Documents/pjlab/cocube/wiki/cocube-learn/data/activities/<activity> \
  --srcLocale cn \
  --targetLocales en es \
  --scriptScale 200 \
  --allScriptsScale 200
```

工具会读取中文目录中的这些文件：

```text
locales/cn/files/scriptImage*.png
locales/cn/files/allScripts*.png
```

然后覆盖写入目标语言目录中的同名文件：

```text
locales/en/files/
locales/es/files/
```

如果脚本里有字符串常量，`.po` 翻译不会自动处理。例如：

```text
sayIt '识别到前进指令！'
```

这类字符串需要在活动根目录添加 `script-string-translations.tsv`：

```text
# locale	fileName	source	translation
en	scriptImage3963949.png	识别到前进指令！	Forward command recognized!
es	scriptImage3963949.png	识别到前进指令！	Orden de avance reconocida!
```

字段依次是目标语言、PNG 文件名、源字符串、目标字符串。文件名也可以写 `*`，
表示对该语言所有脚本 PNG 生效。渲染工具会在调用 `fixPNGScriptImage` 前替换脚本字符串，
因此生成的 PNG 像素和拖拽还原出来的代码都会使用目标语言字符串。

注意事项：

- 目标目录已有同名 PNG 会被覆盖。
- 运行前确认 `locales/en/files` 和 `locales/es/files` 已存在。
- 日志中出现 `File not found: img/...` 一类图标提示时，如果最终有
  `Rendering <locale> <file>` 且进程正常退出，通常不影响结果。
- 如果出现 `Unknown library: ...`，说明脚本依赖的 `.ubl` 库不在
  `gp/Libraries`，需要先补齐库再重新运行。
- 生成后抽样打开英文和西班牙语 PNG，确认积木文字已经本地化，排版也正常。

## 6. 检查资源构建规则

当前构建逻辑会这样处理资源：

- 活动级 `files/`：作为共用资源输出到 `dist/activity-assets/...`。
- 语言级非 PNG 文件：如果多个语言内容相同，可以由构建共享输出。
- 语言级 PNG 文件：永远不共享，始终按语言输出。

因此 Markdown 中可以保持简单本地引用：

```markdown
![Code1](scriptImage123.png)
<audio controls src="example.ogg"></audio>
```

构建时会自动重写需要共享的资源路径。

不要把可本地化 PNG 只放到活动级 `files/`。只要图片含有文字、代码、IDE UI
或任何未来可能换语言的内容，都应该放到每个语言自己的 `files/` 目录。

## 7. 构建和人工检查

在 `cocube-learn` 仓库运行：

```sh
node tests/build-utils.test.js
npm run build
git diff --check
```

生成页面位置：

```text
dist/cn/activities/<activity>-cn/index.html
dist/en/activities/<activity>-en/index.html
dist/es/activities/<activity>-es/index.html
```

人工检查：

- 活动是否出现在正确分类下。
- 中英西标题是否正确。
- 音频、视频、图片链接是否正常。
- PNG 是否出现在各语言活动目录，而不是被共享到 `activity-assets`。
- 脚本 PNG 在生成 HTML 中是否带有 `class="scriptImg"`。
- 脚本 PNG 拖拽到 MicroBlocks 后是否仍能还原代码。
- 带引号的 IDE 术语是否符合官方 `.po` 文件。

## 8. 提交前检查

提交前运行：

```sh
git status --short
git diff --stat
git diff --check
```

通常只提交这些相关文件：

- `data/activities/<activity>/`
- `data/json/contents.json`
- 为资源处理新增或修改的构建脚本、测试
- 本轮审查中确认要提交的翻译修正

不要误提交无关本地改动、`dist/` 生成物、`.cert/` 证书、无关删除文件或临时文件。
