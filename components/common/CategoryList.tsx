// CategoryList Component - 分类列表组件
// Displays a horizontal scrollable list of categories with icons and names
// 显示一个带有图标和名称的水平可滚动分类列表

import { useCustomTheme } from '@/context/themeContext';
import { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';

// Types definitions - 类型定义
type Category = {
  id: number;
  name: string;
  icon: any;
};

type CategoryWidths = {
  id: number;
  width: number;
};

// Category data array - 分类数据数组
const categories: Category[] = [
  {
    id: 1,
    name: 'Tiny homes',
    icon: require('@/assets/images/home/category/home.jpg'),
  },
  {
    id: 3,
    name: 'CountrySide', 
    icon: require('@/assets/images/home/category/countrySide.jpg'),
  },
  {
    id: 4,
    name: 'Cabins',
    icon: require('@/assets/images/home/category/cabin.jpg'),
  },
  {
    id: 5,
    name: 'Amazing pools',
    icon: require('@/assets/images/home/category/pool.jpg'),
  },
  {
    id: 6,
    name: 'Containers',
    icon: require('@/assets/images/home/category/container.jpg'),
  },
  {
    id: 7,
    name: 'Amazing views',
    icon: require('@/assets/images/home/category/view.jpg'),
  },
  {
    id: 8,
    name: 'Beachfront',
    icon: require('@/assets/images/home/category/beach.jpg'),
  },
  {
    id: 9,
    name: 'Rooms',
    icon: require('@/assets/images/home/category/room.jpg'),
  },
  {
    id: 10,
    name: 'LakeFront',
    icon: require('@/assets/images/home/category/lake.jpg'),
  },
  {
    id: 11,
    name: 'Domes',
    icon: require('@/assets/images/home/category/domes.jpg'),
  },
  {
    id: 12,
    name: 'OMG',
    icon: require('@/assets/images/home/category/omg.jpg'),
  },
  {
    id: 13,
    name: 'TreeHouse',
    icon: require('@/assets/images/home/category/treeHouse.jpg'),
  },
];

export default function CategoryList() {
  // State management - 状态管理
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [categoryWidths, setCategoryWidths] = useState<CategoryWidths[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const { theme: { text, background } } = useCustomTheme();

  // Handle category selection and scroll - 处理分类选择和滚动
  const onCategoryPress = useCallback((index: number, category: Category) => {
    setSelectedCategory(category);
    const xPosition = categoryWidths
      .slice(0, index)
      .reduce((acc, item) => acc + item.width, 0);
    scrollViewRef.current?.scrollTo({
      x: xPosition,
      animated: true
    });
  }, [categoryWidths]);

  // Handle category layout measurement - 处理分类布局测量
  const onCategoryLayout = useCallback((id: number) => (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setCategoryWidths(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => 
          item.id === id ? { ...item, width } : item
        );
      }
      return [...prev, { id, width }];
    });
  }, []);

  // Render individual category item - 渲染单个分类项
  const renderCategory = useCallback(({ category, index }: { category: Category, index: number }) => (
    <TouchableOpacity
      onPress={() => onCategoryPress(index, category)}
      onLayout={onCategoryLayout(category.id)}
      key={category.id}
      style={[
        styles.categoryItemWrapper,
        index === 0 && styles.firstItem,
        selectedCategory.id === category.id && styles.categoryActive,
      ]}
    >
      <View style={styles.categoryItem}>
        <Image
          source={category.icon}
          style={[
            styles.categoryIcon,
            selectedCategory.id === category.id && styles.categoryActiveIcon
          ]}
          resizeMode="contain"
        />
        <Text 
          style={[
            styles.categoryName,
            {color:text.secondary},
            selectedCategory.id === category.id && styles.categoryActiveName,
            { color: text.primary }
          ]}
        >
          {category.name}
        </Text>
      </View>
    </TouchableOpacity>
  ), [selectedCategory.id, onCategoryPress, onCategoryLayout, text.primary]);

  // Main render - 主渲染
  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: background.default }}
    >
      {categories.map((category, index) => (
        renderCategory({ category, index })
      ))}
    </ScrollView>
  );
}

// Styles - 样式定义
const styles = StyleSheet.create({
  categoryItemWrapper: {
    height: 74,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30
  },
  firstItem: {
    marginLeft: 30,
  },
  categoryItem: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  categoryActiveName: {
    fontWeight: '500',
  },
  categoryIcon: {
    height: 24,
    width: 24,
    marginBottom: 5,
    opacity: 0.6
  },
  categoryActiveIcon: {
    opacity: 1
  },
  categoryName: {
    fontSize: 12
  },
});
