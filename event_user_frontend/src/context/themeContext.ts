import { createContext } from "react";
import theme from "../theme/theme";

const ThemeContext = createContext<typeof theme>(theme);

export default ThemeContext;
