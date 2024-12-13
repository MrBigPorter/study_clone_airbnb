import ExploreItem from './ExploreItem';
import { useState } from 'react';
import { ExploreItemType } from '@/types/exploreTypes';
import { ScrollView } from 'react-native';

export default function ExploreList() {
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

  return (
    <ScrollView>
      {list.map((item) => (
        <ExploreItem key={item.id} item={item} />
      ))}
    </ScrollView>
  );
}
