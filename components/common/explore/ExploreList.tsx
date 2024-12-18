/**
 * Explore List Component
 * 探索列表组件
 * 
 * Displays a list of explore items in a bottom sheet with header containing total count and price display toggle
 * 在底部表单中显示探索项目列表,包含总数和价格显示切换的头部
 */
import ExploreItem from './ExploreItem';
import { useState, useCallback, forwardRef } from 'react';
import { ExploreItemType, ExploreListProps } from '@/types/exploreTypes';
import {  View, Text, StyleSheet, ScrollView } from 'react-native';
import { useCustomTheme } from '@/context/themeContext';
import { Switch } from 'react-native-paper';
import { BottomSheetFlatList, BottomSheetFlatListMethods} from '@gorhom/bottom-sheet';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

const ExploreList = forwardRef((
  { onScroll }: ExploreListProps,
  ref:React.ForwardedRef<BottomSheetFlatListMethods>) => {
  // Mock data for explore list
  // 探索列表的模拟数据
  const [list] = useState<ExploreItemType[]>([
    {
      id: 1,
      title: 'Khet Khlong Toei, Thailand',
      subTitle: 'Stay with Amm', 
      date: 'Feb 1 – 6',
      price: '$82 night',
      image: require('@/assets/images/home/list/1.png'),
      images: Array(3).fill(require('@/assets/images/home/list/1.png')),
    },
    // {
    //   id: 2,
    //   title: 'Khet Khlong Toei, Thailand',
    //   subTitle: 'Stay with Amm',
    //   date: 'Feb 1 – 6', 
    //   price: '$82 night',
    //   image: require('@/assets/images/home/list/1.png'),
    //   images: Array(3).fill(require('@/assets/images/home/list/1.png')),
    // },
    // {
    //   id: 4,
    //   title: 'Khet Khlong Toei, Thailand',
    //   subTitle: 'Stay with Amm',
    //   date: 'Feb 1 – 6',
    //   price: '$82 night',
    //   image: require('@/assets/images/home/list/1.png'),
    //   images: Array(3).fill(require('@/assets/images/home/list/1.png')),
    // },
    {
      id: 5,
      title: 'Khet Khlong Toei, Thailand',
      subTitle: 'Stay with Amm',
      date: 'Feb 1 – 6',
      price: '$82 night',
      image: require('@/assets/images/home/list/1.png'),
      images: Array(3).fill(require('@/assets/images/home/list/1.png')),
    },
  ]); 

  const { theme: { border, background, text } } = useCustomTheme();
  const [switchValue, setSwitchValue] = useState(false);


  // Update the scroll handler with correct types
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      onScroll?.(event.nativeEvent.contentOffset.y);
    },
    [onScroll]
  ) as ScrollView['props']['onScroll'];

  // Toggle price display switch
  // 切换价格显示开关
  const toggleSwitch = useCallback(() => {
    setSwitchValue(prev => !prev);
  }, []);

  // Render individual explore item
  // 渲染单个探索项目
  const renderItem = useCallback(({ item }: { item: ExploreItemType }) => (
    <ExploreItem key={item.id} item={item} />
  ), []);

  // Render list header with total count and price display toggle
  // 渲染带有总数和价格显示切换的列表头部
  const ListHeaderComponent = useCallback(() => (
    <View style={styles.listHeader}>
      <View style={styles.totalHouseBox}>
        <Text style={[styles.totalHouseText, { color: text.primary }]}>
          over 4000 amazing views
        </Text>
      </View>
      <View style={[styles.listHeaderButtonBox, { borderColor: border.default }]}>
        <View style={styles.listHeaderButtonBoxLeft}>
          <Text style={[styles.listHeaderButtonBoxLeftTitleText, { color: text.primary }]}>
            Display total price
          </Text>
          <Text style={[styles.listHeaderButtonBoxLeftSubText, { color: text.secondary }]}>
            Includes all fees, before taxes
          </Text>
        </View>
        <View style={styles.listHeaderButtonBoxRight}>
          <Switch
            thumbColor={background.default}
            value={switchValue}
            onValueChange={toggleSwitch}
            trackColor={{
              true: background.contrast,
              false: background.secondary,
            }}
          />
        </View>
      </View>
    </View>
  ), [background, border, switchValue, text.primary, toggleSwitch]);

  return (
    <View style={styles.container}>
      <BottomSheetFlatList
        ref={ref}
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
        onScrollEndDrag={handleScroll}
      />
    </View>
  );
})

export default ExploreList;

// Styles for the explore list component
// 探索列表组件的样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listHeader: {
    boxSizing: 'border-box',
    paddingRight: 24,
    paddingLeft: 24,
  },
  totalHouseBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  totalHouseText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  listHeaderButtonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    height: 64,
    padding: 15,
    marginTop: 10
  },
  listHeaderButtonBoxLeft: {
    flex: 1,
  },
  listHeaderButtonBoxRight: {
    width: 48,
  },
  listHeaderButtonBoxLeftTitleText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  listHeaderButtonBoxLeftSubText: {
    fontSize: 15,
    fontWeight: '500',
  },
});