import { Box, Button, Text } from "@chakra-ui/react";
import { useCallback,useEffect, useState } from "react";
function Comp4UseCallback() {
  const [, setRefresh] = useState({});
  const refToAFunction = useCallback(aFunction, []);
  
    useEffect(()=>{
        console.log('useEffect')
        aFunction()
    }, [refToAFunction])

  return (
    <Box>
      <Text>Test</Text>
      <Button onClick={setRefresh}>Re render</Button>
    </Box>
  );

  function aFunction() {
    console.log("a function");
  }
}

export { Comp4UseCallback };
