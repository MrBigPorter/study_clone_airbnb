import { useCustomTheme } from "@/context/themeContext";
import { useExploreFilterContext } from "@/context/exploreFilterContext";
import { BookingOptionsProps } from "@/types/exploreTypes";
import { useCallback, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import AmenitiesIcon from "./AmenitiesIcon";
import { AmenitiesItemIconProps } from "@/types/exploreTypes";

// Booking options component / 预订选项组件
const BookingOptions = () => {
    const {
      theme: { border, text },
    } = useCustomTheme();
    const { checkedBookingOptions, dispatch } = useExploreFilterContext();
    const [bookingOptions, setBookingOptions] = useState<BookingOptionsProps[]>([
      {
        id: 1,
        name: 'Instant book',
        icon: 'lightning-bolt',
        type: 'MaterialCommunityIcons',
      },
      {
        id: 2,
        name: 'Self check-in',
        icon: 'key',
        type: 'MaterialIcons',
      },
      {
        id: 3,
        name: 'Allow pets',
        icon: 'dog',
        type: 'MaterialCommunityIcons',
      },
    ]);
  
    // Handle booking options press / 处理预订选项点击
    const handleBookingOptionsPress = useCallback(
      (bookingOption: BookingOptionsProps) => {
        let newState = checkedBookingOptions;
        if (newState[bookingOption.name]) {
          delete newState[bookingOption.name];
        } else {
          newState[bookingOption.name] = {
            parent: 'bookingOptions',
            ...bookingOption,
          };
        }
        dispatch({
          type: 'SET_CHECKED_BOOKING_OPTIONS',
          payload: newState,
        });
      },
      []
    );
  
    return (
      <View
        style={[styles.bookingOptionsWrapper, { borderColor: border.default }]}
      >
        {bookingOptions.map((bookingOption) => (
          <Pressable
            onPress={() => handleBookingOptionsPress(bookingOption)}
            style={[
              styles.bookingOptionsItem,
              {
                borderColor: checkedBookingOptions[bookingOption.name]
                  ? border.focus
                  : border.default,
              },
            ]}
            key={bookingOption.name}
          >
            <AmenitiesIcon
              type={bookingOption.type as AmenitiesItemIconProps['type']}
              icon={bookingOption.icon}
            />
            <Text
              style={[styles.bookingOptionsItemTitle, { color: text.primary }]}
            >
              {bookingOption.name}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  const styles = StyleSheet.create({

      bookingOptionsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 24,
      },
      bookingOptionsItem: {
        padding: 8,
        borderWidth: 1,
        minWidth: 110,
        height: 50,
        borderRadius: 100,
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
      },
      bookingOptionsItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'mon-sb',
      },
  });

  export default BookingOptions;