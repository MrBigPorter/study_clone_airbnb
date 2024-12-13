//浅色主题
export const lightTheme = {
   primary:{
    main:"#FF385C",      // Main brand color (Airbnb red)
    light:"#F9F9F9",     // Light variant of primary color
    dark: '#E31C5F',     // Dark variant of primary color
    contrast:"#FFFFFF",   // High contrast color for primary backgrounds
   },
   text:{
    primary:"#222222",   // Primary text color for headings and important content
    secondary:"#717171", // Secondary text color for less important content
    tertiary:"#5E5E5E",  // Tertiary text color for supplementary content
    disabled:"#B0B0B0",  // Color for disabled text elements
    inverse:"#FFFFFF",   // Inverse text color for dark backgrounds
   },
   background:{
    default:"#FFFFFF",   // Primary background color
    paper:"#F7F7F7",    // Paper-like background for cards and surfaces
    secondary:"#F5F5F5", // Secondary background for contrast
    tertiary:"#EBEBEB",  // Tertiary background for additional contrast
    contrast:"rgb(34, 34, 34)",  // Contrast background color
   },
   border:{
    default:"#DDDDDD",   // Default border color
    light:"#EBEBEB",     // Light border color for subtle separation
    focus:"#222222",     // Border color for focused elements
   },
   status:{
    success:"#008A05",   // Success state color (green)
    warning:"#FFA500",   // Warning state color (orange)
    error:"#C13515",     // Error state color (red)
    info:"#428BCA",      // Information state color (blue)
   },
   special:{
    price:"#222222",     // Color for price displays
    rating:"#222222",    // Color for rating displays
    favorite:"#FF385C",  // Color for favorite/heart icons
    overlay:"rgba(0, 0, 0, 0.04)", // Overlay color for modal backgrounds
   },   
} as const;