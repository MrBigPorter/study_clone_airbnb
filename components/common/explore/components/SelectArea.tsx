import { useExploreFilterContext } from '@/context/exploreFilterContext';
import { useCustomTheme } from '@/context/themeContext';
import {
  ExploreFilterItemProps,
  FilterArrayList,
  FilterValue,
} from '@/types/exploreTypes';
import { isNullOrEmpty } from '@/utils';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useCallback, memo } from 'react';
import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';

/**
 * Selected filters area component
 * 已选择的筛选条件区域组件
 */
const SelectArea = ({ newList }: { newList: FilterArrayList }) => {
  const {
    theme: { border },
  } = useCustomTheme();

  const renderValue = useCallback(
    (item: ExploreFilterItemProps<FilterValue>) => {
      if (isNullOrEmpty(item.value)) return {};
      if (typeof item.value === 'string') {
        return item.value;
      }
      if (typeof item.value === 'object' && 'name' in item.value) {
        return item.value.name;
      }
    },
    []
  );

  return (
    <View>
      {!isNullOrEmpty(newList) && (
        <View style={[styles.selectArea, { borderColor: border.default }]}>
          {newList.map((item: ExploreFilterItemProps<FilterValue>) => (
            <SelectAreaItem
              key={`${item.keyWord as string}-${renderValue(item)}`}
              item={item}
            />
          ))}
        </View>
      )}
    </View>
  );
};

/**
 * Individual selected filter item component
 * 单个已选择的筛选条件项组件
 */
const SelectAreaItem = memo( ({ item }: { item: any }) => {
  const {
    theme: { text, border },
  } = useCustomTheme();
  const { dispatch, cacheFilter } = useExploreFilterContext();

  /**
   * Handle selected filter item press
   * 处理已选择筛选条件项的点击事件
   * @param item 已选择筛选条件项
   */
  const selectAreaItemPress = (item: ExploreFilterItemProps<FilterValue>) => {
    const newCacheFilter = [...cacheFilter];
    const itemIndex = newCacheFilter.findIndex(
      subItem => item.keyWord === subItem.keyWord && item.value === subItem.value
    );
    if (itemIndex !== -1) {
      newCacheFilter[itemIndex] = {
        ...newCacheFilter[itemIndex],
        move: !newCacheFilter[itemIndex].move
      };
    }
     dispatch({ type: 'UPDATE_CACHE_FILTER', payload: newCacheFilter });
  };


  return (
    <TouchableOpacity
      onPress={() => selectAreaItemPress(item)}
      style={[
        styles.selectAreaItem,
        { borderColor: !item?.move ? border.focus : border.default },
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {/* Display filter value / 显示筛选值 */}
        {item.value && (
          <Text style={[styles.selectAreaItemText, { color: text.primary }]}>
            {['string', 'number'].includes(typeof item.value)
              ? item.value
              : item.value.name}
            {item.parent === 'priceRange' && item.value.connectPrice}
          </Text>
        )}

        {/* Display filter type for specific keywords / 显示特定关键字的筛选类型 */}
        {['bedrooms', 'beds', 'bathrooms'].includes(
          item.keyWord
        ) && (
          <Text style={[styles.selectAreaItemText, { color: text.primary }]}>
            {item.keyWord}
          </Text>
        )}

        {/* Close button / 关闭按钮 */}
        <ActionButton item={item} />
      </View>
    </TouchableOpacity>
  );
});

const ActionButton = memo(({ item }: { item: any }) => {
  const {
    theme: { text },
  } = useCustomTheme();
  

  // Animation value for rotation / 旋转动画值
  const rotateAnim = useRef(new Animated.Value(0)).current;

  
  // Handle rotation animation when item.move changes / 当 item.move 改变时处理旋转动画
  useEffect(() => {
    Animated.spring(rotateAnim, {
      toValue: item.move ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [item.move]);

  // Interpolate rotation value / 插值旋转值
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <Ionicons name={item.move ? 'add' : 'close'} size={24} color={text.primary} />
    </Animated.View>
  );
}); 


// Styles / 样式
const styles = StyleSheet.create({
  // Container for selected filters / 已选择筛选条件的容器
  selectArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    borderBottomWidth: 1,
    paddingBottom: 32,
    marginBottom: 32,
  },
  // Individual filter item / 单个筛选条件项
  selectAreaItem: {
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Filter item text / 筛选条件文本
  selectAreaItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
  },
});

export default SelectArea;
