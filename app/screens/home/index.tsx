import { View,SafeAreaView,Text, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import SearchHeader from '@/components/common/searchHeader';
import CategoryList from '@/components/common/CategoryList';
import ExploreList from '@/components/common/explore/ExploreList';
import { Stack } from 'expo-router';
import { useCustomTheme } from '@/context/themeContext';
import { Platform,StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, withSpring } from 'react-native-reanimated';

/**
 * Home Screen Component
 * 首页屏幕组件
 * 
 * Displays the main home screen with search header, category list, explore list and map button
 * 显示包含搜索头部、分类列表、探索列表和地图按钮的主页面
 */
export default function Home() {
  // Get theme values from context
  // 从主题上下文获取颜色值
  const {
    theme: { background,text },
  } = useCustomTheme();

  // Initialize animation values for map button
  // 初始化地图按钮的动画值
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  /**
   * Handle scroll events to show/hide map button
   * 处理滚动事件以显示/隐藏地图按钮
   * 
   * @param event - Scroll event object
   */
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > 100) {
      // Show map button with animation
      // 显示地图按钮并添加动画效果
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withSpring(0, {
        damping: 15,
        stiffness: 150,
      });
    } else {
      // Hide map button with animation
      // 隐藏地图按钮并添加动画效果
      opacity.value = withTiming(0, { duration: 300 });
      translateY.value = withSpring(100, {
        damping: 15,
        stiffness: 150,
      });
    }
  };

  // Define animated styles for map button
  // 定义地图按钮的动画样式
  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: '-50%' },{ translateY: translateY.value }],
  }));

  /**
   * Map Button Component
   * 地图按钮组件
   * 
   * Floating action button that toggles map view
   * 用于切换地图视图的悬浮操作按钮
   */
  const MapButton = () => (
    <Animated.View 
      style={[
        styles.mapButton, 
        { backgroundColor: background.contrast }, 
        animatedStyles
      ]}
    > 
      <Text style={{ color: text.inverse, marginRight: 5 }}>Map</Text> 
      <Ionicons name="map" size={24} color={text.inverse} />  
    </Animated.View>
  );

  return (
    <View style={{ position: 'relative', flex: 1, backgroundColor: background.default }}>
      <Stack.Screen
        options={{
          header: () => {
            return (
              <SafeAreaView style={styles.safeArea}>
                <SearchHeader />
                <CategoryList />
              </SafeAreaView>
            );
          },
        }}
      />
      <ExploreList 
        onScroll={handleScroll}
      />
      <MapButton />
    </View>
  );
}

// Styles definition
// 样式定义
const styles = StyleSheet.create({  
  // Safe area container style
  // 安全区域容器样式
  safeArea: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 12 : 0,
  },
  // Map button style
  // 地图按钮样式
  mapButton: {
    width: 88,
    height:40,
    position: 'absolute',
    bottom: 35,
    left: '50%',
    transform: [{ translateX: '-50%' }],
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})
