//深色主题
export const darkTheme = {
  primary: {
    main: '#FF385C', // Main brand color (Airbnb red)
    light: '#FF5A5F', // Light variant of primary color
    contrast: '#FFFFFF', // High contrast color for primary backgrounds
    dark: '#E31C5F',
  },
  text: {
    primary: '#FFFFFF', // Primary text color for headings and important content
    secondary: '#EBEBEB', // Secondary text color for less important content
    tertiary: '#B0B0B0', // Tertiary text color for supplementary content
    disabled: '#666666', // Color for disabled text elements
    inverse: '#222222', // Inverse text color for dark backgrounds
  },
  background: {
    default: '#1A1A1A', // Primary background color
    paper: '#2B2B2B', // Paper-like background for cards and surfaces
    secondary: '#333333', // Secondary background for contrast
    tertiary: '#404040', // Tertiary background for additional contrast
  },
  border: {
    default: '#404040', // Default border color
    light: '#333333', // Light border color for subtle separation
    focus: '#FFFFFF', // Border color for focused elements
  },
  status: {
    success: '#00CA08', // Success state color (green)
    error: '#FFB700', // Error state color (red)
    warning: '#FF4D4D', // Warning state color (orange)
    info: '#58A6FF', // Information state color (blue)
  },
  special: {
    price: '#FFFFFF', // Color for price displays
    rating: '#FFFFFF', // Color for rating displays
    favorite: '#FF385C', // Color for favorite/heart icons
    overlay: 'rgba(0, 0, 0, 0.04)', // Overlay color for modal backgrounds
  },
} as const;
