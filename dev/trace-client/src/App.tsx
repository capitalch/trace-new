import {
  ChakraProvider,
  theme,
} from "@src/libs"
import { AppLayouts } from "@src/layouts"
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "ag-grid-community/styles/ag-theme-material.css"; // Optional theme CSS
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional theme CSS
import "@src/features/vitals/ag-theme-balham-custom.scss" // Customized the balham theme

export const App = () => (
  <ChakraProvider theme={theme}>
    <AppLayouts />
  </ChakraProvider>
)

