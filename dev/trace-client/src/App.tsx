import {
  ChakraProvider,
  theme,
} from "@src/features"

import { AppLayouts } from "@src/layouts"

export const App = () => (
  <ChakraProvider theme={theme}>
    <AppLayouts />
  </ChakraProvider>
)
