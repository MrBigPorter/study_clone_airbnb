import { useCustomTheme } from '@/context/themeContext';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
export default function ExploreFilters() {
  const {theme:{text,border}} = useCustomTheme()
  const [placeTypes,setPlaceType] = useState([
    {
      id:1,
      name:'Any type',
    },
    {
      id:2,
      name:'Room',
    },
    {
      id:3,
      name:'Entire home',
    }
    ])
  return (
    <View style={styles.container}>
      <View style={styles.filterTop}>
        <Text style={[styles.filterTopText,{color:text.primary}]}>Type of place </Text>
        <View style={[styles.placeType,{borderColor:border.default}]}>
          {placeTypes.map((placeType,index)=>(
            <View key={placeType.id} style={[styles.placeTypeItem,index===placeTypes.length-1 && {borderRightWidth:0},{borderRightColor:border.default}]}>
              <Text style={[styles.placeTypeItemText,{color:text.primary}]}>{placeType.name}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.filterMiddle}>
        <Text>Explore Filters</Text>
      </View>
      <View style={styles.filterBottom}>
        <Text>Explore Filters</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
   padding:34
  },
  filterTop:{
    paddingBottom:32
  },
  filterTopText:{
    fontSize:16,
    fontWeight:'bold',
    marginBottom:32
  },
  placeType:{
    height:54,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    padding:4,
    flexDirection:'row',
    gap:4
  },
  placeTypeItem:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    borderRightWidth:1,
    height:'100%'
  },
  placeTypeItemText:{
    fontSize:14,
    fontWeight:'bold',
    fontFamily:'mon-sb',
    textAlign:'center'
  },
  filterMiddle:{
    height:50,
    backgroundColor:'blue'
  },
  filterBottom:{
    height:50,
    backgroundColor:'green'
  }
})  
