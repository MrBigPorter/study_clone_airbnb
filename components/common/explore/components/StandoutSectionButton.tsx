import { useCustomTheme } from "@/context/themeContext";
import { useExploreFilterContext } from "@/context/exploreFilterContext";
import { useRef } from "react";
import { Animated, View, Text, StyleSheet, Pressable } from "react-native";
import AmenitiesIcon from "./AmenitiesIcon";
import { isNullOrEmpty } from "@/utils";

// Standout section button component / 突出部分按钮组件
const StandoutSectionButton = () => {
    const {
      theme: { text, border },
    } = useCustomTheme();
    const { standoutSection, dispatch } = useExploreFilterContext();
    // Handle standout section button press / 处理突出部分按钮点击
    const handleStandoutSectionButtonPress = (standoutSectionString: string) => {
      dispatch({ type: 'SET_STANDOUT_SECTION', payload: !isNullOrEmpty(standoutSection) ? '' : standoutSectionString});
    };
  
    // Animation value for scale / 缩放动画值
    const scaleAnim = useRef(new Animated.Value(1)).current;
  
    // Handle press in animation / 处理按下动画
    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.8,
        useNativeDriver: true,
      }).start();
    };
  
    // Handle press out animation / 处理松开动画
    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    console.log(standoutSection);
    return (
      <Pressable  
        onPress={() => handleStandoutSectionButtonPress('Guest Favorite')}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={[
            styles.standoutSectionButton,
            { borderColor: standoutSection ? border.focus : border.default },
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <AmenitiesIcon icon="hands" type="FontAwesome5" />
          <View>
            <Text
              style={[
                styles.standoutSectionButtonText,
                { color: text.primary, marginBottom: 4 },
              ]}
            >
              Guest favorite
            </Text>
            <Text
              style={[
                styles.standoutSectionButtonText,
                { color: text.secondary },
              ]}
            >
              The most loved homes on Airbnb
            </Text>
          </View>
        </Animated.View>
      </Pressable>
    );
  };

  const styles = StyleSheet.create({
    standoutSectionButton: {
        padding: 10,
        borderWidth: 1,
        minWidth: 110,
        height: 78,
        borderRadius: 12,
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
      },
      standoutSectionButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'mon-sb',
      },
  });

  export default StandoutSectionButton;