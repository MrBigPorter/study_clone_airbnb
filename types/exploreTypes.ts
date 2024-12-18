
/**
 * Explore Item Type Definition
 * 探索项目类型定义
 */
interface ExploreItemType {
    id: number;                  // Unique identifier / 唯一标识符
    title: string;              // Main title / 主标题
    subTitle: string;           // Secondary title / 副标题
    date: string;               // Available date / 可用日期
    price: string;              // Price information / 价格信息
    image: string;              // Main image URL / 主图片URL
    images: any[];              // Array of additional images / 额外图片数组
}

/**
 * Explore List Props Interface
 * 探索列表属性接口
 */
interface ExploreListProps {
    onScroll?: (scrollY: number) => void;  // Scroll event handler / 滚动事件处理函数
}

/**
 * Explore Filters Button Props Interface
 * 探索过滤器按钮属性接口
 */
interface ExploreFiltersButtonProps {
    onFilterPress?: (isPressed: boolean) => void;  // Filter press event handler / 过滤器点击事件处理函数
}

export type { ExploreItemType, ExploreListProps, ExploreFiltersButtonProps };
