import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { AmenitiesItemIconProps } from "@/types/exploreTypes";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
export default AmenitiesIcon;