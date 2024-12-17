import {
  View,
  SafeAreaView,
} from 'react-native';
import SearchHeader from '@/components/common/searchHeader';
import CategoryList from '@/components/common/CategoryList';
import ExploreList from '@/components/common/explore/ExploreList';
import { Stack,  useNavigation } from 'expo-router';
import { useCustomTheme } from '@/context/themeContext';
import { Platform, StyleSheet } from 'react-native';
import MapButton from '@/components/common/MapButton';
import {useState, useCallback, useRef} from 'react';
import BottomSheetModal from '@/components/common/modal/BottomSheet';
import Map from '@/components/common/Map';
import BottomSheet from '@gorhom/bottom-sheet';
/**
 * Home Screen Component
 * 首页屏幕组件
 *
 * Displays the main home screen with search header, category list, explore list and map button
 * 显示包含搜索头部、分类列表、探索列表和地图按钮的主页面
 */
export default function Home() {
  const navigation = useNavigation();
  // Get theme background from context
  // 从上下文获取主题背景色
  const {
    theme: { background },
  } = useCustomTheme();

  const bottomSheetRef = useRef<BottomSheet>(null);

  // Track scroll position for map button animation
  // 跟踪滚动位置以实现地图按钮动画
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll events from explore list
  // 处理探索列表的滚动事件
  const handleScroll = (scrollY: number): void => {
    setScrollY(scrollY);
  };

  // Handle map button open
  // 处理地图按钮打开
  const onOpen = useCallback(() => {
    // Close the bottom sheet modal / 关闭底部表单模态框
    bottomSheetRef.current?.snapToIndex(0);
  }, []);


  return (
    <View style={[styles.container, { backgroundColor: background.default }]}>
      {/* Configure stack screen header with search and categories */}
      {/* 配置包含搜索和分类的堆栈屏幕头部 */}
      <Stack.Screen
        options={{
          header: () => (
            <SafeAreaView style={styles.safeArea}>
              <SearchHeader />
              <CategoryList />
            </SafeAreaView>
          ),
        }}
      />
     
      {/* Map component */}
      {/* 
        The Map component is positioned between the bottom sheet modal and floating map button.
        This order is important because:
        1. The map needs to be below the floating button so the button remains clickable
        2. The map needs to be above the bottom sheet so it's visible when the sheet is collapsed
        3. This layering creates the proper z-index stacking for all interactive elements

        地图组件位于底部表单模态框和浮动地图按钮之间。
        这个顺序很重要，因为：
        1. 地图需要在浮动按钮下方，这样按钮才能保持可点击状态
        2. 地图需要在底部表单上方，这样当表单收起时地图仍然可见
        3. 这种层序为所有交互元素创建了正确的z-index堆叠
      */}
      <Map />

      {/* Floating map button with scroll-based animation */}
      {/* 带有基于滚动的动画效果的浮动地图按钮 */}
      <MapButton onOpen={onOpen} scrollY={scrollY} />

      {/* Bottom sheet modal containing the explore list */}
      {/* 包含探索列表的底部表单模态框 */}
      <BottomSheetModal ref={bottomSheetRef}>
        <ExploreList onScroll={handleScroll} />
      </BottomSheetModal> 

    </View>
  );
}

// Styles for layout and positioning
// 布局和定位的样式
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  safeArea: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 12 : 0,
  },
});
