# VTable 演示项目

用于展示一些 react-vtable 示例项目，包含多个功能演示。

## 功能演示

- **Demo1**: 根据数据计算列宽与记忆拖拽宽度
- **Demo2**: 动态修改表格主题与配色  
- **Demo3**: 树形结构表格展示

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建项目
pnpm build

# 预览构建结果
pnpm preview
```

## GitHub Pages 自动部署

本项目配置了 GitHub Actions 自动部署到 GitHub Pages：

1. 推送代码到 `main` 分支会自动触发部署
2. 也可以在 Actions 页面手动触发部署
3. 部署完成后可通过 `https://[username].github.io/vtable-demo/` 访问

### 部署配置说明

- 使用 pnpm 作为包管理器
- 自动缓存依赖以加速构建
- 构建产物输出到 `dist` 目录
- 支持 TypeScript 类型检查

## 技术栈

- React 18
- TypeScript
- Vite
- @visactor/vtable
- @visactor/react-vtable
- React Router DOM
- ahooks