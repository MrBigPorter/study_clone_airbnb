
/* 
  A custom bottom action sheet component that provides a modal-like interface sliding up from the bottom of the screen.
  It supports customizable styling, animations, and gesture controls.

  一个自定义的底部动作面板组件，提供从屏幕底部滑出的类似模态框的界面。
  支持自定义样式、动画和手势控制。

  Props:
  - children: React.ReactNode - Content to be displayed in the action sheet 要在动作面板中显示的内容
  - header: React.ReactNode - Optional custom header component 可选的自定义头部组件
  - onOpen: () => void - Callback when sheet opens 面板打开时的回调
  - onClose: () => void - Callback when sheet closes 面板关闭时的回调
  - onBeforeShow: () => void - Callback before sheet shows 面板显示前的回调
  - onBeforeClose: () => void - Callback before sheet closes 面板关闭前的回调
  - containerStyle: ViewStyle - Custom styles for container 容器的自定义样式
  - indicatorStyle: ViewStyle - Custom styles for drag indicator 拖动指示器的自定义样式
  - overlayColor: string - Color of the overlay background 遮罩层的背景颜色
  - defaultOverlayOpacity: number - Default opacity of overlay 遮罩层的默认透明度
  - zIndex: number - Z-index of the component 组件的层级
  - gestureEnabled: boolean - Enable/disable gesture controls 启用/禁用手势控制
  - snapPoints: String[] - Points where sheet can snap to 面板可以吸附的位置点
  - elevation: number - Shadow elevation on Android Android上的阴影高度
  - closeOnTouchBackdrop: boolean - Close sheet when backdrop is touched 点击背景时是否关闭面板
*/
import { useCustomTheme } from '@/context/themeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { BottomCustomActionSheetProps,BottomCustomActionSheetHandle } from '@/types/modalTypes';

/* 
/*
  Component description:
  A custom bottom action sheet component that extends react-native-actions-sheet.
  Provides a modal interface that slides up from bottom with customizable styling and behavior.

  组件描述：
  基于 react-native-actions-sheet 的自定义底部动作面板组件。
  提供从底部滑出的模态界面，支持自定义样式和行为。

  Usage example:
  使用示例：

  const actionSheetRef = useRef<BottomCustomActionSheetHandle>(null);
  
  <BottomCustomActionSheet 
    ref={actionSheetRef}
    containerStyle={{height: '90%'}}
    onClose={() => console.log('closed')}
  >
    <View>
      <Text>Content</Text>
    </View>
  </BottomCustomActionSheet>

  actionSheetRef.current?.show(); // Show the sheet 显示面板
  actionSheetRef.current?.hide(); // Hide the sheet 隐藏面板
*/
const BottomCustomActionSheet = forwardRef<
  BottomCustomActionSheetHandle,
  BottomCustomActionSheetProps
>((props, ref) => {

  // Get theme values from custom theme hook
  // 从自定义主题钩子获取主题值
  const {
    theme: { background, text, border },
  } = useCustomTheme();
  
  // Create a reference to the action sheet
  // 创建一个底部动作面板的引用
  const actionSheetRef = useRef<ActionSheetRef>(null)

  // Expose show/hide methods to parent component for external control
  // 向父组件暴露显示/隐藏方法以供外部控制
  useImperativeHandle(ref,()=>({
    // Hide the action sheet and call onClose callback
    // 隐藏底部动作面板并调用 onClose 回调
    hide:()=>{
      actionSheetRef.current?.hide()
      props.onClose?.()
    },
    // Show the action sheet and call onOpen callback
    // 显示底部动作面板并调用 onOpen 回调
    show:()=>{
     actionSheetRef.current?.show()
     props.onOpen?.()
    },
  }),[actionSheetRef])

  // Render the header component with close button and title
  // 渲染带有关闭按钮和标题的头部组件 
  const actionHeader = () => {
    return (
      <View
        style={[
          styles.actionSheetHeader,
          { borderBottomColor: border.default },
        ]}
      >
        <TouchableOpacity onPress={()=>{
          actionSheetRef.current?.hide()
        }}> 
          <Ionicons name="close" size={24} color={text.primary} />
        </TouchableOpacity>
        <Text style={[styles.actionSheetHeaderText, { color: text.primary }]}>
          Filter
        </Text>
      </View>
    );
  };

  // Memoize container style to optimize performance
  // 使用 useMemo 优化性能  
  const containerStyle = useMemo(()=>{
      return {
        backgroundColor: background.paper,
        height: '30%',
      }
    },[background.paper])

  // Memoize indicator style to optimize performance
  const indicatorStyle = useMemo(()=>{
    return {
      backgroundColor: background.contrast,
    }
  },[background.contrast])

  // Memoize snap points to optimize performance
  // 使用 useMemo 优化性能  
  const snapPoints = useMemo(()=>{
    if(props.snapPoints){
      return props.snapPoints.map((snapPoint)=>Number(snapPoint))
    }
    return [100]
  },[props.snapPoints])

  return (
    <View>
      <ActionSheet
        containerStyle={{...containerStyle as object, ...props.containerStyle as object}}
        indicatorStyle={{
          ...indicatorStyle as object,
          ...props.indicatorStyle as object,
        }}
        gestureEnabled={props.gestureEnabled??true}
        drawUnderStatusBar={false}
        useBottomSafeAreaPadding={true}
        isModal={true}
        ref={actionSheetRef}
        snapPoints={snapPoints}
        elevation={props.elevation??5}
        overlayColor={props.overlayColor??'rgba(0,0,0,0.9)'}
        defaultOverlayOpacity={props.defaultOverlayOpacity??0.5}
        closeOnTouchBackdrop={props.closeOnTouchBackdrop??true}
        onBeforeShow={() => {
          props.onBeforeShow?.()
        }}
        onBeforeClose={() => {
          props.onBeforeClose?.()
        }}
      >
        <View>
          {props.header??actionHeader()}
          {props.children}
        </View>
      </ActionSheet>
    </View>
  );
});

/* 
  Styles for the action sheet
  动作面板的样式
*/
const styles = StyleSheet.create({
  actionSheetHeader: {
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  actionSheetHeaderText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'mon-sb',
  },
});
export default BottomCustomActionSheet;
