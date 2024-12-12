import { View,SafeAreaView } from 'react-native';
import SearchHeader from '@/components/common/searchHeader';
import CategoryList from '@/components/common/CategoryList';
import ExploreList from '@/components/common/explore/ExploreList';
import { Stack } from 'expo-router';
import { useCustomTheme } from '@/context/themeContext';
import { Platform,StyleSheet } from 'react-native';
export default function Home() {
  const {
    theme: { background },
  } = useCustomTheme();
  return (
    <View style={{ flex: 1, backgroundColor: background.default }}>
      <Stack.Screen
        options={{
          header: () => {
            return (
              <SafeAreaView style={styles.safeArea}>
                <SearchHeader />
                <CategoryList />
              </SafeAreaView>
            );
          },
        }}
      />
      <ExploreList />
    </View>
  );
}

const styles = StyleSheet.create({  
  // Safe area style
  safeArea: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
})