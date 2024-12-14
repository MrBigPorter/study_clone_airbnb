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
    onScroll?: (scrollY: number) => void;
}

export type { ExploreItemType, ExploreListProps };