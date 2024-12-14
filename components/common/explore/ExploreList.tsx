import ExploreItem from './ExploreItem';
import { useState } from 'react';
import { ExploreItemType, ExploreListProps } from '@/types/exploreTypes';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, View, Text, StyleSheet } from 'react-native';
import { useCustomTheme } from '@/context/themeContext';
import { Switch } from 'react-native-paper';

export default function ExploreList({onScroll}:ExploreListProps) {
  const [list, setList] = useState<ExploreItemType[]>([
    {
      id: 1,
      title: 'Khet Khlong Toei, Thailand',
      subTitle: 'Stay with Amm',
      date: 'Feb 1 – 6',
      price: '$82 night',
      image: require('@/assets/images/home/list/1.png'),
      images: [
        require('@/assets/images/home/list/1.png'),
        require('@/assets/images/home/list/1.png'),
        require('@/assets/images/home/list/1.png'),
      ],
    },
    {
      id: 2,
      title: 'Khet Khlong Toei, Thailand',
      subTitle: 'Stay with Amm',
      date: 'Feb 1 – 6',
      price: '$82 night',
      image: require('@/assets/images/home/list/1.png'),
      images: [
        require('@/assets/images/home/list/1.png'),
        require('@/assets/images/home/list/1.png'),
        require('@/assets/images/home/list/1.png'),
      ],
    },
    {
      id: 4,
      title: 'Khet Khlong Toei, Thailand',
      subTitle: 'Stay with Amm',
      date: 'Feb 1 – 6',
      price: '$82 night',
      image: require('@/assets/images/home/list/1.png'),
      images: [
        require('@/assets/images/home/list/1.png'),
        require('@/assets/images/home/list/1.png'),
        require('@/assets/images/home/list/1.png'),
      ],
    },
    {
      id: 5,
      title: 'Khet Khlong Toei, Thailand',
      subTitle: 'Stay with Amm',
      date: 'Feb 1 – 6',
      price: '$82 night',
      image: require('@/assets/images/home/list/1.png'),
      images: [
        require('@/assets/images/home/list/1.png'),
        require('@/assets/images/home/list/1.png'),
        require('@/assets/images/home/list/1.png'),
      ],
    },
  ]);
  const { theme:{border, background} } = useCustomTheme();

  const [switchValue, setSwitchValue] = useState<boolean>(false);

  // 处理滚动事件 Handle scroll events
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    onScroll && onScroll(event.nativeEvent.contentOffset.y);
  };

  const ListHeaderComponent = () => {
    return (
      <View style={styles.listHeader}>
        <View style={[styles.listHeaderButtonBox, {borderColor: border.default}]}>
          <View style={styles.listHeaderButtonBoxLeft}>
            <Text>Display total price</Text>
            <Text>Includes all fees, before taxes</Text>
          </View>
          <View style={styles.listHeaderButtonBoxRight}>
            <Switch
              thumbColor={background.default}
              value={switchValue}
              onValueChange={() => {
                setSwitchValue(!switchValue);
              }}
              color={border.default}
              
           />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList 
        ListHeaderComponent={ListHeaderComponent}
        data={list}
        renderItem={({ item }) => <ExploreItem key={item.id} item={item} />}
        keyExtractor={(item) => item.id.toString()}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listHeader: {
    padding: 24,
    boxSizing: 'border-box',
  },
  listHeaderButtonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    height: 64,
    padding:10
  },
  listHeaderButtonBoxLeft: {
    flex: 1,
  },
  listHeaderButtonBoxRight: {
    width: 48,
  },
  listHeaderSwitchBox: {
    width: 48,
  },
  listHeaderSwitchActive: {
    backgroundColor: 'red',
  },
  listHeaderSwitchInactive: {
    color: 'blue',
  },
}); 