import ExploreItem from './ExploreItem';
import { useState } from 'react';
import { ExploreItemType, ExploreListProps } from '@/types/exploreTypes';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

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

  // 处理滚动事件 Handle scroll events
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    onScroll && onScroll(event);
  };

  return (
    <FlatList 
      data={list}
      renderItem={({ item }) => <ExploreItem key={item.id} item={item} />}
      keyExtractor={(item) => item.id.toString()}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    />
  );
}
