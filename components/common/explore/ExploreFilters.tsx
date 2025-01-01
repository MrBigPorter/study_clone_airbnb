import { useCustomTheme } from '@/context/themeContext';
import {
  ExploreFiltersPlaceTypesProps,
  ExploreFiltersTitleProps,
} from '@/types/exploreTypes';
import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  TextStyle,
  ScrollView,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { PriceRangeSlider } from './PriceRangeSlider';
import { useExploreFilterContext } from '@/context/exploreFilterContext';
import SelectArea from './components/SelectArea';
import BedsBathrooms from './components/BedsBathrooms';
import Amenities from './components/Amenities';
import BookingOptions from './components/BookingOptions';
import StandoutSectionButton from './components/StandoutSectionButton';
import FilterBottom from './components/FilterBottom';
import BottomBar from './components/BottomBar';
import { isNullOrEmpty } from '@/utils';
export default function ExploreFilters({ onClose }: { onClose: () => void }) {
  const {
    bedsBathroomsInfo,
    cacheFilter,
    priceRange,
    dispatch,
  } = useExploreFilterContext();

  const {
    theme: { text, border },
  } = useCustomTheme();

  const [placeTypes] = useState<ExploreFiltersPlaceTypesProps[]>([
    { id: 1, name: 'Any type', index: 0 },
    { id: 2, name: 'Room', index: 1 },
    { id: 3, name: 'Entire home', index: 2 },
  ]);

  const [currentPlaceType, setCurrentPlaceType] =
    useState<ExploreFiltersPlaceTypesProps>(placeTypes[0]);

  const [placeTypeStyles, setPlaceTypeStyles] = useState<
    Array<{ width: number; offsetLeft: number }>
  >([]);

  const [slideAnim] = useState(new Animated.Value(0));
  const [widthAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (placeTypeStyles.length === 0) return;

    scaleAnim.setValue(1);
    const { offsetLeft, width } = placeTypeStyles[currentPlaceType.index];

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.08,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: offsetLeft,
          useNativeDriver: false,
          bounciness: 8,
          speed: 12,
        }),
        Animated.spring(widthAnim, {
          toValue: width,
          useNativeDriver: false,
          bounciness: 8,
          speed: 12,
        }),
      ]),
    ]).start();
  }, [currentPlaceType, placeTypeStyles]);

  const handlePlaceTypePress = useCallback(
    (placeType: ExploreFiltersPlaceTypesProps) => {
      setCurrentPlaceType(placeType);
    },
    []
  );

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
      <ScrollView
        style={{ flex: 1, width: '100%', padding: 34 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
      >
        <SelectArea newList={cacheFilter} />
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
        <View
          style={[styles.filterMiddle, { borderBottomColor: border.default }]}
        >
          {itemTitle({ name: 'Price range', style: { marginBottom: 4 } })}
          <Text style={[styles.priceRangeText, { color: text.secondary }]}>
            Nightly prices before fees and taxes
          </Text>
          <PriceRangeSlider
            value={priceRange}
            onPriceChange={({ leftPrice, rightPrice }) =>
              dispatch({
                type: 'SET_PRICE_RANGE',
                payload: { leftPrice, rightPrice },
              })
            }
          />
        </View>
        <View
          style={[
            styles.filterBedsBathroomsSection,
            { borderBottomColor: border.default },
          ]}
        >
          {itemTitle({
            name: 'Beds and bathrooms',
            style: { marginBottom: 4 },
          })}
          <BedsBathrooms
            title="Bedrooms"
            maxNumber={10}
            minNumber={0}
            value={bedsBathroomsInfo.bedrooms}
            onChange={(value) =>
              dispatch({
                type: 'SET_BEDS_BATHROOMS',
                payload: { ...bedsBathroomsInfo, bedrooms: value },
              })
            }
          />
          <BedsBathrooms
            title="Beds"
            maxNumber={10}
            minNumber={0}
            value={bedsBathroomsInfo.beds}
            onChange={(value) =>
              dispatch({
                type: 'SET_BEDS_BATHROOMS',
                payload: { ...bedsBathroomsInfo, beds: value },
              })
            }
          />
          <BedsBathrooms
            title="Bathrooms"
            maxNumber={10}
            minNumber={0}
            value={bedsBathroomsInfo.bathrooms}
            onChange={(value) =>
              dispatch({
                type: 'SET_BEDS_BATHROOMS',
                payload: { ...bedsBathroomsInfo, bathrooms: value },
              })
            }
          />
        </View>

        <View
          style={[
            styles.amenitiesSection,
            { borderBottomColor: border.default },
          ]}
        >
          {itemTitle({ name: 'Amenities', style: { marginBottom: 4 } })}
          <Amenities />
        </View>

        <View
          style={[styles.bookingOptions, { borderBottomColor: border.default }]}
        >
          {itemTitle({ name: 'Booking options', style: { marginBottom: 4 } })}
          <BookingOptions />
        </View>

        <View
          style={[
            styles.standoutSection,
            { borderBottomColor: border.default },
          ]}
        >
          {itemTitle({ name: 'Standout stays', style: { marginBottom: 16 } })}
          <StandoutSectionButton />
        </View>
        <FilterBottom />
      </ScrollView>
      <BottomBar onClose={onClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  filterTop: {
    paddingBottom: 32,
    borderBottomWidth: 1,
    marginBottom: 32,
  },
  itemTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  placeType: {
    height: 54,
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
    borderRightWidth: 0,
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
    marginBottom: 32,
    borderBottomWidth: 1,
    paddingBottom: 32,
  },
  amenitiesSection: {
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 32,
    borderBottomWidth: 1,
  },
  standoutSection: {
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 32,
    borderBottomWidth: 1,
  },
  
  bookingOptions: {
    marginTop: 10,
    marginBottom: 32,
    paddingBottom: 32,
    borderBottomWidth: 1,
  },
});
