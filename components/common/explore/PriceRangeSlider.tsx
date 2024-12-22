// 价格范围滑块组件 - 用于选择价格区间
// Price Range Slider Component - Used for selecting price range
import { useCustomTheme } from '@/context/themeContext';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Animated, PanResponder, Text, Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


export const PriceRangeSlider = () => {
  // 使用主题上下文获取背景和边框颜色
  // Use theme context to get background and border colors
  const {
    theme: { background, border,text },
  } = useCustomTheme();

  // 直方图数据 - 展示价格分布情况
  // Histogram data - Shows price distribution
  const histogram = [
    4, 6, 8, 12, 16, 20, 18, 14, 10, 8, 6, 4, 3, 2, 2, 1, 1, 1, 1, 1,
  ];

  // 滑块宽度和滑动条宽度的状态管理
  // State management for thumb width and slider width
  const [thumbWidth, setThumbWidth] = useState<number>(0);
  const [sliderWidth, setSliderWidth] = useState<number>(0);


  // 左右滑块的位置动画值
  // Animated values for left and right thumb positions
  const leftThumbX = useRef(new Animated.Value(0)).current;
  const rightThumbX = useRef(new Animated.Value(0)).current;

  // 总步数等于直方图长度
  // Total steps equals histogram length
  const TOTAL_STEP = histogram.length;

  // 价格范围的最小值和最大值
  // Minimum and maximum values for price range
  const MIN_PRICE = 0;
  const MAX_PRICE = 1000;
  // 最小价格间隔，防止左右滑块重叠
  // Minimum price gap to prevent thumb overlap
  const MIN_PRICE_GAP = 10;
  const [leftPrice, setLeftPrice] = useState(MIN_PRICE);
  const [rightPrice, setRightPrice] = useState(MAX_PRICE);

  // 创建滑动响应器 - 处理滑块的拖动事件
  // Create pan responder - Handle thumb drag events
  const createPanResponder = useCallback(
    (isLeft: boolean) => {
      return PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
          const value = isLeft ? leftThumbX : rightThumbX;
          const x = gestureState.moveX;
          const thumbW = thumbWidth + thumbWidth / 2;

          let newValue;
          if (isLeft) {
            // 左滑块移动逻辑 - 限制移动范围并计算价格
            // Left thumb movement logic - Limit range and calculate price
            newValue = Math.min(
              Math.max(0, x - thumbW),
              sliderWidth - thumbWidth
            );

            const stepSize = (sliderWidth - thumbWidth) / TOTAL_STEP;
            const steps = Math.round(newValue / stepSize);
            const snappedValue = steps * stepSize;
            
            // 计算对应的价格值
            // Calculate corresponding price value
            const priceRange = MAX_PRICE - MIN_PRICE;
            const price = MIN_PRICE + (steps / TOTAL_STEP) * priceRange;
            const newLeftPrice = Math.round(price);

            // 确保与右价格保持最小间距
            // Ensure minimum gap with right price
            if (newLeftPrice <= rightPrice - MIN_PRICE_GAP) {
              setLeftPrice(newLeftPrice);
              value.setValue(snappedValue);
            }
          } else {
            // 右滑块移动逻辑 - 限制移动范围并计算价格
            // Right thumb movement logic - Limit range and calculate price
            newValue = Math.min(
              sliderWidth - thumbWidth,
              Math.max(0, sliderWidth - gestureState.moveX)
            );

            const stepSize = (sliderWidth - thumbWidth) / TOTAL_STEP;
            const steps = Math.round(newValue / stepSize);
            const snappedValue = steps * stepSize;
            
            // 计算对应的价格值
            // Calculate corresponding price value
            const priceRange = MAX_PRICE - MIN_PRICE;
            const price = MIN_PRICE + (steps / TOTAL_STEP) * priceRange;
            const newRightPrice = Math.round(MAX_PRICE - price);

            // 确保与左价格保持最小间距
            // Ensure minimum gap with left price
            if (newRightPrice >= leftPrice + MIN_PRICE_GAP) {
              setRightPrice(newRightPrice);
              value.setValue(snappedValue);
            }
          }
        },
      });
    },
    [thumbWidth, sliderWidth, leftThumbX, rightThumbX]
  );

  // 创建左右滑块的响应器实例
  // Create pan responder instances for both thumbs
  const leftPanResponder = createPanResponder(true);
  const rightPanResponder = createPanResponder(false);

  // 计算每个柱状图是否在选中范围内
  // Calculate if each histogram bar is within selected range
  const isBarSelected = (index: number) => {
    const barPrice = MIN_PRICE + (index / TOTAL_STEP) * (MAX_PRICE - MIN_PRICE);
    return barPrice >= leftPrice && barPrice <= rightPrice;
  };
  
  // 处理价格输入
  // Handle price input
  const handlePriceInput = useCallback(({value,isLeft}:{value:string,isLeft:boolean}) => {
    const price = parseInt(value)||0;
    if(isLeft){
      if(price<rightPrice -  MIN_PRICE_GAP){
        setLeftPrice(price);
        updateThumbPositions(price,rightPrice);
      }
    }else{
      if(price>leftPrice + MIN_PRICE_GAP){
        setRightPrice(price);
        updateThumbPositions(leftPrice,price);
      }
    } 

    },[leftPrice,rightPrice])

    // 处理左滑块价格输入
    // Handle left thumb price input  
    const handleLeftPriceInput = useCallback((value:string)=>{
      handlePriceInput({value,isLeft:true});
    },[handlePriceInput]) 

    const handleRightPriceInput = useCallback((value:string)=>{
      handlePriceInput({value,isLeft:false});
    },[handlePriceInput])
    



  // 更新滑块位置
  // Update thumb positions
  const updateThumbPositions = useCallback((leftPrice:number,rightPrice:number) => {
    const sliderRange = sliderWidth - thumbWidth;
    const leftPosition = (leftPrice / MAX_PRICE) * sliderRange;
    const rightPosition = ((MAX_PRICE - rightPrice) / MAX_PRICE) * sliderRange;
    leftThumbX.setValue(leftPosition);
    rightThumbX.setValue(rightPosition);
   },[sliderWidth,thumbWidth,MAX_PRICE])

 
  return (
    <View>
      {/* 直方图容器 - 显示价格分布 
          Histogram container - Shows price distribution */}
      <View style={styles.histogramContainer}>
        {histogram.map((height, index) => (
          <View
            key={index}
            style={{
              width: 6,
              height: height * 3,
              backgroundColor: isBarSelected(index)
                ? '#e31c5f'  // 选中状态颜色 Selected state color
                : background.tertiary, // 未选中状态颜色 Unselected state color
              borderRadius: 2,
              opacity: isBarSelected(index) ? 1 : 0.3,
            }}
          />
        ))}
      </View>

      {/* 滑动条容器 Slider container */}
      <View style={[styles.sliderContainer]}>
        <View
          style={[styles.slider]}
          onLayout={(e) => {
            setSliderWidth(e.nativeEvent.layout.width);
          }}
        ></View>
        {/* 左滑块 Left thumb */}
        <Animated.View
          onLayout={(e) => {
            setThumbWidth(e.nativeEvent.layout.width);
          }}
          style={[
            styles.thumb,
            {
              backgroundColor: background.default,
              borderColor: border.default,
              left: leftThumbX,
            },
          ]}
          {...leftPanResponder.panHandlers}
        ></Animated.View>
        {/* 右滑块 Right thumb */}
        <Animated.View
          style={[
            styles.thumb,
            {
              backgroundColor: background.default,
              borderColor: border.default,
              right: rightThumbX,
            },
          ]}
          {...rightPanResponder.panHandlers}
        ></Animated.View>
      </View>
      {/* 价格范围选择器 Price range selector */}
      <View style={styles.priceMinMaxContainer}>
          <PriceInputItem onChange={handleLeftPriceInput} value={leftPrice.toString()} title='Minimum' />
          <PriceInputItem onChange={handleRightPriceInput} value={rightPrice.toString()} title='Maximum' />
      </View> 
    </View>
  );
};

// 价格输入框组件 - 用于输入价格
// Price input box component - Used for inputting price
// PriceInputItem组件 - 用于输入最小和最大价格
// PriceInputItem component - Used for inputting minimum and maximum prices
// 参数说明:
// Parameters:
// value: string - 当前输入框的值 Current input value
// onChange: (text:string)=>void - 值改变时的回调函数 Callback when value changes
// title: string - 输入框标题(Minimum/Maximum) Input title (Minimum/Maximum)

const PriceInputItem = ({
  value,
  onChange,
  title
}: {
  value: string;
  onChange: (text: string) => void;
  title: string;
}) => {
  const {
    theme: { border, text },
  } = useCustomTheme();

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const containerStyle = useMemo(() => ({
    ...styles.priceMinMaxInputContainer,
    ...(Platform.OS === 'android' && { borderWidth: 2 })
  }), []);

  return (
    <View style={styles.priceMinMaxItem}>
      <Text style={[styles.priceMinMaxText, { color: text.secondary }]}>
        {title}
      </Text>
      <View 
        style={[
          containerStyle,
          { borderColor: isFocused ? border.focus : border.default }
        ]}
      >
        <Text style={[styles.dollarSign, { color: text.tertiary }]}>$</Text>
        <TextInput
          style={[styles.priceMinMaxTextInput, { color: text.tertiary }]}
          value={value}
          onChangeText={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={Platform.select({
            ios: 'number-pad',
            android: 'numeric'
          })}
          returnKeyType="done"
          enablesReturnKeyAutomatically
        />
      </View>
    </View>
  );
};


// 样式定义 Style definitions
const styles = StyleSheet.create({
  // 直方图容器样式 - 控制柱状图的布局
  // Histogram container styles - Controls bar chart layout
  histogramContainer: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  // 滑动条容器样式 - 控制整个滑动条的位置和大小
  // Slider container styles - Controls slider position and size
  sliderContainer: {
    height: 32,
    marginBottom: 10,
    position: 'relative',
    top: -15,
  },
  // 滑动条轨道样式 - 控制滑动条的外观
  // Slider track styles - Controls slider track appearance
  slider: {
    height: 1,
    backgroundColor: '#e31c5f',
    borderRadius: 10,
    opacity: 0.3,
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
  },
  // 滑块样式 - 控制可拖动圆点的外观
  // Thumb styles - Controls draggable thumb appearance
  thumb: {
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: '#e31c5f',
    position: 'absolute',
    top: 0,
    borderWidth: 1,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // 价格文本样式
  // Price text styles
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  priceMinMaxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  priceMinMaxItem: {
    minWidth: 84,
    display: 'flex',
  },
  priceMinMaxText: {
    fontSize: 12,
    fontFamily: 'mon-sb',
    marginBottom: 8,
    textAlign: 'center',
  },
  priceMinMaxInputContainer: {
    height: 48,
    borderWidth:Platform.select({ios:1,android:2})  ,
    borderRadius: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:16,
    flexDirection: 'row',
  },
  dollarSign: {
    fontSize: 14,
    fontFamily: 'mon-sb',
  },
  priceMinMaxTextInput: {
    fontSize: 14,
    fontFamily: 'mon-sb',
  },
});
