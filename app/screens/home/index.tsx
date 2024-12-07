import { View } from "react-native";
import SearchHeader from "@/components/common/searchHeader";
import CategoryList from "@/components/common/CategoryList";
export default function Home() {
    return (
        <View>
            <SearchHeader />    
            <CategoryList />
        </View>
    )

}