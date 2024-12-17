/**
 * Map Component
 * 地图组件
 * 
 * A map component that displays markers for major cities in the Philippines.
 * Features include:
 * - Current location detection
 * - Custom markers for cities
 * - Location permission handling
 * 
 * 显示菲律宾主要城市标记的地图组件。
 * 功能包括：
 * - 当前位置检测
 * - 城市自定义标记
 * - 位置权限处理
 */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Map() {
  // Initial map region state centered on Manila
  // 初始地图区域状态，以马尼拉为中心
  const [location, setLocation] = useState({
    latitude: 14.5995,
    longitude: 120.9842,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  });

  // Request location permissions and get current location on mount
  // 组件加载时请求位置权限并获取当前位置
  useEffect(() => {
    (async () => {
      // Request permission to access location
      // 请求访问位置权限
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      // Get current location
      // 获取当前位置
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  // Major cities in Philippines with their coordinates and descriptions
  // 菲律宾主要城市的坐标和描述
  const markers = [
    {
      latitude: 14.5995,
      longitude: 120.9842,
      title: "马尼拉",
      description: "菲律宾首都"
    },
    {
      latitude: 14.5547,
      longitude: 121.0244,
      title: "马卡蒂",
      description: "商业中心区"
    },
    {
      latitude: 14.6091,
      longitude: 121.0223,
      title: "奎松市",
      description: "大马尼拉都会区最大的城市"
    },
    {
      latitude: 10.3157,
      longitude: 123.8854,
      title: "宿务市",
      description: "菲律宾第二大城市"
    },
    {
      latitude: 7.1907,
      longitude: 125.4553,
      title: "达沃市",
      description: "菲律宾第三大城市"
    }
  ];

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={location}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude
            }}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
}

// Styles for map and marker components
// 地图和标记组件的样式
const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  map: {
    flex: 1, 
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    backgroundColor: '#FF5A5F',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 2,
  },
  calloutContainer: {
    width: 200,
    padding: 10,
    backgroundColor: 'white',
    zIndex: 3,
    elevation: 6,
  },
});
