import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCustomTheme } from '@/context/themeContext';
import { ExploreItemType } from '@/types/exploreTypes';
import { useState, useRef } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// 获取屏幕宽度 Get screen width
const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * 探索列表项组件 - Explore List Item Component
 * 
 * 该组件用于展示探索页面中的单个房源项目，包含以下功能:
 * This component displays a single accommodation item in the explore page with following features:
 * 
 * 1. 图片轮播 - Image carousel
 * 2. 收藏按钮动画 - Wishlist button animation
 * 3. 轮播分页指示器 - Carousel pagination indicators
 * 4. 按压反馈效果 - Press feedback effect
 * 
 * @param {ExploreItemType} item - 列表项数据，包含图片、标题、价格等信息
 *                                 List item data containing images, title, price etc.
 */
export default function ExploreItem({ item }: { item: ExploreItemType }) {
  // 获取主题颜色 Get theme colors
  const {
    theme: { text, primary },
  } = useCustomTheme();

  // 状态管理 State management
  const [currentWishItem, setCurrentWishItem] = useState<ExploreItemType | null>(null); // 收藏状态 Wishlist state
  const [activeIndex, setActiveIndex] = useState(0); // 当前轮播索引 Current carousel index
  
  // 添加动画配置常量 Add animation configuration constants
  const SPRING_CONFIG = {
    pressed: {
      scale: 0.95,        // Scale down to 95% when pressed / 按压时缩小到95%
      friction: 9,        // Friction value for spring animation / 弹簧动画的摩擦力值
      tension: 40,        // Tension value for spring animation / 弹簧动画的张力值
      useNativeDriver: true,  // Use native driver for better performance / 使用原生驱动以提升性能
    },
    default: {
      scale: 1,           // 默认大小
      friction: 7,
      tension: 40,
      useNativeDriver: true,
    }
  };

  // 心跳动画值引用 Heartbeat animation value reference
  const scaleHeartAnimation = useRef(new Animated.Value(1)).current;
  // 动画值 Animation value 
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  // 计算轮播图宽度 Calculate carousel width
  const carouselWidth = SCREEN_WIDTH - 48; // 左右各24padding

  // 动画函数 Animation function
  const animateScale = (pressed: boolean) => {
    Animated.spring(scaleAnimation, {
      toValue: pressed ? SPRING_CONFIG.pressed.scale : SPRING_CONFIG.default.scale,
      friction: pressed ? SPRING_CONFIG.pressed.friction : SPRING_CONFIG.default.friction,
      tension: pressed ? SPRING_CONFIG.pressed.tension : SPRING_CONFIG.default.tension,
      useNativeDriver: true,
    }).start();
  };

  /**
   * 处理添加到愿望清单
   * Handle adding item to wishlist
   * 
   * @param {ExploreItemType} item - 要添加/移除的项目 Item to add/remove
   */
  const handleAddToWishlist = (item: ExploreItemType) => {
    animateHeart();
    setCurrentWishItem(prev => prev?.id === item.id ? null : item);
  };

  /**
   * 心形图标动画效果
   * Heart icon animation effect
   * 
   * 包含放大和缩小两个阶段
   * Includes scale up and down phases
   */
  const animateHeart = () => {
    Animated.sequence([
      Animated.timing(scaleHeartAnimation, {
        toValue: 1.5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleHeartAnimation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  /**
   * 渲染轮播项
   * Render carousel item
   * 
   * @param {object} params - 包含图片数据的对象 Object containing image data
   * @returns {React.ReactElement} 轮播项视图 Carousel item view
   */
  const renderCarouselItem = ({ imageItem }: { imageItem: any }) => (
    <View style={styles.slideContainer}>
      <Image 
        source={imageItem}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );

  /**
   * 渲染分页指示器
   * Render pagination indicators
   * 
   * @returns {React.ReactElement} 分页指示器视图 Pagination indicators view
   */
  const renderPaginationDots = () => (
    <View style={styles.pagination}>
      {item.images.map((_, i) => (
        <View
          key={i}
          style={[
            styles.paginationDot,
            i === activeIndex && styles.paginationDotActive
          ]}
        />
      ))}
    </View>
  );

  /**
   * 渲染收藏按钮
   * Render wishlist button
   * 
   * @returns {React.ReactElement} 收藏按钮视图 Wishlist button view
   */
  const renderWishlistButton = () => (
    <TouchableWithoutFeedback onPress={() => handleAddToWishlist(item)}>
      <Animated.View
        style={[
          styles.ListAddButton,
          { transform: [{ scale: scaleHeartAnimation }] },
        ]}
      >
        <Ionicons 
          name={currentWishItem?.id === item.id ? "heart" : "heart-outline"} 
          size={25} 
          color={currentWishItem?.id === item.id ? primary.main : "#fff"} 
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );

  return (
    <TouchableOpacity 
      activeOpacity={1}
      onPressIn={() => animateScale(true)}
      onPressOut={() => animateScale(false)}
      style={[
        styles.container,
        { transform: [{ scale: scaleAnimation }] }
      ]}
    >
      {/* 轮播容器 Carousel container */}
      <View style={styles.carouselContainer}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Carousel
            loop
            width={carouselWidth}
            height={310}
            data={item.images}
            scrollAnimationDuration={300}
            onSnapToItem={setActiveIndex}
            renderItem={({item: image})=>renderCarouselItem({imageItem: image})}
            enabled={true}
            snapEnabled={true}
            defaultIndex={0}
            autoPlay={false}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],  // 水平滑动阈值
              failOffsetY: [-5, 5],      // 垂直滑动阈值
              activeOffsetY: [-999, 999], // 允许垂直滑动通过
            }}
          />

          {renderPaginationDots()}
          {renderWishlistButton()}
        </GestureHandlerRootView>
      </View> 

      {/* 标题区域 Title section */}
      <View style={styles.ListTitleWrap}>
        <Text style={[styles.ListTitleLeftText, { color: text.primary }]}>
          Khet Khlong Toei, Thailand
        </Text>
        <View style={styles.ListTitleRight}>
          <Ionicons name="star" size={15} color="black" />
          <Text style={[styles.ListTitleRightText, { marginLeft: 4 }]}>
            5.0
          </Text>
        </View>
      </View>

      {/* 房主信息 Host info */}
      <Text style={[styles.ListTitleLeftText, { color: text.secondary }]}>
        Stay with Amm
      </Text>

      {/* 日期信息 Date info */}
      <Text
        style={[
          styles.ListTitleLeftText,
          { color: text.secondary, marginTop: 4 },
        ]}
      >
        Feb 1 – 6
      </Text>

      {/* 价格信息 Price info */}
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
 * 样式定义
 * Style definitions
 */
const styles = StyleSheet.create({
  // 容器样式 Container styles
  container: {
    width: '100%',
    padding: 24,
    position: 'relative',
  },
  // 轮播容器样式 Carousel container styles
  carouselContainer: {
    position: 'relative', 
    height: 310,
    borderRadius: 16,
    overflow: 'hidden',
  },
  // 轮播项容器样式 Slide container styles
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 标题包装样式 Title wrapper styles
  ListTitleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  // 标题右侧样式 Title right section styles
  ListTitleRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // 标题左侧文本样式 Title left text styles
  ListTitleLeftText: {
    fontSize: 15,
    fontWeight: 500,
    fontFamily: 'mon-sb',
  },
  // 标题右侧文本样式 Title right text styles
  ListTitleRightText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  // 收藏按钮样式 Wishlist button styles
  ListAddButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 图片样式 Image styles
  image: {
    width: '100%',
    height: '100%',
  },
  // 分页指示器样式 Pagination styles
  pagination: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  // 分页圆点样式 Pagination dot styles
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 3,
  },
  // 激活状态的分页圆点样式 Active pagination dot styles
  paginationDotActive: {
    backgroundColor: '#fff',
  },
});
