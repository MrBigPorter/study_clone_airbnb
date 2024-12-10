// 导入所需的依赖
// Import required dependencies
import { extendTheme } from 'native-base';
import { Platform } from 'react-native';

// 设计令牌 (Design Tokens)
// Design Tokens
const tokens = {
  // 颜色系统
  // Color System
  colors: {
    primary: {
      50: '#fff1f1',    // 最浅的主色调 / Lightest primary shade
      100: '#ffe4e4',   // 非常浅的主色调 / Very light primary shade
      200: '#ffc9c9',   // 浅色主色调 / Light primary shade
      300: '#ff9f9f',   // 中浅主色调 / Medium light primary shade
      400: '#ff5a5f',   // Airbnb 主色 / Airbnb main color
      500: '#ff385c',   // 深色变体 / Dark variant
      600: '#e31c5f',   // 较深主色调 / Darker primary shade
      700: '#c4092f',   // 深色主色调 / Deep primary shade
      800: '#a00d2a',   // 非常深的主色调 / Very deep primary shade
      900: 'red',   // 最深的主色调 / Deepest primary shade
    },
    gray: {
      50: '#f7f7f7',    // 最浅的灰色 / Lightest gray
      100: '#ebebeb',   // 非常浅的灰色 / Very light gray
      200: '#c9c9c9',   // 浅灰色 / Light gray
      300: '#a8a8a8',   // 中浅灰色 / Medium light gray
      400: '#717171',   // 次要文字 / Secondary text
      500: '#484848',   // 主要文字 / Primary text
      600: '#222222',   // 深色文字 / Dark text
      700: '#000000',   // 黑色 / Black
    },
    // 功能色 / Functional colors
    success: '#008a05',  // 成功状态 / Success state
    warning: '#ffd700',  // 警告状态 / Warning state
    error: '#c13515',    // 错误状态 / Error state
    info: '#428bff',     // 信息状态 / Information state
  },

  // 字体系统 / Font System
  fonts: {
    heading: Platform.select({
      ios: 'mon-b',      // iOS 标题字体 / iOS heading font
      android: 'mon-b',  // Android 标题字体 / Android heading font
    }),
    body: Platform.select({
      ios: 'mon',        // iOS 正文字体 / iOS body font
      android: 'mon',    // Android 正文字体 / Android body font
    }),
    mono: Platform.select({
      ios: 'mon-sb',     // iOS 等宽字体 / iOS monospace font
      android: 'mon-sb', // Android 等宽字体 / Android monospace font
    }),
  },

  // 字体大小 / Font Sizes
  fontSizes: {
    '2xs': 10,    // 超小号文字 / Extra extra small text
    'xs': 12,     // 小号文字 / Extra small text
    'sm': 14,     // 次要信息 / Small text (secondary information)
    'md': 16,     // 正文 / Medium text (body)
    'lg': 18,     // 小标题 / Large text (small headings)
    'xl': 20,     // 标题 / Extra large text (headings)
    '2xl': 24,    // 大标题 / Double extra large text (large headings)
    '3xl': 30,    // 超大标题 / Triple extra large text (extra large headings)
    '4xl': 36,    // 展示标题 / Display headings
    '5xl': 48,    // 巨大标题 / Huge headings
  },

  // 字重 / Font Weights
  fontWeights: {
    hairline: 100,   // 最细 / Thinnest
    thin: 200,       // 纤细 / Very thin
    light: 300,      // 细体 / Light
    normal: 400,     // 常规 / Normal
    medium: 500,     // 中等 / Medium
    semibold: 600,   // 半粗 / Semi-bold
    bold: 700,       // 粗体 / Bold
    extrabold: 800,  // 特粗 / Extra bold
    black: 900,      // 最粗 / Heaviest
  },

  // 行高 / Line Heights
  lineHeights: {
    'xs': 1,      // 紧凑 / Compact
    'sm': 1.25,   // 较紧凑 / Somewhat compact
    'md': 1.5,    // 正常 / Normal
    'lg': 1.75,   // 宽松 / Relaxed
    'xl': 2,      // 很宽松 / Very relaxed
    '2xl': 2.5,   // 超宽松 / Extra relaxed
  },

  // 间距 / Spacing
  space: {
    'px': 1,    // 1像素 / 1 pixel
    '0': 0,     // 无间距 / No spacing
    '0.5': 2,   // 最小间距 / Minimal spacing
    '1': 4,     // 超小间距 / Extra small spacing
    '2': 8,     // 小间距 / Small spacing
    '3': 12,    // 中小间距 / Medium small spacing
    '4': 16,    // 中等间距 / Medium spacing
    '5': 20,    // 中大间距 / Medium large spacing
    '6': 24,    // 大间距 / Large spacing
    '8': 32,    // 较大间距 / Larger spacing
    '10': 40,   // 超大间距 / Extra large spacing
    '12': 48,   // 特大间距 / Extra extra large spacing
    '16': 64,   // 巨大间距 / Huge spacing
    '20': 80,   // 超巨大间距 / Extra huge spacing
    '24': 96,   // 最大间距 / Maximum spacing
  },

  // 圆角 / Border Radius
  radii: {
    'none': 0,    // 无圆角 / No radius
    'sm': 4,      // 小圆角 / Small radius
    'md': 6,      // 中等圆角 / Medium radius
    'lg': 8,      // 大圆角 / Large radius
    'xl': 12,     // 超大圆角 / Extra large radius
    '2xl': 16,    // 特大圆角 / Extra extra large radius
    'full': 9999, // 完全圆形 / Fully rounded
  },

  // 阴影 / Shadows
  shadows: {
    none: {
      shadowColor: "transparent",
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0
    },
    '0': {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1
    },
    '1': {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3
    },
    '2': {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 6
    },
  },
};

// 组件主题 / Component Theme
const components = {
  // 搜索栏 / Search Bar
  SearchBar: {
    baseStyle: {
      bg: 'white',           // 背景色 / Background color
      borderRadius: 'full',  // 圆角 / Border radius
      shadow: '1',          // 阴影 / Shadow
      px: '4',             // 水平内边距 / Horizontal padding
      py: '2',             // 垂直内边距 / Vertical padding
    },
  },

  // 按钮 / Button
  Button: {
    baseStyle: {
      borderRadius: 'lg',  // 圆角 / Border radius
    },
    defaultProps: {
      colorScheme: 'primary',  // 默认配色 / Default color scheme
    },
    variants: {
      solid: {
        bg: 'primary.400',           // 实心按钮背景色 / Solid button background
        _hover: {
          bg: 'primary.500',         // 悬停状态 / Hover state
        },
        _pressed: {
          bg: 'primary.600',         // 按压状态 / Pressed state
        },
      },
      outline: {
        borderColor: 'gray.400',     // 边框颜色 / Border color
        _hover: {
          bg: 'gray.50',            // 悬停背景色 / Hover background
        },
      },
    },
  },

  // 文本 / Text
  Text: {
    baseStyle: {
      color: 'gray.500',     // 文本颜色 / Text color
      fontSize: 'md',        // 字体大小 / Font size
      lineHeight: 'md',      // 行高 / Line height
    },
    variants: {
      heading: {
        color: 'gray.600',   // 标题颜色 / Heading color
        fontWeight: 'bold',  // 字重 / Font weight
        fontSize: 'xl',      // 字体大小 / Font size
      },
      subtitle: {
        color: 'gray.400',   // 副标题颜色 / Subtitle color
        fontSize: 'sm',      // 字体大小 / Font size
      },
    },
  },

  // 卡片 / Card
  Card: {
    baseStyle: {
      bg: 'white',          // 背景色 / Background color
      rounded: 'xl',        // 圆角 / Border radius
      shadow: '1',          // 阴影 / Shadow
      overflow: 'hidden',   // 溢出处理 / Overflow handling
    },
  },

  // 输入框 / Input
  Input: {
    baseStyle: {
      borderRadius: 'lg',           // 圆角 / Border radius
      borderWidth: 1,               // 边框宽度 / Border width
      borderColor: 'gray.200',      // 边框颜色 / Border color
      _focus: {
        borderColor: 'primary.400', // 聚焦边框颜色 / Focus border color
      },
    },
  },

  // 开关 / Switch
  Switch: {
    baseStyle: {
      track: {
        bg: 'gray.200',            // 轨道背景色 / Track background
        _checked: {
          bg: 'primary.400',       // 选中状态背景色 / Checked state background
        },
      },
    },
  },
};

// 创建主题 / Create Theme
export const lightTheme = extendTheme({
  ...tokens,
  components,
  config: {
    initialColorMode: 'light',  // 初始颜色模式为亮色 / Initial color mode is light
  },
});

// 暗色主题 / Dark Theme
export const darkTheme = extendTheme({
  ...tokens,
  components,
  config: {
    initialColorMode: 'dark',   // 初始颜色模式为暗色 / Initial color mode is dark
  },
  // 暗色模式特定覆盖 / Dark mode specific overrides
  colors: {
    ...tokens.colors,
    // 覆盖一些颜色以适应暗色模式 / Override some colors for dark mode
    gray: {
      50: '#18181b',    // 最深灰色 / Darkest gray
      100: '#27272a',   // 深灰色 / Dark gray
      200: '#3f3f46',   // 中深灰色 / Medium dark gray
      300: '#52525b',   // 中灰色 / Medium gray
      400: '#a1a1aa',   // 浅灰色 / Light gray
      500: '#d4d4d8',   // 较浅灰色 / Lighter gray
      600: '#e4e4e7',   // 非常浅的灰色 / Very light gray
      700: '#f4f4f5',   // 最浅灰色 / Lightest gray
    },
  },
}); 