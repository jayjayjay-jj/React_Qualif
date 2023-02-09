import { createContext } from "react"

export const THEME = {
    light: {
        primaryColor: "#a9c4ae",
        secondaryColor: "#57797f",
        accentColor: "#344a59"
    },
    dark : {
        primaryColor: "#344a59",
        secondaryColor: "#57797f",
        accentColor: "#a9c4ae"
    }
}

export const ThemeContext = createContext(THEME.light)