// 导入主题相关依赖 / Import theme-related dependencies
import { Theme, themes } from '@/styles/theme';
import { createContext, useContext, useState } from 'react';
import {
  PaperProvider,
} from 'react-native-paper';
// 主题模式类型定义 / Theme mode type definition
export type ThemeMode = 'light' | 'dark';

// 主题上下文类型接口 / Theme context type interface
export interface ThemeContextType {
  theme: Theme; // 当前主题 / Current theme
  toggleTheme: (theme: ThemeMode) => void; // 切换主题的方法 / Method to toggle theme
}

// 创建主题上下文 / Create theme context
const ThemeContext = createContext<ThemeContextType | null>(null);


// 使用主题 / Use theme
export const useCustomTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useCustomTheme must be used within a ThemeProvider');
  return context;
};
// 主题提供者组件 / Theme provider component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // 主题状态管理 / Theme state management
  const [theme, setTheme] = useState<ThemeMode>('light');

  // 切换主题的方法 / Method to toggle theme
  const toggleTheme = (theme: ThemeMode) => {
    setTheme(theme);
  };

  // 返回包含主题上下文提供者的组件 / Return component with theme context provider
  return (
    <ThemeContext.Provider value={{ theme: themes[theme], toggleTheme }}>
      <PaperProvider > 
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};
