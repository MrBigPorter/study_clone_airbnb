import { MaterialIcons } from "@expo/vector-icons";
import {  View, Text, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { useCustomTheme } from "@/context/themeContext";
import { useExploreFilterContext } from "@/context/exploreFilterContext";
import { ExploreFiltersAccessibilityFeaturesProps, ExploreFiltersAccessibilityFeatureItemProps } from "@/types/exploreTypes";

/**
 * Accessibility features component / 无障碍功能组件
 * @returns
 */
const Feature = ({
    accessibilityFeatures,
    handleAccessibilityFeaturePress,
  }: {
    accessibilityFeatures: ExploreFiltersAccessibilityFeaturesProps[];
    handleAccessibilityFeaturePress: (
      checkedItem: ExploreFiltersAccessibilityFeatureItemProps
    ) => void;
  }) => {
    const {
      theme: { text, border },
    } = useCustomTheme();
    const { selectedAccessibilityFeatures } = useExploreFilterContext();
  
    return (
      <View style={styles.feature}>
        <View style={styles.featureList}>
          {accessibilityFeatures.map((feature) => (
            <View style={{ flex: 1 }} key={feature.id}>
              <Text style={[styles.featureItemTitle, { color: text.primary }]}>
                {feature.title}
              </Text>
              <View style={styles.featureItemWrapper}>
                {feature.list.map((item) => (
                  <TouchableOpacity
                    style={[styles.featureItem]}
                    key={`${item.id}_${item.name}`}
                    onPress={() => handleAccessibilityFeaturePress(item)}
                  >
                    <Text
                      style={[styles.featureItemText, { color: text.secondary }]}
                    >
                      {item.name}
                    </Text>
                    <View
                      style={[
                        styles.featureItemCheckbox,
                        {
                          backgroundColor: selectedAccessibilityFeatures[
                            item.name
                          ]
                            ? border.focus
                            : 'transparent',
                        },
                      ]}
                    >
                      {selectedAccessibilityFeatures[item.name] && (
                        <MaterialIcons
                          name="check"
                          size={20}
                          color={text.inverse}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    feature: {
        paddingBottom: 32,
      },
      featureText: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'mon-sb',
        marginBottom: 24,
      },
      featureList: {
        gap: 24,
      },
      featureItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      featureItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'mon-sb',
        marginBottom: 20,
      },
      featureItemWrapper: {
        gap: 20,
        marginBottom: 20,
      },
      featureItemText: {
        fontSize: 16,
        fontFamily: 'mon-sb',
      },
      featureItemCheckbox: {
        width: 24,
        height: 24,
        borderWidth: Platform.OS === 'ios' ? 1 : 2,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
      },
  });

  export default Feature;
  