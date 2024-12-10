export const tokens = {
    // Font family definitions
    fontFamily: {
        base: "Circular", // Base font family
        fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' // Fallback fonts
    },
    // Font size scale (in pixels)
    fontSize: {
        "2xs":10, // Extra extra small
        "xs":12,  // Extra small
        "sm":14,  // Small
        "md":16,  // Medium
        "lg":18,  // Large
        "xl":20,  // Extra large
        "2xl":24, // Extra extra large
        "3xl":32, // Extra extra extra large
    },
    // Font weight variations
    fontWeight: {
       normal:400,    // Normal weight
       medium:500,    // Medium weight
       bold:700,      // Bold weight
       semibold:600,  // Semi-bold weight
    },
    // Line height multipliers
    lineHeight: {
        none:1,       // No line height
        tight:1.25,   // Tight spacing
        normal:1.5,   // Normal spacing
        relaxed:1.75, // Relaxed spacing
        loose:2,      // Loose spacing
    },
    // Spacing scale (in pixels)
    spacing: {
        "0":0,   // No spacing
        "1":4,   // Extra small spacing
        "2":8,   // Small spacing
        "3":12,  // Medium small spacing
        "4":16,  // Medium spacing
        "5":20,  // Medium large spacing
        "6":24,  // Large spacing
        "7":28,  // Extra large spacing
        "8":32,  // Extra extra large spacing
        "10":40  // Maximum spacing
    },
    // Border radius scale (in pixels)
    borderRadius: {
       none:0,     // No border radius
       sm:8,       // Small border radius
       md:12,      // Medium border radius
       lg:16,      // Large border radius
       xl:24,      // Extra large border radius
       full:9999,  // Full circular border radius
    },  
    // Shadow styles
    shadow: {
        sm: {  // Small shadow
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
            elevation: 1,
        },
        md: {  // Medium shadow
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
    }
}   as const;