# MoleculeAI 技术文档

本文档提供MoleculeAI创新药物设计平台的技术细节，包括架构设计、组件结构、数据流和API接口等信息，供开发者和技术人员参考。

## 技术架构

MoleculeAI采用现代前端技术栈构建，主要包括：

### 核心技术

- **框架**：React 18
- **构建工具**：Vite
- **状态管理**：Zustand
- **3D渲染**：Three.js + React Three Fiber
- **UI组件**：自定义组件库
- **样式**：CSS Modules + CSS变量

### 架构图

```
┌─────────────────────────────────────────────────────────┐
│                      用户界面层                         │
│  ┌─────────┐  ┌─────────────┐  ┌────────────────────┐  │
│  │ 布局组件 │  │ 功能组件    │  │ UI组件            │  │
│  └─────────┘  └─────────────┘  └────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│                      业务逻辑层                         │
│  ┌─────────┐  ┌─────────────┐  ┌────────────────────┐  │
│  │ 状态管理 │  │ 自定义Hooks │  │ 业务逻辑          │  │
│  └─────────┘  └─────────────┘  └────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│                      数据服务层                         │
│  ┌─────────┐  ┌─────────────┐  ┌────────────────────┐  │
│  │ API接口 │  │ 数据转换    │  │ 本地存储          │  │
│  └─────────┘  └─────────────┘  └────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## 组件结构

### 目录结构

```
src/
├── components/
│   ├── 3d/                # 3D可视化相关组件
│   │   ├── AtomComponent.jsx
│   │   ├── BondComponent.jsx
│   │   ├── MeasurementTools.jsx
│   │   ├── MoleculeControls.jsx
│   │   ├── MoleculeScene.jsx
│   │   └── MoleculeViewer.jsx
│   ├── agent/             # AI Agent相关组件
│   │   └── AgentChat.jsx
│   ├── layout/            # 布局组件
│   │   ├── Header.jsx
│   │   ├── LeftSidebar.jsx
│   │   ├── RightPanel.jsx
│   │   └── StatusBar.jsx
│   ├── molecules/         # 分子相关组件
│   │   ├── MoleculeGenerator.jsx
│   │   ├── MoleculeLibrary.jsx
│   │   └── MoleculeProperties.jsx
│   └── ui/                # 基础UI组件
│       ├── button.jsx
│       ├── input.jsx
│       ├── scroll-area.jsx
│       ├── slider.jsx
│       ├── tabs.jsx
│       └── textarea.jsx
├── hooks/                 # 自定义React Hooks
├── stores/                # 状态管理
│   ├── agentStore.js
│   └── moleculeStore.js
├── lib/                   # 工具函数和库
├── App.jsx                # 应用入口
├── App.css                # 全局样式
└── main.jsx               # 渲染入口
```

## 状态管理

MoleculeAI使用Zustand进行状态管理，主要包含两个状态存储：

### 分子状态管理 (moleculeStore.js)

```javascript
export const useMoleculeStore = create((set, get) => ({
  // 状态
  molecules: [...],
  selectedMoleculeId: '...',
  selectedAtoms: [],
  viewMode: 'ball-and-stick',
  
  // 操作
  selectMolecule: (id) => set({ selectedMoleculeId: id }),
  toggleAtomSelection: (atomIndex) => {...},
  clearAtomSelection: () => set({ selectedAtoms: [] }),
  setViewMode: (mode) => set({ viewMode: mode }),
  addMolecule: (molecule) => {...},
  removeMolecule: (id) => {...},
  
  // 获取当前选中的分子
  getSelectedMolecule: () => {...}
}));
```

### Agent状态管理 (agentStore.js)

```javascript
export const useAgentStore = create((set) => ({
  // 状态
  messages: [...],
  isThinking: false,
  suggestions: [],
  
  // 操作
  sendMessage: (content) => {...},
  clearMessages: () => set({ messages: [] })
}));
```

## 数据模型

### 分子数据结构

```javascript
{
  id: 'molecule-1',
  name: '咖啡因',
  formula: 'C8H10N4O2',
  atoms: [
    { position: [x, y, z], element: 'C', label: 'C1' },
    // ...更多原子
  ],
  bonds: [
    { from: 0, to: 1, order: 1 },
    // ...更多键
  ],
  properties: {
    molecularWeight: 194.19,
    logP: -0.07,
    hbdCount: 0,
    hbaCount: 6,
    tpsa: 58.4,
    rotBonds: 0,
    lipinskiViolations: 0
  }
}
```

### 消息数据结构

```javascript
{
  id: 'message-1',
  sender: 'user' | 'agent',
  content: '消息内容',
  timestamp: 1623456789000
}
```

## 3D可视化实现

MoleculeAI使用React Three Fiber（Three.js的React封装）实现3D分子可视化：

### 核心组件

- **MoleculeViewer**：3D视图的容器组件
- **MoleculeScene**：管理3D场景、相机和灯光
- **AtomComponent**：渲染单个原子
- **BondComponent**：渲染化学键
- **MoleculeControls**：提供视图控制工具
- **MeasurementTools**：实现测量功能

### 分子表示模式

- **球棍模型**：原子为球体，键为圆柱体
- **空间填充模型**：原子为大球体，无显式键
- **线框模型**：原子和键均为线框
- **卡通模型**：简化的表示方式

## 性能优化

### 渲染优化

- 使用React.memo减少不必要的重渲染
- 实现组件懒加载
- 使用Three.js的实例化渲染技术

### 状态管理优化

- 精细化状态更新，避免不必要的重渲染
- 使用选择器函数只订阅需要的状态

### 3D性能优化

- 使用适当的几何体细节级别
- 实现视锥体剔除
- 优化光照和阴影计算

## 扩展指南

### 添加新的分子表示模式

1. 在`moleculeStore.js`中添加新的视图模式
2. 在`AtomComponent.jsx`和`BondComponent.jsx`中添加对应的渲染逻辑
3. 在`MoleculeControls.jsx`中添加切换按钮

### 集成新的AI模型

1. 在`agentStore.js`中添加新的API调用函数
2. 更新`AgentChat.jsx`以支持新的交互模式
3. 添加必要的UI元素以控制新功能

### 添加新的分子属性计算

1. 在分子数据结构中添加新的属性字段
2. 实现计算函数
3. 在`MoleculeProperties.jsx`中添加显示逻辑

## 部署指南

### 构建生产版本

```bash
pnpm run build
```

构建产物将生成在`dist`目录中。

### 部署选项

- **静态托管**：将`dist`目录部署到任何静态网站托管服务
- **容器化**：使用提供的Dockerfile构建容器镜像
- **CI/CD**：集成到CI/CD流程中自动构建和部署

## API参考

### 分子生成API

```
POST /api/molecules/generate
Content-Type: application/json

{
  "description": "ACE抑制剂",
  "reference": "SMILES字符串",
  "diversity": 0.7,
  "count": 10
}
```

### 分子优化API

```
POST /api/molecules/optimize
Content-Type: application/json

{
  "molecule": {
    // 分子数据
  },
  "target": "solubility" | "potency" | "selectivity"
}
```

### Agent对话API

```
POST /api/agent/chat
Content-Type: application/json

{
  "message": "用户消息",
  "context": {
    "selectedMolecule": {
      // 分子数据
    }
  }
}
```

## 技术债务和未来计划

### 已知问题

- 大型分子（>100原子）的渲染性能需要优化
- 移动设备上的3D交互体验有待改进
- WebGL兼容性问题需要更好的回退方案

### 未来计划

- 实现分子动力学模拟
- 添加批量分子处理功能
- 集成更多药物性预测模型
- 支持协作编辑和分享

## 贡献指南

请参阅项目根目录下的`CONTRIBUTING.md`文件了解如何贡献代码。

## 许可证

MIT License

