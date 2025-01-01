import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useCustomTheme } from '@/context/themeContext';
import { useExploreFilterContext } from '@/context/exploreFilterContext';
import { useMemo } from 'react';
import { isNullOrEmpty } from '@/utils';
import {
  ExploreFilterItemProps,
  FilterValue,
  PriceRange,
} from '@/types/exploreTypes';

// Bottom bar component / 底部栏组件
const BottomBar = ({ onClose }: { onClose: () => void }) => {
  const {
    theme: { border, text, background },
  } = useCustomTheme();
  const {
    dispatch,
    bedsBathroomsInfo,
    priceRange,
    checkedAmenities,
    checkedBookingOptions,
    standoutSection,
    selectedAccessibilityFeatures,
    selectedPropertyTypes,
  } = useExploreFilterContext();

  const getListByObject = <T extends Record<string, any>>(
    obj: T
  ): ExploreFilterItemProps<FilterValue>[] => {
    if (isNullOrEmpty(obj)) return [];
    return Object.keys(obj).map((key) => {
      let value = obj[key];
      if (isNullOrEmpty(value)) return { keyWord: key, value: null };
      return {
        keyWord: key,
        value: value,
      };
    });
  };

  const newList = useMemo(() => {
    const newBedsBathroomsInfo = getListByObject(bedsBathroomsInfo);
    const newCheckedAmenities = getListByObject(checkedAmenities);
    const newCheckedBookingOptions = getListByObject(checkedBookingOptions);
    const newSelectedAccessibilityFeatures = getListByObject(
      selectedAccessibilityFeatures
    );
    const newSelectedPropertyTypes = getListByObject(selectedPropertyTypes);
    const flattenedList = [
      {
        parent: 'priceRange',
        keyWord: 'connectPrice',
        value: priceRange,
      },
      {
        keyWord: 'standoutSection',
        value: standoutSection,
      },
      ...newBedsBathroomsInfo,
      ...newCheckedAmenities,
      ...newCheckedBookingOptions,
      ...newSelectedAccessibilityFeatures,
      ...newSelectedPropertyTypes,
    ].filter((item) => {
      if(item.parent === 'priceRange' && !isNullOrEmpty(item.value)){
        return (item.value as PriceRange).connectPrice;
      }
      return !isNullOrEmpty(item.value);
    });
    return flattenedList;
  }, [
    { ...bedsBathroomsInfo },
    priceRange.connectPrice,
    { ...checkedAmenities },
    { ...checkedBookingOptions },
    standoutSection,
    { ...selectedAccessibilityFeatures },
    { ...selectedPropertyTypes },
  ]);

  // Clear all button / 清除所有按钮
  const handleClearAll = () => {
    dispatch({ type: 'SET_CACHE_FILTER', payload: [] });
  };

  // Show results button / 显示结果按钮
  const handleShowResults = () => {
    dispatch({
      type: 'SET_CACHE_FILTER',
      payload: newList,
    });
    onClose?.();
  };

  return (
    <View
      style={[
        styles.bottomBar,
        {
          borderTopColor: border.default,
          backgroundColor: background.default,
        },
      ]}
    >
      {/* Clear all button / 清除所有按钮 */}
      <TouchableOpacity onPress={handleClearAll}>
        <Text style={[styles.bottomBarButtonText, { color: text.primary }]}>
          Clear all
        </Text>
      </TouchableOpacity>

      {/* Show results button / 显示结果按钮 */}
      <TouchableOpacity
        onPress={handleShowResults}
        style={[
          styles.bottomBarButton,
          { backgroundColor: background.contrast },
        ]}
      >
        <Text style={[styles.bottomBarButtonText, { color: text.inverse }]}>
          Show 1,000+ places
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles / 样式
const styles = StyleSheet.create({
  // Bottom bar container / 底部栏容器
  bottomBar: {
    height: 80,
    paddingHorizontal: 34,
    borderTopWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  // Bottom bar text / 底部栏文本
  bottomBarText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
  },
  // Bottom bar button / 底部栏按钮
  bottomBarButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    minWidth: 150,
    paddingHorizontal: 15,
  },
  // Bottom bar button text / 底部栏按钮文本
  bottomBarButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
  },
});

export default BottomBar;
