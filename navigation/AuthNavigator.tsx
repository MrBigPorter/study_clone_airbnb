import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}