import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ExploreFiltersBedsBathroomsProps,
  PriceRange,
  AmenitiesCheckedProps,
  BookingOptionsCheckedProps,
  SelectedFilterBottomProps,
  ExploreFiltersAccessibilityFeaturesCheckedProps,
  ExploreFiltersCacheProps
} from '@/types/exploreTypes';
import {
  createContext,
  ReactNode,
  useReducer,
  useEffect,
  useContext,
} from 'react';

interface ExploreFilterContextType {
  bedsBathroomsInfo: ExploreFiltersBedsBathroomsProps;
  priceRange: PriceRange;
  checkedAmenities: AmenitiesCheckedProps;
  checkedBookingOptions: BookingOptionsCheckedProps;
  standoutSection: string;
  selectedPropertyTypes: SelectedFilterBottomProps;
  selectedAccessibilityFeatures: ExploreFiltersAccessibilityFeaturesCheckedProps;
  cacheFilter: ExploreFiltersCacheProps[];
  dispatch: React.Dispatch<ExploreFilterAction>;
}

type ExploreFilterAction =
  | { type: 'SET_BEDS_BATHROOMS'; payload: ExploreFiltersBedsBathroomsProps }
  | { type: 'SET_PRICE_RANGE'; payload: PriceRange }
  | { type: 'SET_CHECKED_AMENITIES'; payload: AmenitiesCheckedProps }
  | { type: 'SET_CHECKED_BOOKING_OPTIONS'; payload: BookingOptionsCheckedProps }
  | { type: 'SET_STANDOUT_SECTION'; payload: string }
  | { type: 'SET_SELECTED_PROPERTY_TYPES'; payload: SelectedFilterBottomProps }
  | { type: 'SET_ACCESSIBILITY_FEATURES'; payload: ExploreFiltersAccessibilityFeaturesCheckedProps }
  | { type: 'LOAD_STATE'; payload: ExploreFilterState }
  | { type: 'SET_CACHE_FILTER'; payload: ExploreFiltersCacheProps[] };

interface ExploreFilterState {
  bedsBathroomsInfo: ExploreFiltersBedsBathroomsProps;
  priceRange: PriceRange;
  checkedAmenities: AmenitiesCheckedProps;
  checkedBookingOptions: BookingOptionsCheckedProps;
  standoutSection: string;
  selectedPropertyTypes: SelectedFilterBottomProps;  
  selectedAccessibilityFeatures: ExploreFiltersAccessibilityFeaturesCheckedProps;
  isLoading: boolean;
  cacheFilter: ExploreFiltersCacheProps[];
}

const STORAGE_KEY = '@explore_filters';

const initialState: ExploreFilterState = {
  bedsBathroomsInfo: {
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
  },
  priceRange: {
    leftPrice: 0,
    rightPrice: 0,
    connectPrice: '',
  },
  checkedAmenities: {},
  checkedBookingOptions: {},
  standoutSection: '',
  selectedPropertyTypes: {},
  selectedAccessibilityFeatures: {},
  isLoading: true,
  cacheFilter: [],
};

function exploreFilterReducer(
  state: ExploreFilterState,
  action: ExploreFilterAction
): ExploreFilterState {
  switch (action.type) {
    case 'LOAD_STATE':
      return {
        ...action.payload,
        isLoading: false,
      };
    case 'SET_BEDS_BATHROOMS':
      return {
        ...state,
        bedsBathroomsInfo: { ...state.bedsBathroomsInfo, ...action.payload },
      };
    case 'SET_PRICE_RANGE':
      const { leftPrice, rightPrice } = action.payload;
      const connectPrice =
        leftPrice && rightPrice ? `$${leftPrice}-$${rightPrice}` : `${(leftPrice||rightPrice)?`$${leftPrice||rightPrice}`:''}`;
      return {
        ...state,
        priceRange: { ...state.priceRange, ...action.payload, connectPrice },
      };
    case 'SET_CHECKED_AMENITIES':
      return {
        ...state,
        checkedAmenities: { ...action.payload },
      };
    case 'SET_CHECKED_BOOKING_OPTIONS':
      return {
        ...state,
        checkedBookingOptions: {...action.payload },
      };
    case 'SET_STANDOUT_SECTION':
      return {
        ...state,
        standoutSection: action.payload,
      };
    case 'SET_SELECTED_PROPERTY_TYPES':
      return {
        ...state,
        selectedPropertyTypes: action.payload,
      };
    case 'SET_ACCESSIBILITY_FEATURES':
      return {
        ...state,
        selectedAccessibilityFeatures: action.payload,  
      };
    case 'SET_CACHE_FILTER':
      return {
        ...state,
        cacheFilter: action.payload,
      };
    default:
      return state;
  }
}

const ExploreFilterContext = createContext<ExploreFilterContextType>({
  bedsBathroomsInfo: initialState.bedsBathroomsInfo,
  priceRange: initialState.priceRange,
  checkedAmenities: initialState.checkedAmenities,
  checkedBookingOptions: initialState.checkedBookingOptions,
  standoutSection: initialState.standoutSection,
  selectedPropertyTypes: initialState.selectedPropertyTypes,     
  selectedAccessibilityFeatures: initialState.selectedAccessibilityFeatures,  
  cacheFilter: initialState.cacheFilter,
  dispatch: () => null,
});

export const ExploreFilterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(exploreFilterReducer, initialState);

  useEffect(() => {
    const loadState = async () => {
      try {
        const savedState = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedState) {
          dispatch({
            type: 'LOAD_STATE',
            payload: JSON.parse(savedState),
          });
        }
      } catch (error) {
        console.error('Error loading state:', error);
      }
    };
    loadState();
  }, []);

  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error('Error saving state:', error);
      }
    };
    if (!state.isLoading) {
      saveState();
    }
  }, [state]);

  const contextValue = {
    bedsBathroomsInfo: state.bedsBathroomsInfo,
    priceRange: state.priceRange,
    checkedAmenities: state.checkedAmenities,
    checkedBookingOptions: state.checkedBookingOptions,
    standoutSection: state.standoutSection,
    selectedPropertyTypes: state.selectedPropertyTypes,
    selectedAccessibilityFeatures: state.selectedAccessibilityFeatures,
    cacheFilter: state.cacheFilter,
    dispatch, 
  };

  return (
    <ExploreFilterContext.Provider value={contextValue}>
      {children}
    </ExploreFilterContext.Provider>
  );
};

export const useExploreFilterContext = () => {
  return useContext(ExploreFilterContext);
};

export default ExploreFilterContext;
