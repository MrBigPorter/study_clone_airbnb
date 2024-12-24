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

interface AmenitiesCheckedProps{
    [key:string]:{
        [key:string]:Partial<AmenitiesItemProps>
    }
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

/**
 * Booking Options Props Interface
 * 预订选项属性接口
 */
interface BookingOptionsProps{
    id:number,
    name:string,
    icon:string,
    type:string
}

/**
 * Booking Options Checked Props Interface
 * 预订选项选中属性接口
 */
interface BookingOptionsCheckedProps{
    [key:string]:Partial<BookingOptionsProps>
}

/**
 * Explore Filters Property Types Props Interface
 * 探索过滤器物业类型属性接口
 */

export type PropertyTypesProps = Pick<BookingOptionsProps,'id' | 'name' | 'icon' | 'type'>

/**
 * Explore Filters Accessibility Features Props Interface
 * 探索过滤器无障碍功能属性接口
 */ 
interface ExploreFiltersAccessibilityFeaturesProps{
    title:string,
    id:number,
    list:ExploreFiltersAccessibilityFeatureItemProps[]
}

/**
 * Explore Filters Accessibility Feature Item Props Interface
 * 探索过滤器无障碍功能项目属性接口
 */ 
interface ExploreFiltersAccessibilityFeatureItemProps{
    id:number,
    name:string,
    checked:boolean
}

/**
 * Explore Filters Filter List Props Interface
 * 探索过滤器筛选列表属性接口
 */
interface ExploreFiltersFilterListProps {
    id: number;
    title: string;
    component: React.ReactNode;
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
    BookingOptionsProps,
    ExploreFiltersAccessibilityFeatureItemProps,
    ExploreFiltersAccessibilityFeaturesProps,
    ExploreFiltersFilterListProps,
    AmenitiesCheckedProps,
    BookingOptionsCheckedProps
};
