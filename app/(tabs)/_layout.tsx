import { Colors } from "@/constants/Colors";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

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
            backgroundColor: Colors.primary,
            height: 62.5,
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
            fontSize: 14,
            fontWeight: "500",
            fontFamily: "mon-sb",
          }
        }}
      >
        {/* 搜索标签页 Search Tab */}
        <Tabs.Screen 
          name="index"
          options={{
            headerShown: false,
            tabBarLabel: "Eplore",
            tabBarIcon: ({color, size}) => (
              <Ionicons name='search' color={color} size={size} />
            ),
          }}
        />
        {/* 愿望清单标签页 Wishlists Tab */}
        <Tabs.Screen 
          name="wishlists"
          options={{
            headerShown:false,
            tabBarLabel: "Wishlists",
            tabBarIcon:({color,size})=>(
              <Ionicons name="heart-outline" color={color} size={size} />
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
              <FontAwesome5 name='airbnb' color={color} size={size} />
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
              <MaterialCommunityIcons name="message-outline" color={color} size={size} />
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
              <Ionicons name='person-circle-outline' color={color} size={size} />
            )
          }}
        />
      </Tabs>
    )
} 
export default TabLayout;

