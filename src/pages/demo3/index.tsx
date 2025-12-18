import { ListTable } from '@visactor/react-vtable';
import { useRef } from 'react';
import { TABLE_EVENT_TYPE, type ListTable as ListTableType } from '@visactor/vtable';
import type { TableEventHandlersEventArgumentMap } from '@visactor/vtable/es/ts-types/events';
import { treeColumns, treeRecords } from './utils/tree-data';
import './index.css';

function Demo3() {
    const tableInstanceRef = useRef<ListTableType | null>(null);

    const handleTreeStateChange = (
        args: TableEventHandlersEventArgumentMap[typeof TABLE_EVENT_TYPE.TREE_HIERARCHY_STATE_CHANGE]
    ) => {
        const { col, row, hierarchyState } = args;
        console.log('树形节点状态变化:', { col, row, hierarchyState });
    };

    return (
        <div >
            <div className="demo3-header">
                <h2>树形结构表格演示</h2>
                <p>展示部门组织架构的层级关系，支持展开/折叠操作</p>
                <p>本案例使用context 7 mcp一句话实现</p>
                <div className="mcp-config">
                    <pre className="config-json">
                        {`{
  "mcpServers": {
    "context7": {
      "args": [
        "-y",
        "@upstash/context7-mcp@latest"
      ],
      "command": "npx",
      "disabled": false,
      "autoApprove": [
        "resolve-library-id"
      ]
    }
  }
}`}
                    </pre>
                </div>
            </div>
            <ListTable
                records={treeRecords}
                columns={treeColumns}
                height={300}
                width={1200}
                widthMode="standard"
                onReady={(tableInstance) => {
                    tableInstanceRef.current = tableInstance as ListTableType;

                    // 设置像素比例以获得更清晰的显示
                    tableInstance.setPixelRatio(Math.max(window.devicePixelRatio, 2));

                    // 监听树形节点状态变化事件
                    tableInstance.on(
                        TABLE_EVENT_TYPE.TREE_HIERARCHY_STATE_CHANGE,
                        handleTreeStateChange
                    );
                }}
            />
            <div className="demo3-controls">
                <button
                    onClick={() => tableInstanceRef.current?.expandAllTreeNode()}
                    className="control-button"
                >
                    展开所有节点
                </button>
                <button
                    onClick={() => tableInstanceRef.current?.collapseAllTreeNode()}
                    className="control-button"
                >
                    折叠所有节点
                </button>
            </div>
        </div>
    );
}

export default Demo3;