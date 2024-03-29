import * as React from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import { Comp1 } from "./components/comp1";
import { Comp2Memo } from "./components/comp2-memo";
import { Comp3Memo } from "./components/comp3-memo";
import { Comp4UseCallback } from "./components/comp4-use-callback";
import { CompMemo } from "./components/comp5-memo";
import { CompReactHookForm } from "./components/comp-react-hook-form";
import { HookForm } from "./components/comp6-hook-form";

export const App = () => (
  <ChakraProvider theme={theme}>
    <HookForm />
    {/* <Comp3Memo /> */}
    {/* <Comp4UseCallback /> */}
    {/* <CompMemo /> */}
    {/* <CompReactHookForm /> */}
  </ChakraProvider>
)
