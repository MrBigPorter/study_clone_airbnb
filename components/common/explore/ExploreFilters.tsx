import { useCustomTheme } from '@/context/themeContext';
import {
  AmenitiesProps,
  ExploreFiltersBedsBathroomsOnChangeProps,
  ExploreFiltersBedsBathroomsProps,
  ExploreFiltersPlaceTypesProps,
  ExploreFiltersTitleProps,
  AmenitiesItemIconProps,
  AmenitiesItemProps,
} from '@/types/exploreTypes';
import { useCallback, useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  TextStyle,
  Platform,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { PriceRangeSlider } from './PriceRangeSlider';
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
  Ionicons,
  FontAwesome5,
} from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
export default function ExploreFilters() {
  // State for beds and bathrooms information / 床和浴室信息状态
  const [bedsBathroomsInfo, setBedsBathroomsInfo] =
    useState<ExploreFiltersBedsBathroomsProps>({
      bedrooms: 0,
      beds: 0,
      bathrooms: 0,
    });

  // Theme colors / 主题颜色
  const {
    theme: { text, border },
  } = useCustomTheme();

  // Place types data / 地点类型数据
  const [placeTypes] = useState<ExploreFiltersPlaceTypesProps[]>([
    { id: 1, name: 'Any type', index: 0 },
    { id: 2, name: 'Room', index: 1 },
    { id: 3, name: 'Entire home', index: 2 },
  ]);

  // Current place type / 当前地点类型
  const [currentPlaceType, setCurrentPlaceType] =
    useState<ExploreFiltersPlaceTypesProps>(placeTypes[0]);
  // Place type styles / 地点类型样式
  const [placeTypeStyles, setPlaceTypeStyles] = useState<
    Array<{ width: number; offsetLeft: number }>
  >([]);
  // Slide animation / 滑动动画
  const [slideAnim] = useState(new Animated.Value(0));
  // Width animation / 宽度动画
  const [widthAnim] = useState(new Animated.Value(0));
  // Scale animation / 缩放动画
  const [scaleAnim] = useState(new Animated.Value(1));

  // Animation effects / 动画效果
  useEffect(() => {
    // If there are no place type styles, return / 如果没有地点类型样式，返回
    if (placeTypeStyles.length === 0) return;

    // Set the scale animation to 1 / 将缩放动画设置为1
    scaleAnim.setValue(1);
    // Get the offset left and width from the place type styles / 从地点类型样式中获取偏移左和宽度
    const { offsetLeft, width } = placeTypeStyles[currentPlaceType.index];

    Animated.sequence([
      // Scale up animation / 放大动画
      Animated.timing(scaleAnim, {
        toValue: 1.08,
        duration: 100,
        useNativeDriver: false,
      }),
      // Scale down animation / 缩小动画
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.parallel([
        // Slide animation / 滑动动画
        Animated.spring(slideAnim, {
          toValue: offsetLeft,
          useNativeDriver: false,
          bounciness: 8,
          speed: 12,
        }),
        // Width animation / 宽度动画
        Animated.spring(widthAnim, {
          toValue: width,
          useNativeDriver: false,
          bounciness: 8,
          speed: 12,
        }),
      ]),
    ]).start();
  }, [currentPlaceType, placeTypeStyles]);

  // Handle place type selection / 处理地点类型选择
  const handlePlaceTypePress = useCallback(
    (placeType: ExploreFiltersPlaceTypesProps) => {
      setCurrentPlaceType(placeType);
    },
    []
  );

  // Calculate place type item styles / 计算地点类型项目样式
  const usePlaceTypeStyles = (
    index: number,
    placeType: ExploreFiltersPlaceTypesProps,
    currentPlaceType: ExploreFiltersPlaceTypesProps,
    placeTypes: ExploreFiltersPlaceTypesProps[]
  ) => {
    return useMemo(() => {
      const isLastItem = index === placeTypes.length - 1;
      const isActive = currentPlaceType.id === placeType.id;
      return {
        ...styles.placeTypeItem,
        ...(!isActive && isLastItem && { borderRightWidth: 0 }),
        ...(!isActive && { borderRightColor: border.default }),
        ...(isActive && styles.placeTypeInactive),
      };
    }, [
      index,
      currentPlaceType.id,
      placeType.id,
      placeTypes.length,
      border.default,
    ]);
  };

  // Place type item component / 地点类型项目组件
  const PlaceTypeItem = useCallback(
    ({
      index,
      placeType,
      currentPlaceType,
      placeTypes,
    }: {
      index: number;
      placeType: ExploreFiltersPlaceTypesProps;
      currentPlaceType: ExploreFiltersPlaceTypesProps;
      placeTypes: ExploreFiltersPlaceTypesProps[];
    }) => {
      const itemStyle = usePlaceTypeStyles(
        index,
        placeType,
        currentPlaceType,
        placeTypes
      );

      // Handle layout measurement / 处理布局测量
      const handleLayout = useCallback(({ nativeEvent }: any) => {
        const { width, x } = nativeEvent.layout;
        setPlaceTypeStyles((prev) => [...prev, { width, offsetLeft: x }]);
      }, []);

      return (
        <Pressable
          key={placeType.id}
          style={itemStyle}
          onPress={() => handlePlaceTypePress(placeType)}
          onLayout={handleLayout}
        >
          <Text style={[styles.placeTypeItemText, { color: text.primary }]}>
            {placeType.name}
          </Text>
        </Pressable>
      );
    },
    []
  );

  // Item title component / 项目标题组件
  const itemTitle = ({ name, style = null }: ExploreFiltersTitleProps) => {
    return (
      <Text
        style={[
          styles.itemTitleText,
          { color: text.primary },
          style as TextStyle,
        ]}
      >
        {name}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {/* Filter top section / 过滤器顶部部分 */}
      <View style={[styles.filterTop, { borderBottomColor: border.default }]}>
        {itemTitle({ name: 'Type of place' })}
        <View style={[styles.placeType, { borderColor: border.default }]}>
          {placeTypes.map((placeType, index) => (
            <PlaceTypeItem
              key={placeType.id}
              index={index}
              placeType={placeType}
              currentPlaceType={currentPlaceType}
              placeTypes={placeTypes}
            />
          ))}
          {/* Animated selection indicator / 动画选择指示器 */}
          <Animated.View
            style={[
              styles.placeTypeInactiveStatus,
              {
                width: widthAnim,
                borderColor: border.focus,
                left: slideAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          />
        </View>
      </View>
      {/* Filter middle section / 过滤器中间部分 */}
      <View
        style={[styles.filterMiddle, { borderBottomColor: border.default }]}
      >
        {itemTitle({ name: 'Price range', style: { marginBottom: 4 } })}
        <Text style={[styles.priceRangeText, { color: text.secondary }]}>
          Nightly prices before fees and taxes
        </Text>
        <PriceRangeSlider />
      </View>
      {/* Filter Beds and Bathrooms section / 过滤器床和浴室部分 */}
      <View
        style={[
          styles.filterBedsBathroomsSection,
          { borderBottomColor: border.default },
        ]}
      >
        {itemTitle({ name: 'Beds and bathrooms', style: { marginBottom: 4 } })}
        <BedsBathrooms
          title="Bedrooms"
          maxNumber={10}
          minNumber={0}
          onChange={(value) =>
            setBedsBathroomsInfo((prev) => ({ ...prev, bedrooms: value }))
          }
        />
        <BedsBathrooms
          title="Beds"
          maxNumber={10}
          minNumber={0}
          onChange={(value) =>
            setBedsBathroomsInfo((prev) => ({ ...prev, beds: value }))
          }
        />
        <BedsBathrooms
          title="Bathrooms"
          maxNumber={10}
          minNumber={0}
          onChange={(value) =>
            setBedsBathroomsInfo((prev) => ({ ...prev, bathrooms: value }))
          }
        />
      </View>

      <View style={styles.amenitiesSection}>
        {itemTitle({ name: 'Amenities', style: { marginBottom: 4 } })}
        <Amenities />
      </View>
    </View>
  );
}

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
  // Check if the count is at the minimum / 检查计数是否在最小值
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

// Amenities component / 设施组件
const Amenities = () => {
  const {
    theme: { text },
  } = useCustomTheme();

  const [amenities, setAmenities] = useState<AmenitiesProps[]>([
    {
      title: 'Essentials',
      items: [
        {
          id: 1,
          name: 'Washer',
          icon: 'washing-machine',
          type: 'MaterialCommunityIcons',
        },
        {
          id: 2,
          name: 'Wifi',
          icon: 'wifi',
          type: 'MaterialCommunityIcons',
        },
        {
          id: 3,
          name: 'TV',
          icon: 'tv',
          type: 'Entypo',
        },
        {
          id: 4,
          name: 'Heating',
          icon: 'fire',
          type: 'MaterialCommunityIcons',
        },
        {
          id: 5,
          name: 'Air conditioning',
          icon: 'air-conditioner',
          type: 'MaterialCommunityIcons',
        },
        {
          id: 6,
          name: 'Kitchen',
          icon: 'kitchen',
          type: 'MaterialIcons',
        },
        {
          id: 7,
          name: 'Iron',
          icon: 'iron',
          type: 'MaterialCommunityIcons',
        },
      ],
    },
    {
      title: 'Features',
      items: [
        {
          id: 1,
          name: 'Pool',
          icon: 'pool',
          type: 'MaterialCommunityIcons',
        },
        {
          id: 2,
          name: 'Hot tub',
          icon: 'hot-tub',
          type: 'MaterialCommunityIcons',
        },
        {
          id: 3,
          name: 'Gym',
          icon: 'sports-gymnastics',
          type: 'MaterialIcons',
        },
        {
          id: 4,
          name: 'Parking',
          icon: 'parking',
          type: 'MaterialCommunityIcons',
        },
        {
          id: 5,
          name: 'Smoking allowed',
          icon: 'smoking',
          type: 'MaterialCommunityIcons',
        },
        {
          id: 6,
          name: 'Breakfast',
          icon: 'free-breakfast',
          type: 'MaterialIcons',
        },
      ],
    },
    {
      title: 'Location',
      items: [
        {
          id: 1,
          name: 'Near the beach',
          icon: 'beach',
          type: 'MaterialCommunityIcons',
        },
        {
          id: 2,
          name: 'Waterfront',
          icon: 'water',
          type: 'FontAwesome5',
        },
      ],
    },
    {
      title: 'Safety',
      items: [
        {
          id: 1,
          name: 'Smoke alarm',
          icon: 'smoke-detector-variant',
          type: 'MaterialCommunityIcons',
        },

        {
          id: 2,
          name: 'Carbon monoxide alarm',
          icon: 'smoke-detector-outline',
          type: 'MaterialCommunityIcons',
        },
      ],
    },
  ]);

  // State for showing more amenities / 显示更多设施状态
  const [showMore, setShowMore] = useState<boolean>(false);
  // First Record<string, ...> represents amenities categories (e.g. "Location", "Safety") as keys
  // Second Record<string, ...> represents amenity names (e.g. "Near the beach", "Smoke alarm") as keys mapping to their properties
  const [checkedAmenities, setCheckedAmenities] = useState<
    Record<string, Record<string, Partial<AmenitiesItemProps>>>
  >({});

  const {
    theme: { border },
  } = useCustomTheme();

  // Filtered amenities / 过滤设施
  const filteredAmenities = useMemo(() => {
    if (!showMore) {
      return amenities.slice(0, 1);
    }
    return amenities;
  }, [showMore]);

  // Handle amenities press / 处理设施项目复选框点击
  const handleAmenitiesPress = (
    amenitiesItemTitle: string,
    amenitiesItem: AmenitiesItemProps
  ) => {
    setCheckedAmenities((prev) => {
      const updatedAmenities = prev[amenitiesItemTitle] || {};
      if (updatedAmenities[amenitiesItem.name]) {
        delete updatedAmenities[amenitiesItem.name];
      } else {
        updatedAmenities[amenitiesItem.name] = amenitiesItem;
      }
      if (Object.keys(updatedAmenities).length === 0) {
        delete prev[amenitiesItemTitle];
      }
      return {
        ...prev,
        [amenitiesItemTitle]: updatedAmenities,
      };
    });
  };

  // Amenities item checkbox active / 设施项目复选框激活
  const amenitiesItemCheckboxActive = useCallback(
    (amenitiesItemTitle: string, amenitiesItemName: string) => {
      const amenitiesItem = checkedAmenities[amenitiesItemTitle];
      if (amenitiesItem && amenitiesItem[amenitiesItemName]) {
        return { borderColor: text.primary };
      }
      return { borderColor: border.default };
    },
    [checkedAmenities]
  );

  return (
    <View style={styles.amenitiesList}>
      {filteredAmenities.map((amenitiesItem) => (
        <View key={amenitiesItem.title} style={styles.amenitiesItemWrapper}>
          <Text style={[styles.amenitiesItemTitle, { color: text.primary }]}>
            {amenitiesItem.title}
          </Text>
          <View style={styles.amenitiesItem}>
            {amenitiesItem.items.map((amenitiesItemContent) => (
              <TouchableWithoutFeedback
                onPress={() =>
                  handleAmenitiesPress(
                    amenitiesItem.title,
                    amenitiesItemContent
                  )
                }
                style={[
                  styles.amenitiesItemCheckbox,
                  amenitiesItemCheckboxActive(
                    amenitiesItem.title,
                    amenitiesItemContent.name
                  ),
                ]}
                key={amenitiesItemContent.name}
              >
                <AmenitiesIcon
                  type={
                    amenitiesItemContent.type as AmenitiesItemIconProps['type']
                  }
                  icon={amenitiesItemContent.icon}
                />
                <Text
                  style={[styles.amenitiesItemText, { color: text.primary }]}
                >
                  {amenitiesItemContent.name}
                </Text>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>
      ))}
      <TouchableWithoutFeedback
        onPress={() => {
          setShowMore(!showMore);
        }}
        style={styles.amenitiesMoreWrapper}
      >
        <Text style={[styles.amenitiesMore, { color: text.primary }]}>
          Show more
        </Text>
        <AmenitiesIcon
          icon={!showMore ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          type="MaterialIcons"
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

// Amenities icon component / 设施图标组件
const AmenitiesIcon = ({
  icon,
  size = 32,
  color = '#000',
  type = 'MaterialCommunityIcons',
}: Partial<AmenitiesItemIconProps>) => {
  const IconComponents: Record<
    AmenitiesItemIconProps['type'],
    | typeof MaterialCommunityIcons
    | typeof MaterialIcons
    | typeof Entypo
    | typeof FontAwesome5
  > = {
    MaterialCommunityIcons,
    MaterialIcons,
    Entypo,
    FontAwesome5,
  };

  const IconComponent = IconComponents[type];

  if (!icon) {
    return null;
  }

  return <IconComponent name={icon as any} size={size} color={color} />;
};

// Styles / 样式
const styles = StyleSheet.create({
  container: {
    padding: 34, // Container padding / 容器内边距
  },
  filterTop: {
    paddingBottom: 32, // Top section bottom padding / 顶部部分底部内边距
    borderBottomWidth: 1,
    marginBottom: 32,
  },
  itemTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 32, // Text bottom margin / 文本底部外边距
  },
  placeType: {
    height: 54, // Place type container height / 地点类型容器高度
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    padding: 4,
    flexDirection: 'row',
    gap: 4,
    position: 'relative',
  },
  placeTypeItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    height: '100%',
    boxSizing: 'border-box',
  },
  placeTypeInactive: {
    borderRightWidth: 0, // Remove right border for inactive state / 移除非活动状态的右边框
  },
  placeTypeBorderInactive: {
    borderRightWidth: 0,
  },
  placeTypeInactiveStatus: {
    borderWidth: 1,
    borderRadius: 12,
    position: 'absolute',
    right: 0,
    top: 4.4,
    height: '98%',
  },
  placeTypeItemText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
    textAlign: 'center',
  },
  filterMiddle: {
    paddingBottom: 32,
    marginBottom: 32,
    borderBottomWidth: 1,
  },
  priceRangeText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
    marginBottom: 24,
  },
  filterBedsBathroomsSection: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 32,
  },
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
  amenitiesSection: {
    marginTop: 10,
    marginBottom: 10,
  },
  amenitiesList: {},
  amenitiesItemWrapper: {
    marginTop: 34,
  },
  amenitiesItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
    marginBottom: 12,
  },
  amenitiesItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  amenitiesItemCheckbox: {
    minWidth: 100,
    height: 50,
    borderWidth: Platform.OS === 'ios' ? 1 : 1.6,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
    paddingHorizontal: 15,
  },
  amenitiesItemText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
  },
  amenitiesMoreWrapper: {
    marginTop: 44,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  amenitiesMore: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
    textDecorationLine: 'underline',
  },
});
