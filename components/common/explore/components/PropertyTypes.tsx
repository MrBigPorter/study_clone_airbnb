import { useCustomTheme } from "@/context/themeContext";
import { PropertyTypesProps } from "@/types/exploreTypes";
import { View, Text, Pressable, StyleSheet } from "react-native";
import AmenitiesIcon from "./AmenitiesIcon";
import { AmenitiesItemIconProps } from "@/types/exploreTypes";

/**
 * Property types component / 物业类型组件
 * @returns
 */
const PropertyTypes = ({
    propertyTypes,
    selectedPropertyTypes,
    handlePropertyTypePress,
  }: {
    propertyTypes: PropertyTypesProps[];
    selectedPropertyTypes: Record<string, PropertyTypesProps>;
    handlePropertyTypePress: (propertyType: PropertyTypesProps) => void;
  }) => {
    const {
      theme: { text, border },
    } = useCustomTheme();
  
    return (
      <View style={styles.propertyType}>
        {propertyTypes.map((propertyType) => (
          <Pressable
            onPress={() => handlePropertyTypePress(propertyType)}
            style={[
              styles.propertyTypeItem,
              {
                borderColor: selectedPropertyTypes[propertyType.name]
                  ? border.focus
                  : border.default,
              },
            ]}
            key={propertyType.name}
          >
            <AmenitiesIcon
              icon={propertyType.icon}
              type={propertyType.type as AmenitiesItemIconProps['type']}
            />
            <Text style={[styles.propertyTypeItemText, { color: text.primary }]}>
              {propertyType.name}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  const styles = StyleSheet.create({
    propertyType: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
        paddingBottom: 32,
      },
      propertyTypeItem: {
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 100,
        paddingHorizontal: 15,
        height: 50,
      },
      propertyTypeItemText: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'mon-sb',
      },
  });
  
  export default PropertyTypes;