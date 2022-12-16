import * as React from "react"
import {
  ChakraProvider,
  Box,
  extendTheme,
  Text,
  type ThemeConfig,
  Link,
  VStack,
  Code,
  Grid, useColorMode
  // theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import { AppMain } from "./app-main"

import { LayoutMain } from './layouts/header'

const customTheme = extendTheme({
  colors: {
    purple: "#8966ff",
    brand: {
      50: "#ece4ff",
      100: "#c4b2ff",
      200: "#9d80ff",
      300: "#754dff",
      400: "#4f1bfe",
      500: "#3601e5",
      600: "#2900b3",
      700: "#1c0081",
      800: "#10004f",
      900: "#060020",
    },
  },
});

const colors = {
  brand: {
    900: "#7CFC00",
    800: "#7FFFD4",
    700: "#454B1B",
  }
}
const theme = extendTheme({colors})
export const App = () => (
  <ChakraProvider >
    {/* <AppMain /> */}
    <LayoutMain />
  </ChakraProvider>
)
