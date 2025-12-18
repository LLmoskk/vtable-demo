import { ListTable } from '@visactor/react-vtable';
import { columns, records } from '../../utils/mock-data';
import { useTheme } from 'ahooks';
import { getCommonVTableTheme } from './utils/theme';
import './index.css';

function Demo2() {
  const { themeMode, setThemeMode } = useTheme();
  const isDark = themeMode === 'dark';

  const handleThemeToggle = () => {
    setThemeMode(isDark ? 'light' : 'dark');
  };

  return (
    <div className="demo2-container">
      <div className="demo2-header">
        <div className="theme-switch">
          <label className="switch">
            <input
              type="checkbox"
              checked={isDark}
              onChange={handleThemeToggle}
            />
            <span className="slider">
              <span className="slider-text">
                {isDark ? '🌙' : '☀️'}
              </span>
            </span>
          </label>
          <span className="theme-label">
            {isDark ? '暗色模式' : '亮色模式'}
          </span>
        </div>
      </div>
      <ListTable
        records={records}
        columns={columns}
        height={700}
        width={1200}
        theme={getCommonVTableTheme(isDark)}
      />
    </div>
  );
}

export default Demo2;