import { useLocalStorageState } from 'ahooks';
import { useCallback, useMemo } from 'react';
import { type ColumnDefine } from '@visactor/vtable';
import { calculateColumnsWidthMap } from '../utils/calculate-column-width';
import type { Sort } from '../../../type';

type UseColumnWidthParams<T extends ColumnDefine> = {
  /** 列配置数组 */
  columns?: T[];
  /** localStorage的key */
  storageKey: string;
  /** 表格数据，用于计算列宽 */
  data?: any[];
  /** 默认列宽 */
  defaultWidth?: number;
  /** 视图ID */
  viewId?: string | number;
  /** 是否已排序的信息 */
  sorts?: Sort[];
};

type UseColumnWidthReturn<T extends ColumnDefine> = {
  /** 应用了列宽的列配置（优先级：本地存储 > 计算值 > 默认值） */
  columnsWithWidth: T[];
  /** 保存列宽的函数 */
  saveColumnWidths: (colWidths: number[]) => void;
  /** 列宽映射对象 */
  columnWidths: Record<string, number>;
};

/**
 * 管理表格列宽持久化的hook
 * 当columns的field顺序发生变化时，会自动清理不存在的列宽设置
 *
 * 列宽优先级：本地存储 > 计算值 > 默认值
 */
const useColumnWidth = <T extends ColumnDefine>({
  columns,
  storageKey,
  data = [],
  defaultWidth = 120,
  sorts,
}: UseColumnWidthParams<T>): UseColumnWidthReturn<T> => {
  const [storedValue, setStoredValue] = useLocalStorageState<any>(storageKey, {
    defaultValue: {},
  });
  const columnWidths = storedValue;

  const calculatedWidthMap = useMemo(
    () =>
      calculateColumnsWidthMap(
        columns,
        data,
        sorts,
      ),
    [columns, data, sorts],
  );

  // 保存列宽到 localStorage
  const saveColumnWidths = useCallback(
    (colWidths: number[]) => {
      const widthMap: Record<string, number> = {};
      columns?.forEach((col, index) => {
        if (colWidths[index]) {
          widthMap[String(col.field)] = colWidths[index];
        }
      });

      setStoredValue(widthMap);
    },
    [columns, setStoredValue],
  );

  // 应用列宽到列配置
  // 优先级：本地存储 > 计算值 > 默认值
  const columnsWithWidth = useMemo(() => {
    return columns?.map((col) => {
      // checkbox 固定 40 cellType 可能为函数
      if (col.cellType === 'checkbox' || col.headerType === 'checkbox') {
        return {
          ...col,
          width: 40,
        };
      }

      // 优先使用本地存储的宽度
      if (columnWidths?.[String(col.field)]) {
        return {
          ...col,
          width: columnWidths[String(col.field)],
        };
      }

      // 其次使用计算的宽度
      const calculatedWidth = calculatedWidthMap.get(String(col.field));
      if (calculatedWidth) {
        return {
          ...col,
          width: calculatedWidth,
        };
      }

      // 最后使用默认宽度
      return {
        ...col,
        width: defaultWidth,
      };
    });
  }, [columns, columnWidths, calculatedWidthMap, defaultWidth]);

  return {
    columnsWithWidth: columnsWithWidth || [],
    saveColumnWidths,
    columnWidths: columnWidths || {},
  };
};

export default useColumnWidth;
