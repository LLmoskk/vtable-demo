import { ListTable } from '@visactor/react-vtable';
import { columns, records } from '../../utils/mock-data';
import { useTheme } from 'ahooks';
import { getCommonVTableTheme } from './utils/theme';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Moon, Sun } from 'lucide-react';
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
        <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border">
          <div className="flex items-center gap-2">
            {isDark ? (
              <Moon className="h-4 w-4 text-slate-600" />
            ) : (
              <Sun className="h-4 w-4 text-amber-500" />
            )}
            <Label htmlFor="theme-switch" className="text-sm font-medium">
              {isDark ? '暗色模式' : '亮色模式'}
            </Label>
          </div>
          <Switch
            id="theme-switch"
            checked={isDark}
            onCheckedChange={handleThemeToggle}
          />
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