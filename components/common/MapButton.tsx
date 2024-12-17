import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCustomTheme } from '@/context/themeContext';
import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { MapButtonProps } from '@/types/buttonTypes';
/**
 * Map Button Component
 * 地图按钮组件
 *
 * A floating action button that appears when scrolling down and disappears when scrolling up.
 * Used to toggle between list view and map view.
 * 一个在向下滚动时出现、向上滚动时消失的悬浮按钮。
 * 用于在列表视图和地图视图之间切换。
 */
const MapButton = ({ scrollY, onOpen }: MapButtonProps) => {
  const {
    theme: { background, text },
  } = useCustomTheme();

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(100);

  useEffect(() => {
    const shouldShow = scrollY > 50;
    opacity.value = withTiming(shouldShow ? 1 : 0, { duration: 300 });
    translateY.value = withSpring(shouldShow ? 0 : 100, {
      damping: 15,
      stiffness: 150,
    });
  }, [scrollY]);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: -44 }, { translateY: translateY.value }],
    pointerEvents: opacity.value === 0 ? 'none' : 'auto',
  }));

  const handlePress = () => {
    if (onOpen) { 
      onOpen();
    }
  };

  return (
    <Animated.View
      style={[
        styles.mapButton,
        { backgroundColor: background.contrast },
        animatedStyles,
      ]}  
    >
      <TouchableOpacity onPress={handlePress} style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{ color: text.inverse, marginRight: 5 }}>Map</Text>
        <Ionicons name="map" size={24} color={text.inverse} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default MapButton;

// Style definitions for the map button component
// 地图按钮组件的样式定义
const styles = StyleSheet.create({
  mapButton: {
    width: 88,
    height: 40,
    position: 'absolute',
    bottom: 35,
    left: '50%',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
});
