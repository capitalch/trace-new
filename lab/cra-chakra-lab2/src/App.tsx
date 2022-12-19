import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import { AppMain } from "./app-main"

export const App = () => (
  <ChakraProvider theme={theme}>
    <AppMain />
  </ChakraProvider>
)
