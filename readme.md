# Micro Base Project

本仓库为多项目前端微前端解决方案，包含以下三个子项目：

- **micro-base-pro**：Vue3 微前端基座项目
- **react-app**：React 子应用
- **vue3-app**：Vue3 子应用

---

## 目录结构

```
micro-base-project/
│
├── micro-base-pro/   # 微前端基座（Vue3 + Vite）
├── react-app/        # React 子应用（Vite）
└── vue3-app/         # Vue3 子应用（Vite）
```

---

## 快速开始

### 1. 安装依赖

请在每个子项目目录下分别执行依赖安装：

```bash
# 安装 micro-base-pro 依赖
cd micro-base-pro
npm install

# 安装 react-app 依赖
cd ../react-app
npm install

# 安装 vue3-app 依赖
cd ../vue3-app
npm install
```

### 2. 启动项目

建议分别打开三个终端，分别启动各自的开发服务器：

```bash
# 启动微前端基座
cd micro-base-pro
npm run dev

# 启动 React 子应用
cd ../react-app
npm run dev

# 启动 Vue3 子应用
cd ../vue3-app
npm run dev
```

### 3. 访问方式

- 默认端口（如未修改）：
	- micro-base-pro: http://localhost:5173
	- react-app: http://localhost:5174
	- vue3-app: http://localhost:5175

> 具体端口以实际启动日志为准。

---

## 项目说明

### micro-base-pro

- 技术栈：Vue3 + Vite
- 作用：作为微前端基座，负责主框架和子应用的加载、通信等。

### react-app

- 技术栈：React + Vite + TypeScript
- 作用：作为微前端的一个子应用，独立开发、独立部署。

### vue3-app

- 技术栈：Vue3 + Vite + TypeScript
- 作用：作为微前端的另一个子应用，独立开发、独立部署。

---

## 其他说明

- 推荐使用 Node.js 16+ 版本。
- 各子项目均可独立开发、调试和构建。
- 微前端集成方式、通信协议等请参考各自子项目的 README.md。

---

如需详细开发、部署、打包等说明，请查阅各子项目下的 README.md 文件。
