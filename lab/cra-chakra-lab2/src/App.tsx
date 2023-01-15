import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { Comp1 } from "./components/comp1"


export const App = () => (
  <ChakraProvider theme={theme}>
    <Comp1 />
  </ChakraProvider>
)
