import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

/**
 * TabLayout组件 - 定义底部标签页导航的布局和样式
 * TabLayout Component - Defines the layout and styling of bottom tab navigation
 */
const TabLayout = () => {
    return (
      <Tabs
        screenOptions={{
          // 设置标签栏的样式，包括背景色和高度
          // Set tab bar styles including background color and height
          tabBarStyle: {
            backgroundColor: "#fff",
            height: Platform.OS === 'ios' ? 80 : 58,
            paddingBottom: Platform.OS === 'ios' ? 30 : 8,
            paddingTop: Platform.OS === 'ios' ? 8 : 4,
          },
          // 设置激活和未激活状态下的标签颜色
          // Set colors for active and inactive tab states
          tabBarActiveTintColor: "#E81948",
          tabBarInactiveTintColor: "#6A6A6A",
          // 设置标签图标的尺寸
          // Set dimensions for tab icons
          tabBarIconStyle: {
            width: 24,
            height: 24,
          },
          // 设置标签文本的样式，包括字体大小、粗细和字体族
          // Set tab label styles including font size, weight and family
          tabBarLabelStyle: {
            fontSize: Platform.OS === 'ios' ? 14 : 12,
            fontWeight: Platform.OS === 'ios' ? "500" : "bold",
            fontFamily: "mon-sb",
            paddingBottom: Platform.OS === 'ios' ? 0 : 4,
          }
        }}
      >
        {/* 搜索标签页 Search Tab */}
        <Tabs.Screen 
          name="index"
          options={{
            tabBarLabel: "Eplore",
            tabBarIcon: ({color, size}) => (
              <Ionicons name='search' color={color} size={Platform.OS === 'ios' ? size : size - 2} />
            ),
          }}
        />
        {/* 愿望清单标签页 Wishlists Tab */}
        <Tabs.Screen 
          name="wishlists"
          options={{
            headerShown:true,
            tabBarLabel: "Wishlists",
            tabBarIcon:({color,size})=>(
              <Ionicons name="heart-outline" color={color} size={Platform.OS === 'ios' ? size : size - 2} />
            )
          }}
        />
        {/* 行程标签页 Trips Tab */}
        <Tabs.Screen 
          name="trips"
          options={{
            headerShown:false,
            tabBarLabel: "Trips",
            tabBarIcon:({color,size})=>(
              <FontAwesome5 name='airbnb' color={color} size={Platform.OS === 'ios' ? size : size - 2} />
            )
          }}
        />
        {/* 消息标签页 Messages Tab */}
        <Tabs.Screen 
          name="messages"
          options={{
            headerShown:false,
            tabBarLabel: "Messages",
            tabBarIcon:({color,size})=>(
              <MaterialCommunityIcons name="message-outline" color={color} size={Platform.OS === 'ios' ? size : size - 2} />
            )
          }}
        />
        {/* 个人资料标签页 Profile Tab */}
        <Tabs.Screen 
          name="profile"
          options={{
            headerShown:false,
            tabBarLabel: "Profile",
            tabBarIcon:({color,size})=>(
              <Ionicons name='person-circle-outline' color={color} size={Platform.OS === 'ios' ? size : size - 2} />
            )
          }}
        />
      </Tabs>
    )
} 
export default TabLayout;
