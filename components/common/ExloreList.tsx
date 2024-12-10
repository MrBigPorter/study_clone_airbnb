import Ionicons from '@expo/vector-icons/Ionicons';
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';

export default function ExloreList() {
  return (
    <ScrollView>
      <View style={{ padding: 24 }}>
        {/* image */}
        <View>
          <Image
            style={styles.ListImage}
            source={require('@/assets/images/home/list/1.png')}
          />
        </View>
        {/* title */}
        <View style={styles.ListTitleWrap}>
          <Text style={styles.ListTitleLeftText}>
            Khet Khlong Toei, Thailand
          </Text>
          <View style={styles.ListTitleRight}>
            <Ionicons name="star" size={24} color="black" />
            <Text style={styles.ListTitleRightText}>5.0</Text>
          </View>
        </View>
        <Text style={styles.ListTitleLeftText}>Stay with Amm</Text>
        <Text style={styles.ListTitleLeftText}>Feb 1 – 6</Text>
        <Text style={styles.ListTitleLeftText}>$82 night</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ListImage: {
    width: '100%',
    height: 310,
    borderRadius: 16,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: 'primary.900',
  },
  ListTitleRightText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
