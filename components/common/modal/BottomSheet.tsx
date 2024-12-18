/**
 * Bottom Sheet Modal Component
 * 底部表单模态框组件
 * 
 * A customizable bottom sheet modal that slides up from the bottom of the screen.
 * Features include:
 * - Customizable snap points for different heights
 * - Custom handle and backdrop components
 * - Platform specific styling
 * - Gesture handling for drag interactions
 * 
 * 一个可以从屏幕底部滑出的可定制底部表单模态框。
 * 特点包括：
 * - 可自定义的不同高度停靠点
 * - 自定义手柄和背景组件
 * - 针对不同平台的样式适配
 * - 手势拖动交互处理
 */
import React, { useCallback, useRef, forwardRef, ForwardedRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetProps } from '@/types/modalTypes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

/**
 * This file contains a bottom sheet modal component that provides a sliding panel from the bottom of the screen.
 * It uses @gorhom/bottom-sheet for the core functionality and adds custom styling and gesture handling.
 * 
 * Key features:
 * - Configurable snap points for different heights (default 10% and 100%)
 * - Custom handle and backdrop components
 * - Platform-specific styling optimizations
 * - Gesture-based interactions for dragging
 * - Support for animated position values
 * - Customizable styles for background and handle indicator
 * 
 * The component is wrapped in a forwardRef to allow parent components to access the bottom sheet methods.
 * It's used in the home screen to show a map view with an expandable list of locations.
 */
export default forwardRef(function BottomSheetCustomModal({
  children, // Child components to render inside the bottom sheet / 在底部表单内渲染的子组件
  style, // Additional styles for the bottom sheet / 底部表单的额外样式
  snapPoints = ['10%', '100%'], // Points where the sheet can snap to / 表单可以停靠的位置点，默认为10%和100%
  onChange, // Callback when sheet position changes / 表单位置改变时的回调函数
  backgroundStyle, // Custom background style / 自定义背景样式
  handleIndicatorStyle, // Custom handle indicator style / 自定义手柄指示器样式
  index = 1, // Default index for the bottom sheet / 底部表单的默认索引
  animatedPositionValue,// Animated position for the bottom sheet / 底部表单的动画位置
  backdropOpacity = 0, // Transparent backdrop / 透明背景
}: BottomSheetProps,ref:ForwardedRef<BottomSheet>) {

  // Convert snap points to string array / 将停靠点转换为字符串数组
  const snapPointsArray = snapPoints.map((point) => point.toString());

  // Render custom handle component / 渲染自定义手柄组件
  // Memoized to prevent unnecessary re-renders / 使用记忆化防止不必要的重渲染
  const renderHandle = useCallback(
    () => (
      <View style={styles.headerContainer}>
        <View style={styles.handle} />
      </View>
    ),
    []
  );

  // Render custom backdrop component / 渲染自定义背景组件
  // Controls the overlay appearance / 控制遮罩层的显示
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1} // Backdrop disappears when sheet is closed / 当表单关闭时背景消失
        appearsOnIndex={0} // Backdrop appears when sheet is opened / 当表单打开时背景出现
        opacity={backdropOpacity} // Transparent backdrop / 透明背景
      />
    ),
    []
  );

  return (
     <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        ref={ref}
        index={index}
        snapPoints={snapPointsArray}
        handleComponent={renderHandle}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={false} // Prevent closing by dragging down / 防止向下拖动关闭
        enableOverDrag={true} // Allow dragging past the top snap point / 允许拖动超过顶部停靠点
        animateOnMount={true} // Animate when component mounts / 组件挂载时显示动画
        backgroundStyle={backgroundStyle ?? styles.background}
        handleIndicatorStyle={handleIndicatorStyle ?? { display: 'none' }}
        onChange={(index) => {
          onChange?.(index);
        }}
        animatedPosition={animatedPositionValue}
        style={[
          {
            ...Platform.select({
              // Android specific styles / Android平台特定样式
              android: {
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.1)',
              },
              // iOS specific styles / iOS平台特定样式
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
              },
            }),
          },
        ]}
      >
        {children}
      </BottomSheet>
     </GestureHandlerRootView>
  );
});

// Styles for the bottom sheet components / 底部表单组件的样式定义
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    pointerEvents: 'box-none', // Allow touches to pass through to underlying components / 允许触摸穿透到底层组件
    marginTop: -55, // Negative margin to adjust position / 负边距用于调整位置
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  background: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  headerContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#00000030',
    alignSelf: 'center',
    borderRadius: 2,
  },
  contentContainer: {
    flex: 1,
  },
  contentContainerStyle: {
    padding: 16,
  },
});
