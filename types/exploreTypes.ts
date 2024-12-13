import { NativeSyntheticEvent } from "react-native";

import { NativeScrollEvent } from "react-native";

interface ExploreItemType {
    id: number;
    title: string;
    subTitle: string;
    date: string;
    price: string;
    image: string;
    images: any[];
}

interface ExploreListProps {
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export type { ExploreItemType, ExploreListProps };