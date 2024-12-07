import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
type Category = {
    id: number;
    name: string;
    icon: any;
}
const categories: Category[] = [
    {id:1,name:'Tiny homes',icon: require('@/assets/images/home/category/home.jpg')},
    {id:3,name:'CountrySide',icon: require('@/assets/images/home/category/countrySide.jpg')},
    {id:4,name:'Cabins',icon: require('@/assets/images/home/category/cabin.jpg')},
    {id:5,name:'Amazing pools',icon: require('@/assets/images/home/category/pool.jpg')},
    {id:6,name:'Containers',icon: require('@/assets/images/home/category/container.jpg')},
    {id:7,name:'Amazing views',icon: require('@/assets/images/home/category/view.jpg')},
    {id:8,name:'Beachfront',icon: require('@/assets/images/home/category/beach.jpg')},
    {id:9,name:'Rooms',icon: require('@/assets/images/home/category/room.jpg')},
    {id:10,name:'LakeFront',icon: require('@/assets/images/home/category/lake.jpg')},
    {id:11,name:'Domes',icon: require('@/assets/images/home/category/domes.jpg')},
    {id:12,name:'OMG',icon: require('@/assets/images/home/category/omg.jpg')},
    {id:13,name:'TreeHouse',icon: require('@/assets/images/home/category/treeHouse.jpg')},
]
export default function CategoryList() {
  return (
    <ScrollView
         horizontal={true}
         showsHorizontalScrollIndicator={false}
         style={styles.categoryList}
        >
            {categories.map((category,index)=>(
                <View key={category.id} style={[styles.categoryItemWrapper,index===0&&styles.firstItem]}>
                   <View style={styles.categoryItem}>
                    <Image 
                        source={category.icon} 
                        style={styles.categoryIcon}
                        resizeMode='contain'
                    />
                     <Text style={styles.categoryName}>{category.name}</Text>
                   </View>
                </View>
            ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
    categoryList:{
       backgroundColor:'#fff',
    },
    categoryItemWrapper:{
        height:74,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginRight:22,
    },
    firstItem:{
        marginLeft:22,
    },
    categoryItem:{
        height:44,
        alignItems:'center',
        justifyContent:'center',
    },
    categoryIcon:{
        height:24,
        width:24,
        marginBottom:5,
    },
    categoryName:{
        fontSize:12,
        color:'#333',
    }
    
})  