import { ListTable } from '@visactor/react-vtable';
import useColumnWidth from './hook/use-column-width';
import './App.css'
import { useRef } from 'react';
import { TABLE_EVENT_TYPE, type ListTable as ListTableType } from '@visactor/vtable';
import type { TableEventHandlersEventArgumentMap } from '@visactor/vtable/es/ts-types/events';

const columns = [
  { field: '0', title: 'name' },
  { field: '1', title: 'age' },
  { field: '2', title: 'gender' },
  { field: '3', title: 'hobby' },
  { field: '4', title: 'city' },
  { field: '5', title: 'email' },
  { field: '6', title: 'occupation' }
];

const records = new Array(10000).fill(0).map((_, index) => {
  return [
    `User${index + 1}`,                              // name
    Math.floor(Math.random() * 50) + 18,            // age (18-67)
    index % 2 === 0 ? 'male' : 'female',            // gender
    index % 4 === 0 ? '🏀' : '🎨',                   // hobby (basketball or art)
    `City${Math.floor(Math.random() * 10) + 1}`,    // city
    `user${index + 1}@example.com`,                  // email
    index % 3 === 0 ? 'Engineer' : 'Designer'        // occupation
  ];
});

function App() {
  const tableInstanceRef = useRef<ListTableType | null>(null);

  const { columnsWithWidth: vtableColumns, saveColumnWidths } = useColumnWidth({
    columns: columns,
    storageKey: `columns-store`,
    data: records || [],
    defaultWidth: 120,
  });

  return (
    <ListTable
      records={records}
      columns={vtableColumns}
      height={500}
      width={1000}
      onReady={(tableInstance) => {
        tableInstanceRef.current = tableInstance as ListTableType;

        tableInstance.setPixelRatio(Math.max(window.devicePixelRatio, 2));

        // 监听列宽调整结束事件
        tableInstance.on(
          TABLE_EVENT_TYPE.RESIZE_COLUMN_END,
          (
            args: TableEventHandlersEventArgumentMap[typeof TABLE_EVENT_TYPE.RESIZE_COLUMN_END],
          ) => {
            const { colWidths } = args;
            saveColumnWidths(colWidths);
          },
        );
      }}
    />
  )
}

export default App
