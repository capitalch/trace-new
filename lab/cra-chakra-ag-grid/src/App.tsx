import * as React from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import { Comp1 } from "./components/comp1";
import { Comp2Memo } from "./components/comp2-memo";

export const App = () => (
  <ChakraProvider theme={theme}>
    {/* <Comp1 /> */}
    <Comp2Memo />
  </ChakraProvider>
)
