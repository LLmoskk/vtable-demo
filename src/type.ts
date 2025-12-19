import type { FieldDef } from "@visactor/vtable/es/ts-types";

export type Sort = {
  /**
   * 列
   */
  column?: FieldDef;
  /**
   * 排序方式
   */
  order?: 'asc' | 'desc';
};