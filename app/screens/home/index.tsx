import { View } from "react-native";
import SearchHeader from "@/components/common/searchHeader";
import CategoryList from "@/components/common/CategoryList";
import ExloreList from "@/components/common/ExloreList";
export default function Home() {
    return (
        <View>
            <SearchHeader />    
            <CategoryList />
            <ExloreList />
        </View>
    )

}