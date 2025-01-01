import { StyleProp,ViewStyle } from "react-native";
import { SharedValue } from "react-native-reanimated";

/**
 * Props for the BottomSheet component
 * 底部表单组件的属性
 */
interface BottomSheetProps {
    /** Content to render inside the bottom sheet 底部表单内部渲染的内容 */
    children: React.ReactNode;
    /** Points where the sheet can snap to 表单可以吸附的位置点 */
    snapPoints?:String[];
    /** Initial snap point index 初始吸附点索引 */
    index?:number;
    /** Callback when snap point changes 吸附点改变时的回调 */
    onChange?: (index: number) => void;
    /** Custom background style 自定义背景样式 */
    backgroundStyle?:StyleProp<ViewStyle>;
    /** Custom handle indicator style 自定义手柄指示器样式 */
    handleIndicatorStyle?:StyleProp<ViewStyle>;
    /** Custom container style 自定义容器样式 */
    style?:StyleProp<ViewStyle>;
    /** Animated position value 动画位置值 */
    animatedPositionValue?: SharedValue<number>;
    /** Backdrop opacity 背景遮罩透明度 */
    backdropOpacity?:number;
}

/**
 * Props for the BottomCustomActionSheet component
 * 自定义底部动作面板组件的属性
 */
interface BottomCustomActionSheetProps {
    /** Content to render inside the action sheet 动作面板内部渲染的内容 */
    children: React.ReactNode;
    /** Custom header component 自定义头部组件 */
    header?:React.ReactNode;
    /** Custom footer component 自定义底部组件 */
    footer?:React.ReactNode;
    /** Callback when sheet opens 面板打开时的回调 */
    onOpen?:()=>void;
    /** Callback when sheet closes 面板关闭时的回调 */
    onClose?:()=>void;
    /** Callback before sheet shows 面板显示前的回调 */
    onBeforeShow?:()=>void;
    /** Callback before sheet closes 面板关闭前的回调 */
    onBeforeClose?:()=>void;
    /** Custom container style 自定义容器样式 */
    containerStyle?:StyleProp<ViewStyle>;
    /** Custom indicator style 自定义指示器样式 */
    indicatorStyle?:StyleProp<ViewStyle>;
    /** Color of overlay background 遮罩层背景颜色 */
    overlayColor?:string;
    /** Default opacity of overlay 遮罩层默认透明度 */
    defaultOverlayOpacity?:number;
    /** Z-index of component 组件的层级 */
    zIndex?:number;
    /** Enable/disable gesture controls 启用/禁用手势控制 */
    gestureEnabled?:boolean;
    /** Points where sheet can snap to 面板可以吸附的位置点 */
    snapPoints?:String[];
    /** Shadow elevation on Android Android上的阴影高度 */
    elevation?:number;
    /** Close sheet when backdrop is touched 点击背景时是否关闭面板 */
    closeOnTouchBackdrop?:boolean;
    /** Title of the action sheet 动作面板的标题 */
    title?:string;
    /** Enable/disable keyboard handler 启用/禁用键盘处理 */
    keyboardHandlerEnabled?: boolean;
    /** Visibility of the action sheet 动作面板的显示状态 */
    isVisible?: boolean;
}

/**
 * Methods exposed by BottomCustomActionSheet ref
 * 底部动作面板组件暴露的方法
 */
interface BottomCustomActionSheetHandle {
   /** Hide the action sheet 隐藏动作面板 */
   hide:()=>void;
   /** Show the action sheet 显示动作面板 */
   show:()=>void;
}

export type { BottomSheetProps,BottomCustomActionSheetProps,BottomCustomActionSheetHandle };
