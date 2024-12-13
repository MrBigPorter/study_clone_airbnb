import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCustomTheme } from '@/context/themeContext';
import { ExploreItemType } from '@/types/exploreTypes';
import { useState, useRef } from 'react';

/**
 * 探索列表项组件 Explore list item component
 * @param item - 列表项数据 List item data
 */
export default function ExploreItem({ item }: { item: ExploreItemType }) {
  // 获取主题配置 Get theme configuration
  const {
    theme: { text, primary },
  } = useCustomTheme();

  // 是否按下状态 Whether the item is pressed
  const [isItemPressed, setIsItemPressed] = useState<Boolean>(false);

  // 当前收藏的项目 Currently wishlisted item
  const [currentWishItem, setCurrentWishItem] =
    useState<ExploreItemType | null>(null);

  // 动画值 Animation value
  const animation = useRef(new Animated.Value(1)).current;

  /**
   * 处理添加到收藏夹 Handle adding to wishlist
   * @param item - 要添加/移除的项目 Item to add/remove
   */
  const handleAddToWishlist = (item: ExploreItemType) => {
    jump();
    if (currentWishItem?.id === item.id) {
      // 如果已收藏则取消收藏 Remove from wishlist if already added
      setCurrentWishItem(null);
    } else {
      // 添加到收藏 Add to wishlist
      setCurrentWishItem(item);
    }
  };
  
  /**
   * 心形图标跳动动画 Heart icon jump animation
   */
  const jump = () => {
    Animated.sequence([
      // 放大动画 Scale up animation
      Animated.timing(animation, {
        toValue: 1.5,
        duration: 150,
        useNativeDriver: true,
      }),
      // 恢复原大小 Scale back animation
      Animated.timing(animation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      delayPressIn={50}
      onPressIn={() => setIsItemPressed(true)}
      onPressOut={() => setIsItemPressed(false)}
      style={{
        padding: 24,
        transform: [
          {
            scale: isItemPressed ? 0.96 : 1, // 按下时缩小效果 Scale down when pressed
          },
        ],
      }}
    >
      {/* 图片区域 Image section */}
      <View>
        <Image
          style={styles.ListImage}
          source={require('@/assets/images/home/list/1.png')}
        />
        {/* 收藏按钮 Wishlist button */}
        <TouchableWithoutFeedback onPress={() => handleAddToWishlist(item)}>
          <Animated.View
            style={[
              styles.ListAddButton,
              { transform: [{ scale: animation }] },
            ]}
          >
            {currentWishItem?.id === item.id ? (
              <Ionicons name="heart" size={25} color={primary.main} />
            ) : (
              <Ionicons name="heart-outline" size={25} color="#fff" />
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>

      {/* 标题区域 Title section */}
      <View style={styles.ListTitleWrap}>
        <Text style={[styles.ListTitleLeftText, { color: text.primary }]}>
          Khet Khlong Toei, Thailand
        </Text>
        {/* 评分 Rating */}
        <View style={styles.ListTitleRight}>
          <Ionicons name="star" size={15} color="black" />
          <Text
            style={[
              styles.ListTitleRightText,
              { marginLeft: 4, fontWeight: 'normal' },
            ]}
          >
            5.0
          </Text>
        </View>
      </View>

      {/* 房主信息 Host info */}
      <Text style={[styles.ListTitleLeftText, { color: text.secondary }]}>
        Stay with Amm
      </Text>

      {/* 日期 Date */}
      <Text
        style={[
          styles.ListTitleLeftText,
          { color: text.secondary, marginTop: 4 },
        ]}
      >
        Feb 1 – 6
      </Text>

      {/* 价格 Price */}
      <Text
        style={[
          styles.ListTitleLeftText,
          { color: text.primary, marginTop: 8 },
        ]}
      >
        $82 night
      </Text>
    </TouchableOpacity>
  );
}

/**
 * 样式定义 Style definitions
 */
const styles = StyleSheet.create({
  // 列表图片 List image
  ListImage: {
    width: '100%',
    height: 310,
    borderRadius: 16,
    marginBottom: 12,
  },
  // 标题包装器 Title wrapper
  ListTitleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // 标题右侧 Title right section
  ListTitleRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // 标题左侧文本 Title left text
  ListTitleLeftText: {
    fontSize: 15,
    fontWeight: 500,
    fontFamily: 'mon-sb',
  },
  // 标题右侧文本 Title right text
  ListTitleRightText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  // 添加按钮 Add button
  ListAddButton: {
    width: 32,
    height: 32,
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
