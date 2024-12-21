import { useCustomTheme } from '@/context/themeContext';
import { ExploreFiltersPlaceTypesProps, ExploreFiltersTitleProps } from '@/types/exploreTypes';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { StyleSheet } from 'react-native';
import { PriceRangeSlider } from './PriceRangeSlider';
export default function ExploreFilters() {
  const {
    theme: { text, border },
  } = useCustomTheme();

  // Place types data / 地点类型数据
  const [placeTypes] = useState<ExploreFiltersPlaceTypesProps[]>([
    { id: 1, name: 'Any type', index: 0 },
    { id: 2, name: 'Room', index: 1 },
    { id: 3, name: 'Entire home', index: 2 },
  ]);

  const [currentPlaceType, setCurrentPlaceType] = useState<ExploreFiltersPlaceTypesProps>(placeTypes[0]);
  const [placeTypeStyles, setPlaceTypeStyles] = useState<Array<{width: number; offsetLeft: number}>>([]);
  const [slideAnim] = useState(new Animated.Value(0));
  const [widthAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(1));

  // Animation effects / 动画效果
  useEffect(() => {
    if (placeTypeStyles.length === 0) return;

    scaleAnim.setValue(1);
    const { offsetLeft, width } = placeTypeStyles[currentPlaceType.index];
    
    Animated.sequence([
      // Scale up animation / 放大动画
      Animated.timing(scaleAnim, {
        toValue: 1.08,
        duration: 100,
        useNativeDriver: false,
      }),
      // Scale down animation / 缩小动画
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.parallel([
        // Slide animation / 滑动动画
        Animated.spring(slideAnim, {
          toValue: offsetLeft,
          useNativeDriver: false,
          bounciness: 8,
          speed: 12,
        }),
        // Width animation / 宽度动画
        Animated.spring(widthAnim, {
          toValue: width,
          useNativeDriver: false,
          bounciness: 8,
          speed: 12,
        })
      ])
    ]).start();
  }, [currentPlaceType, placeTypeStyles]);

  // Handle place type selection / 处理地点类型选择
  const handlePlaceTypePress = useCallback((placeType: ExploreFiltersPlaceTypesProps) => {
    setCurrentPlaceType(placeType);
  }, []);

  // Calculate place type item styles / 计算地点类型项目样式
  const usePlaceTypeStyles = (
    index: number,
    placeType: ExploreFiltersPlaceTypesProps,
    currentPlaceType: ExploreFiltersPlaceTypesProps,
    placeTypes: ExploreFiltersPlaceTypesProps[]
  ) => {
    return useMemo(() => {
      const isLastItem = index === placeTypes.length - 1;
      const isActive = currentPlaceType.id === placeType.id;
      return {
        ...styles.placeTypeItem,
        ...(!isActive && isLastItem && { borderRightWidth: 0 }),
        ...(!isActive && { borderRightColor: border.default }),
        ...(isActive && styles.placeTypeInactive),
      };
    }, [index, currentPlaceType.id, placeType.id, placeTypes.length, border.default]);
  };

  // Place type item component / 地点类型项目组件
  const PlaceTypeItem = useCallback(({ 
    index, 
    placeType, 
    currentPlaceType, 
    placeTypes 
  }: {
    index: number;
    placeType: ExploreFiltersPlaceTypesProps;
    currentPlaceType: ExploreFiltersPlaceTypesProps;
    placeTypes: ExploreFiltersPlaceTypesProps[];
  }) => {
    const itemStyle = usePlaceTypeStyles(
      index,
      placeType,
      currentPlaceType,
      placeTypes
    );

    // Handle layout measurement / 处理布局测量
    const handleLayout = useCallback(({ nativeEvent }: any) => {
      const { width, x } = nativeEvent.layout;
      setPlaceTypeStyles(prev => [...prev, { width, offsetLeft: x }]);
    }, []);

    return (
      <Pressable
        key={placeType.id}
        style={itemStyle}
        onPress={() => handlePlaceTypePress(placeType)}
        onLayout={handleLayout}
      > 
        <Text style={[styles.placeTypeItemText, { color: text.primary }]}>
          {placeType.name}
        </Text>
      </Pressable>
    );
  }, []);

  // Item title component / 项目标题组件
  const itemTitle = ({
    name,
    style=null
  }:ExploreFiltersTitleProps)=>{
      return (
        <Text style={[styles.itemTitleText, { color: text.primary }, style]}>
          {name}
        </Text>
      )
  }

  return (
    <View style={styles.container}>
      {/* Filter top section / 过滤器顶部部分 */}
      <View style={[styles.filterTop, {  borderBottomColor: border.default }]}>
        {itemTitle({name:'Type of place'})}
        <View style={[styles.placeType, { borderColor: border.default }]}>
          {placeTypes.map((placeType, index) => (
            <PlaceTypeItem
              key={placeType.id}
              index={index}
              placeType={placeType}
              currentPlaceType={currentPlaceType}
              placeTypes={placeTypes}
            />
          ))}
          {/* Animated selection indicator / 动画选择指示器 */}
          <Animated.View
            style={[
              styles.placeTypeInactiveStatus,
              {
                width: widthAnim,
                borderColor: border.focus,
                left: slideAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          />
        </View>
      </View>
      {/* Filter middle section / 过滤器中间部分 */}
      <View style={[styles.filterMiddle, { borderBottomColor: border.default }]}>
        {itemTitle({name:'Price range',style:{marginBottom:4}})}
        <Text style={[styles.priceRangeText, { color: text.secondary }]}>
          Nightly prices before fees and taxes
        </Text>
        <PriceRangeSlider/>
      </View>
      {/* Filter bottom section / 过滤器底部部分 */}
      <View style={styles.filterBottom}>
        <Text>Explore Filters</Text>
      </View>
    </View>
  );
}

// Styles / 样式
const styles = StyleSheet.create({
  container: {
    padding: 34, // Container padding / 容器内边距
  },
  filterTop: {
    paddingBottom: 32, // Top section bottom padding / 顶部部分底部内边距
    borderBottomWidth: 1,
    marginBottom: 32,
  },
  itemTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 32, // Text bottom margin / 文本底部外边距
  },
  placeType: {
    height: 54, // Place type container height / 地点类型容器高度
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center', 
    borderWidth: 1,
    padding: 4,
    flexDirection: 'row',
    gap: 4,
    position: 'relative',
  },
  placeTypeItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    height: '100%',
    boxSizing: 'border-box',
  },
  placeTypeInactive: {
    borderRightWidth: 0, // Remove right border for inactive state / 移除非活动状态的右边框
  },
  placeTypeBorderInactive: {
    borderRightWidth: 0,
  },
  placeTypeInactiveStatus: {
    borderWidth: 1,
    borderRadius: 12,
    position: 'absolute',
    right: 0,
    top: 4.4,
    height: '98%',
  },
  placeTypeItemText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
    textAlign: 'center',
  },
  filterMiddle: {
    paddingBottom: 32,
    marginBottom: 32,
    borderBottomWidth: 1,
  },
  priceRangeText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
    marginBottom:24
  },
  filterBottom: {
    height: 50,
    backgroundColor: 'green', // Bottom section background / 底部部分背景色
  },
});
