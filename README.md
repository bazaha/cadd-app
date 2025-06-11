# MoleculeAI - 创新药物设计平台

MoleculeAI是一个面向药物化学家的创新计算机辅助药物设计(CADD)软件界面，集成了AI分子生成能力和智能Agent功能，提供了强大的3D分子交互界面。该平台旨在简化药物化学家的工作流程，加速小分子药物的设计和优化过程。

## 功能特点

### 1. AI驱动的分子生成

- 基于目标描述生成候选分子
- 支持相似性参考和多样性调整
- 智能优化分子结构以满足特定需求

### 2. 3D分子可视化与交互

- 多种分子表示模式（球棍模型、空间填充模型、线框模型、卡通模型）
- 交互式3D视图（旋转、缩放、平移）
- 原子选择和标签显示
- 分子测量工具（距离、角度、二面角）

### 3. 智能Agent助手

- 交互式对话界面
- 提供分子设计建议和优化方案
- 解答药物化学相关问题
- 智能分析分子性质和结构

### 4. 分子库管理

- 浏览和搜索分子库
- 导入/导出分子结构
- 分子属性分析和比较

### 5. 药物性分析

- 计算关键物理化学性质
- Lipinski规则和Veber规则评估
- 药效团特征识别

## 技术架构

MoleculeAI采用现代Web技术构建，主要包括：

- **前端框架**：React
- **3D渲染**：Three.js + React Three Fiber
- **状态管理**：Zustand
- **UI组件**：自定义组件库
- **分子可视化**：3Dmol.js集成

## 系统要求

- **浏览器**：Chrome 90+、Firefox 88+、Safari 14+、Edge 90+
- **设备**：支持WebGL的现代桌面或移动设备
- **推荐配置**：8GB RAM、现代GPU（用于流畅的3D渲染）

## 快速开始

1. 访问应用：[https://ehleehyn.manus.space](https://ehleehyn.manus.space)
2. 在左侧面板中生成或导入分子
3. 在中央3D视图中交互式探索分子结构
4. 使用右侧Agent面板获取智能建议和分析

## 开发指南

### 本地开发环境设置

```bash
# 克隆仓库
git clone https://github.com/your-username/molecule-ai.git
cd molecule-ai

# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev
```

### 构建生产版本

```bash
pnpm run build
```

## 项目结构

```
molecule-ai/
├── src/
│   ├── components/
│   │   ├── 3d/            # 3D可视化相关组件
│   │   ├── agent/         # AI Agent相关组件
│   │   ├── layout/        # 布局组件
│   │   ├── molecules/     # 分子相关组件
│   │   └── ui/            # 基础UI组件
│   ├── hooks/             # 自定义React Hooks
│   ├── stores/            # 状态管理
│   ├── lib/               # 工具函数和库
│   ├── App.jsx            # 应用入口
│   └── main.jsx           # 渲染入口
└── public/                # 静态资源
```

## 许可证

MIT License

