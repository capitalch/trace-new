import {
  ChakraProvider,
  theme,
} from "@src/features"
import { AppLayouts } from "@src/layouts"
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "ag-grid-community/styles/ag-theme-material.css"; // Optional theme CSS
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional theme CSS
import "@src/features/ag-theme-balham-custom.scss" // Customized the balham theme

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppLayouts />
    </ChakraProvider>
  )
}
export default App
