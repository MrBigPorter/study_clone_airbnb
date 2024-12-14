import {
  View,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import SearchHeader from '@/components/common/searchHeader';
import CategoryList from '@/components/common/CategoryList';
import ExploreList from '@/components/common/explore/ExploreList';
import { Stack } from 'expo-router';
import { useCustomTheme } from '@/context/themeContext';
import { Platform, StyleSheet } from 'react-native';
import MapButton from '@/components/common/MapButton';
import { useState } from 'react';

/**
 * Home Screen Component
 * 首页屏幕组件
 *
 * Displays the main home screen with search header, category list, explore list and map button
 * 显示包含搜索头部、分类列表、探索列表和地图按钮的主页面
 */
export default function Home() {
  const {
    theme: { background },
  } = useCustomTheme();

  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (scrollY: number): void => {
    setScrollY(scrollY);
  };

  return (
    <View style={[styles.container, { backgroundColor: background.default }]}>
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
      <ExploreList onScroll={handleScroll} />
      <MapButton scrollY={scrollY} />
    </View>
  );
}

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
