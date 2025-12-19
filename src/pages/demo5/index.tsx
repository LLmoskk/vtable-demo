import React, { useState, useRef } from 'react';
import { ListTable } from '@visactor/react-vtable';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

// 生成包含长文本的模拟数据
const generateTableData = () => {
  const data = [];
  const categories = ['办公用品', '技术设备', '家具用品', '文具用品', '电子产品'];
  const regions = ['华北地区', '华东地区', '华南地区', '西南地区', '东北地区'];
  const longTexts = [
    '这是一段很长的产品描述文本，包含了产品的详细信息、规格参数、使用说明等内容，用于测试表格的自动换行功能。',
    '产品特色：高品质材料制作，经久耐用，设计精美，功能齐全，适合各种使用场景，深受用户喜爱。',
    '技术规格：采用最新技术，性能卓越，兼容性强，操作简便，维护方便，是您的理想选择。',
    '服务承诺：我们提供优质的售前咨询、售中服务和售后支持，确保您的使用体验。',
    '用户评价：产品质量优秀，性价比高，服务态度好，配送及时，值得推荐给朋友。'
  ];

  for (let i = 0; i < 50; i++) {
    data.push({
      id: `ID${1000 + i}`,
      category: categories[i % categories.length],
      region: regions[i % regions.length],
      productName: `产品名称${i + 1}`,
      shortDescription: `简短描述${i + 1}`,
      longDescription: longTexts[i % longTexts.length],
      price: Math.floor(Math.random() * 10000) + 100,
      quantity: Math.floor(Math.random() * 1000) + 10,
      sales: Math.floor(Math.random() * 100000) + 10000,
      customerName: `客户名称${i + 1}`,
      contactInfo: `联系方式：电话 138${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}，邮箱 user${i}@example.com`,
      address: `详细地址：${regions[i % regions.length]}某某市某某区某某街道${i + 1}号`,
      orderDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      status: i % 3 === 0 ? '已完成订单' : i % 3 === 1 ? '正在处理中' : '等待处理',
      notes: `备注信息：${longTexts[i % longTexts.length].substring(0, 50)}...`,
      specifications: `规格参数：长度${Math.floor(Math.random() * 100)}cm，宽度${Math.floor(Math.random() * 50)}cm，高度${Math.floor(Math.random() * 30)}cm，重量${(Math.random() * 10).toFixed(2)}kg`
    });
  }
  return data;
};

const tableData = generateTableData();

const Demo5: React.FC = () => {
  // 状态管理
  const [defaultRowHeight, setDefaultRowHeight] = useState(60);
  const [defaultColWidth, setDefaultColWidth] = useState(150);
  const [autoWrapText, setAutoWrapText] = useState(true);
  const [heightMode, setHeightMode] = useState<'standard' | 'autoHeight' | 'adaptive'>('standard');
  const [widthMode, setWidthMode] = useState<'standard' | 'adaptive' | 'autoWidth'>('standard');
  const [columnResizeMode, setColumnResizeMode] = useState<'all' | 'header' | 'body'>('all');
  const [rowResizeMode, setRowResizeMode] = useState<'all' | 'header' | 'body'>('all');
  const [limitMinWidth, setLimitMinWidth] = useState(50);
  const [limitMaxWidth, setLimitMaxWidth] = useState(500);
  const [customRowHeight, setCustomRowHeight] = useState('');
  const [customColWidth, setCustomColWidth] = useState('');
  
  const tableRef = useRef<any>(null);

  // 基础列配置
  const getColumns = () => [
    {
      field: 'id',
      title: 'ID',
      width: widthMode === 'autoWidth' ? 'auto' : 80,
      minWidth: 60,
      maxWidth: 120
    },
    {
      field: 'category',
      title: '类别',
      width: widthMode === 'autoWidth' ? 'auto' : defaultColWidth,
      minWidth: 80,
      maxWidth: 200
    },
    {
      field: 'region',
      title: '地区',
      width: widthMode === 'autoWidth' ? 'auto' : defaultColWidth,
      minWidth: 100,
      maxWidth: 150
    },
    {
      field: 'productName',
      title: '产品名称',
      width: widthMode === 'autoWidth' ? 'auto' : defaultColWidth,
      minWidth: 120,
      maxWidth: 250
    },
    {
      field: 'shortDescription',
      title: '简短描述',
      width: widthMode === 'autoWidth' ? 'auto' : defaultColWidth,
      minWidth: 100,
      maxWidth: 200
    },
    {
      field: 'longDescription',
      title: '详细描述',
      width: widthMode === 'autoWidth' ? 'auto' : Math.max(defaultColWidth, 200),
      minWidth: 200,
      maxWidth: 400,
      style: {
        textAlign: 'left' as const,
        padding: [8, 12, 8, 12]
      }
    },
    {
      field: 'price',
      title: '价格',
      width: widthMode === 'autoWidth' ? 'auto' : 100,
      minWidth: 80,
      maxWidth: 120,
      format: (value: number) => `¥${value.toLocaleString()}`
    },
    {
      field: 'quantity',
      title: '数量',
      width: widthMode === 'autoWidth' ? 'auto' : 80,
      minWidth: 60,
      maxWidth: 100
    },
    {
      field: 'sales',
      title: '销售额',
      width: widthMode === 'autoWidth' ? 'auto' : 120,
      minWidth: 100,
      maxWidth: 150,
      format: (value: number) => `¥${value.toLocaleString()}`
    },
    {
      field: 'customerName',
      title: '客户名称',
      width: widthMode === 'autoWidth' ? 'auto' : defaultColWidth,
      minWidth: 120,
      maxWidth: 200
    },
    {
      field: 'contactInfo',
      title: '联系方式',
      width: widthMode === 'autoWidth' ? 'auto' : Math.max(defaultColWidth, 250),
      minWidth: 200,
      maxWidth: 350,
      style: {
        textAlign: 'left' as const,
        padding: [8, 12, 8, 12]
      }
    },
    {
      field: 'address',
      title: '地址',
      width: widthMode === 'autoWidth' ? 'auto' : Math.max(defaultColWidth, 250),
      minWidth: 200,
      maxWidth: 400,
      style: {
        textAlign: 'left' as const,
        padding: [8, 12, 8, 12]
      }
    },
    {
      field: 'orderDate',
      title: '订单日期',
      width: widthMode === 'autoWidth' ? 'auto' : 120,
      minWidth: 100,
      maxWidth: 140
    },
    {
      field: 'status',
      title: '状态',
      width: widthMode === 'autoWidth' ? 'auto' : 120,
      minWidth: 100,
      maxWidth: 150
    },
    {
      field: 'notes',
      title: '备注',
      width: widthMode === 'autoWidth' ? 'auto' : Math.max(defaultColWidth, 200),
      minWidth: 150,
      maxWidth: 350,
      style: {
        textAlign: 'left' as const,
        padding: [8, 12, 8, 12]
      }
    },
    {
      field: 'specifications',
      title: '规格参数',
      width: widthMode === 'autoWidth' ? 'auto' : Math.max(defaultColWidth, 200),
      minWidth: 180,
      maxWidth: 300,
      style: {
        textAlign: 'left' as const,
        padding: [8, 12, 8, 12]
      }
    }
  ];

  // 表格配置
  const tableOption = {
    records: tableData,
    columns: getColumns(),
    // 尺寸模式配置
    widthMode,
    heightMode,
    // 默认尺寸配置
    defaultRowHeight,
    defaultColWidth,
    defaultHeaderRowHeight: 50,
    defaultHeaderColWidth: 120,
    // 文本换行配置
    autoWrapText,
    // 调整配置
    columnResizeMode,
    rowResizeMode,
    // 限制配置
    limitMinWidth,
    limitMaxWidth,
    // 列宽计算模式
    columnWidthComputeMode: 'normal' as const,
  };

  // 手动设置行高
  const handleSetRowHeight = () => {
    if (customRowHeight && tableRef.current) {
      const height = parseInt(customRowHeight);
      if (height > 0) {
        // 设置所有行的高度
        for (let i = 0; i < tableData.length; i++) {
          tableRef.current.setRowHeight(i + 1, height); // +1 因为第0行是表头
        }
        setCustomRowHeight('');
      }
    }
  };

  // 手动设置列宽
  const handleSetColWidth = () => {
    if (customColWidth && tableRef.current) {
      const width = parseInt(customColWidth);
      if (width > 0) {
        // 设置所有列的宽度
        const columns = getColumns();
        for (let i = 0; i < columns.length; i++) {
          tableRef.current.setColWidth(i, width);
        }
        setCustomColWidth('');
      }
    }
  };

  // 重置表格尺寸
  const handleResetSize = () => {
    if (tableRef.current) {
      // 重新渲染表格以应用默认尺寸
      tableRef.current.updateOption({
        defaultRowHeight,
        defaultColWidth,
        columns: getColumns()
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="sticky top-0 z-10 bg-white p-6 rounded-lg border shadow-md">
        <h2 className="text-xl font-semibold mb-4">表格尺寸调整控制面板</h2>

        {/* 基础尺寸配置 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="space-y-2">
            <Label>默认行高</Label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDefaultRowHeight(Math.max(30, defaultRowHeight - 10))}
                disabled={defaultRowHeight <= 30}
              >
                -
              </Button>
              <span className="w-12 text-center font-mono text-sm">{defaultRowHeight}px</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDefaultRowHeight(Math.min(200, defaultRowHeight + 10))}
                disabled={defaultRowHeight >= 200}
              >
                +
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>默认列宽</Label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDefaultColWidth(Math.max(80, defaultColWidth - 20))}
                disabled={defaultColWidth <= 80}
              >
                -
              </Button>
              <span className="w-12 text-center font-mono text-sm">{defaultColWidth}px</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDefaultColWidth(Math.min(400, defaultColWidth + 20))}
                disabled={defaultColWidth >= 400}
              >
                +
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>最小列宽限制</Label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLimitMinWidth(Math.max(30, limitMinWidth - 10))}
                disabled={limitMinWidth <= 30}
              >
                -
              </Button>
              <span className="w-12 text-center font-mono text-sm">{limitMinWidth}px</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLimitMinWidth(Math.min(100, limitMinWidth + 10))}
                disabled={limitMinWidth >= 100}
              >
                +
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>最大列宽限制</Label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLimitMaxWidth(Math.max(200, limitMaxWidth - 50))}
                disabled={limitMaxWidth <= 200}
              >
                -
              </Button>
              <span className="w-12 text-center font-mono text-sm">{limitMaxWidth}px</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLimitMaxWidth(Math.min(800, limitMaxWidth + 50))}
                disabled={limitMaxWidth >= 800}
              >
                +
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* 模式配置 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="space-y-2">
            <Label>行高模式</Label>
            <div className="flex flex-col space-y-2">
              {(['standard', 'autoHeight', 'adaptive'] as const).map((mode) => (
                <label key={mode} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="heightMode"
                    value={mode}
                    checked={heightMode === mode}
                    onChange={(e) => setHeightMode(e.target.value as any)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">
                    {mode === 'standard' && '标准模式'}
                    {mode === 'autoHeight' && '自动高度'}
                    {mode === 'adaptive' && '自适应'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>列宽模式</Label>
            <div className="flex flex-col space-y-2">
              {(['standard', 'adaptive', 'autoWidth'] as const).map((mode) => (
                <label key={mode} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="widthMode"
                    value={mode}
                    checked={widthMode === mode}
                    onChange={(e) => setWidthMode(e.target.value as any)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">
                    {mode === 'standard' && '标准模式'}
                    {mode === 'adaptive' && '自适应'}
                    {mode === 'autoWidth' && '自动宽度'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>调整范围</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label className="text-xs">列调整:</Label>
                <select
                  value={columnResizeMode}
                  onChange={(e) => setColumnResizeMode(e.target.value as any)}
                  className="text-xs border rounded px-2 py-1"
                >
                  <option value="all">全部</option>
                  <option value="header">仅表头</option>
                  <option value="body">仅内容</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Label className="text-xs">行调整:</Label>
                <select
                  value={rowResizeMode}
                  onChange={(e) => setRowResizeMode(e.target.value as any)}
                  className="text-xs border rounded px-2 py-1"
                >
                  <option value="all">全部</option>
                  <option value="header">仅表头</option>
                  <option value="body">仅内容</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* 开关配置 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="autoWrapText"
              checked={autoWrapText}
              onCheckedChange={setAutoWrapText}
            />
            <Label htmlFor="autoWrapText">自动换行</Label>
          </div>
        </div>

        <Separator className="my-4" />

        {/* 手动调整工具 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>手动设置行高</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="输入行高(px)"
                value={customRowHeight}
                onChange={(e) => setCustomRowHeight(e.target.value)}
                className="flex-1"
              />
              <Button size="sm" onClick={handleSetRowHeight}>
                应用
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>手动设置列宽</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="输入列宽(px)"
                value={customColWidth}
                onChange={(e) => setCustomColWidth(e.target.value)}
                className="flex-1"
              />
              <Button size="sm" onClick={handleSetColWidth}>
                应用
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>重置操作</Label>
            <Button onClick={handleResetSize} className="w-full">
              重置表格尺寸
            </Button>
          </div>
        </div>
      </div>

      {/* 表格展示区域 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">灵活调整表格尺寸示例</h2>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <ListTable
            ref={tableRef}
            option={tableOption}
            height="600px"
          />
        </div>
        
        {/* 功能说明 */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">功能说明</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>行高配置：</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>标准模式：</strong>使用固定的默认行高</li>
              <li><strong>自动高度：</strong>根据内容自动调整行高</li>
              <li><strong>自适应：</strong>根据容器高度自适应分配行高</li>
            </ul>
            
            <p className="mt-3"><strong>列宽配置：</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>标准模式：</strong>使用固定的默认列宽</li>
              <li><strong>自适应：</strong>根据容器宽度自适应分配列宽</li>
              <li><strong>自动宽度：</strong>根据内容自动调整列宽</li>
            </ul>
            
            <p className="mt-3"><strong>调整方式：</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>拖拽表头边界可以调整列宽</li>
              <li>拖拽行边界可以调整行高</li>
              <li>支持设置最小/最大宽度限制</li>
              <li>自动换行功能可以处理长文本内容</li>
            </ul>
          </div>
        </div>

        {/* 当前配置信息 */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-semibold text-gray-800 mb-2">当前配置</h3>
          <div className="text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-2">
            <p>• 行高模式: {heightMode === 'standard' ? '标准' : heightMode === 'autoHeight' ? '自动高度' : '自适应'}</p>
            <p>• 列宽模式: {widthMode === 'standard' ? '标准' : widthMode === 'adaptive' ? '自适应' : '自动宽度'}</p>
            <p>• 默认行高: {defaultRowHeight}px</p>
            <p>• 默认列宽: {defaultColWidth}px</p>
            <p>• 最小列宽: {limitMinWidth}px</p>
            <p>• 最大列宽: {limitMaxWidth}px</p>
            <p>• 自动换行: {autoWrapText ? '开启' : '关闭'}</p>
            <p>• 列调整范围: {columnResizeMode === 'all' ? '全部' : columnResizeMode === 'header' ? '仅表头' : '仅内容'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo5;