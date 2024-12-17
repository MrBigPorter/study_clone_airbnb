import { StyleProp,ViewStyle } from "react-native";
import { SharedValue } from "react-native-reanimated";

interface BottomSheetProps {
    children: React.ReactNode;
    snapPoints?:String[];
    index?:number;
    onChange?: (index: number) => void;
    backgroundStyle?:StyleProp<ViewStyle>;
    handleIndicatorStyle?:StyleProp<ViewStyle>;
    style?:StyleProp<ViewStyle>;
    animatedPositionValue?: SharedValue<number>;
}

export type { BottomSheetProps };