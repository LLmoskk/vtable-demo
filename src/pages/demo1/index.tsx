import { ListTable } from '@visactor/react-vtable';
import useColumnWidth from './hook/use-column-width';
import { useRef } from 'react';
import { TABLE_EVENT_TYPE, type ListTable as ListTableType } from '@visactor/vtable';
import type { TableEventHandlersEventArgumentMap } from '@visactor/vtable/es/ts-types/events';
import { columns, records } from '../../utils/mock-data';

function Demo1() {
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
            height={800}
            width={1200}
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
    );
}

export default Demo1;