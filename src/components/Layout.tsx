import { Outlet, Link, useLocation } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: '根据数据计算列宽与记忆拖拽宽度' },
    { path: '/demo2', label: '动态修改表格主题与配色' },
    { path: '/demo3', label: '指挥AI + MCP 实现一个树形结构表' },
  ];

  return (
    <div className="layout">
      <div className="sidebar">
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;