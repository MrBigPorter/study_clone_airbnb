import { useCustomTheme } from "@/context/themeContext";
import { useMemo, useState, useCallback } from "react";
import { View, Text, StyleSheet, Platform, Pressable } from "react-native";
import { AmenitiesItemIconProps, AmenitiesItemProps, AmenitiesProps } from "@/types/exploreTypes";
import { useExploreFilterContext } from "@/context/exploreFilterContext";
import AmenitiesIcon from "./AmenitiesIcon";

// Amenities component / 设施组件

const Amenities = () => {
    const {
      theme: { text },
    } = useCustomTheme();
    const { checkedAmenities, dispatch } = useExploreFilterContext();
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
    const handleAmenitiesPress = useCallback(
      (parent: string, amenitiesItem: AmenitiesItemProps) => {
        // Create a new object to avoid mutating state directly
        const newState = { ...checkedAmenities };
        // Toggle the amenity
        if (newState[amenitiesItem.name]) {
          delete newState[amenitiesItem.name];
        } else {
          newState[amenitiesItem.name] = {
            parent: parent,
            ...amenitiesItem,
          };
        }
        dispatch({
          type: 'SET_CHECKED_AMENITIES',
          payload: newState,
        });
      },
      [checkedAmenities]
    );
  
    // Amenities item checkbox active / 设施项目复选框激活
    const amenitiesItemCheckboxActive = useCallback(
      (amenitiesItemName: string) => {
        const amenitiesItem = checkedAmenities[amenitiesItemName];
        if (amenitiesItem) {
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
                <Pressable
                  onPress={() =>
                    handleAmenitiesPress(
                      amenitiesItem.title,
                      amenitiesItemContent
                    )
                  }
                  style={[
                    styles.amenitiesItemCheckbox,
                    amenitiesItemCheckboxActive(amenitiesItemContent.name),
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
                </Pressable>
              ))}
            </View>
          </View>
        ))}
        <Pressable
          onPress={() => {
            setShowMore(!showMore);
          }}
          style={[styles.amenitiesMoreWrapper]}
        >
          <Text style={[styles.amenitiesMore, { color: text.primary }]}>
            Show more
          </Text>
          <AmenitiesIcon
            icon={!showMore ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            type="MaterialIcons"
          />
        </Pressable>
      </View>
    );
  };

  const styles = StyleSheet.create({
    amenitiesList: {},
    amenitiesItemWrapper: {
      marginTop: 34,
    },
    amenitiesItemTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'mon-sb',
      marginBottom: 24,
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

  export default Amenities; 