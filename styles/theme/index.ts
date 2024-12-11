// 浅色主题 Light Theme - Used for default bright UI appearance
import { lightTheme } from './lightTheme';
// 深色主题 Dark Theme - Used for low-light UI appearance
import { darkTheme } from './darkTheme';
// 主题令牌 Theme Tokens - Design system constants like spacing, typography, etc.
import { tokens } from './tokens';

// 主题类型定义 Theme Type Definition
// Combines light/dark theme properties with design tokens
// Theme type definition that combines theme colors and design tokens
// 主题类型定义，结合了主题颜色和设计令牌
export type Theme = typeof lightTheme | typeof darkTheme & {
  // Includes all color definitions from lightTheme (primary, text, background, etc.)
  // 包含来自 lightTheme 的所有颜色定义（主色、文本、背景等）

  // Adds design system tokens for typography, spacing, etc.
  // 添加用于排版、间距等的设计系统令牌
  tokens: typeof tokens; // Design tokens like fonts, spacing, shadows etc.
  // 设计令牌，如字体、间距、阴影等
};
// 创建主题函数 Create theme function
// Combines theme colors with design tokens
// 结合主题颜色和设计令牌
export const createTheme = (
  theme: typeof lightTheme | typeof darkTheme
): Theme => ({
  ...theme,
  tokens,
});

// 导出主题相关内容 Export theme-related contents
export const themes = {
  light: createTheme(lightTheme),
  dark: createTheme(darkTheme),
};
