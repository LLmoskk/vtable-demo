import { themes } from "@visactor/vtable";

/**
 * 获取通用的 VTable 主题配置
 */
export const getCommonVTableTheme = (isDark?: boolean) => {
    if (isDark) {
        return themes.DARK.extends({
            frameStyle: {
                borderLineWidth: 0,
            },
            headerStyle: {
                fontSize: 12,
                fontWeight: 400,
                autoWrapText: true,
                lineClamp: 3,
            },
            bodyStyle: {
                // 使用函数动态设置背景色，如果是 aggregation 行则使用 headerStyle 的样式
                bgColor: (args: any) => {
                    // 检查是否是 aggregation 行
                    if (args.table && typeof args.table.isAggregation === 'function') {
                        const isAggregationCell = args.table.isAggregation(
                            args.col,
                            args.row,
                        );
                        if (isAggregationCell) {
                            return '#373d46';
                        }
                    }
                    return '#232326';
                },
            },
            bottomFrozenStyle: {
                bgColor: '#373B46',
                fontWeight: 600,
                fontSize: 14,
            },
            tooltipStyle: {
                bgColor: 'black',
                color: 'white',
                fontSize: 12,
                padding: [8, 12, 8, 12],
            },
            scrollStyle: {
                visible: 'always', // 滚动条始终显示
                hoverOn: false, // 滚动条不悬浮在内容上，而是独立显示
            },
        });
    } else {
        return themes.ARCO.extends({
            frameStyle: {
                borderLineWidth: 0,
            },
            headerStyle: {
                bgColor: '#F0F1F5',
                fontSize: 12,
                fontWeight: 400,
                autoWrapText: true,
                lineClamp: 3,
            },
            bodyStyle: {
                // 使用函数动态设置背景色，如果是 aggregation 行则使用 headerStyle 的样式
                bgColor: (args: any) => {
                    // 检查是否是 aggregation 行
                    if (args.table && typeof args.table.isAggregation === 'function') {
                        const isAggregationCell = args.table.isAggregation(
                            args.col,
                            args.row,
                        );
                        if (isAggregationCell) {
                            return '#F0F1F5';
                        }
                    }
                    return '#FFFFFF';
                },
            },
            bottomFrozenStyle: {
                bgColor: '#F0F1F5',
                fontWeight: 600,
                fontSize: 14,
            },
            tooltipStyle: {
                bgColor: 'black',
                color: 'white',
                fontSize: 12,
                padding: [8, 12, 8, 12],
            },
            scrollStyle: {
                visible: 'always', // 滚动条始终显示
                hoverOn: false, // 滚动条不悬浮在内容上，而是独立显示
            },
            selectionStyle: {
                cellBgColor: 'rgba(133,165,242,0.2)',
            },
        });
    }
};
