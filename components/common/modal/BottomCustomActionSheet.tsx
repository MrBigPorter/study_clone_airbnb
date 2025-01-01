/* 
  A custom bottom action sheet component that provides a modal-like interface sliding up from the bottom of the screen.
  It supports customizable styling, animations, and gesture controls.
  This component is built on top of react-native-actions-sheet and provides additional functionality.

  一个自定义的底部动作面板组件,提供从屏幕底部滑出的类似模态框的界面。
  支持自定义样式、动画和手势控制。
  该组件基于 react-native-actions-sheet 构建,并提供了额外的功能。

  Key Features / 主要特性:
  - Customizable styling and animations / 可自定义样式和动画
  - Gesture controls with snap points / 带有吸附点的手势控制
  - Keyboard handling / 键盘处理
  - Custom header and content / 自定义头部和内容
  - Theme support / 主题支持
  - TypeScript support / TypeScript 支持

  Props / 属性:
  - children: React.ReactNode 
    Content to be displayed in the action sheet
    要在动作面板中显示的内容
  
  - header: React.ReactNode
    Optional custom header component 
    可选的自定义头部组件
  
  - onOpen: () => void
    Callback when sheet opens
    面板打开时的回调函数
  
  - onClose: () => void  
    Callback when sheet closes
    面板关闭时的回调函数
  
  - onBeforeShow: () => void
    Callback before sheet shows
    面板显示前的回调函数
  
  - onBeforeClose: () => void
    Callback before sheet closes
    面板关闭前的回调函数
  
  - containerStyle: ViewStyle
    Custom styles for container
    容器的自定义样式
  
  - indicatorStyle: ViewStyle
    Custom styles for drag indicator
    拖动指示器的自定义样式
  
  - overlayColor: string
    Color of the overlay background
    遮罩层的背景颜色
  
  - defaultOverlayOpacity: number
    Default opacity of overlay
    遮罩层的默认透明度
  
  - zIndex: number
    Z-index of the component
    组件的层级
  
  - gestureEnabled: boolean
    Enable/disable gesture controls
    启用/禁用手势控制
  
  - snapPoints: String[]
    Points where sheet can snap to
    面板可以吸附的位置点
  
  - elevation: number
    Shadow elevation on Android
    Android上的阴影高度
  
  - closeOnTouchBackdrop: boolean
    Close sheet when backdrop is touched
    点击背景时是否关闭面板
  
  - keyboardHandlerEnabled: boolean
    Enable/disable keyboard controls
    启用/禁用键盘处理
*/

import { useCustomTheme } from '@/context/themeContext';
import { Ionicons } from '@expo/vector-icons';
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { StyleSheet, KeyboardEvent } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import {
  BottomCustomActionSheetProps,
  BottomCustomActionSheetHandle,
} from '@/types/modalTypes';

/* 
  Component Description / 组件描述:
  
  A custom bottom action sheet component that extends react-native-actions-sheet.
  Provides a modal interface that slides up from bottom with customizable styling and behavior.
  
  基于 react-native-actions-sheet 的自定义底部动作面板组件。
  提供从底部滑出的模态界面,支持自定义样式和行为。

  Usage Example / 使用示例:

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

  // Show the sheet / 显示面板
  actionSheetRef.current?.show(); 

  // Hide the sheet / 隐藏面板
  actionSheetRef.current?.hide();

  Implementation Details / 实现细节:
  - Uses forwardRef for ref handling / 使用 forwardRef 处理引用
  - Implements keyboard handling / 实现键盘处理
  - Supports custom themes / 支持自定义主题
  - Provides animation controls / 提供动画控制
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
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const translateY = useRef(new Animated.Value(0)).current;

  // Expose show/hide methods to parent component for external control
  // 向父组件暴露显示/隐藏方法以供外部控制
  useImperativeHandle(
    ref,
    () => ({
      // Hide the action sheet and call onClose callback
      // 隐藏底部动作面板并调用 onClose 回调
      hide: () => {
        actionSheetRef.current?.hide();
        props.onClose?.();
        Keyboard.dismiss();
      },
      // Show the action sheet and call onOpen callback
      // 显示底部动作面板并调用 onOpen 回调
      show: () => {
        actionSheetRef.current?.show();
        props.onOpen?.();
      },
    }),
    []
  );

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
        <TouchableOpacity
          onPress={() => {
            actionSheetRef.current?.hide();
            props.onClose?.();
          }}
        >
          <Ionicons name="close" size={24} color={text.primary} />
        </TouchableOpacity>
        {props.title && (
          <Text style={[styles.actionSheetHeaderText, { color: text.primary }]}>
            {props.title}
          </Text>
        )}
      </View>
    );
  };

  // Memoize container style to optimize performance
  // 使用 useMemo 优化容器样式性能
  const containerStyle = useMemo(() => {
    return {
      backgroundColor: background.paper,
    };
  }, [background.paper]);

  // Memoize indicator style to optimize performance
  // 使用 useMemo 优化指示器样式性能
  const indicatorStyle = useMemo(() => {
    return {
      backgroundColor: background.contrast,
    };
  }, [background.contrast]);

  // Memoize snap points to optimize performance
  // 使用 useMemo 优化吸附点性能
  const snapPoints = useMemo(() => {
    if (props.snapPoints) {
      return props.snapPoints.map((snapPoint) => {
        const num = Number(snapPoint);
        if (isNaN(num)) return 100;
        return num;
      });
    }
    return [100];
  }, [props.snapPoints]);

  // Handle keyboard events
  // 处理键盘事件
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e: KeyboardEvent) => {
        const keyboardHeight = e.endCoordinates.height;
        Animated.timing(translateY, {
          toValue: -keyboardHeight,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      (e: KeyboardEvent) => {
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Control visibility of the action sheet
  // 控制动作面板的显示和隐藏
  useEffect(() => {
    if (props.isVisible) {
      actionSheetRef.current?.show();
    } else {
      actionSheetRef.current?.hide();
      Keyboard.dismiss();
      props.onClose?.();
    }
  }, [props.isVisible]);

  return (
    <View>
      <ActionSheet
        containerStyle={{
          ...(containerStyle as object),
          ...(props.containerStyle as object),
        }}
        indicatorStyle={{
          ...(indicatorStyle as object),
          ...(props.indicatorStyle as object),
        }}
        keyboardHandlerEnabled={true}
        gestureEnabled={props.gestureEnabled ?? true}
        drawUnderStatusBar={false}
        useBottomSafeAreaPadding={true}
        isModal={true}
        ref={actionSheetRef}
        snapPoints={snapPoints}
        elevation={props.elevation ?? 5}
        overlayColor={props.overlayColor ?? 'rgba(0,0,0,0.9)'}
        defaultOverlayOpacity={props.defaultOverlayOpacity ?? 0.5}
        closeOnTouchBackdrop={props.closeOnTouchBackdrop ?? true}
        onClose={() => {
          props.onClose?.();
          Keyboard.dismiss();
        }}
        onBeforeShow={() => {
          props.onBeforeShow?.();
        }}
        onBeforeClose={() => {
          props.onBeforeClose?.();
        }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1, minHeight: '100%' }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {props.header ?? actionHeader()}
          {props.children}
        </KeyboardAvoidingView>
      </ActionSheet>
    </View>
  );
});

/* 
  Styles for the action sheet
  动作面板的样式定义

  actionSheetHeader:
  - Header container style
  - 头部容器样式
  
  actionSheetHeaderText:
  - Header text style 
  - 头部文本样式
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
