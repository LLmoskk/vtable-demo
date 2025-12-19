import React, { useState } from 'react';
import { ListTable } from '@visactor/react-vtable';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

// 模拟数据生成函数
const generateTableData = () => {
  const data = [];
  const categories = ['办公用品', '技术设备', '家具', '文具', '电子产品'];
  const regions = ['华北', '华东', '华南', '西南', '东北'];
  const months = ['1月', '2月', '3月', '4月', '5月', '6月'];

  for (let i = 0; i < 50; i++) {
    data.push({
      id: `ID${1000 + i}`,
      category: categories[i % categories.length],
      region: regions[i % regions.length],
      month: months[i % months.length],
      sales: Math.floor(Math.random() * 100000) + 10000,
      profit: Math.floor(Math.random() * 20000) + 1000,
      quantity: Math.floor(Math.random() * 500) + 50,
      customerName: `客户${i + 1}`,
      productName: `产品${i + 1}`,
      orderDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      status: i % 3 === 0 ? '已完成' : i % 3 === 1 ? '进行中' : '待处理'
    });
  }
  return data;
};

// 表格列配置
const columns = [
  {
    field: 'id',
    title: 'ID',
    width: 80
  },
  {
    field: 'category',
    title: '类别',
    width: 100
  },
  {
    field: 'region',
    title: '地区',
    width: 80
  },
  {
    field: 'month',
    title: '月份',
    width: 80
  },
  {
    field: 'sales',
    title: '销售额',
    width: 100,
    format: (value: number) => `¥${value.toLocaleString()}`
  },
  {
    field: 'profit',
    title: '利润',
    width: 100,
    format: (value: number) => `¥${value.toLocaleString()}`
  },
  {
    field: 'quantity',
    title: '数量',
    width: 80
  },
  {
    field: 'customerName',
    title: '客户名称',
    width: 120
  },
  {
    field: 'productName',
    title: '产品名称',
    width: 120
  },
  {
    field: 'orderDate',
    title: '订单日期',
    width: 120
  },
  {
    field: 'status',
    title: '状态',
    width: 100
  }
];

const tableData = generateTableData();
const transposeTableData = generateTableData().slice(0, 20); // 转置表格使用较少数据以便观察

const Demo4: React.FC = () => {
  // 状态管理
  const [frozenColCount, setFrozenColCount] = useState(2);
  const [frozenRowCount, setFrozenRowCount] = useState(1);
  const [rightFrozenColCount, setRightFrozenColCount] = useState(1);
  const [bottomFrozenRowCount, setBottomFrozenRowCount] = useState(0);
  const [showFrozenIcon, setShowFrozenIcon] = useState(true);
  const [maxFrozenWidth] = useState('60%');
  const [unfreezeAllOnExceedsMaxWidth, setUnfreezeAllOnExceedsMaxWidth] = useState(true);
  const [isTransposed, setIsTransposed] = useState(false);

  // 普通表格配置
  const normalTableOption = {
    records: tableData,
    columns,
    widthMode: 'standard' as const,
    heightMode: 'autoHeight' as const,
    defaultRowHeight: 40,
    defaultHeaderRowHeight: 50,
    // 冻结配置
    frozenColCount,
    frozenRowCount,
    rightFrozenColCount,
    bottomFrozenRowCount,
    allowFrozenColCount: 5, // 允许用户手动冻结的最大列数
    showFrozenIcon,
    maxFrozenWidth,
    unfreezeAllOnExceedsMaxWidth,
    // 其他配置
    hover: {
      highlightMode: 'cross' as const
    },
    select: {
      highlightMode: 'cross' as const
    }
  };

  // 转置表格配置
  const transposeTableOption = {
    records: transposeTableData,
    columns,
    widthMode: 'standard' as const,
    heightMode: 'autoHeight' as const,
    defaultRowHeight: 40,
    defaultHeaderRowHeight: 50,
    defaultColWidth: 120,
    defaultHeaderColWidth: 100,
    // 转置配置
    transpose: isTransposed,
    // 转置后的冻结配置（注意：转置后行列概念会互换）
    frozenColCount: 2, // 转置后相当于冻结前2行
    frozenRowCount: 1, // 转置后相当于冻结前1列
    showFrozenIcon: true,
    // 其他配置
    hover: {
      highlightMode: 'cross' as const
    },
    select: {
      highlightMode: 'cross' as const
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="p-6 rounded-lg border shadow-sm">
        <h2 className="text-xl font-semibold mb-4">冻结配置控制面板</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 左侧冻结列 */}
          <div className="space-y-2">
            <Label htmlFor="frozenColCount">左侧冻结列数</Label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFrozenColCount(Math.max(0, frozenColCount - 1))}
                disabled={frozenColCount <= 0}
              >
                -
              </Button>
              <span className="w-8 text-center font-mono">{frozenColCount}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFrozenColCount(Math.min(5, frozenColCount + 1))}
                disabled={frozenColCount >= 5}
              >
                +
              </Button>
            </div>
          </div>

          {/* 顶部冻结行 */}
          <div className="space-y-2">
            <Label htmlFor="frozenRowCount">顶部冻结行数</Label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFrozenRowCount(Math.max(0, frozenRowCount - 1))}
                disabled={frozenRowCount <= 0}
              >
                -
              </Button>
              <span className="w-8 text-center font-mono">{frozenRowCount}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFrozenRowCount(Math.min(3, frozenRowCount + 1))}
                disabled={frozenRowCount >= 3}
              >
                +
              </Button>
            </div>
          </div>

          {/* 右侧冻结列 */}
          <div className="space-y-2">
            <Label htmlFor="rightFrozenColCount">右侧冻结列数</Label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRightFrozenColCount(Math.max(0, rightFrozenColCount - 1))}
                disabled={rightFrozenColCount <= 0}
              >
                -
              </Button>
              <span className="w-8 text-center font-mono">{rightFrozenColCount}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRightFrozenColCount(Math.min(3, rightFrozenColCount + 1))}
                disabled={rightFrozenColCount >= 3}
              >
                +
              </Button>
            </div>
          </div>

          {/* 底部冻结行 */}
          <div className="space-y-2">
            <Label htmlFor="bottomFrozenRowCount">底部冻结行数</Label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBottomFrozenRowCount(Math.max(0, bottomFrozenRowCount - 1))}
                disabled={bottomFrozenRowCount <= 0}
              >
                -
              </Button>
              <span className="w-8 text-center font-mono">{bottomFrozenRowCount}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBottomFrozenRowCount(Math.min(2, bottomFrozenRowCount + 1))}
                disabled={bottomFrozenRowCount >= 2}
              >
                +
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 显示冻结图标 */}
          <div className="flex items-center space-x-2">
            <Switch
              id="showFrozenIcon"
              checked={showFrozenIcon}
              onCheckedChange={setShowFrozenIcon}
            />
            <Label htmlFor="showFrozenIcon">显示冻结图标</Label>
          </div>

          {/* 超出最大宽度时解冻所有列 */}
          <div className="flex items-center space-x-2">
            <Switch
              id="unfreezeAll"
              checked={unfreezeAllOnExceedsMaxWidth}
              onCheckedChange={setUnfreezeAllOnExceedsMaxWidth}
            />
            <Label htmlFor="unfreezeAll">超出最大宽度时解冻所有列</Label>
          </div>

          {/* 转置表格 */}
          <div className="flex items-center space-x-2">
            <Switch
              id="transpose"
              checked={isTransposed}
              onCheckedChange={setIsTransposed}
            />
            <Label htmlFor="transpose">转置表格</Label>
          </div>
        </div>
      </div>

      {/* 普通表格 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">可冻结表格示例</h2>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <ListTable
            {...normalTableOption}
            style={{ height: '400px' }}
            onFreezeClick={(args: any) => {
              console.log('冻结列点击事件:', args);
            }}
          />
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• 左侧冻结 {frozenColCount} 列，右侧冻结 {rightFrozenColCount} 列</p>
          <p>• 顶部冻结 {frozenRowCount} 行，底部冻结 {bottomFrozenRowCount} 行</p>
          <p>• 最大冻结宽度: {maxFrozenWidth}</p>
          <p>• 可以点击表头的冻结图标进行手动冻结/解冻操作</p>
        </div>
      </div>

      {/* 转置表格 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">转置表格示例</h2>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <ListTable
            {...transposeTableOption}
            style={{ height: '600px' }}
          />
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• 转置表格将行和列进行了互换显示</p>
          <p>• 转置后的冻结配置：冻结前2行（原来的列）和前1列（原来的行）</p>
          <p>• 转置表格特别适合数据列很多但行数较少的场景</p>
        </div>
      </div>
    </div>
  );
};

export default Demo4;