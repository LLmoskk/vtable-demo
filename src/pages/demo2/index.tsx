import { useState } from 'react';
import { ListTable } from '@visactor/react-vtable';
import { themes } from '@visactor/vtable';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Palette, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

// 生成模拟数据
const generateBusinessData = () => {
  const data = [];
  const departments = ['销售部', '技术部', '市场部', '财务部', '人事部'];
  const products = ['产品A', '产品B', '产品C', '产品D', '产品E'];
  const regions = ['华北', '华东', '华南', '西南', '东北'];
  
  for (let i = 0; i < 100; i++) {
    const sales = Math.floor(Math.random() * 200000) + 10000;
    const target = Math.floor(Math.random() * 150000) + 80000;
    const completion = (sales / target * 100);
    
    data.push({
      id: i + 1,
      department: departments[i % departments.length],
      product: products[i % products.length],
      region: regions[i % regions.length],
      sales: sales,
      target: target,
      completion: completion,
      profit: Math.floor(Math.random() * 50000) + 5000,
      growth: (Math.random() - 0.5) * 100, // -50% 到 50% 的增长率
      status: completion >= 100 ? '达标' : completion >= 80 ? '接近' : '未达标',
      quarter: `Q${Math.floor(i / 25) + 1}`,
      manager: `经理${i % 10 + 1}`,
      createTime: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
    });
  }
  return data;
};

const businessData = generateBusinessData();

function Demo2() {
  const [selectedTheme, setSelectedTheme] = useState('DEFAULT');
  const [enableConditionalFormat, setEnableConditionalFormat] = useState(true);
  const [enableCustomTheme, setEnableCustomTheme] = useState(false);

  // 内置主题列表
  const builtinThemes = [
    { key: 'DEFAULT', name: '默认主题', theme: themes.DEFAULT },
    { key: 'DARK', name: '暗色主题', theme: themes.DARK },
    { key: 'BRIGHT', name: '明亮主题', theme: themes.BRIGHT },
    { key: 'ARCO', name: 'Arco主题', theme: themes.ARCO },
    { key: 'SIMPLIFY', name: '简约主题', theme: themes.SIMPLIFY }
  ];

  // 生成业务数据

  // 自定义主题
  const customTheme = themes.DEFAULT.extends({
    defaultStyle: {
      borderLineWidth: 1,
      borderColor: '#e1e5e9'
    },
    headerStyle: {
      bgColor: '#4f46e5',
      color: 'white',
      fontWeight: 'bold',
      fontSize: 14,
      borderColor: '#3730a3',
      borderLineWidth: 1
    },
    bodyStyle: {
      borderColor: '#e1e5e9',
      borderLineWidth: 1,
      fontSize: 13,
      // 斑马纹效果
      bgColor: (args: any) => {
        return args.row % 2 === 0 ? '#f8fafc' : '#ffffff';
      },
      hover: {
        cellBgColor: '#dbeafe',
        inlineRowBgColor: '#eff6ff'
      }
    },
    frameStyle: {
      borderColor: '#d1d5db',
      borderLineWidth: 2,
      cornerRadius: 8,
      shadowBlur: 8,
      shadowOffsetX: 0,
      shadowOffsetY: 2,
      shadowColor: 'rgba(0, 0, 0, 0.1)'
    }
  });

  // 表格列配置（带条件格式化）
  const getColumns = () => {
    const baseColumns = [
      {
        field: 'id',
        title: 'ID',
        width: 60
      },
      {
        field: 'department',
        title: '部门',
        width: 100
      },
      {
        field: 'product',
        title: '产品',
        width: 100
      },
      {
        field: 'region',
        title: '地区',
        width: 80
      },
      {
        field: 'sales',
        title: '销售额',
        width: 120,
        format: (value: number) => `¥${value.toLocaleString()}`
      },
      {
        field: 'target',
        title: '目标',
        width: 120,
        format: (value: number) => `¥${value.toLocaleString()}`
      },
      {
        field: 'completion',
        title: '完成率',
        width: 100,
        format: (value: number) => `${value.toFixed(1)}%`
      },
      {
        field: 'profit',
        title: '利润',
        width: 120,
        format: (value: number) => `¥${value.toLocaleString()}`
      },
      {
        field: 'growth',
        title: '增长率',
        width: 100,
        format: (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
      },
      {
        field: 'status',
        title: '状态',
        width: 80
      },
      {
        field: 'quarter',
        title: '季度',
        width: 80
      },
      {
        field: 'manager',
        title: '负责人',
        width: 100
      },
      {
        field: 'createTime',
        title: '创建时间',
        width: 120
      }
    ];

    // 如果启用条件格式化，添加样式配置
    if (enableConditionalFormat) {
      // 销售额条件格式化
      const salesColumn = baseColumns.find(col => col.field === 'sales');
      if (salesColumn) {
        (salesColumn as any).style = {
          color: (args: any) => {
            const value = args.dataValue;
            if (value >= 150000) return '#059669'; // 绿色：高销售额
            if (value >= 100000) return '#0891b2'; // 蓝色：中等销售额
            return '#dc2626'; // 红色：低销售额
          },
          fontWeight: (args: any) => {
            return args.dataValue >= 150000 ? 'bold' : 'normal';
          }
        };
      }

      // 完成率条件格式化
      const completionColumn = baseColumns.find(col => col.field === 'completion');
      if (completionColumn) {
        (completionColumn as any).style = {
          bgColor: (args: any) => {
            const value = args.dataValue;
            if (value >= 100) return '#dcfce7'; // 绿色背景：达标
            if (value >= 80) return '#fef3c7';  // 黄色背景：接近
            return '#fee2e2'; // 红色背景：未达标
          },
          color: (args: any) => {
            const value = args.dataValue;
            if (value >= 100) return '#166534';
            if (value >= 80) return '#92400e';
            return '#991b1b';
          },
          fontWeight: 'bold'
        };
      }

      // 利润条件格式化
      const profitColumn = baseColumns.find(col => col.field === 'profit');
      if (profitColumn) {
        (profitColumn as any).style = {
          bgColor: (args: any) => {
            const value = args.dataValue;
            const maxProfit = 55000;
            const ratio = Math.min(value / maxProfit, 1);
            const opacity = 0.1 + ratio * 0.3;
            return `rgba(34, 197, 94, ${opacity})`; // 绿色渐变
          }
        };
      }

      // 增长率条件格式化
      const growthColumn = baseColumns.find(col => col.field === 'growth');
      if (growthColumn) {
        (growthColumn as any).style = {
          color: (args: any) => {
            const value = args.dataValue;
            return value >= 0 ? '#059669' : '#dc2626';
          },
          fontWeight: 'bold'
        };
      }

      // 状态条件格式化
      const statusColumn = baseColumns.find(col => col.field === 'status');
      if (statusColumn) {
        (statusColumn as any).style = {
          bgColor: (args: any) => {
            switch (args.dataValue) {
              case '达标': return '#dcfce7';
              case '接近': return '#fef3c7';
              case '未达标': return '#fee2e2';
              default: return '#ffffff';
            }
          },
          color: (args: any) => {
            switch (args.dataValue) {
              case '达标': return '#166534';
              case '接近': return '#92400e';
              case '未达标': return '#991b1b';
              default: return '#000000';
            }
          },
          fontWeight: 'bold',
          textAlign: 'center'
        };
      }
    }

    return baseColumns;
  };

  // 获取当前主题
  const getCurrentTheme = () => {
    if (enableCustomTheme) {
      return customTheme;
    }
    const themeConfig = builtinThemes.find(t => t.key === selectedTheme);
    return themeConfig ? themeConfig.theme : themes.DEFAULT;
  };

  return (
    <div className="p-6 space-y-6">
      {/* 控制面板 */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold">主题与格式化控制面板</h2>
        </div>
        
        {/* 内置主题选择 */}
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">内置主题选择</Label>
            <div className="flex flex-wrap gap-2">
              {builtinThemes.map((theme) => (
                <Button
                  key={theme.key}
                  variant={selectedTheme === theme.key && !enableCustomTheme ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedTheme(theme.key);
                    setEnableCustomTheme(false);
                  }}
                  disabled={enableCustomTheme}
                >
                  {theme.name}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* 功能开关 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="customTheme"
                checked={enableCustomTheme}
                onCheckedChange={setEnableCustomTheme}
              />
              <Label htmlFor="customTheme">启用自定义主题</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="conditionalFormat"
                checked={enableConditionalFormat}
                onCheckedChange={setEnableConditionalFormat}
              />
              <Label htmlFor="conditionalFormat">启用条件格式化</Label>
            </div>
          </div>
        </div>
      </div>

      {/* 表格展示 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">业务数据表格</h2>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <ListTable
            records={businessData}
            columns={getColumns()}
            height={500}
            theme={getCurrentTheme()}
            widthMode="standard"
            heightMode="autoHeight"
            defaultRowHeight={40}
            defaultHeaderRowHeight={50}
          />
        </div>
      </div>

      {/* 条件格式化说明 */}
      {enableConditionalFormat && (
        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <h3 className="text-lg font-semibold text-amber-900">条件格式化规则</h3>
          </div>
          <div className="text-amber-800 space-y-2 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>销售额颜色规则：</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li className="text-green-600">≥15万：绿色（高销售额）</li>
                  <li className="text-blue-600">≥10万：蓝色（中等销售额）</li>
                  <li className="text-red-600">&lt;10万：红色（低销售额）</li>
                </ul>
              </div>
              <div>
                <p><strong>完成率背景色规则：</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li className="bg-green-100 px-2 rounded">≥100%：绿色背景（达标）</li>
                  <li className="bg-yellow-100 px-2 rounded">≥80%：黄色背景（接近）</li>
                  <li className="bg-red-100 px-2 rounded">&lt;80%：红色背景（未达标）</li>
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p><strong>利润渐变规则：</strong></p>
                <p className="ml-4">利润越高，绿色背景越深</p>
              </div>
              <div>
                <p><strong>增长率颜色规则：</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li className="text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    正增长：绿色
                  </li>
                  <li className="text-red-600 flex items-center gap-1">
                    <TrendingDown className="h-3 w-3" />
                    负增长：红色
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 主题说明 */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">主题功能说明</h3>
        <div className="text-blue-800 space-y-2 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>内置主题：</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><code>DEFAULT</code>: 默认主题，简洁清爽</li>
                <li><code>DARK</code>: 暗色主题，护眼模式</li>
                <li><code>BRIGHT</code>: 明亮主题，高对比度</li>
                <li><code>ARCO</code>: Arco设计风格</li>
                <li><code>SIMPLIFY</code>: 极简主题</li>
              </ul>
            </div>
            <div>
              <p><strong>自定义主题特性：</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>紫色主题色调</li>
                <li>圆角边框设计</li>
                <li>阴影效果</li>
                <li>斑马纹行背景</li>
                <li>悬停高亮效果</li>
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <p><strong>条件格式化应用场景：</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>数据预警：低于阈值的数据用红色标识</li>
              <li>性能指标：完成率用不同背景色区分等级</li>
              <li>趋势分析：增长率用颜色表示正负趋势</li>
              <li>热力图效果：利润用渐变色显示数值大小</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Demo2;