import { Theme,themes } from "@/styles/theme"
import { useState } from "react"
import { createContext } from "react"

export type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
   theme: Theme,
   setTheme:(theme:ThemeMode) => void
}

interface ThemeProviderProps {  
    children:React.ReactNode,
    defaultTheme?:ThemeMode
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export const ThemeProvider:React.FC<ThemeProviderProps>= ({children,defaultTheme='light'})=>{
    const [themeMode,setThemeMode] = useState<ThemeMode>(defaultTheme);
    const loadTheme = async()=>{
        try {
          
        } catch (error) {
            
        }
    }
    return (
        <ThemeContext.Provider value={{theme:themes.light,setTheme:()=>{}}}>
            {children}
        </ThemeContext.Provider>            
    )
}