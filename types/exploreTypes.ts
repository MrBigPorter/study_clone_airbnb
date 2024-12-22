import { StyleProp, ViewStyle } from "react-native";

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
    images: string[];           // Array of additional images / 额外图片数组
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

/**
 * Explore Filters Place Types Props Interface
 * 探索过滤器地点类型属性接口
 */
interface ExploreFiltersPlaceTypesProps {
    id: number;
    name: string;
    index: number;
}

/**
 * Explore Filters Title Props Interface
 * 探索过滤器标题属性接口
 */
interface ExploreFiltersTitleProps {
    name: string;
    style?: StyleProp<ViewStyle> | null;
}

/**
 * Explore Filters Beds & Bathrooms Props Interface
 * 探索过滤器床位和浴室属性接口
 */
interface ExploreFiltersBedsBathroomsProps {
    bedrooms: number;
    beds: number;
    bathrooms: number;
}

/**
 * Explore Filters Beds & Bathrooms onChange Props Interface
 * 探索过滤器床位和浴室onChange属性接口
 */
interface ExploreFiltersBedsBathroomsOnChangeProps {
    title: string;
    maxNumber: number;
    minNumber: number;
    onChange: (value: number) => void;
}

/**
 * Explore Filters Amenities Props Interface
 * 探索过滤器设施属性接口
 */
interface AmenitiesProps{
    title:string,
    items:Array<AmenitiesItemProps>
}


/**
 * Explore Filters Amenities Item Props Interface
 * 探索过滤器设施项目属性接口
 */
interface AmenitiesItemProps{
    id:number,
    name:string,
    icon:string,
    type:string
}

/**
 * Amenities Item Icon Type
 * 设施项目图标类型
 */
export type AmenitiesItemIconType = "MaterialCommunityIcons" | "MaterialIcons" | "Entypo" | "FontAwesome5"

/**
 * Explore Filters Amenities Icon Props Interface
 * 探索过滤器设施图标属性接口
 */
export type AmenitiesItemIconProps = Pick<AmenitiesItemProps,'icon'> & {
    size:number,
    color:string,
    type:AmenitiesItemIconType
}

export type {
    ExploreItemType,
    ExploreListProps,
    ExploreFiltersButtonProps,
    ExploreFiltersPlaceTypesProps,
    ExploreFiltersTitleProps,
    ExploreFiltersBedsBathroomsProps,
    ExploreFiltersBedsBathroomsOnChangeProps,
    AmenitiesProps,
    AmenitiesItemProps,
};
