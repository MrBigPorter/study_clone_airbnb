import {
  View,
  SafeAreaView,
  Text,
} from 'react-native';
import SearchHeader from '@/components/common/searchHeader';
import CategoryList from '@/components/common/CategoryList';
import ExploreList from '@/components/common/explore/ExploreList';
import { Stack } from 'expo-router';
import { useCustomTheme } from '@/context/themeContext';
import { Platform, StyleSheet } from 'react-native';
import MapButton from '@/components/common/MapButton';
import { useState } from 'react';
import BottomSheetModal from '@/components/common/modal/BottomSheet';
import Map from '@/components/common/Map';
/**
 * Home Screen Component
 * 首页屏幕组件
 *
 * Displays the main home screen with search header, category list, explore list and map button
 * 显示包含搜索头部、分类列表、探索列表和地图按钮的主页面
 */
export default function Home() {
  // Get theme background from context
  // 从上下文获取主题背景色
  const {
    theme: { background },
  } = useCustomTheme();

  // Track scroll position for map button animation
  // 跟踪滚动位置以实现地图按钮动画
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll events from explore list
  // 处理探索列表的滚动事件
  const handleScroll = (scrollY: number): void => {
    setScrollY(scrollY);
  };

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
     
      {/* Floating map button with scroll-based animation */}
      {/* 带有基于滚动的动画效果的浮动地图按钮 */}
      <MapButton scrollY={scrollY} />

      {/* Bottom sheet modal containing the explore list */}
      {/* 包含探索列表的底部表单模态框 */}
      <BottomSheetModal>
        <ExploreList onScroll={handleScroll} />
      </BottomSheetModal> 

      {/* Map component */}
      {/* 地图组件 */}
      <Map /> 
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
