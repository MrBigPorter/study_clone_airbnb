import { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  LayoutChangeEvent,
  LayoutRectangle,
} from 'react-native';
type Category = {
  id: number;
  name: string;
  icon: any;
};
type CategoryWidths = {
  id: number;
  width: number;
};
const categories: Category[] = [
  {
    id: 1,
    name: 'Tiny homes',
    icon: require('@/assets/images/home/category/home.jpg'),
  },
  {
    id: 3,
    name: 'CountrySide',
    icon: require('@/assets/images/home/category/countrySide.jpg'),
  },
  {
    id: 4,
    name: 'Cabins',
    icon: require('@/assets/images/home/category/cabin.jpg'),
  },
  {
    id: 5,
    name: 'Amazing pools',
    icon: require('@/assets/images/home/category/pool.jpg'),
  },
  {
    id: 6,
    name: 'Containers',
    icon: require('@/assets/images/home/category/container.jpg'),
  },
  {
    id: 7,
    name: 'Amazing views',
    icon: require('@/assets/images/home/category/view.jpg'),
  },
  {
    id: 8,
    name: 'Beachfront',
    icon: require('@/assets/images/home/category/beach.jpg'),
  },
  {
    id: 9,
    name: 'Rooms',
    icon: require('@/assets/images/home/category/room.jpg'),
  },
  {
    id: 10,
    name: 'LakeFront',
    icon: require('@/assets/images/home/category/lake.jpg'),
  },
  {
    id: 11,
    name: 'Domes',
    icon: require('@/assets/images/home/category/domes.jpg'),
  },
  {
    id: 12,
    name: 'OMG',
    icon: require('@/assets/images/home/category/omg.jpg'),
  },
  {
    id: 13,
    name: 'TreeHouse',
    icon: require('@/assets/images/home/category/treeHouse.jpg'),
  },
];

export default function CategoryList() {
  // State to track the currently selected category, initialized with first category
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  // State to store width measurements of each category item
  const [categoryWidths, setCategoryWidths] = useState<CategoryWidths[]>([]);

  const scrollViewRef = useRef<ScrollView>(null);

  // Handler for when a category is pressed/selected
  const onCategoryPress = (index:number,category: Category) => {
    setSelectedCategory(category);
    const xPosition = categoryWidths.slice(0,index).reduce((acc,item)=>acc+item.width,0);
    console.log('xPosition',xPosition)    
    scrollViewRef.current?.scrollTo({
      x:xPosition,
      animated:true
    })
  };

  // Handler to measure and store the width of each category item as it is laid out
  const onCategoryLayout = (id: number) => (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent?.layout;
    setCategoryWidths((prev) => [...prev, { id, width }]);
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.categoryList}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          onPress={() => onCategoryPress(index,category)}
          onLayout={onCategoryLayout(category.id)}
          key={category.id}
          style={[
            styles.categoryItemWrapper,
            index === 0 && styles.firstItem,
            selectedCategory.id === category.id && styles.categoryActive,
          ]}
        >
          <View style={styles.categoryItem}>
            <Image
              source={category.icon}
              style={styles.categoryIcon}
              resizeMode="contain"
            />
            <Text style={[styles.categoryName,selectedCategory.id === category.id && styles.categoryActiveName]}>{category.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  categoryList: {
    backgroundColor: '#fff',

  },
  categoryItemWrapper: {
    height: 74,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30
  },
  firstItem: {
    marginLeft: 30,
  },
  categoryItem: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  categoryActiveName: {
    color: '#000',
    fontWeight: 500,
  },
  categoryIcon: {
    height: 24,
    width: 24,
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 12,
    color: '#333',
  },
});
