import type { FieldDef } from "@visactor/vtable/es/ts-types";

export const enum Order {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type Sort = {
  /**
   * 列
   */
  column?: FieldDef;
  /**
   * 排序方式
   */
  order?: Order;
};