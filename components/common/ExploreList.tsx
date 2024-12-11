import { useCustomTheme } from '@/context/themeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Badge, Box, Flex, HStack, Pressable, Spacer } from 'native-base';
import { useState } from 'react';
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';

export default function ExploreList() {
  const [list, setList] = useState<any[]>([
    {
      id: 1,
      title: 'Khet Khlong Toei, Thailand',
      subTitle: 'Stay with Amm',
      date: 'Feb 1 – 6',
      price: '$82 night',
      image: require('@/assets/images/home/list/1.png'),
    },
    {
      id: 2,
      title: 'Khet Khlong Toei, Thailand',
      subTitle: 'Stay with Amm',
      date: 'Feb 1 – 6',
      price: '$82 night',
      image: require('@/assets/images/home/list/1.png'),
    },
    {
      id: 3,
      title: 'Khet Khlong Toei, Thailand',
      subTitle: 'Stay with Amm',
      date: 'Feb 1 – 6',
      price: '$82 night',
      image: require('@/assets/images/home/list/1.png'),
    },
  ]);
  const {
    theme: { text },
  } = useCustomTheme();
  return (
    <ScrollView>
      {list.map((item) => (       
        <Pressable key={item.id}>
          {({ isPressed }) => {
          return (
            <Box
              style={{
                padding: 24,
                transform: [
                  {
                    scale: isPressed ? 0.96 : 1,
                  },
                ],
              }}
            >
              {/* image */}
              <View>
                <Image
                  style={styles.ListImage}
                  source={require('@/assets/images/home/list/1.png')}
                />
              </View>
              {/* title */}
              <View style={styles.ListTitleWrap}>
                <Text
                  style={[styles.ListTitleLeftText, { color: text.primary }]}
                >
                  Khet Khlong Toei, Thailand
                </Text>
                <View style={styles.ListTitleRight}>
                  <Ionicons name="star" size={15} color="black" />
                  <Text
                    style={[
                      styles.ListTitleRightText,
                      { marginLeft: 4, fontWeight: 'normal' },
                    ]}
                  >
                    5.0
                  </Text>
                </View>
              </View>
              <Text
                style={[styles.ListTitleLeftText, { color: text.secondary }]}
              >
                Stay with Amm
              </Text>
              <Text
                style={[
                  styles.ListTitleLeftText,
                  { color: text.secondary, marginTop: 4 },
                ]}
              >
                Feb 1 – 6
              </Text>
              <Text
                style={[
                  styles.ListTitleLeftText,
                  { color: text.primary, marginTop: 8 },
                ]}
              >
                $82 night
              </Text>
            </Box>
          );
        }}
      </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ListImage: {
    width: '100%',
    height: 310,
    borderRadius: 16,
    marginBottom: 12,
  },
  ListTitleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ListTitleRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ListTitleLeftText: {
    fontSize: 15,
    fontWeight: 500,
    fontFamily: 'mon-sb',
  },
  ListTitleRightText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
