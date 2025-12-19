import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  ChevronRight
} from 'lucide-react';

const Layout = () => {
  const location = useLocation();

  // 菜单项配置 - 添加图标和描述
  const menuItems = [
    {
      path: '/',
      label: '列宽计算',
      description: '根据数据计算列宽与记忆拖拽宽度',
    },
    {
      path: '/demo2',
      label: '主题配色',
      description: '动态修改表格主题与配色',
    },
    {
      path: '/demo3',
      label: 'AI 树形表',
      description: '指挥AI + MCP 实现一个树形结构表',
    },
    {
      path: '/demo4',
      label: '转置与冻结',
      description: '表格转置与行列冻结功能演示',
    },
    {
      path: '/demo5',
      label: '灵活调整尺寸',
      description: '行高列宽配置与自动换行功能',
    },
  ];

  return (
    <div className="flex h-screen w-full">
      {/* 侧边栏 */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
        {/* 导航菜单 */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className={`
                      text-xs mt-0.5 transition-colors
                      ${isActive ? 'text-blue-600' : 'text-gray-500'}
                    `}>
                      {item.description}
                    </div>
                  </div>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-blue-600" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 主要内容 */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;