import { useCustomTheme } from '@/context/themeContext';
import { ExploreFiltersCacheProps } from '@/types/exploreTypes';
import { isNullOrEmpty } from '@/utils';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';



const SelectArea = ({newList}: {newList: ExploreFiltersCacheProps[]}) => {
  const {
    theme: { border },
  } = useCustomTheme();

  

  return (
    <View>
      {!isNullOrEmpty(newList) && (
        <View style={[styles.selectArea, { borderColor: border.default }]}>
          {newList.map((item: ExploreFiltersCacheProps) => (
            <SelectAreaItem
              key={`${item.keyWord as string}-${item.value.name}`}
              item={item}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const SelectAreaItem = ({ item }: { item: any }) => {
  const {
    theme: { text, border },
  } = useCustomTheme();
  return (
    <View style={styles.selectAreaItem}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Text style={[styles.selectAreaItemText, { color: text.primary }]}>
          {['string', 'number'].includes(typeof item.value)
            ? item.value
            : item.value.name}
        </Text>
        {['bedrooms', 'beds', 'bathrooms', 'standoutSection'].includes(
          item.keyWord
        ) && (
          <Text style={[styles.selectAreaItemText, { color: text.primary }]}>
            {item.keyWord === 'standoutSection'
              ? 'Guest Favorite'
              : item.keyWord}
          </Text>
        )}

        <Ionicons name="close" size={24} color={text.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selectArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    borderBottomWidth: 1,
    paddingBottom: 32,
    marginBottom: 32,
  },
  selectAreaItem: {
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectAreaItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
  },
});

export default SelectArea;
