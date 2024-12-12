import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCustomTheme } from '@/context/themeContext';
import { ExploreItemType } from '@/types/exploreTypes';
import { useState } from 'react';

export default function ExploreItem({ item }: { item: ExploreItemType }) {
  const {
    theme: { text },
  } = useCustomTheme();
  const [isPressed, setIsPressed] = useState<Boolean>(false);
  return (
    <TouchableOpacity
      activeOpacity={1}
      delayPressIn={50}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}    
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
        <Text style={[styles.ListTitleLeftText, { color: text.primary }]}>
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
      <Text style={[styles.ListTitleLeftText, { color: text.secondary }]}>
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
    </TouchableOpacity>
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
