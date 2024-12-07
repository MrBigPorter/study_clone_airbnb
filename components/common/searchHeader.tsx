// 导入所需的React Native组件
// Import required React Native components
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// 导入Ionicons图标
// Import Ionicons icons
import Ionicons from '@expo/vector-icons/Ionicons';

// 搜索头部组件
// Search header component
export default function SearchHeader() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 搜索栏按钮 Search bar button */}
      <TouchableOpacity style={styles.searchBar}>
        <View style={styles.searchContentWrapper}>
          {/* 搜索图标 Search icon */}
          <Ionicons name="search" size={24} color="black" />
          {/* 搜索文本区域 Search text area */}
          <View style={styles.searchTitleWrap}>
            <Text style={styles.searchTitle}>Where to?</Text>
            <Text numberOfLines={2} ellipsizeMode='tail' style={styles.searchSubtitle}>Anywhere • Any week • Add guests</Text>
          </View>
        </View>
        {/* 筛选按钮 Filter button */}
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options" size={24} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
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
  },
  // 搜索栏容器样式
  // Search bar container style
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 16,
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
    shadowColor: '#000', // 定义阴影颜色为黑色 Define shadow color as black
    shadowOffset: { width: 0, height: 2 }, // 阴影偏移:水平无偏移,垂直向下偏移2个单位 Shadow offset: no horizontal offset, 2 units vertical offset
    shadowOpacity: 0.1, // 阴影透明度为0.1,非常轻微的阴影效果 Shadow opacity 0.1, very subtle shadow effect
    shadowRadius: 8, // 阴影半径为8,决定阴影的模糊程度和扩散范围 Shadow radius 8, determines shadow blur and spread
    elevation: 20, // Android平台的阴影属性,数值越大阴影越明显 Android platform shadow property, higher value means more visible shadow
    marginRight: 14,
  },
  // 搜索标题包装器样式
  // Search title wrapper style
  searchTitleWrap: {
    marginLeft: 12,
    overflow: 'hidden',
    paddingRight:14,
  },
  // 搜索标题文本样式
  // Search title text style
  searchTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  // 搜索副标题文本样式
  // Search subtitle text style
  searchSubtitle: {
    fontSize: 14,
    color: '#717171',
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
});
