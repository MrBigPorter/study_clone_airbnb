import { ThemeProvider } from '@/context/themeContext';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

// 防止启动屏幕自动隐藏
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // 加载自定义字体
  const [loaded, error] = useFonts({
    mon: require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  // 处理字体加载错误 Handle font loading errors
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // 字体加载完成后隐藏启动屏幕 Hide splash screen after fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // 字体未加载完成时返回空 Return null while fonts are still loading
  if (!loaded) {
    return null;
  }

  // 返回Stack导航组件 Return Stack navigation component
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <Stack
          // 设置所有页面的默认配置 Set default options for all screens
          screenOptions={{
            // 隐藏默认的导航头部 Hide default navigation header
            headerShown: false,
          }}
        >
          {/* 标签页导航组件 Tab navigation component */}
          <Stack.Screen name="(tabs)" />
          {/* 404页面组件 404 page component */}
          <Stack.Screen
            name="+not-found"
            options={{
              // 设置页面标题 Set page title
              title: '404 - Not Found',
              presentation: 'modal',
            }}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
