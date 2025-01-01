import { View, Text, StyleSheet, Pressable } from "react-native";
import { useCustomTheme } from "@/context/themeContext";
import { useExploreFilterContext } from "@/context/exploreFilterContext";
import { ExploreFiltersAccessibilityFeatureItemProps, ExploreFiltersAccessibilityFeaturesProps, ExploreFiltersFilterListProps, PropertyTypesProps } from "@/types/exploreTypes";
import AmenitiesIcon from "./AmenitiesIcon";
import { useState, useCallback, useMemo, useEffect } from "react";
import PropertyTypes from "./PropertyTypes";
import Feature from "./Feature";
import { isNullOrEmpty } from "@/utils";

// Filter bottom component / 底部筛选组件
const FilterBottom = () => {
    const {
      theme: { border, text },
    } = useCustomTheme();
    const { cacheFilter, selectedPropertyTypes, selectedAccessibilityFeatures, dispatch } =
      useExploreFilterContext();

      const [newSelectedPropertyTypeKey,setNewSelectedPropertyTypeKey] = useState<string[]>([]);  
      const [newSelectedAccessibilityFeatureKey,setNewSelectedAccessibilityFeatureKey] = useState<string[]>([]);  
    // Property types state / 物业类型状态
    const [propertyTypes, setPropertyTypes] = useState<PropertyTypesProps[]>([
      { id: 1, name: 'House', icon: 'home', type: 'MaterialCommunityIcons' },
      { id: 2, name: 'Apartment', icon: 'apartment', type: 'MaterialIcons' },
      { id: 3, name: 'Guest house', icon: 'other-houses', type: 'MaterialIcons' },
      { id: 4, name: 'Hotel', icon: 'hotel', type: 'FontAwesome5' },
    ]);
  
    // Accessibility features state / 无障碍功能状态
    const [accessibilityFeatures, setAccessibilityFeatures] = useState<
      ExploreFiltersAccessibilityFeaturesProps[]
    >([
      {
        id: 1,
        title: 'Guest entrance and parking',
        list: [
          { id: 1, name: 'Step-free access' },
          { id: 3, name: 'Elevator' },
          { id: 4, name: 'Wheelchair accessible' },
          { id: 5, name: 'Doorway width' },
          { id: 6, name: 'Disabled parking' },
        ],
      },
      {
        id: 2,
        title: 'Bedrooms',
        list: [
          { id: 1, name: 'step-free bedroom' },
          { id: 2, name: 'bedside rails' },
          { id: 3, name: 'towel rails' },
          { id: 4, name: 'shower chair' },
          { id: 5, name: 'shower seat' },
          { id: 6, name: 'tv remote' },
          { id: 7, name: 'air conditioner' },
        ],
      },
    ]);
  
    // Handle property type press / 处理物业类型点击
    const handlePropertyTypePress = useCallback(
      (propertyType: PropertyTypesProps) => {
        const newState = selectedPropertyTypes;
        if (newState[propertyType.name]) {
          delete newState[propertyType.name];
        } else {
          newState[propertyType.name] = propertyType;
        }
        dispatch({
          type: 'SET_SELECTED_PROPERTY_TYPES',
          payload: newState,
        });
      },
      []
    );
  
    // Handle accessibility feature press / 处理无障碍功能点击
    const handleAccessibilityFeaturePress = useCallback(
      (checkedItem: ExploreFiltersAccessibilityFeatureItemProps) => {
        const newState = selectedAccessibilityFeatures;
        if (newState[checkedItem.name]) {
          delete newState[checkedItem.name];
        } else {
          newState[checkedItem.name] = checkedItem;
        }
        dispatch({ type: 'SET_ACCESSIBILITY_FEATURES', payload: newState });
      },
      []
    );

    // Update selected property type keys when property types change
    // 当属性类型改变时更新选中的属性类型键值
    const updateSelectedKeys = (
      isEmpty: boolean, 
      selectedItems: Record<string, any>,
      setKeys: (keys: string[]) => void
    ) => {
      if(isEmpty) {
        const newKeys = Object.keys(selectedItems);
        setKeys(newKeys);
      }
    };
    useEffect(()=>{
      
      if(!isNullOrEmpty(selectedPropertyTypes)){
        updateSelectedKeys(
          isNullOrEmpty(newSelectedPropertyTypeKey),
          selectedPropertyTypes,
          setNewSelectedPropertyTypeKey
        );
      }
      if(!isNullOrEmpty(selectedAccessibilityFeatures)){

      updateSelectedKeys(
        isNullOrEmpty(newSelectedAccessibilityFeatureKey), 
          selectedAccessibilityFeatures,
          setNewSelectedAccessibilityFeatureKey
        );
      }

    },[selectedPropertyTypes,selectedAccessibilityFeatures]);
   
    
    useEffect(() => {
      if (isNullOrEmpty(cacheFilter)) return;
      

      // Handle property type filters
      const propertyTypeCacheFilter = cacheFilter.filter(item => 
        newSelectedPropertyTypeKey.includes(item.keyWord as string)
      );

      if (!isNullOrEmpty(propertyTypeCacheFilter)) {
        const updatedPropertyTypes = { ...selectedPropertyTypes };
        propertyTypeCacheFilter.forEach(item => {
          if (item.move) {
            delete updatedPropertyTypes[item.keyWord];
          } else {
            updatedPropertyTypes[item.keyWord] = item.value as PropertyTypesProps;
          }
        });
        
        dispatch({
          type: 'SET_SELECTED_PROPERTY_TYPES', 
          payload: updatedPropertyTypes
        });
      }

      // Handle accessibility feature filters  
      const accessibilityFeatureCacheFilter = cacheFilter.filter(item =>
        newSelectedAccessibilityFeatureKey.includes(item.keyWord as string)
      );

      if (!isNullOrEmpty(accessibilityFeatureCacheFilter)) {
        const updatedAccessibilityFeatures = { ...selectedAccessibilityFeatures };
        accessibilityFeatureCacheFilter.forEach(item => {
          if (item.move) {
            delete updatedAccessibilityFeatures[item.keyWord];
          } else {
            updatedAccessibilityFeatures[item.keyWord] = item.value as ExploreFiltersAccessibilityFeatureItemProps;
          }
        });

        dispatch({
          type: 'SET_ACCESSIBILITY_FEATURES',
          payload: updatedAccessibilityFeatures
        });
      }
    }, [cacheFilter, newSelectedPropertyTypeKey, newSelectedAccessibilityFeatureKey]);
  
    const filterList: ExploreFiltersFilterListProps[] = useMemo(
      () => [
        {
          id: 1,
          title: 'Property type',
          component: (
            <PropertyTypes
              propertyTypes={propertyTypes}
              selectedPropertyTypes={selectedPropertyTypes}
              handlePropertyTypePress={handlePropertyTypePress}
            />
          ),
        },
        {
          id: 2,
          title: 'Accessibility features',
          component: (
            <Feature  
              accessibilityFeatures={accessibilityFeatures}
              handleAccessibilityFeaturePress={handleAccessibilityFeaturePress}
            />
          ),
        },
      ],
      [propertyTypes, { ...selectedPropertyTypes }, accessibilityFeatures]
    );
    return (
      <View style={styles.filterBottomList}>
        {filterList.map((item) => (
          <FilterBottomItem
            title={item.title}
            key={item.id}
            component={item.component}
          />
        ))}
      </View>
    );
  };
  
  const FilterBottomItem = ({
    title,
    component: children,
  }: Omit<ExploreFiltersFilterListProps, 'id'>) => {
    const {
      theme: { border, text },
    } = useCustomTheme();
    const [expanded, setExpanded] = useState<boolean>(false);
  
    const toggleExpanded = useCallback(() => {
      setExpanded((prev) => !prev);
    }, []);
  
    const renderHeader = useMemo(
      () => (
        <Pressable
          style={styles.filterBottomListItemTop}
          onPress={toggleExpanded}
        >
          <Text
            style={[styles.filterBottomListItemTopText, { color: text.primary }]}
          >
            {title}
          </Text>
          <AmenitiesIcon
            icon={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            type="MaterialIcons"
          />
        </Pressable>
      ),
      [expanded, text.primary, title, toggleExpanded]
    );
  
    return (
      <View
        style={[
          styles.filterBottomListItem,
          { borderBottomColor: border.default },
        ]}
      >
        {renderHeader}
        {expanded && children}
      </View>
    );
  };

  const styles = StyleSheet.create({
    filterBottomList: {},
    filterBottomListItem: {
      minHeight: 72,
    },
    filterBottomListItemTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 24,
    },
    filterBottomListItemTopText: {
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'mon-sb',
    },
  });

  export default FilterBottom;
  