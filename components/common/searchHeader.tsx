// 导入所需的React Native组件
// Import required React Native components
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Pressable,
  TouchableHighlight,
} from 'react-native';
// 导入Ionicons图标
// Import Ionicons icons
import Ionicons from '@expo/vector-icons/Ionicons';
import { Box} from 'native-base';
import { useState } from 'react';

// 搜索头部组件
// Search header component
export default function SearchHeader() {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const filterPress = (isPressed: boolean) => {
    setIsPressed(isPressed);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 搜索栏按钮 Search bar button */}

      <View style={styles.searchBar}>
        <Box style={styles.searchContentWrapper} shadow={6}>
          <Ionicons name="search" size={24} color="black" />
          <View style={styles.searchTitleWrap}>
            <Text style={styles.searchTitle}>Where to?</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.searchSubtitle}
            >
              Anywhere • Any week • Add guests
            </Text>
          </View>
        </Box>

        {/* 筛选按钮 Filter button */}
        <Pressable      
             style={styles.filterButton} 
             onPressIn={()=>filterPress(true)}
             onPressOut={()=>filterPress(false)}
            >
          <View style={isPressed && styles.activeFilter} >
            <Ionicons name="options" size={24} color="black" />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// 样式定义
// Style definitions
const styles = StyleSheet.create({
  // 安全区域样式
  // Safe area style
  safeArea: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  // 搜索栏容器样式
  // Search bar container style
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 16,
    backgroundColor: '#fff',
  },
  // 搜索内容包装器样式
  // Search content wrapper style
  searchContentWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 32,
    marginRight: 14,
    shadowRadius: 8,
  },
  // 搜索标题包装器样式
  // Search title wrapper style
  searchTitleWrap: {
    marginLeft: 12,
    overflow: 'hidden',
    paddingRight: 14,
    flex: 1,
  },
  // 搜索标题文本样式
  // Search title text style
  searchTitle: {
    fontSize: 16,
    fontWeight: Platform.select({
      ios: '600',
      android: 'bold',
    }),
  },
  // 搜索副标题文本样式
  // Search subtitle text style
  searchSubtitle: {
    fontSize: 14,
    color: '#717171',
    marginTop: Platform.OS === 'android' ? 2 : 1,
  },
  // 筛选按钮样式
  // Filter button style
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgb(176, 176, 176)',
  },
  activeFilter: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '50%',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
