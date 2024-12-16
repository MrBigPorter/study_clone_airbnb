import { StyleProp,ViewStyle } from "react-native";


interface BottomSheetProps {
    children: React.ReactNode;
    snapPoints?:String[];
    onChange?: (index: number) => void;
    backgroundStyle?:StyleProp<ViewStyle>;
    handleIndicatorStyle?:StyleProp<ViewStyle>;
    style?:StyleProp<ViewStyle>;
}

export type { BottomSheetProps };