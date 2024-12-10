// 导入主题相关依赖 / Import theme-related dependencies
import { lightTheme,darkTheme } from "@/styles/theme"
import { createContext, useState } from "react";
import { NativeBaseProvider } from "native-base";
// 主题模式类型定义 / Theme mode type definition
export type ThemeMode = "light" | "dark"

// 主题上下文类型接口 / Theme context type interface
export interface ThemeContextType {
     theme:ThemeMode,      // 当前主题 / Current theme
     toggleTheme:(theme:ThemeMode)=>void  // 切换主题的方法 / Method to toggle theme
}

// 创建主题上下文 / Create theme context
const ThemeContext = createContext<ThemeContextType | null>(null);

// 主题提供者组件 / Theme provider component
export const ThemeProvider = ({children}:{children:React.ReactNode})=>{
    // 主题状态管理 / Theme state management
    const [theme,setTheme] = useState<ThemeMode>('light');
    
    // 切换主题的方法 / Method to toggle theme
    const toggleTheme = (theme:ThemeMode)=>{
        setTheme(theme);
    }

    // 返回包含主题上下文提供者的组件 / Return component with theme context provider
    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>
           <NativeBaseProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                {children}
            </NativeBaseProvider>
        </ThemeContext.Provider>
    )
}