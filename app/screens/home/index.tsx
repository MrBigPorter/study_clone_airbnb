import { View } from "react-native";
import SearchHeader from "@/components/common/searchHeader";
import CategoryList from "@/components/common/CategoryList";
import ExploreList from "@/components/common/ExploreList";
import { useCustomTheme } from "@/context/themeContext";
export default function Home() {
    const { theme:{background} } = useCustomTheme();
    return (
        <View style={{backgroundColor:background.default}}>
            <SearchHeader />    
            <CategoryList />
            <ExploreList />
        </View>
    )

}