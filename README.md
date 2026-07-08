# RiverGuard AI Web — 长江重点岸段崩岸监测预警智能体 · 前端应用

[![React](https://img.shields.io/badge/React-19-61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6)](https://www.typescriptlang.org/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5-1677FF)](https://ant.design/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF)](https://vitejs.dev/)
[![Zustand](https://img.shields.io/badge/Zustand-5-000000)](https://github.com/pmndrs/zustand)

Frontend application for the RiverGuard AI Platform. Provides an intuitive management interface with a modern glassmorphism design, featuring user authentication, role-based access control, and system administration panels.

**RiverGuard AI Platform** 的前端应用，提供现代化玻璃拟态风格的管理界面，包括用户认证、基于角色的访问控制和系统管理面板。

---

## Tech Stack — 技术栈

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Language | TypeScript 5.7 |
| UI Library | Ant Design 5 |
| State Management | Zustand 5 |
| Routing | React Router 7 |
| Build Tool | Vite 6 |
| HTTP Client | Axios |

## Project Structure — 项目结构

```
riverguard-ai-web/
├── public/                              # Static assets
├── src/
│   ├── api/                             # API client modules
│   │   ├── request.ts                   # Axios instance with interceptors
│   │   ├── auth.ts                      # Auth API (login, logout, me)
│   │   ├── user.ts                      # User management API
│   │   └── role.ts                      # Role query API
│   ├── assets/
│   │   └── styles/
│   │       └── global.css               # Glassmorphism design system
│   ├── components/                      # Shared components
│   │   └── AuthGuard.tsx                # Route authentication guard
│   ├── layouts/
│   │   └── MainLayout.tsx              # Application shell with glass UI
│   ├── store/
│   │   └── authStore.ts                # Zustand auth state
│   ├── types/                           # TypeScript type definitions
│   │   ├── common.ts                    # R<T>, PageResult
│   │   ├── system/user.ts              # UserVO, LoginVO
│   │   └── system/role.ts              # RoleVO
│   ├── views/
│   │   ├── login/index.tsx             # Login page
│   │   ├── home/index.tsx              # Dashboard home
│   │   ├── system/user/index.tsx       # User management page
│   │   └── profile/index.tsx           # User profile page
│   ├── App.tsx                          # App entry with RouterProvider
│   └── main.tsx                         # Vite entry point
├── index.html
├── vite.config.ts                       # Vite config with proxy
├── tsconfig.json
├── package.json
└── .env.example                         # Environment variable reference
```

## Getting Started — 快速开始

### Prerequisites — 前置条件

- Node.js 20+
- npm 10+ (or pnpm / yarn)

### 1. Install Dependencies — 安装依赖

```bash
npm install
```

### 2. Start Dev Server — 启动开发服务器

```bash
npm run dev
```

The application starts at `http://localhost:3000`. API requests to `/api/*` are proxied to `http://localhost:8080` (configured in `vite.config.ts`).

### 3. Build for Production — 生产构建

```bash
npm run build
```

Output is generated in the `dist/` directory.

## Configuration — 配置

### API Proxy — API 代理

The Vite dev server proxies `/api` requests to the backend. To change the target, edit `vite.config.ts`:

```ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',  // Change this
      changeOrigin: true,
    },
  },
}
```

### Environment Variables — 环境变量

Copy `.env.example` to `.env` and modify as needed:

```bash
cp .env.example .env
```

## Features — 功能特性

- **Glassmorphism Design** — Frosted glass UI with backdrop blur, layered transparency, and professional color palette
- **Responsive Layout** — Adaptive sidebar navigation with glass effect
- **User Management** — CRUD operations with role assignment
- **Role-Based Access** — UI adapts to user permissions
- **Secure Auth Flow** — JWT token management with auto-redirect on 401
- **Chinese Locale** — Ant Design zh_CN integration

---

## Development — 开发

### Coding Conventions — 编码规范

- TypeScript strict mode
- Functional components with hooks
- Zustand for global state
- Axios interceptors for request/response handling
- Route-level code splitting (lazy loading)

### Adding a New Page — 新增页面

```tsx
// 1. Create view component in src/views/<module>/
// 2. Add API module in src/api/
// 3. Register route in src/App.tsx
// 4. Add nav item in MainLayout.tsx
```

---

## Browser Support — 浏览器支持

- Chrome 90+
- Firefox 90+
- Edge 90+
- Safari 15+

---

**RiverGuard AI Web** — Frontend for the RiverGuard AI Platform.
