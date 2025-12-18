import type { Sort } from '../../../type.ts';

// 参考文章 https://juejin.cn/post/7091990279565082655
type Options = {
  size?: number;
  family?: string;
};

// 创建单例 canvas 实例，避免在表格等场景中重复创建造成性能问题
let cachedCanvas: HTMLCanvasElement | null = null;
let cachedContext: CanvasRenderingContext2D | null = null;

const getCanvasContext = () => {
  if (!cachedCanvas) {
    cachedCanvas = document.createElement('canvas');
    cachedContext = cachedCanvas.getContext('2d');
  }
  return cachedContext;
};

const getActualWidthOfChars = (text: string, options: Options = {}) => {
  const {
    size = 14,
    family = 'Inter, -apple-system, BlinkMacSystemFont, PingFang SC, Hiragino Sans GB, noto sans, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif',
  } = options;

  const ctx = getCanvasContext();
  if (!ctx) return 0;

  ctx.font = `${size}px ${family}`;
  const metrics = ctx.measureText(text);
  const actual =
    Math.abs(metrics.actualBoundingBoxLeft) +
    Math.abs(metrics.actualBoundingBoxRight);
  return Math.max(metrics.width, actual);
};


/**
 * 判断字符串是否全是英文字符(包括字母、数字、空格和常见标点符号)
 */
const isAllEnglish = (text: string): boolean => {
  // 匹配英文字母、数字、空格和常见英文标点符号
  return /^[a-zA-Z0-9\s\-_.,!?()[\]{}:;"'/\\]+$/.test(text);
};

/**
 * 检测字符串中是否包含上标或下标字符
 * 上标字符范围: U+2070-U+209F (上标数字和符号), U+00B2-U+00B3 (²³), U+00B9 (¹)
 * 下标字符范围: U+2080-U+209F (下标数字)
 * Unicode 修饰符字母: U+02B0-U+02FF, U+1D2C-U+1D6A (包括 ᵃ ᵇ ᶜ 等)
 */
const hasSuperscriptOrSubscript = (text: string): boolean => {
  // 匹配上标、下标和修饰符字母
  return /[\u00B2\u00B3\u00B9\u2070-\u209F\u02B0-\u02FF\u1D2C-\u1D6A]/u.test(
    text,
  );
};

/**
 * 计算单个列的文本内容宽度
 * 使用与Cell组件相同的格式化逻辑来确保宽度计算准确性
 * 这里每一列会是不同的格式化规则，我们先获取format后的文本
 */
const calculateTextWidth = (value: any, format: string): number => {
  if (value === null || value === undefined) {
    return 0;
  }

  let textValue = '';

  switch (format) {
    default: {
      textValue = value || '';
      break;
    }
  }

  return textValue ? getActualWidthOfChars(textValue) : 0;
};

/**
 * 批量计算所有列的宽度并创建缓存Map
 * 一次性计算所有列的宽度，避免重复计算
 * 前7列会结合标题宽度进行计算
 *
 * @param columns 列配置数组
 * @param data 表格数据
 * @param customColumnNum 自定义列数
 * @returns 列宽度Map，key为列字段名，value为宽度
 */
export const calculateColumnsWidthMap = (
  columns?: any[],
  data?: any[],
  sorts?: Sort[],
): Map<string, number> => {
  if (!columns || !data) {
    return new Map<string, number>();
  }

  const widthMap = new Map<string, number>();
  // 取前20行数据
  const sampleData = data.slice(0, 20);

  // 为每个列计算宽度
  columns.forEach((column) => {
    // 是否有排序按钮
    const hasSortButton = sorts?.some((item) => item.column === column.field);
    // 计算数据宽度
    let maxDataWidth = 0;
    sampleData.forEach((row) => {
      const value = row[column.field];
      const textWidth = calculateTextWidth(
        value,
        column?.format,
      );
      maxDataWidth = Math.ceil(Math.max(maxDataWidth, textWidth));
    });

    let finalWidth: number;
    // 检测是否包含上标或下标字符(如 CTRᵃˢˢᵉᵗ)
    // 如果包含小字,统一取前3个字符计算宽度
    // 否则根据标题是否全英文来决定取字符数量
    // 英文字符较窄,需要取更多字符;中文字符较宽,取2个字符即可
    const charCount = hasSuperscriptOrSubscript(column.title)
      ? 6
      : isAllEnglish(column.title)
        ? 3
        : 2;
    const titleWidth = getActualWidthOfChars(column.title.slice(0, charCount));

    finalWidth = Math.max(
      Math.ceil(titleWidth + (hasSortButton ? 12 : 0)),
      maxDataWidth,
    );

    // 25 为一些buffer宽度
    widthMap.set(column.field, finalWidth + 25);
  });

  return widthMap;
};
