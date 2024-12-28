import { useCustomTheme } from "@/context/themeContext";
import { useMemo, useState, useCallback } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ExploreFiltersBedsBathroomsOnChangeProps } from "@/types/exploreTypes";

// Beds and bathrooms component / 床和浴室组件
// This component handles the beds and bathrooms selection UI / 该组件处理床和浴室选择的用户界面
// It allows users to increment/decrement the count within min/max bounds / 允许用户在最小/最大范围内增加/减少数量
const BedsBathrooms = ({
  title,
  maxNumber,
  minNumber,
  onChange,
}: ExploreFiltersBedsBathroomsOnChangeProps) => {
  const {
    theme: { text },  
  } = useCustomTheme();

  // State for the count / 计数状态
  const [count, setCount] = useState<number>(0);

  // Check if the count is any / 检查计数是否为任何
  const isAny = count === 0;
  // Check if the count is at the minimum / 检查计数���否在最小值
  const isAtMin = count <= minNumber;
  // Check if the count is at the maximum / 检查计数是否在最大值
  const isAtMax = count >= maxNumber;

  // Left icon color / 左图标颜色
  const leftIconColor = useMemo(
    () => (isAtMin ? text.disabled : text.secondary),
    [isAtMin, text.disabled, text.secondary]
  );

  // Right icon color / 右图标颜色
  const rightIconColor = useMemo(
    () => (isAtMax ? text.disabled : text.secondary),
    [isAtMax, text.disabled, text.secondary]
  );

  // Increment the count / 增加数量
  const handleIncrement = useCallback(() => {
    if (!isAtMax) {
      setCount((prev) => prev + 1);
      onChange(count + 1);
    }
  }, [isAtMax, onChange]);

  // Decrement the count / 减少数量
  const handleDecrement = useCallback(() => {
    if (!isAtMin) {
      setCount((prev) => prev - 1);
      onChange(count - 1);
    }
  }, [isAtMin, onChange]);

  // Controls object / 控制对象
  // It contains the state and actions for the beds and bathrooms selection / 包含床和浴室选择的状态和操作
  const controls = {
    isAny,
    leftIconColor,
    rightIconColor,
    add: handleIncrement,
    remove: handleDecrement,
  };
  return (
    <View style={styles.bedsBathrooms}>
      <Text style={[styles.bedsBathroomsTitle, { color: text.tertiary }]}>
        {title}
      </Text>
      <View style={styles.bedsBathroomsItem}>
        <Pressable onPress={() => controls.remove()}>
          <Ionicons
            name="remove-circle-outline"
            size={32}
            color={controls.leftIconColor}
          />
        </Pressable>
        <Text style={[styles.roomNumberText, { color: text.primary }]}>
          {controls.isAny ? 'Any' : `${count}+`}
        </Text>
        <Pressable onPress={() => controls.add()}>
          <Ionicons
            name="add-circle-outline"
            size={32}
            color={controls.rightIconColor}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default BedsBathrooms;   

const styles = StyleSheet.create({
  bedsBathrooms: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    marginTop: 10,
    marginBottom: 10,
  },
  bedsBathroomsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
  },
  bedsBathroomsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  roomNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
  },
});