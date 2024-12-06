import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  InputAccessoryView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function SearchHeader() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(255, 255, 255)' }}>
      <View style={styles.container}>
        <View style={styles.actionArea}>
          <TouchableOpacity>
            <View style={styles.inputButton}>
              <Text>View</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionsButton}>
            <Ionicons name="options-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <Text>ScrollView</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 144,
    borderBottomWidth: 1,
    borderColor: 'rgb(176, 176, 176)',
    backgroundColor: 'rgb(255, 255, 255)',
    paddingTop: 14,
  },
  actionArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginLeft: 24,
    marginRight: 24,
  },
  inputButton: {
    width: 277,
    height: 56,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
    shadowOffset: { width: 1, height: 1 },
    borderWidth: 0.5,
    borderColor: '#c2c2c2',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#fff"
  },
  optionsButton: {
    backgroundColor: 'rgb(255, 255, 255)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgb(176, 176, 176)',
  },
});
