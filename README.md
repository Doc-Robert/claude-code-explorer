# Claude Code Explorer

深入理解 Anthropic Claude Code 的源码架构设计。

## 项目简介

这是一个交互式网站，全面剖析 Claude Code 的核心架构、工具系统、权限模型和多智能体协作机制。

**在线预览**: [https://claude-code-explorer.vercel.app](https://claude-code-explorer.vercel.app)

## 特性

- 系统架构全景图 (6层架构)
- 核心模块详解 (QueryEngine、Tool 抽象层、权限系统等)
- 42个内置工具分类展示
- 完整执行流程可视化
- 深度设计洞察

## 技术栈

- Vue 3 + TypeScript
- Vite
- CSS3 动画与过渡效果

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 项目结构

```
claude-code-explorer/
├── src/
│   ├── components/     # Vue 组件
│   ├── composables/    # 组合式函数
│   ├── data/           # 数据定义
│   ├── icons/          # 图标组件
│   └── assets/         # 静态资源
├── public/             # 公共资源
└── index.html          # 入口文件
```

## 许可

仅供学习研究使用。

## 致谢

基于 Anthropic Claude Code 源码分析制作。
